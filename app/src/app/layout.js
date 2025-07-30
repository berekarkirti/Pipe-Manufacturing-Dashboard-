import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pipe Manufacturing Dashboard',
  description: 'Complete Production, Inventory & Sales Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #8B7CF8 0%, #A78BFA 100%)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}