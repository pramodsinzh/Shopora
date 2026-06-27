import { cn } from "@/lib/utils"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return <html lang="en" className={cn("font-sans", geist.variable)}>
        <body className="font-poppins antialiased">
            {children}
        </body>
    </html>
}

export default RootLayout