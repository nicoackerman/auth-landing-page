// "use client";

export function getCookie(name: string): string | null {
  if (!document) {
    throw new Error("Get cookie must be use in client side only");
  }
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=") as [string, string];

    if (key === name) {
      return value;
    }
  }
  return null;
}
