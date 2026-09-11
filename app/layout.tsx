import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "英语学习导航 | 成人自学资源库",
  description: "为成人英语自学者整理的优质学习网站，覆盖听说读写、职场英语、雅思与托福。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
