import './globals.css'
import MainHeader from '@/components/MainHeader'

export const metadata = {
  title: 'Star Shadows AI Designer',
  description: 'AI 设计工具，提供强大的 AI 功能，帮助用户快速创建专业级设计。'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  )
}