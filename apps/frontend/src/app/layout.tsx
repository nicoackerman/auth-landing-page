import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "~/components/ui/Header";
import { AuthClientProvider } from "~/app/(auth)/_providers/authProvider";
import { QueryProviderClient } from "~/providers/QueryProviderClient";

export const metadata: Metadata = {
  title: "Auth app",
  description: "Home page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-gradient-to-br from-gray-900 to-black">
        <QueryProviderClient>
          <AuthClientProvider>
            <Header />
            {children}
          </AuthClientProvider>
        </QueryProviderClient>
      </body>
    </html>
  );
}
