"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, User } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chat", href: "/chat" },
    { name: "Tasks", href: "/tasks" },
    { name: "Notes", href: "/notes" },
    { name: "About", href: "/about" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
          <span className="text-primary">LearnLoop</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground",
              )}
              prefetch={false}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <>
              {pathname !== "/login" && (
                <Button asChild variant="ghost" className="hidden md:inline-flex">
                  <Link href="/login">Login</Link>
                </Button>
              )}
              {pathname !== "/signup" && (
                <Button asChild className="hidden md:inline-flex">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
