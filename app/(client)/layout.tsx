import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";


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
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
