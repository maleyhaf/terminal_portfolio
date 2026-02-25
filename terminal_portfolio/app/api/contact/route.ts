import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend("re_3HZjJyZK_N5i8zWDyyir5ojg9nLhspdqd");

export async function POST(req: Request) {
  const { from, subject, message } = await req.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "maleyhaf@gmail.com",
      subject: subject || "(No subject)",
      replyTo: from,
      text: `From: ${from}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
