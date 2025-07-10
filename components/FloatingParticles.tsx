import { useEffect, useState } from "react";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
}

export default function FloatingParticles({ count = 20, color = "bg-green-400/60" }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${6 + Math.random() * 4}s`,
    }));
    setParticles(arr);
  }, [count]);

  return (
    <div className="particles">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 ${color} rounded-full animate-float`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
} 