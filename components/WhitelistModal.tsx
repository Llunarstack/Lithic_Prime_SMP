import { memo, useState } from 'react';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';
import { X, Check, ShieldAlert, ArrowRight, Loader2, ScrollText, Server, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface WhitelistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ModalStep = 'tos' | 'form' | 'processing' | 'success' | 'fail';

export const WhitelistModal = memo<WhitelistModalProps>(({ isOpen, onClose }) => {
    const [step, setStep] = useState<ModalStep>('tos');
    const [agreed, setAgreed] = useState(false);
    
    // Form State
    const [username, setUsername] = useState('');
    const [whyJoin, setWhyJoin] = useState('');
    const [scenario, setScenario] = useState('');
    
    // Result State
    const [failReason, setFailReason] = useState('');

    if (!isOpen) return null;

    const resetState = () => {
        setStep('tos');
        setAgreed(false);
        setUsername('');
        setWhyJoin('');
        setScenario('');
        setFailReason('');
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const submitApplication = async () => {
        setStep('processing');
        
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
            if (!apiKey) {
                setFailReason("Server configuration error: missing API key.");
                setStep('fail');
                return;
            }

            const ai = new GoogleGenerativeAI(apiKey);
            const model = ai.getGenerativeModel({ 
                model: 'gemini-1.5-flash',
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: SchemaType.OBJECT,
                        properties: {
                            approved: { type: SchemaType.BOOLEAN },
                            reason: { type: SchemaType.STRING, description: "Short explanation for the user." }
                        }
                    }
                }
            });
            
            const prompt = `
                Evaluate this Minecraft Server Whitelist Application.
                
                The Server: "Lithic Prime SMP"
                Style: Vanilla+, Chill, Building, Technical.
                Rules: No griefing, No stealing, PvP only with consent, Be respectful, No low-effort apps.

                Applicant Username: ${username}
                
                Question 1: Why do you want to join?
                Answer: "${whyJoin}"

                Question 2: You find an unlocked chest with diamonds in a random base. What do you do?
                Answer: "${scenario}"

                Task: Determine if this player should be allowed to join.
                Criteria:
                1. REJECT if the answers imply they will steal or grief.
                2. REJECT if the answers are one word or extremely low effort (e.g. "idk", "fun").
                3. REJECT if they seem rude or like a troll.
                4. APPROVE if they seem like a normal, respectful player.

                Return JSON only.
            `;

            const response = await model.generateContent(prompt);

            const text = response.response.text();
            if (text) {
                const result = JSON.parse(text);
                if (result.approved) {
                    setStep('success');
                } else {
                    setFailReason(result.reason || "Application did not meet our quality standards.");
                    setStep('fail');
                }
            } else {
                setFailReason("AI Validation Failed. Please try again.");
                setStep('fail');
            }

        } catch (error) {
            console.error("AI Error", error);
            setFailReason("System error during verification. Please try again later.");
            setStep('fail');
        }
    };

    // --- RENDERERS FOR EACH STEP ---

    const renderTOS = () => (
        <>
            <div className="flex justify-between items-start mb-6 border-b-2 border-[#333] pb-4">
                <div className="flex items-center gap-3">
                    <ShieldAlert className="text-[#55FF55]" size={32} />
                    <div>
                        <h2 className="font-pixel text-3xl text-white leading-none drop-shadow-[2px_2px_0_#000]">Whitelist Application</h2>
                        <p className="text-[#AAA] text-sm uppercase tracking-wider font-bold mt-1">Step 1: Terms of Service</p>
                    </div>
                </div>
                <button onClick={handleClose} className="text-[#555] hover:text-[#FF5555] transition-colors">
                    <X size={28} />
                </button>
            </div>

            <div className="bg-[#121212] border-2 border-[#000] p-6 h-80 overflow-y-auto mb-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                 <div className="space-y-6 text-[#ccc] leading-relaxed">
                    <div>
                        <h4 className="font-pixel text-xl text-[#55FF55] mb-1">1. Respect & Conduct</h4>
                        <p className="text-sm">Be kind, helpful, and inclusive. Harassment, hate speech, or discrimination will result in an immediate ban. We are a chill community.</p>
                    </div>
                    <div>
                        <h4 className="font-pixel text-xl text-[#55FF55] mb-1">2. Griefing & Stealing</h4>
                        <p className="text-sm">Respect other players' builds and items. Pranks are allowed only if harmless and consensual. Do not destroy what isn't yours.</p>
                    </div>
                    <div>
                        <h4 className="font-pixel text-xl text-[#55FF55] mb-1">3. Cheating & Exploits</h4>
                        <p className="text-sm">Use of hacked clients, x-ray, or intentional server-crashing exploits is strictly prohibited. Client-side performance mods are allowed.</p>
                    </div>
                     <div>
                        <h4 className="font-pixel text-xl text-[#55FF55] mb-1">4. PvP & Combat</h4>
                        <p className="text-sm">PvP is strictly consensual. Do not attack players who have not agreed to fight.</p>
                    </div>
                    <div>
                        <h4 className="font-pixel text-xl text-[#55FF55] mb-1">5. Technical Rules</h4>
                        <p className="text-sm">Limit lag-inducing machines. Cover open quarry holes in the Overworld. Use chunk loaders responsibly.</p>
                    </div>
                    <p className="text-[#777] text-xs italic border-t border-[#333] pt-4 mt-4">
                        By proceeding, you acknowledge that you are entering a private server and that admins have the final say in all disputes.
                    </p>
                </div>
            </div>

            <div 
                className="flex items-center gap-4 mb-8 bg-[#181818] p-4 border-2 border-[#333] cursor-pointer hover:border-[#777] hover:bg-[#1f1f1f] transition-all group" 
                onClick={() => setAgreed(!agreed)}
            >
                <div className={`w-8 h-8 border-4 flex items-center justify-center transition-colors shadow-inner ${agreed ? 'bg-[#55FF55] border-[#55FF55]' : 'border-[#444] bg-[#000] group-hover:border-[#666]'}`}>
                    {agreed && <Check size={20} className="text-black" strokeWidth={4} />}
                </div>
                <div>
                     <span className={`font-pixel text-xl select-none transition-colors ${agreed ? 'text-white' : 'text-[#888]'}`}>
                        I Accept the Rules
                    </span>
                    <p className="text-xs text-[#555] font-mono">Click to confirm</p>
                </div>
            </div>

            <div className="flex gap-4 justify-end items-center">
                 <button onClick={handleClose} className="font-pixel text-xl text-[#777] hover:text-white hover:underline px-4">Cancel</button>
                <PixelButton 
                    variant="primary" 
                    className={`min-w-[200px] flex items-center justify-center gap-2 transition-all ${!agreed ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105'}`}
                    disabled={!agreed}
                    onClick={() => setStep('form')}
                >
                    <span>Next Step</span>
                    <ArrowRight size={20} />
                </PixelButton>
            </div>
        </>
    );

    const renderForm = () => (
        <>
            <div className="flex justify-between items-start mb-6 border-b-2 border-[#333] pb-4">
                <div className="flex items-center gap-3">
                    <ScrollText className="text-[#55FFFF]" size={32} />
                    <div>
                        <h2 className="font-pixel text-3xl text-white leading-none drop-shadow-[2px_2px_0_#000]">Applicant Form</h2>
                        <p className="text-[#AAA] text-sm uppercase tracking-wider font-bold mt-1">Step 2: Tell us about yourself</p>
                    </div>
                </div>
                <button onClick={handleClose} className="text-[#555] hover:text-[#FF5555] transition-colors">
                    <X size={28} />
                </button>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-[#ccc] font-pixel text-lg mb-2">Minecraft Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#111] border-2 border-[#555] text-white px-4 py-3 focus:outline-none focus:border-[#55FFFF] font-mono shadow-inner"
                        placeholder="Notch"
                    />
                </div>

                <div>
                    <label className="block text-[#ccc] font-pixel text-lg mb-2">Why do you want to join Lithic Prime?</label>
                    <textarea 
                        value={whyJoin}
                        onChange={(e) => setWhyJoin(e.target.value)}
                        className="w-full h-24 bg-[#111] border-2 border-[#555] text-white px-4 py-3 focus:outline-none focus:border-[#55FFFF] font-sans text-sm leading-relaxed shadow-inner resize-none"
                        placeholder="I'm looking for a chill building community..."
                    />
                </div>

                <div>
                    <label className="block text-[#ccc] font-pixel text-lg mb-2">Scenario: You find a player's base completely unprotected with chests unlocked. What do you do?</label>
                    <textarea 
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                        className="w-full h-24 bg-[#111] border-2 border-[#555] text-white px-4 py-3 focus:outline-none focus:border-[#55FFFF] font-sans text-sm leading-relaxed shadow-inner resize-none"
                        placeholder="I would..."
                    />
                </div>
            </div>

            <div className="flex gap-4 justify-end items-center">
                 <button onClick={() => setStep('tos')} className="font-pixel text-xl text-[#777] hover:text-white hover:underline px-4">Back</button>
                <PixelButton 
                    variant="primary" 
                    className={`min-w-[200px] flex items-center justify-center gap-2 transition-all ${(!username || !whyJoin || !scenario) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={!username || !whyJoin || !scenario}
                    onClick={submitApplication}
                >
                    <span>Submit Application</span>
                    <Check size={20} />
                </PixelButton>
            </div>
        </>
    );

    const renderProcessing = () => (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader2 size={64} className="text-[#55FFFF] animate-spin mb-6" />
            <h3 className="font-pixel text-3xl text-white mb-2">Reviewing Application...</h3>
            <p className="text-[#888]">Consulting the server spirits.</p>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003300] border-4 border-[#55FF55] mb-6 shadow-[0_0_30px_#55FF55]">
                <Check size={40} className="text-[#55FF55]" strokeWidth={4} />
            </div>
            
            <h2 className="font-pixel text-4xl text-[#55FF55] mb-2 drop-shadow-[2px_2px_0_#000]">Access Granted!</h2>
            <p className="text-[#ccc] mb-8 max-w-md mx-auto">Welcome to Lithic Prime, <span className="text-white font-bold">{username}</span>. We are excited to have you.</p>

            <div className="bg-[#121212] border-2 border-[#555] p-6 max-w-md mx-auto mb-8 relative group">
                <p className="text-[#888] text-sm uppercase tracking-widest font-bold mb-2">Server Address</p>
                <div className="flex items-center justify-center gap-2">
                    <Server size={20} className="text-[#55FFFF]" />
                    <span className="font-pixel text-2xl text-white tracking-wide select-all">play.lithicprime.com</span>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#55FFFF] text-black text-[10px] font-bold uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Copy
                </div>
            </div>

            <PixelButton onClick={handleClose} className="min-w-[200px]">
                Close
            </PixelButton>
        </div>
    );

    const renderFail = () => (
        <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#330000] border-4 border-[#FF5555] mb-6 shadow-[0_0_30px_#FF5555]">
                <X size={40} className="text-[#FF5555]" strokeWidth={4} />
            </div>
            
            <h2 className="font-pixel text-4xl text-[#FF5555] mb-2 drop-shadow-[2px_2px_0_#000]">Application Denied</h2>
            <p className="text-[#ccc] mb-6">Our automated system has flagged your application.</p>

            <div className="bg-[#2a0000] border border-[#550000] p-4 max-w-md mx-auto mb-8 text-left flex gap-3 items-start">
                <AlertCircle className="shrink-0 text-[#FF5555] mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-[#FF5555] mb-1">Reason:</h4>
                    <p className="text-[#ffcccc] text-sm leading-snug">{failReason}</p>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button onClick={() => setStep('form')} className="font-pixel text-xl text-[#777] hover:text-white hover:underline px-4">Edit & Retry</button>
                <PixelButton onClick={handleClose} variant="danger" className="min-w-[150px]">
                    Close
                </PixelButton>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={step === 'processing' ? undefined : handleClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-2xl transform transition-all scale-100">
                <PixelCard className="border-4 border-black shadow-[0_0_50px_rgba(0,0,0,0.8)] !bg-[#202020]">
                    {step === 'tos' && renderTOS()}
                    {step === 'form' && renderForm()}
                    {step === 'processing' && renderProcessing()}
                    {step === 'success' && renderSuccess()}
                    {step === 'fail' && renderFail()}
                </PixelCard>
            </div>
        </div>
    );
});

WhitelistModal.displayName = 'WhitelistModal';
