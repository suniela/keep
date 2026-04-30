import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep — Alert Management & On-Call Platform",
  description:
    "Keep is an open-source alert management and on-call platform that helps teams manage, correlate, and respond to alerts efficiently.",
  icons: {
    icon: "/keep.png",
  },
};

/**
 * Root layout component for the Keep UI application.
 *
 * Wraps the entire application with:
 * - Next.js session provider for authentication state
 * - Global font configuration (Inter)
 * - Toast notification provider
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <SessionProvider session={session}>
          {/* Main application content */}
          {children}

          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              // Increased default duration slightly so notifications are easier to read
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 4000,
                style: {
                  background: "#22c55e",
                },
              },
              error: {
                // Keep errors visible longer since they require attention
                duration: 8000,
                style: {
                  background: "#ef4444",
                },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
