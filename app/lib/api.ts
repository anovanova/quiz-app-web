import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    redirect("/login");
  }

  return response;
}
