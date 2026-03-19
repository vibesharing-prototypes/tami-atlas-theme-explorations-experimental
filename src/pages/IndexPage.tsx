import {
  PageHeader, OverflowBreadcrumbs, AIChatBox, AIChatBoxSuggestionsMenu,
  AIChatBoxSuggestionsButton, AIChatContextProvider, useAIChatContext,
  type AIChatBoxSuggestionMenuItem,
} from "@diligentcorp/atlas-react-bundle";
import { NavLink } from "react-router";
import { Stack } from "@mui/material";
import PageLayout from "../components/PageLayout.js";

const SUGGESTIONS: AIChatBoxSuggestionMenuItem[] = [
  { id: "appoint-director", label: "Appoint a Director" },
  { id: "meeting-materials", label: "Prepare Meeting Materials" },
];

function HomeChatBox() {
  const { setPrompt } = useAIChatContext();
  return (
    <>
      <AIChatBoxSuggestionsMenu suggestions={SUGGESTIONS} onSuggestionClick={(s) => setPrompt(s.label)} />
      <AIChatBox
        onSubmit={(prompt) => { if (prompt?.trim()) console.log("User said:", prompt); }}
        slotProps={{ textField: { placeholder: "Ask a question or describe what you need...", label: "Chat with AI" } }}
        leadingActions={<AIChatBoxSuggestionsButton label="Suggestions" />}
      />
    </>
  );
}

export default function IndexPage() {
  return (
    <PageLayout>
      <PageHeader
        pageTitle="Where should we start today?"
        breadcrumbs={
          <OverflowBreadcrumbs leadingElement={<span>My App</span>} items={[{ id: "home", label: "Home", url: "/" }]} hideLastItem aria-label="Breadcrumbs">
            {({ label, url }) => <NavLink to={url}>{label}</NavLink>}
          </OverflowBreadcrumbs>
        }
      />
      <Stack sx={{ pt: 2 }}>
        <AIChatContextProvider><HomeChatBox /></AIChatContextProvider>
      </Stack>
    </PageLayout>
  );
}