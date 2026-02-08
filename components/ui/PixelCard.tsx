import { memo, type ReactNode } from 'react';

interface PixelCardProps {
    children: ReactNode;
    className?: string;
    noPadding?: boolean;
}

export const PixelCard = memo<PixelCardProps>(({ children, className = '', noPadding = false }) => {
    return (
        <div className={`relative bg-[#262626] border-[2px] border-black shadow-xl ${className}`}>
            {/* Bevel Effect */}
            <div className="absolute inset-0 border-t-[2px] border-l-[2px] border-[#555] pointer-events-none z-10 opacity-80" aria-hidden="true" />
            <div className="absolute inset-0 border-b-[2px] border-r-[2px] border-[#111] pointer-events-none z-10 opacity-80" aria-hidden="true" />
            
            <div className={`relative z-20 ${noPadding ? '' : 'p-6'}`}>
                {children}
            </div>
        </div>
    );
});

PixelCard.displayName = 'PixelCard';