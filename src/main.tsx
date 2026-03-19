import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { AtlasThemeProvider } from "@diligentcorp/atlas-react-bundle";
import App from "./App";
import { ThemeProvider, useThemeMode, getBaseTokenMode } from "./ThemeContext.js";

function ThemedApp() {
  const { themeVariant } = useThemeMode();
  const tokenMode = getBaseTokenMode(themeVariant);
  return (
    <AtlasThemeProvider tokenMode={tokenMode}>
      <App />
    </AtlasThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);