import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AIChat from "@/components/ai-chat";
import WeixinFloat from "@/components/weixin-float";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = "https://my-brand-site-tau.vercel.app";

export const metadata: Metadata = {
  title: "MyBrandSite - ss的品牌站",
  description:
    "ss个人品牌网站，专注 AI 编程、仓颉/鸿蒙开发、软件培训与技术咨询，分享技术博客",
  keywords: [
    "AI编程",
    "仓颉开发",
    "鸿蒙开发",
    "软件开发",
    "小程序开发",
    "技术培训",
    "技术咨询",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MyBrandSite - ss的品牌站",
    description:
      "ss个人品牌网站，专注 AI 编程、仓颉/鸿蒙开发、软件培训与技术咨询，分享技术博客",
    url: SITE_URL,
    siteName: "MyBrandSite",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyBrandSite - ss的品牌站",
    description:
      "ss个人品牌网站，专注 AI 编程、仓颉/鸿蒙开发、软件培训与技术咨询，分享技术博客",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <AIChat />
          <WeixinFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
