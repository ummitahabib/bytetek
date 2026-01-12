"use client"
import { cn } from "@/lib/utils"

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "GraphQL", category: "API" },
  { name: "Redis", category: "Cache" },
  { name: "Git", category: "Tools" },
  { name: "Linux", category: "Systems" },
  { name: "Terraform", category: "DevOps" },
]

export function TechStackSection() {
  return (
    <section className="py-24 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{"// Tech Stack"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Master In-Demand <span className="text-primary text-glow">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn the technologies that top companies are using today.
          </p>
        </div>

        {/* Scrolling Tech Logos - Row 1 */}
        <div className="relative mb-8">
          <div className="flex animate-scroll">
            {[...technologies, ...technologies].map((tech, index) => (
              <TechCard key={`${tech.name}-${index}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Scrolling Tech Logos - Row 2 (Reverse) */}
        <div className="relative">
          <div className="flex animate-scroll-reverse">
            {[...technologies.slice().reverse(), ...technologies.slice().reverse()].map((tech, index) => (
              <TechCard key={`${tech.name}-rev-${index}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  )
}

function TechCard({ tech }: { tech: { name: string; category: string } }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 mx-4 p-6 rounded-xl",
        "bg-card border border-border",
        "hover:border-primary/50 hover:bg-card/80",
        "transition-all duration-300 cursor-pointer group",
        "min-w-[160px]",
      )}
    >
      <div className="text-center">
        <div className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{tech.name}</div>
        <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{tech.category}</div>
      </div>
    </div>
  )
}
