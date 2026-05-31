import { useEffect, useState } from "react"

type Theme = "latte" | "mocha"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "latte",
  )

  useEffect(() => {
    document.documentElement.classList.toggle("mocha", theme === "mocha")
    localStorage.setItem("theme", theme)
  }, [theme])

  return { theme, setTheme: setThemeState }
}
