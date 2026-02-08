import { memo, useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    life: number;
}

export const CherryBlossomCursor = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isMoving: false });
    const imageRef = useRef<HTMLImageElement | null>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const lastSpawnRef = useRef(0);
    const moveTimeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Pre-load image
        const img = new Image();
        img.src = '/assets/cherryblososm.png';
        img.onload = () => {
            imageRef.current = img;
        };

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.lastX = mouseRef.current.x;
            mouseRef.current.lastY = mouseRef.current.y;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.isMoving = true;

            // Clear previous timeout
            if (moveTimeoutRef.current) {
                clearTimeout(moveTimeoutRef.current);
            }

            // Set timeout to stop spawning after 100ms of no movement
            moveTimeoutRef.current = window.setTimeout(() => {
                mouseRef.current.isMoving = false;
            }, 100);

            // Spawn particles continuously while moving
            const now = performance.now();
            if (now - lastSpawnRef.current > 30) { // Spawn every 30ms
                if (particlesRef.current.length < 50) {
                    particlesRef.current.push({
                        x: e.clientX + (Math.random() - 0.5) * 5,
                        y: e.clientY + (Math.random() - 0.5) * 5,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: Math.random() * 1.5 + 0.5,
                        rotation: Math.random() * 360,
                        life: 120
                    });
                }
                lastSpawnRef.current = now;
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (imageRef.current) {
                particlesRef.current = particlesRef.current.filter(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vy += 0.08; // Gravity
                    particle.vx *= 0.98; // Air resistance
                    particle.rotation += 2;
                    particle.life--;

                    if (particle.life <= 0) return false;

                    const alpha = particle.life / 120;
                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.translate(particle.x, particle.y);
                    ctx.rotate((particle.rotation * Math.PI) / 180);
                    ctx.shadowColor = 'rgba(255, 105, 180, 0.8)';
                    ctx.shadowBlur = 8;
                    ctx.drawImage(imageRef.current, -12, -12, 24, 24);
                    ctx.restore();
                    return true;
                });
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current !== undefined) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (moveTimeoutRef.current) {
                clearTimeout(moveTimeoutRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            aria-hidden="true"
        />
    );
});

CherryBlossomCursor.displayName = 'CherryBlossomCursor';
