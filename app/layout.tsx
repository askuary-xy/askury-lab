import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";   // 引入 Link 组件
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Askury Lab",
  description: "我的学习日志",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Askury Lab
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-gray-600 hover:text-black transition">
                首页
              </Link>
              <Link href="/records" className="text-gray-600 hover:text-black transition">
                学习记录
              </Link>
            </div>
          </div>
        </nav>

        {/* 页面内容 */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}