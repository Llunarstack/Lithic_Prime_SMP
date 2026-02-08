import { memo, useCallback } from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    isActive?: boolean;
}

export const PixelButton = memo<PixelButtonProps>(({ 
    children, 
    variant = 'primary', 
    isActive = false, 
    className = '', 
    onClick, 
    disabled,
    ...props 
}) => {
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            onClick?.(e);
        }
    }, [onClick, disabled]);

    // Base Minecraft Button Style
    const baseStyles = "font-pixel text-xl leading-none px-6 py-3 relative outline-none transition-transform active:scale-[0.98] select-none disabled:opacity-50 disabled:cursor-not-allowed";
    
    // Variants control the background texture/color
    let bgClass = "";
    const textClass = "text-[#E0E0E0] drop-shadow-md";
    
    switch (variant) {
        case 'primary':
            bgClass = isActive ? "bg-[#3a3a3a]" : "bg-[#5A5A5A] hover:bg-[#686868]";
            break;
        case 'secondary':
            bgClass = isActive ? "bg-[#1a1a1a]" : "bg-[#2A2A2A] hover:bg-[#383838]";
            break;
        case 'danger':
            bgClass = isActive ? "bg-[#7a0000]" : "bg-[#9E0000] hover:bg-[#B80000]";
            break;
        case 'ghost':
            bgClass = "bg-transparent border-none shadow-none hover:bg-white/5";
            return (
                <button 
                    className={`${baseStyles} ${bgClass} ${textClass} ${className}`} 
                    onClick={handleClick} 
                    disabled={disabled}
                    {...props}
                >
                    {children}
                </button>
            );
    }

    // Bevel borders logic
    const borderStyles = isActive
        ? "border-[2px] border-black shadow-[inset_2px_2px_0_#111,inset_-2px_-2px_0_#444]"
        : "border-[2px] border-black shadow-[inset_2px_2px_0_#8e8e8e,inset_-2px_-2px_0_#2b2b2b]";

    return (
        <button 
            className={`${baseStyles} ${bgClass} ${borderStyles} ${textClass} ${className}`} 
            onClick={handleClick} 
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

PixelButton.displayName = 'PixelButton';