import { Hero } from './components/Hero';
import { ModList } from './components/ModList';
import { RulesSection } from './components/RulesSection';
import { CherryBlossomCursor } from './components/CherryBlossomCursor';

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Pixel Art Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundColor: '#1a1a2e',
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .02) 25%, rgba(255, 255, 255, .02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .02) 75%, rgba(255, 255, 255, .02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .02) 25%, rgba(255, 255, 255, .02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .02) 75%, rgba(255, 255, 255, .02) 76%, transparent 77%, transparent),
          linear-gradient(0deg, transparent 0%, rgba(0, 0, 0, .3) 100%),
          repeating-linear-gradient(45deg, #16213e 0px, #16213e 10px, #1a1a2e 10px, #1a1a2e 20px),
          repeating-linear-gradient(-45deg, #0f3460 0px, #0f3460 10px, #16213e 10px, #16213e 20px)
        `,
        backgroundSize: '50px 50px, 50px 50px, 100% 100%, 40px 40px, 40px 40px',
        imageRendering: 'pixelated'
      }}></div>

      {/* Animated stars/particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-30 pixelated"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
              boxShadow: '0 0 2px rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <CherryBlossomCursor />
        <Hero />
        
        {/* Texture Divider */}
        <div className="h-6 w-full bg-[#1a1a1a] border-y-[4px] border-black relative z-30">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACZJREFUGFcdiUEBAAAgDML3L52Cg4fKImG4H4bC7W402t2OQj/8ABWfA/kC2w0yAAAAAElFTkSuQmCC')]"></div>
        </div>

        <main className="relative shadow-[inset_0_10px_50px_rgba(0,0,0,0.5)]">
          <ModList />
          
          {/* Divider between Mods and Rules */}
          <div className="h-2 w-full bg-[#111] my-8 opacity-50"></div>
          
          <RulesSection />
        </main>

        <footer className="bg-[#0a0a0a] text-stone-500 py-16 text-center border-t-[4px] border-[#333] relative z-30 overflow-hidden">
          {/* Minecraft grass block pattern at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#55FF55] via-[#33CC33] to-[#55FF55] opacity-30"></div>
          
          <div className="max-w-4xl mx-auto px-4 relative">
              <h3 className="font-pixel text-3xl text-[#555] mb-6 tracking-widest uppercase">Lithic Prime SMP</h3>
              <p className="mb-8 text-sm opacity-60">Not affiliated with Mojang Studios.</p>
              <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest">
                  <a href="#" className="hover:text-[#55FF55] transition-colors hover:underline">Discord</a>
                  <a href="#rules" className="hover:text-[#55FF55] transition-colors hover:underline">Rules</a>
                  <a href="#" className="hover:text-[#55FF55] transition-colors hover:underline">Dynmap</a>
              </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
