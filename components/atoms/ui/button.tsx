import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground transform hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline transform hover:scale-[1.02] active:scale-[0.98]",
        gradient: "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl active:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        info: "bg-info text-info-foreground hover:bg-info/90 shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-primary/25",
        elevated: "bg-surface-elevated text-foreground border border-border/50 hover:bg-accent hover:text-accent-foreground shadow-md hover:shadow-lg active:shadow-md transform hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded-sm",
        sm: "h-9 px-3 text-sm rounded-md",
        default: "h-10 px-4 py-2 text-sm rounded-md",
        lg: "h-11 px-8 text-base rounded-md",
        xl: "h-12 px-10 text-lg rounded-lg",
        icon: "h-10 w-10 rounded-md",
        "icon-sm": "h-8 w-8 rounded-sm",
        "icon-lg": "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: LucideIcon
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon: Icon, iconPosition = "left", children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
