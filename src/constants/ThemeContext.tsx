import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const theme = useColorScheme(); // Detecta se o usuário usa tema claro ou escuro

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}