import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import Head from "next/head";
import "@/styles/globals.css";
import { GlobalProviders } from "@/providers/app.providers";

export const metadata: Metadata = {
  title: "Next App Mantine Tailwind Template",
  description: "Next App Mantine Tailwind Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body className="antialiased">
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
