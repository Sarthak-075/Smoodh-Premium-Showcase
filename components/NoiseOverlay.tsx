'use client';

export default function NoiseOverlay() {
  return (
    <>
      {/* Noise Texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
        }}
      />
      
      {/* Soft Vignette - Adjusted for stronger cinematic contrast */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 h-full w-full"
        style={{
          background: 'radial-gradient(circle at center, transparent 15%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.9) 100%)',
        }}
      />
    </>
  );
}
