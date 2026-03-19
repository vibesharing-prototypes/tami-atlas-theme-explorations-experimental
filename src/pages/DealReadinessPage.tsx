import { useState, useCallback } from "react";
import {
  Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Chip,
  LinearProgress, Stack, Tab, Table, TableBody, TableCell, TableHead,
  TableRow, Tabs, Typography, useTheme,
} from "@mui/material";
import { Card as AtlasCard, PageHeader, OverflowBreadcrumbs, AIChatBox, AIChatContextProvider } from "@diligentcorp/atlas-react-bundle";
import { NavLink } from "react-router";
import AiSparkleIcon from "@diligentcorp/atlas-react-bundle/icons/AiSparkle";
import PageLayout from "../components/PageLayout.js";

const PHASES = [
  { id: 1, label: "1. Cold Start" }, { id: 2, label: "2. Readiness" },
  { id: 3, label: "3. Remediation" }, { id: 4, label: "4. Fork" },
  { id: 5, label: "5. Decision Hub" }, { id: 6, label: "6. Close" },
] as const;

export default function DealReadinessPage() {
  const theme = useTheme();
  const { presets } = theme;
  const [phase, setPhase] = useState(1);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanDone, setScanDone] = useState(false);
  const [scorecardVisible, setScorecardVisible] = useState(false);
  const [texasApproved, setTexasApproved] = useState(false);
  const [syncDemoVisible, setSyncDemoVisible] = useState(false);
  const [maTasksVisible, setMaTasksVisible] = useState(false);
  const [expandedDecisions, setExpandedDecisions] = useState<Record<string, boolean>>({});

  const showPhase = useCallback((n: number) => setPhase(n), []);

  const runScan = useCallback(() => {
    if (scanDone) { setScorecardVisible(true); return; }
    setScanDone(true);
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + 2, 100);
      setScanProgress(p);
      if (p === 100) { clearInterval(iv); setTimeout(() => setScorecardVisible(true), 600); }
    }, 40);
  }, [scanDone]);

  const toggleDecision = useCallback((id: string) => {
    setExpandedDecisions((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const phaseTitles: Record<number, { title: string; subtitle: string }> = {
    1: { title: "Ready to assess your transaction readiness, Elena?", subtitle: "Board Resolution #2026-003 was approved last night. I’ve pulled everything together — here’s what I know and how to get started." },
    2: { title: scorecardVisible ? "Here’s where Meridian Labs stands, Elena." : "Running your assessment now, Elena.", subtitle: scorecardVisible ? "You’re 13 points above the Series C median. Three critical issues need your attention before you can go to market." : "6 specialist agents are scanning in parallel. This takes about 2 minutes — no input needed from you yet." },
    3: { title: "Three things need your sign-off today, Elena.", subtitle: "I’ve generated a 58-task remediation plan. Start with the critical items — one of them takes 30 minutes and unblocks everything else." },
    4: { title: "You’re now running dual-track, Elena.", subtitle: "M&A and IPO lenses are both active — synced from one truth layer. 41 tasks apply to both paths, so this isn’t double the work." },
    5: { title: "Four decisions are waiting for you, Elena.", subtitle: "I’ve assembled everything you need to make each call. I don’t decide — I arm you with the context so you can." },
    6: { title: "You’re in the final 30 days, Elena.", subtitle: "Meridian Labs × Titan Corp · Target close March 26, 2026. Certificates, consents, funds flow — I’m tracking all of it." },
  };

  const { title, subtitle } = phaseTitles[phase] ?? phaseTitles[1];

  return (
    <PageLayout>
      <PageHeader
        pageTitle={title}
        pageSubtitle={subtitle}
        breadcrumbs={
          <OverflowBreadcrumbs leadingElement={<span>Deal Readiness</span>} items={[{ id: "deal-readiness", label: "Deal readiness", url: "/deal-readiness" }]} hideLastItem aria-label="Breadcrumbs">
            {({ label, url }) => <NavLink to={url}>{label}</NavLink>}
          </OverflowBreadcrumbs>
        }
      />
      <Tabs value={phase - 1} onChange={(_, v) => setPhase((v as number) + 1)} aria-label="Deal readiness phases" {...(presets?.TabsPresets?.Tabs?.alignToPageHeader ?? {})}>
        {PHASES.map((p, i) => <Tab key={p.id} label={p.label} id={`phase-tab-${i}`} aria-controls={`phase-panel-${i}`} />)}
      </Tabs>

      <Stack gap={3} sx={{ pt: 2 }}>
        {phase === 1 && (
          <>
            <AtlasCard color="ai-start" sx={{ background: (t) => `linear-gradient(160deg, ${t.palette.primary.dark}22 0%, ${t.palette.background.paper} 60%)`, border: 1, borderColor: "primary.main" }}>
              <CardHeader
                avatar={<Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: "primary.dark", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}><AiSparkleIcon /></Box>}
                title={<Stack direction="row" alignItems="center" gap={1} flexWrap="wrap"><Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.5} color="primary.main">Diligent Agent</Typography><Chip label="New insight" color="primary" size="small" /><Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>Just now · from Diligent Boards</Typography></Stack>}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" paragraph>Last night, the Board unanimously approved <strong style={{ color: theme.palette.primary.main }}>Resolution #2026-003</strong> — authorizing exploration of strategic alternatives.</Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, mb: 2 }}>
                  {[
                    { label: "Governance data", value: "14 months on Diligent One", sub: "Board resolutions, entity records, compliance calendars — all indexed" },
                    { label: "Entity coverage", value: "15 legal entities · 6 jurisdictions", sub: "Including Meridian UK Ltd and Alpha Tech Texas LLC — already flagged" },
                    { label: "Documents indexed", value: "312 documents across connected systems", sub: "SharePoint, Diligent Boards, Entities, NetSuite, Carta" },
                    { label: "What I’ll benchmark against", value: "M&A + IPO frameworks simultaneously", sub: "6 specialist agents will run in parallel — results in under 2 minutes" },
                  ].map((item) => (
                    <Card key={item.label} variant="outlined" sx={{ p: 1.5 }}>
                      <Typography variant="caption" color="text.disabled" textTransform="uppercase">{item.label}</Typography>
                      <Typography variant="body1" fontWeight={600}>{item.value}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                    </Card>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: "divider", bgcolor: "action.hover" }}>
                <Button variant="contained" color="primary" onClick={() => { showPhase(2); runScan(); }}>Run Readiness Assessment →</Button>
                <Button variant="outlined">View Entity Health First</Button>
              </CardActions>
            </AtlasCard>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>Direct your autonomous AI workforce.</Typography>
                <AIChatContextProvider>
                  <AIChatBox onSubmit={(p) => { if (p?.trim()) { showPhase(2); runScan(); } }} slotProps={{ textField: { placeholder: "Ask a question or describe what you need...", label: "Chat with AI" } }} />
                </AIChatContextProvider>
              </CardContent>
            </Card>
          </>
        )}

        {phase === 2 && (
          !scorecardVisible ? (
            <Card variant="outlined">
              <CardHeader title="Agent coordination — live" subheader="Estimated time: ~45 seconds" />
              <CardContent sx={{ pt: 0 }}>
                {[
                  { id: "ag1", name: "Entity Compliance Agent", source: "Diligent Entities · 15 entities, 6 jurisdictions", status: scanProgress >= 15 ? "done" : "scanning" },
                  { id: "ag2", name: "Corporate Records Agent", source: "Diligent Boards · 47 board actions", status: scanProgress >= 30 ? "done" : scanProgress >= 15 ? "scanning" : "queued" },
                  { id: "ag3", name: "Financial Health Agent", source: "NetSuite · GL sync", status: scanProgress >= 45 ? "done" : scanProgress >= 30 ? "scanning" : "queued" },
                  { id: "ag4", name: "Cap Table Agent", source: "Carta · last sync: Feb 20", status: scanProgress >= 60 ? "done" : scanProgress >= 45 ? "scanning" : "queued" },
                  { id: "ag5", name: "IP & Contracts Agent", source: "SharePoint · 312 documents", status: scanProgress >= 80 ? "done" : scanProgress >= 60 ? "scanning" : "queued" },
                  { id: "ag6", name: "Regulatory & Tax Agent", source: "Diligent Compliance", status: scanProgress >= 95 ? "done" : scanProgress >= 80 ? "scanning" : "queued" },
                ].map((row) => (
                  <Stack key={row.id} direction="row" alignItems="center" gap={1.5} py={1.25} px={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Stack flex={1}>
                      <Typography variant="body1" fontWeight={600}>{row.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.source}</Typography>
                    </Stack>
                    <Typography variant="caption" color={row.status === "scanning" ? "primary" : row.status === "done" ? "success.main" : "text.disabled"}>
                      {row.status === "scanning" ? "⟳ Scanning" : row.status === "done" ? "✅ Done" : "Queued"}
                    </Typography>
                  </Stack>
                ))}
              </CardContent>
              <CardContent sx={{ borderTop: 1, borderColor: "divider" }}>
                <LinearProgress variant="determinate" value={scanProgress} sx={{ height: 10, borderRadius: 1 }} />
              </CardContent>
            </Card>
          ) : (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
                    <Chip size="small" color="error" label="🔴 3 Critical" />
                    <Chip size="small" color="warning" label="⚠️ 14 Attention" />
                    <Chip size="small" color="success" label="✅ 41 Deal-ready" />
                  </Stack>
                  <Alert severity="info" icon={false}>
                    <Typography variant="body1">Median Series C: <strong>55%</strong>. You’re <strong>13 points above average</strong>.</Typography>
                  </Alert>
                </CardContent>
              </Card>
              <Stack direction="row" gap={1}>
                <Button variant="contained" onClick={() => showPhase(3)}>Generate Remediation Plan →</Button>
              </Stack>
            </>
          )
        )}

        {phase === 3 && (
          <>
            <Card variant="outlined">
              <CardHeader title="Critical issues" subheader="Fix immediately · Blocks closing" />
              <CardContent>
                <Typography variant="subtitle2">Alpha Tech Texas LLC — Forfeited with Comptroller</Typography>
                <Stack direction="row" gap={1} sx={{ mt: 1 }}>
                  <Button size="small" variant="contained" onClick={() => setTexasApproved(true)}>Approve & Submit</Button>
                </Stack>
                {texasApproved && <Alert severity="success" sx={{ mt: 1 }}>✅ Submitted to Texas Comptroller</Alert>}
              </CardContent>
            </Card>
            <Stack direction="row" gap={1}>
              <Button variant="contained" onClick={() => showPhase(4)}>Approve Plan & Activate Dual-Track →</Button>
            </Stack>
          </>
        )}

        {phase === 4 && (
          <>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              <Card variant="outlined">
                <CardHeader title={<Typography variant="subtitle1" fontWeight={700} color="info.main">M&A Readiness</Typography>} action={<Typography variant="h5" fontWeight={800} color="info.main">74%</Typography>} />
                <CardContent>
                  <LinearProgress value={74} color="info" variant="determinate" sx={{ height: 8, borderRadius: 1 }} />
                  <Stack direction="row" gap={1} sx={{ mt: 2 }}>
                    <Button variant="contained" size="small" fullWidth onClick={() => showPhase(5)}>View M&A Tasks</Button>
                  </Stack>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardHeader title={<Typography variant="subtitle1" fontWeight={700} color="primary.main">IPO Readiness</Typography>} action={<Typography variant="h5" fontWeight={800} color="primary.main">54%</Typography>} />
                <CardContent>
                  <LinearProgress value={54} color="primary" variant="determinate" sx={{ height: 8, borderRadius: 1 }} />
                </CardContent>
              </Card>
            </Box>
            <Stack direction="row" gap={1}>
              <Button variant="contained" onClick={() => showPhase(5)}>Open Decision Hub →</Button>
            </Stack>
          </>
        )}

        {phase === 5 && (
          <>
            <Alert severity="info" icon={false}>
              <Typography variant="body1"><strong>Principle:</strong> The orchestrator never recommends. It assembles context so you can decide.</Typography>
            </Alert>
            {[
              { id: "dec7", num: 7, title: "Adjusted EBITDA Add-Backs — Final Selection", tags: ["Financial judgment", "M&A-specific"], ready: "READY", readyColor: "success" as const, why: "Why this can’t be automated: EBITDA add-backs require your judgment on buyer defensibility.", expanded: expandedDecisions.dec7, children: (
                <>
                  <Table size="small" sx={{ mb: 1 }}>
                    <TableHead><TableRow><TableCell>Add-back item</TableCell><TableCell>Amount</TableCell><TableCell>Market accept.</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
                    <TableBody>
                      <TableRow><TableCell>Founder excess comp</TableCell><TableCell>$780K</TableCell><TableCell sx={{ color: "success.main" }}>91%</TableCell><TableCell><Chip size="small" color="success" label="Include" /></TableCell></TableRow>
                      <TableRow><TableCell>One-time legal</TableCell><TableCell>$340K</TableCell><TableCell sx={{ color: "success.main" }}>88%</TableCell><TableCell><Chip size="small" color="success" label="Include" /></TableCell></TableRow>
                      <TableRow><TableCell sx={{ color: "warning.main" }}>Strategic R&D (CEO override)</TableCell><TableCell>$1.2M</TableCell><TableCell sx={{ color: "error.main" }}>23%</TableCell><TableCell><Chip size="small" color="error" label="⚠ Low confidence" /></TableCell></TableRow>
                    </TableBody>
                  </Table>
                  <Stack direction="row" gap={1}><Button size="small" variant="contained">Remove low-confidence ($1.52M — defensible)</Button></Stack>
                </>
              )},
              { id: "dec8", num: 8, title: "Founder IP Remediation Approach — James Liu", tags: ["Legal strategy", "Shared (M&A + IPO)"], ready: "READY", readyColor: "success" as const, why: "Remediation approach affects deal timeline and legal exposure.", expanded: expandedDecisions.dec8, children: (
                <Stack spacing={1} mb={1}>
                  <Card variant="outlined" sx={{ p: 1.5, borderColor: "primary.main" }}><Typography variant="body1" fontWeight={600} color="primary.main">Option B: IP purchase agreement (recommended)</Typography><Typography variant="caption" color="text.secondary">Clean transfer · $15–25K cost · 2–3 week timeline</Typography></Card>
                  <Button size="small" variant="contained">Select Option B</Button>
                </Stack>
              )},
              { id: "dec9", num: 9, title: "Buyer Target List — Final Selection", tags: ["Strategic judgment", "M&A-specific"], ready: "PARTIAL (2 of 3)", readyColor: "warning" as const, why: "Missing: Banker NDA status (expected Feb 27)", expanded: false, children: null },
            ].map((d) => (
              <Card key={d.id} variant="outlined" sx={{ cursor: "pointer" }} onClick={() => d.children && toggleDecision(d.id)}>
                <CardContent>
                  <Stack direction="row" alignItems="flex-start" gap={1.5}>
                    <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "action.hover", border: 1, borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="caption" fontWeight={800} color="text.secondary">{d.num}</Typography>
                    </Box>
                    <Stack flex={1}>
                      <Typography variant="subtitle2" fontWeight={700}>{d.title}</Typography>
                      <Stack direction="row" gap={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>{d.tags.map((t) => <Chip key={t} size="small" label={t} variant="outlined" />)}</Stack>
                      <Chip size="small" color={d.readyColor} label={d.ready} sx={{ alignSelf: "flex-start", mt: 0.5 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>{d.why}</Typography>
                      {d.children && d.expanded && <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }} onClick={(e) => e.stopPropagation()}>{d.children}</Box>}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
            <Stack direction="row" gap={1} flexWrap="wrap" sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Button variant="contained" onClick={() => showPhase(6)}>Proceed to Closing →</Button>
            </Stack>
          </>
        )}

        {phase === 6 && (
          <Card variant="outlined" sx={{ background: "linear-gradient(135deg, rgba(0,80,50,0.15), rgba(0,40,80,0.15))", borderColor: "success.main" }}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="h5" fontWeight={800} color="success.main" gutterBottom>Transaction complete</Typography>
              <Typography variant="body1" color="text.secondary">Meridian Labs × Titan Corp · Closed March 26, 2026</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5, mt: 2 }}>
                <Box><Typography variant="h6" fontWeight={800} color="success.main">147</Typography><Typography variant="caption" color="text.secondary">Days to close (avg: 240–320)</Typography></Box>
                <Box><Typography variant="h6" fontWeight={800} color="info.main">58/58</Typography><Typography variant="caption" color="text.secondary">Remediation tasks completed</Typography></Box>
                <Box><Typography variant="h6" fontWeight={800} color="primary.main">30</Typography><Typography variant="caption" color="text.secondary">HITL decisions — all with full context</Typography></Box>
              </Box>
              <Alert severity="success" icon={false} sx={{ mt: 2, textAlign: "left" }}>
                <Typography variant="body1">Elena made 30 decisions over 147 days. The orchestrator handled everything between them. Same decisions. Better information. Half the time.</Typography>
              </Alert>
            </CardContent>
          </Card>
        )}
      </Stack>
    </PageLayout>
  );
}