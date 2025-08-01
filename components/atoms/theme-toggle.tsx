"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:bg-primary/20 relative overflow-hidden group"
      aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      suppressHydrationWarning
    >
      {mounted ? (
        <div className="relative w-4 h-4">
          <Sun
            className={`absolute h-4 w-4 transition-all duration-500 ${
              theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <Moon
            className={`absolute h-4 w-4 transition-all duration-500 ${
              theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
            }`}
          />
        </div>
      ) : (
        <div className="relative w-4 h-4">
          <Sun className="absolute h-4 w-4" />
        </div>
      )}
      <span className="sr-only" suppressHydrationWarning>
        {mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      </span>
      <span className="absolute inset-0 rounded-full bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
    </Button>
  )
}