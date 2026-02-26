import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Footer style variants, similar in style to buttonVariants from button.tsx
const footerVariants = cva(
  "border-t border-border w-full", // base styles
  {
    variants: {
      variant: {
        default: "bg-muted/10",
        dark: "bg-background text-muted-foreground border-border",
        accent: "bg-brand-accent/10 text-brand-accent border-brand-accent",
      },
      padding: {
        default: "mt-12",
        none: "",
        sm: "mt-4",
        lg: "mt-20",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {}

export function Footer({
  className,
  variant,
  padding,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(footerVariants({ variant, padding, className }))}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4 items-center sm:flex-row sm:justify-between sm:items-center font-mono text-xs text-muted-foreground">
        <span className="block text-center sm:text-left">
          <span className="text-brand-accent font-semibold">
            © {new Date().getFullYear()} DevFlare.{" "}
          </span>
          Not affiliated with Mojang or Microsoft.
        </span>
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <Button asChild variant="link" size="sm" className="px-2 text-xs">
                <Link href="/legal">Legal Notice</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="link" size="sm" className="px-2 text-xs">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="link" size="sm" className="px-2 text-xs">
                <Link href="/terms">Terms of Use</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="link" size="sm" className="px-2 text-xs">
                <Link href="/tos">Terms of Service</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
