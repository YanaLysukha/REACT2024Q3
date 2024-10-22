import { createContext, ReactNode, useState } from 'react';

type ThemeContextType = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
