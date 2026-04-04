import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── HTML sanitization ─────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── In-memory rate limiting (resets on restart) ───────────────────────
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ── POST /api/contact ─────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em alguns minutos." },
        { status: 429 }
      );
    }

    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    // Validate SMTP config exists
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("SMTP environment variables not configured");
      return NextResponse.json(
        { error: "Serviço de e-mail temporariamente indisponível." },
        { status: 503 }
      );
    }

    // Create transporter with GoDaddy Titan Email SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Sanitize all user inputs before inserting into HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Send notification email to Pocket Software
    await transporter.sendMail({
      from: `"Pocket Software" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Novo contato: ${safeName}`,
      html: `
        <h2>Novo contato via site Pocket Software</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    // Send confirmation email to the lead
    await transporter.sendMail({
      from: `"Pocket Software" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Recebemos sua mensagem — Pocket Software",
      html: `
        <p>Olá ${safeName},</p>
        <p>Obrigado por entrar em contato com a Pocket Software!</p>
        <p>Recebemos sua mensagem e vamos responder em até um dia útil.</p>
        <br>
        <p>Atenciosamente,</p>
        <p><strong>Pocket Software</strong></p>
        <p>Software feito exclusivamente para você.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
