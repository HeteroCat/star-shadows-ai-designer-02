import './globals.css'

export const metadata = {
  title: 'Star Shadows AI Designer',
  description: 'Next.js 全栈重构版'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}