import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "theme-light" | "dark" | "system";
type ThemeAction = () => void;

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<Theme>();
  const themeActionMap: Record<Theme, [string, ThemeAction]> = {
    "theme-light": ["Light", () => setThemeState("theme-light")],
    dark: ["Dark", () => setThemeState("dark")],
    system: ["System", () => setThemeState("system")],
  };

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant={"outline"} size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(themeActionMap).map(
          ([themeKey, [themeName, action]]) => {
            return (
              <DropdownMenuItem
                key={`${themeKey}-toggle-btn`}
                className="cursor-pointer"
                onClick={action}
              >
                {themeName}
              </DropdownMenuItem>
            );
          }
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
