import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "字谜实验平台",
  description: "一个用于研究不同适应系统描述对主观期望和任务表现影响的实验平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} p-10`}>{children}</body>
    </html>
  );
}
