import React from 'react' 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BaggageClaimIcon } from 'lucide-react';

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
    {
        title: "YouTube",
        href: "#",
        icon: <BaggageClaimIcon className='w-5 h-5' />
    },
    {
        title: "LinkedIn",
        href: "#",
        icon: <BaggageClaimIcon className='w-5 h-5' />
    },
    {
        title: "Facebook",
        href: "#",
        icon: <BaggageClaimIcon className='w-5 h-5' />
    }, 
]

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
    return <TooltipProvider>
        <div className={cn("flex items-center gap-3.5", className)}>
            {socialLink.map((item) => (
                <Tooltip key={item?.title}>
                    <TooltipTrigger
                        render={
                            <Link
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
                                    iconClassName
                                )}
                            />
                        }
                    >
                        {item.icon}
                    </TooltipTrigger>
                    <TooltipContent className={cn("bg-white text-darkColor font-semibold", tooltipClassName)}>{item?.title}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    </TooltipProvider>
}

export default SocialMedia