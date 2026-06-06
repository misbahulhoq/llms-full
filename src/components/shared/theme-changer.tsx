"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          {theme === "system" && (
            <Monitor className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          )}

          {theme === "light" && (
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          )}

          {theme === "dark" && (
            <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          )}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {["light", "dark", "system"].map((value) => {
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={`capitalize ${theme === value && "bg-accent"}`}
            >
              {value === "light" && <Sun className="mr-2 h-4 w-4" />}
              {value === "dark" && <Moon className="mr-2 h-4 w-4" />}
              {value === "system" && <Monitor className="mr-2 h-4 w-4" />}
              {value}
              {theme === value && <Check />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
