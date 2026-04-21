import { ref } from 'vue'

const THEME_STORAGE_KEY = 'freshmart-theme'
const isDark = ref(false)
const initialized = ref(false)

const applyTheme = (darkMode: boolean): void => {
  document.documentElement.classList.toggle('dark', darkMode)
}

const initializeTheme = (): void => {
  if (initialized.value) return

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  isDark.value = savedTheme ? savedTheme === 'dark' : false
  applyTheme(isDark.value)
  initialized.value = true
}

export const useTheme = () => {
  initializeTheme()

  const toggleTheme = (): void => {
    isDark.value = !isDark.value
    localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
  }

  return {
    isDark,
    toggleTheme,
  }
}