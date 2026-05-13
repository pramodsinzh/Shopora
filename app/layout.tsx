import type { Metadata } from "next"; 
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Shopora",
  description: "Shopora online store is a one-stop destination for all your shopping needs. We offer a wide range of products, from fashion and electronics to home goods and more. With our user-friendly interface and secure payment options, shopping with us is easy and convenient. Explore our collection today and find the perfect items to suit your style and needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} >
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
}
