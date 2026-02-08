import { memo, useState, useMemo } from 'react';
import { getAllMods } from '../services/modService';
import { ModCard } from './ModCard';
import { ModCategory, Mod } from '../types';
import { Search } from 'lucide-react';
import { PixelButton } from './ui/PixelButton';
import { PixelCard } from './ui/PixelCard';

export const ModList = memo(() => {
    const allMods = useMemo(() => getAllMods(), []);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'mandatory' | 'optional'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // Filtering Logic
    const getFilteredMods = (mods: Mod[]) => {
        return mods.filter(mod => {
            const matchesSearch = mod.name.toLowerCase().includes(search.toLowerCase()) || 
                                mod.filename.toLowerCase().includes(search.toLowerCase());
            
            const matchesCategory = categoryFilter === 'all' ? true : mod.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    };

    const mandatoryMods = useMemo(() => getFilteredMods(allMods.filter(m => !m.isOptional)), [allMods, search, categoryFilter]);
    const optionalMods = useMemo(() => getFilteredMods(allMods.filter(m => m.isOptional)), [allMods, search, categoryFilter]);

    const categories = Object.values(ModCategory);

    // Determines what to show based on tabs
    const showMandatory = filterType === 'all' || filterType === 'mandatory';
    const showOptional = filterType === 'all' || filterType === 'optional';

    return (
        <div id="modlist" className="max-w-[1400px] mx-auto px-4 py-16 relative z-10">
            
            <div className="mb-8 sm:mb-12 text-center">
                <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-white mb-2 drop-shadow-[4px_4px_0_#000]">Mod Collection</h2>
                <div className="inline-block bg-[#333] border-2 border-[#111] px-3 sm:px-4 py-1 text-[#aaa] font-pixel text-base sm:text-xl">
                    Library Version 1.21.11
                </div>
            </div>

            {/* Filter Panel */}
            <PixelCard className="mb-12">
                <div className="flex flex-col xl:flex-row gap-8 items-start justify-between">
                    
                    {/* Search Input */}
                    <div className="w-full xl:w-1/3">
                        <label className="block text-[#aaa] font-pixel text-lg mb-2 uppercase tracking-wide">Search Database</label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Find a mod..." 
                                className="w-full bg-[#111] border-[2px] border-[#555] text-white px-4 py-3 pl-12 focus:outline-none focus:border-[#55FFFF] font-pixel text-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] transition-colors placeholder-[#444]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#55FFFF] transition-colors" size={24} />
                        </div>
                    </div>

                    {/* View Filters */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-6">
                        {/* Type Tabs */}
                        <div>
                             <label className="block text-[#aaa] font-pixel text-lg mb-2 uppercase tracking-wide">Filter by Importance</label>
                             <div className="flex flex-wrap gap-3">
                                <PixelButton onClick={() => setFilterType('all')} isActive={filterType === 'all'}>
                                    ALL MODS
                                </PixelButton>
                                <PixelButton onClick={() => setFilterType('mandatory')} isActive={filterType === 'mandatory'}>
                                    MANDATORY ({mandatoryMods.length})
                                </PixelButton>
                                <PixelButton onClick={() => setFilterType('optional')} isActive={filterType === 'optional'}>
                                    OPTIONAL ({optionalMods.length})
                                </PixelButton>
                            </div>
                        </div>

                        {/* Category Tags */}
                        <div>
                            <label className="block text-[#aaa] font-pixel text-lg mb-2 uppercase tracking-wide">Filter by Category</label>
                            <div className="flex flex-wrap gap-2">
                                <button 
                                    onClick={() => setCategoryFilter('all')}
                                    className={`px-3 py-1 text-xs uppercase tracking-wider font-bold border-2 transition-all ${categoryFilter === 'all' ? 'bg-[#fff] text-[#000] border-[#fff]' : 'bg-[#111] text-[#777] border-[#333] hover:border-[#777]'}`}
                                >
                                    All
                                </button>
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`px-3 py-1 text-xs uppercase tracking-wider font-bold border-2 transition-all ${categoryFilter === cat ? 'bg-[#55FFFF] text-[#000] border-[#55FFFF]' : 'bg-[#111] text-[#777] border-[#333] hover:border-[#777]'}`}
                                    >
                                        {cat.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </PixelCard>

            {/* Content Sections */}
            <div className="space-y-16">
                
                {showMandatory && mandatoryMods.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-1 flex-grow bg-[#333] border-b border-[#000]"></div>
                            <h3 className="font-pixel text-3xl text-[#AAAAAA] uppercase tracking-widest bg-[#121212] px-4 border-2 border-[#333]">Mandatory Mods</h3>
                            <div className="h-1 flex-grow bg-[#333] border-b border-[#000]"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mandatoryMods.map(mod => (
                                <ModCard key={mod.id} mod={mod} />
                            ))}
                        </div>
                    </section>
                )}

                {showOptional && optionalMods.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-6 mt-12">
                            <div className="h-1 flex-grow bg-[#003366] border-b border-[#000]"></div>
                            <h3 className="font-pixel text-3xl text-[#55FFFF] uppercase tracking-widest bg-[#121212] px-4 border-2 border-[#003366]">Optional Mods</h3>
                            <div className="h-1 flex-grow bg-[#003366] border-b border-[#000]"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {optionalMods.map(mod => (
                                <ModCard key={mod.id} mod={mod} />
                            ))}
                        </div>
                    </section>
                )}

                {mandatoryMods.length === 0 && optionalMods.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="font-pixel text-4xl text-[#555] mb-4">No Mods Found</h3>
                        <p className="text-[#777]">Try adjusting your search filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
});

ModList.displayName = 'ModList';