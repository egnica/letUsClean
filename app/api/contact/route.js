import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY_LETUSCLEAN);

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    await resend.emails.send({
      from: "Let Us Clean Contact <nick@nicholasegner.com>",
      //to: "letuscleanmn@gmail.com",
      to: "nictacks@gmail.com",
      subject: `New Quote Request from ${name}`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
