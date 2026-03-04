import { ref } from "vue"

const isDark = ref(false)

export function useDarkMode() {
  const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle("dark")
  }

  return { isDark, toggleDark }
}