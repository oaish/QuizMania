import {Inter} from 'next/font/google'
import './globals.css'
import {Providers} from "@/app/providers";
const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Quiz Mania',
    description: 'For MSBTE CO-6I Students',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className='dark'>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
