import { memo, useState, useEffect } from 'react';
import { Mod, ModCategory } from '../types';
import { Box, Settings, Map, Sword, Zap, Leaf, Grid, Download } from 'lucide-react';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';

interface ModCardProps {
    mod: Mod;
}

const getCategoryIcon = (cat: ModCategory) => {
    switch (cat) {
        case ModCategory.CORE: return <Settings size={28} className="text-gray-500" />;
        case ModCategory.CONTENT: return <Box size={28} className="text-[#55FF55]" />; // Bright Green
        case ModCategory.WORLD_GEN: return <Map size={28} className="text-[#FFAA00]" />; // Gold
        case ModCategory.PERFORMANCE: return <Zap size={28} className="text-[#FFFF55]" />; // Yellow
        case ModCategory.DECORATION: return <Grid size={28} className="text-[#FF55FF]" />; // Pink
        case ModCategory.VISUAL: return <Leaf size={28} className="text-[#55FFFF]" />; // Aqua
        default: return <Sword size={28} className="text-[#FF5555]" />; // Red
    }
}

export const ModCard = memo<ModCardProps>(({ mod }) => {
    const [iconUrl, setIconUrl] = useState<string | null>(null);
    const [fetchedDesc, setFetchedDesc] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            const cacheKey = `mod_meta_${mod.name}`;
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                const data = JSON.parse(cached);
                setIconUrl(data.icon_url);
                if (data.description && data.description.length > 5) setFetchedDesc(data.description);
                if (data.slug) setDownloadUrl(`https://modrinth.com/mod/${data.slug}`);
                return;
            }

            // Stagger requests slightly
            await new Promise(r => setTimeout(r, Math.random() * 3000));

            try {
                const res = await fetch(`https://api.modrinth.com/v2/search?query=${encodeURIComponent(mod.name)}&index=relevance&limit=1`, {
                    headers: { 'User-Agent': 'LithicPrimeSMP/ModpackSite/1.0' }
                });
                
                if (res.ok) {
                    const data = await res.json();
                    if (data.hits && data.hits.length > 0) {
                        const hit = data.hits[0];
                        const newMeta = {
                            icon_url: hit.icon_url,
                            description: hit.description,
                            slug: hit.slug
                        };
                        localStorage.setItem(cacheKey, JSON.stringify(newMeta));
                        setIconUrl(hit.icon_url);
                        if (hit.description) setFetchedDesc(hit.description);
                        if (hit.slug) setDownloadUrl(`https://modrinth.com/mod/${hit.slug}`);
                    }
                }
            } catch (e) {
                // Ignore errors
            }
        };

        fetchMetadata();
    }, [mod.name]);

    // Fallback search URL if modrinth fails
    const activeDownloadUrl = downloadUrl || `https://www.google.com/search?q=minecraft+mod+${encodeURIComponent(mod.name)}`;

    return (
        <PixelCard noPadding className="h-full flex flex-col group transition-all duration-200 hover:-translate-y-1 hover:z-10 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-2 border-black hover:border-[#E0E0E0]">
            <div className="p-4 flex flex-col h-full bg-[#202020] mc-slot-hover transition-colors relative">
                
                {/* Header Section */}
                <div className="flex gap-4 mb-3">
                    {/* Icon Box - Minecraft Slot Style */}
                    <div className="w-14 h-14 shrink-0 bg-[#8b8b8b] border-2 border-[#373737] shadow-[inset_2px_2px_0_#373737,inset_-2px_-2px_0_#fff] flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                         <div className="w-full h-full bg-[#8b8b8b] flex items-center justify-center overflow-hidden">
                             {iconUrl ? (
                                 <img src={iconUrl} alt={mod.name} className="w-full h-full object-contain pixelated" onError={() => setIconUrl(null)} />
                             ) : (
                                 getCategoryIcon(mod.category)
                             )}
                         </div>
                    </div>

                    <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="font-pixel text-2xl text-white leading-none mb-1 drop-shadow-md tracking-wide group-hover:text-[#FFFF55] transition-colors break-words select-none">
                            {mod.name}
                        </h3>
                        <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider bg-black/30 px-1.5 py-0.5 rounded border border-[#333] select-none">
                                {mod.category.split(' ')[0]}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex-grow mb-4">
                    <p className="text-[#D0D0D0] text-sm leading-snug line-clamp-3 font-medium opacity-90 group-hover:opacity-100 select-none">
                        {fetchedDesc || mod.description}
                    </p>
                </div>

                {/* Actions & Footer */}
                <div className="mt-auto">
                    <a href={activeDownloadUrl} target="_blank" rel="noopener noreferrer" className="block w-full mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                        <PixelButton variant="secondary" className="w-full text-sm py-2 flex items-center justify-center gap-2 group-hover:bg-[#383838]">
                            <Download size={14} /> Download
                        </PixelButton>
                    </a>

                    {/* Footer - Tag Only, aligned right */}
                    <div className="pt-3 border-t-2 border-[#333] flex justify-end items-center select-none">
                        {mod.isOptional ? (
                            <div className="bg-[#003366] border border-[#0055aa] px-2 py-0.5 flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-[#55FFFF] rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-[#55FFFF] font-bold uppercase tracking-wider">Optional</span>
                            </div>
                        ) : (
                             <div className="px-2 py-0.5 bg-[#330000] border border-[#550000] flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-[#FF5555] rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-[#FF5555] font-bold uppercase tracking-wider drop-shadow-[0_0_4px_rgba(255,85,85,0.5)]">Mandatory</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PixelCard>
    );
});

ModCard.displayName = 'ModCard';