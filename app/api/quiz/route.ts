import { NextResponse } from "next/server";
import { fetchWithAuth } from "@/app/lib/api";

export async function GET() {
  try {
    const response = await fetchWithAuth(`/auth/questions`);
    const data = await response.json();
    return NextResponse.json({ response: data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
