import React, { FC } from 'react'
import Logo from './Logo';
import { X } from 'lucide-react';
import { headerData } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hook';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname()
    const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
    return (
        <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full text-white/80 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div
                ref={sidebarRef}
                className={`min-w-72 max-w-96 bg-black h-screen p-8 border-r border-r-shop_light_green/30 flex flex-col gap-8 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between">
                    <Logo className='text-white' spanDesign='group-hover:text-white' />
                    <button onClick={onClose} className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-shop_light_green transition-colors duration-200' aria-label="Close menu">
                        <X className='w-5 h-5' />
                    </button>
                </div>
                <div className="flex flex-col gap-1 font-semibold tracking-wide text-base">
                    {headerData?.map((item) => {
                        const isActive = pathname === item?.href
                        return (
                            <Link
                                href={item?.href}
                                key={item?.title}
                                className={`py-2.5 px-3 -mx-3 rounded-md transition-colors duration-200 ${
                                    isActive
                                        ? "text-shop_light_green bg-white/5"
                                        : "hover:text-shop_light_green hover:bg-white/5"
                                }`}
                            >
                                {item?.title}
                            </Link>
                        )
                    })}
                </div>
                <div className="mt-auto pt-6 border-t border-white/10">
                    <SocialMedia />
                </div>
            </div>
        </div>
    )
}

export default SideMenu