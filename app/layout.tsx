import { cn } from "@/lib/utils"
import { Geist } from "next/font/google"
import "./globals.css"
import { Toaster } from 'react-hot-toast'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return <html lang="en" className={cn("font-sans", geist.variable)}>
        <body className="font-poppins antialiased">
            {children}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000000",
                        color: "#ffffff"
                    }
                }}
            />
        </body>
    </html>
}

export default RootLayout