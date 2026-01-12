"use client"

import { useEffect, useState } from "react"

interface ByteParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  char: string
}

export function FloatingBytes() {
  const [particles, setParticles] = useState<ByteParticle[]>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: ByteParticle[] = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 20 + 10,
          char: Math.random() > 0.5 ? "0" : "1",
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute font-mono text-primary animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  )
}
