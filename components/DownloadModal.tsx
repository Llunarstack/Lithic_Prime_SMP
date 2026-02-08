import { memo, useCallback } from 'react';
import { X, Download, Package, Sparkles } from 'lucide-react';
import { PixelButton } from './ui/PixelButton';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DownloadModal = memo(({ isOpen, onClose }: DownloadModalProps) => {
    const handleDownload = useCallback((type: 'full' | 'mandatory' | 'optional') => {
        const urls = {
            full: '/downloads/LithicPrime-FullPack.zip',
            mandatory: '/downloads/LithicPrime-Mandatory.zip',
            optional: '/downloads/LithicPrime-Optional.zip'
        };
        
        const link = document.createElement('a');
        link.href = urls[type];
        link.download = urls[type].split('/').pop() || 'download.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-[#1a1a1a] border-4 border-[#333] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.9)]" style={{
                boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.1), inset -2px -2px 0 rgba(0,0,0,0.5), 0 0 50px rgba(0,0,0,0.9)'
            }}>
                {/* Header */}
                <div className="bg-[#111] border-b-4 border-[#333] p-6 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="font-pixel text-2xl sm:text-3xl text-white uppercase tracking-wider">Download Modpack</h2>
                    <button 
                        onClick={onClose}
                        className="text-[#888] hover:text-white transition-colors p-2"
                    >
                        <X size={32} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Full Pack */}
                    <div className="bg-[#0a0a0a] border-2 border-[#444] p-6 hover:border-[#55FF55] transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#55FF55] p-3 border-2 border-[#003300] group-hover:scale-110 transition-transform">
                                <Package size={32} className="text-[#000]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-pixel text-xl sm:text-2xl text-[#55FF55] mb-2 uppercase">Full Modpack</h3>
                                <p className="text-[#aaa] mb-4 leading-relaxed">
                                    Complete collection with all mods included. Perfect for the full Lithic Prime experience.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#111] border border-[#333] text-[#888] text-sm font-pixel">ALL MODS</span>
                                    <span className="px-3 py-1 bg-[#111] border border-[#333] text-[#888] text-sm font-pixel">274 MODS</span>
                                </div>
                                <PixelButton 
                                    onClick={() => handleDownload('full')}
                                    className="!bg-[#55FF55] hover:!bg-[#66FF66] !text-black !border-[#003300] flex items-center gap-2"
                                >
                                    <Download size={20} />
                                    Download Full Pack
                                </PixelButton>
                            </div>
                        </div>
                    </div>

                    {/* Mandatory Mods */}
                    <div className="bg-[#0a0a0a] border-2 border-[#444] p-6 hover:border-[#FF5555] transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#FF5555] p-3 border-2 border-[#330000] group-hover:scale-110 transition-transform">
                                <Package size={32} className="text-[#000]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-pixel text-xl sm:text-2xl text-[#FF5555] mb-2 uppercase">Mandatory Mods Only</h3>
                                <p className="text-[#aaa] mb-4 leading-relaxed">
                                    Essential mods required for server compatibility. Minimum setup to join Lithic Prime.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#111] border border-[#333] text-[#888] text-sm font-pixel">REQUIRED</span>
                                    <span className="px-3 py-1 bg-[#111] border border-[#333] text-[#888] text-sm font-pixel">247 MODS</span>
                                </div>
                                <PixelButton 
                                    onClick={() => handleDownload('mandatory')}
                                    className="!bg-[#FF5555] hover:!bg-[#FF6666] !text-black !border-[#330000] flex items-center gap-2"
                                >
                                    <Download size={20} />
                                    Download Mandatory
                                </PixelButton>
                            </div>
                        </div>
                    </div>

                    {/* Optional Mods */}
                    <div className="bg-[#0a0a0a] border-2 border-[#444] p-6 hover:border-[#55FFFF] transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#55FFFF] p-3 border-2 border-[#003333] group-hover:scale-110 transition-transform">
                                <Sparkles size={32} className="text-[#000]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-pixel text-xl sm:text-2xl text-[#55FFFF] mb-2 uppercase">Optional Mods</h3>
                                <p className="text-[#aaa] mb-4 leading-relaxed">
                                    Quality of life and enhancement mods. Add these to customize your experience.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#111] border border-[#333] text-[#888] text-sm font-pixel">OPTIONAL</span>
                                    <span className="px-3 py-1 bg-[#111] border border-[#333] text-[#888] text-sm font-pixel">27 MODS</span>
                                </div>
                                <PixelButton 
                                    onClick={() => handleDownload('optional')}
                                    className="!bg-[#55FFFF] hover:!bg-[#66FFFF] !text-black !border-[#003333] flex items-center gap-2"
                                >
                                    <Download size={20} />
                                    Download Optional
                                </PixelButton>
                            </div>
                        </div>
                    </div>

                    {/* Installation Instructions */}
                    <div className="bg-[#111] border-2 border-[#333] p-6 mt-8">
                        <h4 className="font-pixel text-lg text-[#55FF55] mb-3 uppercase">Installation Instructions</h4>
                        <ol className="space-y-2 text-[#aaa] list-decimal list-inside">
                            <li>Download your preferred modpack version</li>
                            <li>Extract the .zip file to your Minecraft mods folder</li>
                            <li>Launch Minecraft with Fabric Loader 1.21.11</li>
                            <li>Join the Lithic Prime server and enjoy!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
});

DownloadModal.displayName = 'DownloadModal';
