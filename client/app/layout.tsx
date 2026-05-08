import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
export const metadata = {
  title: 'AI Code Reviewer',
  description: 'AI-powered code review and mentorship platform',
}