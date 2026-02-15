import { memo } from 'react';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';
import { Heart, Shield, AlertTriangle, Users, Hammer, Cpu } from 'lucide-react';

interface RulesSectionProps {
    onJoinWhitelist: () => void;
}

export const RulesSection = memo<RulesSectionProps>(({ onJoinWhitelist }) => {
    return (
        <section id="rules" className="max-w-[1200px] mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-white mb-4 drop-shadow-[4px_4px_0_#000]">Server Rules</h2>
                <div className="inline-block bg-[#aa0000] border-2 border-[#550000] px-4 sm:px-6 py-2 text-[#ffaaaa] font-pixel text-base sm:text-xl shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                    Read Before Joining
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Community Rules */}
                <PixelCard className="h-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b-2 border-[#333] pb-4">
                        <Users size={28} className="sm:w-8 sm:h-8 text-[#55FF55]" />
                        <h3 className="font-pixel text-2xl sm:text-3xl text-[#E0E0E0]">Community Guidelines</h3>
                    </div>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <Heart className="shrink-0 text-[#FF5555] mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-white text-lg mb-1">Be Kind & Chill</h4>
                                <p className="text-[#AAA] text-sm leading-relaxed">
                                    Treat everyone with respect. We have zero tolerance for discrimination, hate speech, or harassment of any group. Keep the vibe positive and help others when you can.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Shield className="shrink-0 text-[#55FFFF] mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-white text-lg mb-1">Consent is Key</h4>
                                <p className="text-[#AAA] text-sm leading-relaxed">
                                    No trolling, griefing, or PvP unless the other player explicitly consents to it. Pranks are allowed only if they are harmless and you are willing to clean up.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <AlertTriangle className="shrink-0 text-[#FFAA00] mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-white text-lg mb-1">Fair Play</h4>
                                <p className="text-[#AAA] text-sm leading-relaxed">
                                    No hacked clients, x-ray texture packs, or exploiting dupes. We play Vanilla+ here; earn your resources the intended way.
                                </p>
                            </div>
                        </li>
                    </ul>
                </PixelCard>

                {/* Mod Specific Rules */}
                <PixelCard className="h-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b-2 border-[#333] pb-4">
                        <Hammer size={28} className="sm:w-8 sm:h-8 text-[#FFAA00]" />
                        <h3 className="font-pixel text-2xl sm:text-3xl text-[#E0E0E0]">Mod Protocols</h3>
                    </div>

                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="shrink-0 mt-1">
                                <Cpu size={20} className="text-[#AAAAAA]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-1">Lag Prevention (Chunk Loaders)</h4>
                                <p className="text-[#AAA] text-sm leading-relaxed">
                                    Be mindful of server performance. Limit chunk loaders to essential areas only. Excessive lag machines or runaway contraptions will be disabled by admins.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="shrink-0 mt-1">
                                <Hammer size={20} className="text-[#AAAAAA]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-1">Quarries & Mining</h4>
                                <p className="text-[#AAA] text-sm leading-relaxed">
                                    If using the <strong>Enchanted Miner</strong> or <strong>Create</strong> drills in the Overworld, you must cover your tracks or fill holes. Ideally, keep large-scale destruction to the Mining Dimension or deep underground.
                                </p>
                            </div>
                        </li>
                         <li className="flex gap-4">
                            <div className="shrink-0 mt-1">
                                <div className="w-5 h-5 bg-[#55FFFF] border border-[#fff] rotate-45"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-1">Flight Mechanics (Create: Icarus)</h4>
                                <p className="text-[#AAA] text-sm leading-relaxed">
                                    Do not use flight mechanics to bypass claim protections, spy on private bases, or harass players. Flight is for exploration and building, not for gaining an unfair advantage in consensual PvP.
                                </p>
                            </div>
                        </li>
                    </ul>
                </PixelCard>
            </div>

            {/* Join Whitelist Button */}
            <div className="mt-12 text-center">
                <PixelButton 
                    onClick={onJoinWhitelist}
                    className="min-w-[280px] transition-transform hover:-translate-y-1 flex items-center justify-center gap-3 !bg-[#00AA00] hover:!bg-[#00CC00] !border-[#003300] text-xl py-4"
                    style={{ boxShadow: 'inset 2px 2px 0 #00DD00, inset -2px -2px 0 #004400' }}
                >
                    <Users size={24} />
                    Join Whitelist
                </PixelButton>
                <p className="text-[#888] text-sm mt-4 font-pixel">Ready to start your adventure?</p>
            </div>
        </section>
    );
});

RulesSection.displayName = 'RulesSection';