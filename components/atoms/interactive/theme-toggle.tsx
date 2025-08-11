"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/atoms"
import { Moon, Sun } from "lucide-react"

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
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
      aria-label={mounted && resolvedTheme ? (resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      suppressHydrationWarning
    >
      {mounted && resolvedTheme ? (
        <div className="relative w-4 h-4">
          <Sun
            className={`absolute h-4 w-4 transition-all duration-300 ${
              resolvedTheme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
            }`}
          />
          <Moon
            className={`absolute h-4 w-4 transition-all duration-300 ${
              resolvedTheme === "dark" ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
            }`}
          />
        </div>
      ) : (
        <div className="relative w-4 h-4">
          <div className="absolute h-4 w-4 animate-pulse bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      )}
      <span className="sr-only" suppressHydrationWarning>
        {mounted && resolvedTheme ? (resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      </span>
      <span className="absolute inset-0 rounded-full bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
    </Button>
  )
}