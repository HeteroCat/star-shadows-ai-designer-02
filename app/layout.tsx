import './globals.css'
import LoginGate from '@/components/LoginGate'

export const metadata = {
  title: 'Star Shadows AI Designer',
  description: 'Next.js 全栈重构版'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <LoginGate>
          {children}
        </LoginGate>
      </body>
    </html>
  )
}