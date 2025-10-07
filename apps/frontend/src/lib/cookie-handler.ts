export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=") as [string, string];

    if (key === name) {
      return value;
    }
  }
  return null;
}
