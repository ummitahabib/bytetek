// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import Image from "next/image"

// export function Header() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const navLinks = [
//     { href: "#services", label: "Services" },
//     { href: "#programs", label: "Programs" },
//     { href: "#bootcamp", label: "Bootcamp" },
//     { href: "#pricing", label: "Pricing" },
//   ]

//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent",
//       )}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           <a href="#" className="flex items-center gap-2 group">
//             <Image src="/bytetek-logo.svg" alt="byteTek Logo" width={40} height={40} className="h-10 w-auto" />
//           </a>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
//               >
//                 {link.label}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
//               </a>
//             ))}
//           </nav>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
//               Log in
//             </Button>
//             <Button className="bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow">
//               Start Free Trial
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground">
//             <div className="relative w-6 h-6">
//               <Menu
//                 className={cn(
//                   "absolute inset-0 transition-all duration-300",
//                   isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
//                 )}
//               />
//               <X
//                 className={cn(
//                   "absolute inset-0 transition-all duration-300",
//                   isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
//                 )}
//               />
//             </div>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={cn(
//             "md:hidden overflow-hidden transition-all duration-300",
//             isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0",
//           )}
//         >
//           <nav className="flex flex-col gap-4 pt-4">
//             {navLinks.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="text-muted-foreground hover:text-primary transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.label}
//               </a>
//             ))}
//             <div className="flex flex-col gap-2 pt-4 border-t border-border">
//               <Button variant="ghost" className="justify-start">
//                 Log in
//               </Button>
//               <Button className="bg-primary text-primary-foreground">Start Free Trial</Button>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#programs", label: "Programs" },
    { href: "#bootcamp", label: "Bootcamp" },
    { href: "#pricing", label: "Pricing" },
    { href: "/register", label: "Register" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <Image src="/bytetek-logo.png" alt="byteTek Logo" width={40} height={40} className="h-10 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Log in
            </Button>
            <a href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow">
                Start Free Trial
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground">
            <div className="relative w-6 h-6">
              <Menu
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0",
          )}
        >
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="justify-start">
                Log in
              </Button>
              <a href="/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">Start Free Trial</Button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
