import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = "{add token here}";

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
