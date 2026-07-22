"use client";
import { AlignLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import SideMenu from './SideMenu'

const MobileMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsSidebarOpen(false)
    }, [pathname])

    return (
        <>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle menu">
                <AlignLeft className='hover:text-darkColor hoverEffect md:hidden hover:cursor-pointer' />
            </button>
            <div className="md:hidden">
                <SideMenu
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </div>
        </>
    )
}

export default MobileMenu