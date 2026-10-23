import { heIL } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";

import "./globals.css";

const font = Rubik({ subsets: ["latin", "hebrew"] });

export const viewport: Viewport = {
  themeColor: "#22C55E",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={heIL}
      appearance={{
        options: {
          logoImageUrl: "/favicon.ico",
        },
        variables: {
          colorPrimary: "#22C55E",
        },
      }}
      telemetry={false}
      afterSignOutUrl="/"
    >
      <html lang="he" dir="rtl">
        <body className={font.className}>
          <Toaster theme="light" dir="rtl" richColors closeButton />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
