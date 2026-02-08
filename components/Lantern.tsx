import { memo, useState, useCallback, useEffect } from 'react';

export const Lantern = memo(() => {
    const [isLit, setIsLit] = useState(false);
    const [chainCount, setChainCount] = useState(40);

    // Calculate chain count based on screen width
    useEffect(() => {
        const updateChainCount = () => {
            const screenWidth = window.innerWidth;
            const chainsNeeded = Math.ceil((screenWidth / 2) / 24);
            setChainCount(chainsNeeded);
        };

        updateChainCount();
        window.addEventListener('resize', updateChainCount);
        return () => window.removeEventListener('resize', updateChainCount);
    }, []);

    const handleClick = useCallback(() => {
        setIsLit(true);
        setTimeout(() => setIsLit(false), 3000);
    }, []);

    return (
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
            {/* Light effect when clicked */}
            {isLit && (
                <div 
                    className="absolute top-40 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: '1000px',
                        height: '1000px',
                        background: 'radial-gradient(circle, rgba(255,200,100,0.6) 0%, rgba(255,180,80,0.4) 15%, rgba(255,150,50,0.2) 35%, transparent 60%)',
                        filter: 'blur(40px)',
                        animation: 'lightPulse 2s ease-in-out infinite'
                    }}
                />
            )}

            {/* Chains - Horizontal across screen - STATIC */}
            <div className="absolute top-4 left-0 right-0 h-32 flex items-start justify-center overflow-hidden">
                {/* Left chain segments */}
                <div className="flex items-center">
                    {[...Array(chainCount)].map((_, i) => (
                        <img 
                            key={`left-${i}`}
                            src="/assets/items/chain.png" 
                            alt="" 
                            className="pixelated opacity-70"
                            style={{ 
                                width: '32px', 
                                height: '24px',
                                imageRendering: 'pixelated',
                                transform: 'rotate(90deg)',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                                marginLeft: '-8px'
                            }}
                        />
                    ))}
                </div>
                
                {/* Center vertical chain connecting to lantern */}
                <div className="relative flex flex-col items-center" style={{ width: '40px', marginTop: '-4px' }}>
                    {[...Array(4)].map((_, i) => (
                        <img 
                            key={`center-${i}`}
                            src="/assets/items/chain.png" 
                            alt="" 
                            className="pixelated opacity-80"
                            style={{ 
                                width: '24px', 
                                height: '40px',
                                imageRendering: 'pixelated',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                                marginTop: i === 0 ? '0' : '-8px'
                            }}
                        />
                    ))}
                </div>

                {/* Right chain segments */}
                <div className="flex items-center">
                    {[...Array(chainCount)].map((_, i) => (
                        <img 
                            key={`right-${i}`}
                            src="/assets/items/chain.png" 
                            alt="" 
                            className="pixelated opacity-70"
                            style={{ 
                                width: '32px', 
                                height: '24px',
                                imageRendering: 'pixelated',
                                transform: 'rotate(90deg)',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                                marginLeft: '-8px'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Lantern - Static, Click to Light */}
            <div 
                className="absolute top-32 left-1/2 -translate-x-1/2 cursor-pointer pointer-events-auto select-none"
                onClick={handleClick}
            >
                <img 
                    src="/assets/items/lantern.png" 
                    alt="Lantern" 
                    className="pixelated"
                    draggable={false}
                    style={{ 
                        width: '96px', 
                        height: '96px',
                        imageRendering: 'pixelated',
                        filter: isLit 
                            ? 'drop-shadow(0 0 30px rgba(255,200,100,0.9)) drop-shadow(0 0 60px rgba(255,150,50,0.7)) brightness(1.3)' 
                            : 'drop-shadow(0 6px 12px rgba(0,0,0,0.5)) brightness(0.9)',
                        pointerEvents: 'none'
                    }}
                />
            </div>

            <style>{`
                @keyframes lightPulse {
                    0%, 100% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% { 
                        opacity: 0.8;
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
            `}</style>
        </div>
    );
});

Lantern.displayName = 'Lantern';





