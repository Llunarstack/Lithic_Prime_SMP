import { memo, useState } from 'react';
import { PixelButton } from './ui/PixelButton';
import { Download } from 'lucide-react';
import { DownloadModal } from './DownloadModal';
import { Lantern } from './Lantern';

export const Hero = memo(() => {
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    return (
        <section className="relative min-h-[80vh] sm:min-h-[90vh] flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden">
            
            <Lantern />
            <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#121212_90%)] z-10 pointer-events-none"></div>
            
            {/* Minecraft Block Pattern Background */}
            <div className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none" style={{
                backgroundImage: `repeating-linear-gradient(0deg, #555 0px, #555 16px, transparent 16px, transparent 32px),
                                  repeating-linear-gradient(90deg, #555 0px, #555 16px, transparent 16px, transparent 32px)`,
                backgroundSize: '32px 32px'
            }}></div>

            <div className="relative z-20 flex flex-col items-center animate-fade-in w-full max-w-5xl px-2">
                
                {/* Logo Container */}
                <div className="mb-8 sm:mb-12 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] w-full">
                    <img 
                        src="/assets/logo.png" 
                        alt="Lithic Prime SMP Logo" 
                        className="w-full max-w-[300px] sm:max-w-[500px] md:max-w-[700px] h-auto object-contain rounded-lg mx-auto"
                    />
                </div>
                
                {/* Updated Tagline with Minecraft Border */}
                <div className="relative bg-[#121212]/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 border-4 border-[#333] rounded-sm max-w-4xl mb-8 sm:mb-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]" style={{
                    boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.1), inset -2px -2px 0 rgba(0,0,0,0.5), 0 0 50px rgba(0,0,0,0.8)'
                }}>
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 bg-[#55FF55] opacity-50" style={{
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                    }}></div>
                    <div className="absolute top-0 right-0 w-4 h-4 bg-[#55FF55] opacity-50" style={{
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
                    }}></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#55FF55] opacity-50" style={{
                        clipPath: 'polygon(0 0, 0 100%, 100% 100%)'
                    }}></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#55FF55] opacity-50" style={{
                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                    }}></div>
                    
                    <p className="font-pixel text-base sm:text-xl md:text-2xl lg:text-3xl text-[#E0E0E0] leading-relaxed drop-shadow-md select-none">
                        Forge your legacy in a world transformed. <span className="text-[#55FF55] drop-shadow-[0_0_10px_rgba(85,255,85,0.5)]">Lithic Prime</span> brings together carefully selected mods: <span className="text-[#87CEEB] drop-shadow-[0_0_6px_rgba(135,206,235,0.3)]">epic terrain generation</span>, <span className="text-[#FF69B4] drop-shadow-[0_0_6px_rgba(255,105,180,0.3)]">powerful magic systems</span>, <span className="text-[#FF8C00] drop-shadow-[0_0_6px_rgba(255,140,0,0.3)]">advanced technology</span>, <span className="text-[#DDA0DD] drop-shadow-[0_0_6px_rgba(221,160,221,0.3)]">endless building possibilities</span>, and <span className="text-[#DC143C] drop-shadow-[0_0_6px_rgba(220,20,60,0.3)]">thrilling dungeons</span>. Whether you're constructing <span className="text-[#FF8C00]">massive factories</span>, mastering <span className="text-[#FF69B4]">arcane enchantments</span>, or exploring <span className="text-[#87CEEB]">breathtaking biomes</span>, your adventure awaits.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 items-stretch sm:items-center w-full sm:w-auto px-2">
                    <PixelButton 
                        variant="secondary" 
                        className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto min-w-[200px] transition-transform hover:-translate-y-1 text-base sm:text-xl" 
                        onClick={() => setShowDownloadModal(true)}
                    >
                        <Download size={20} className="sm:w-6 sm:h-6" />
                        Download Profile
                    </PixelButton>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';