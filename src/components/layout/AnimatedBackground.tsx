import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

type Star = {
  x: number;
  y: number;
  phase: number;
  speed: number;
  baseOpacity: number;
};

type Scene = {
  width: number;
  height: number;
  particles: Particle[];
  stars: Star[];
};

const MOBILE_BREAKPOINT = 768;
const DESKTOP_PARTICLES = 24;
const MOBILE_PARTICLES = 14;
const DESKTOP_STARS = 24;
const MOBILE_STARS = 14;
const MAX_LINK_DISTANCE = 180;

const createParticles = (count: number, width: number, height: number): Particle[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    size: Math.random() * 1.4 + 0.8,
  }));
};

const createStars = (count: number, width: number, height: number): Star[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.9 + 0.3,
    baseOpacity: Math.random() * 0.35 + 0.15,
  }));
};

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene>({
    width: 0,
    height: 0,
    particles: [],
    stars: [],
  });
  const [isVisible, setIsVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !isVisible || typeof window === 'undefined') return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let lastFrame = performance.now();

    // Rebuild scene on resize to keep particle density proportional.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < MOBILE_BREAKPOINT;
      const particleCount = isMobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
      const starCount = isMobile ? MOBILE_STARS : DESKTOP_STARS;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sceneRef.current = {
        width,
        height,
        particles: createParticles(particleCount, width, height),
        stars: createStars(starCount, width, height),
      };
    };

    const draw = (timestamp: number) => {
      const delta = Math.min((timestamp - lastFrame) / 16.67, 2);
      lastFrame = timestamp;

      const scene = sceneRef.current;
      const maxDistanceSq = MAX_LINK_DISTANCE * MAX_LINK_DISTANCE;

      ctx.clearRect(0, 0, scene.width, scene.height);

      // Draw network lines and update particle positions in one pass.
      for (let i = 0; i < scene.particles.length; i += 1) {
        const particle = scene.particles[i];
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x < 0) particle.x += scene.width;
        if (particle.y < 0) particle.y += scene.height;
        if (particle.x > scene.width) particle.x -= scene.width;
        if (particle.y > scene.height) particle.y -= scene.height;

        for (let j = i + 1; j < scene.particles.length; j += 1) {
          const other = scene.particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const opacity = (1 - Math.sqrt(distSq) / MAX_LINK_DISTANCE) * 0.2;
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      for (const particle of scene.particles) {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars are cheap twinkles and stay independent of particle links.
      for (const star of scene.stars) {
        const twinkle = (Math.sin(timestamp * 0.001 * star.speed + star.phase) + 1) / 2;
        const opacity = star.baseOpacity + twinkle * 0.15;
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fillRect(star.x, star.y, 1.5, 1.5);
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(rafId);
    };
  }, [isVisible, reduceMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-[#0A0A0A] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,10,10,0.94), rgba(239, 68, 68, 0.12)), radial-gradient(circle at top right, rgba(234, 88, 12, 0.2), transparent 50%)',
          backgroundBlendMode: 'multiply',
        }}
      />
      {!reduceMotion && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />}
    </div>
  );
};

export default AnimatedBackground;
