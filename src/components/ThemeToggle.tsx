import { Box, Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useThemeMode, BASE_VARIANTS, NAMED_VARIANTS, type ThemeVariant } from "../ThemeContext.js";

const THEME_SWATCHES: Record<ThemeVariant, { bg: string; accent: string }> = {
  light: { bg: "#ffffff", accent: "#464e53" },
  dark: { bg: "#1f2536", accent: "#83cfff" },
  "atlas-corporate": { bg: "#f8f9fb", accent: "#0040d5" },
  horizon: { bg: "#ffffff", accent: "#d3222a" },
  midnight: { bg: "#070d1c", accent: "#1a8fff" },
  obsidian: { bg: "#100e0b", accent: "#c07830" },
};

function Swatch({ id }: { id: ThemeVariant }) {
  const s = THEME_SWATCHES[id];
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${s.accent} 50%, ${s.bg} 50%)`,
        border: "1px solid",
        borderColor: "divider",
        flexShrink: 0,
      }}
    />
  );
}

export default function ThemeToggle() {
  const { themeVariant, setThemeVariant } = useThemeMode();

  const handleChange = (_: React.MouseEvent, value: ThemeVariant | null) => {
    if (value) setThemeVariant(value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
      <Typography variant="caption" sx={({ tokens }) => ({ color: tokens.semantic.color.type.muted.value, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" })}>
        Theme
      </Typography>
      <ToggleButtonGroup value={themeVariant} exclusive onChange={handleChange} size="small" aria-label="Base mode">
        {BASE_VARIANTS.map((t) => (
          <ToggleButton key={t.id} value={t.id} aria-label={t.label}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><Swatch id={t.id} />{t.label}</Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Divider orientation="vertical" flexItem />
      <ToggleButtonGroup value={themeVariant} exclusive onChange={handleChange} size="small" aria-label="Visual theme">
        {NAMED_VARIANTS.map((t) => (
          <ToggleButton key={t.id} value={t.id} aria-label={t.label}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><Swatch id={t.id} />{t.label}</Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}