import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY_LETUSCLEAN);

// ---- Simple rate limiter (in-memory). Good enough for MVP. ----
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max requests per IP per window
const requests = new Map(); // ip -> { count, reset }

function isRateLimited(ip) {
  const now = Date.now();
  const record = requests.get(ip);
  if (!record || now > record.reset) {
    requests.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count += 1;
  requests.set(ip, record);
  return record.count > RATE_LIMIT_MAX;
}

function getIp(req) {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "0.0.0.0"
  );
}

function validate(body) {
  const errs = [];
  const name = (body?.name || "").toString().trim();
  const email = (body?.email || "").toString().trim();
  const serviceType = (body?.serviceType || "").toString().trim();
  const message = (body?.message || "").toString().trim();
  const sourceUrl = (body?.sourceUrl || "").toString().trim();
  const company = (body?.company || "").toString().trim(); // honeypot

  if (!name || name.length < 2) errs.push("name");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push("email");
  if (!serviceType) errs.push("serviceType");
  if (!message || message.length < 10) errs.push("message");
  if (company) errs.push("spam"); // bot filled hidden field

  return {
    ok: errs.length === 0,
    errs,
    data: { name, email, serviceType, message, sourceUrl },
  };
}

export async function POST(req) {
  try {
    const ip = getIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const { ok, errs, data } = validate(body);
    if (!ok) {
      return NextResponse.json(
        { error: `Invalid request: ${errs.join(", ")}` },
        { status: 400 },
      );
    }

    const { name, email, serviceType, message, sourceUrl } = data;

    // --- Internal notification ---
    await resend.emails.send({
      from: "Let Us Clean MN <info@letuscleanmn.com>", // swap later to info@letuscleanmn.com
      // to: "letuscleanmn@gmail.com",
      to: "info@letuscleanmn.com",
      reply_to: email,
      subject: `New Quote • ${name} • ${serviceType}`,
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Service: ${serviceType}\n\n` +
        `${message}\n\n` +
        `Source: ${sourceUrl || "-"}\n` +
        `IP: ${ip}`,
    });

    // --- User confirmation ---
    await resend.emails.send({
      from: "Let Us Clean MN <<info@letuscleanmn.com>",
      to: email,
      subject: "We received your quote request — Let Us Clean MN",
      text:
        `Hi ${name},\n\n` +
        `Thanks for reaching out about "${serviceType}". We’ll email you soon with next steps.\n\n` +
        `— Let Us Clean MN\n` +
        `https://letuscleanmn.com`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
