import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/nprogress/styles.css";
import "./globals.css";
import { theme } from "@/lib/mantine-theme";
import Providers from "@/components/providers";

// 시스템 폰트 사용으로 Google Fonts 의존성 제거

export const metadata: Metadata = {
  title: "이승우 | Senior Frontend Developer",
  description: "10년 경력 프론트엔드 개발자 포트폴리오 - B2B SaaS 전문, 성능 최적화 전문가",
  keywords: "프론트엔드, Frontend, React, Vue.js, TypeScript, 포트폴리오",
  authors: [{ name: "이승우", url: "https://github.com/Seungwoo321" }],
  openGraph: {
    title: "이승우 | Senior Frontend Developer",
    description: "10년 경력 프론트엔드 개발자 포트폴리오",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className="font-sans">
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="top-right" />
          <ModalsProvider>
            <Providers>
              {children}
            </Providers>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
