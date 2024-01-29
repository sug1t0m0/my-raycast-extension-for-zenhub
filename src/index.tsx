import { useState } from "react";
import { Action, ActionPanel, List, getPreferenceValues } from "@raycast/api";
import { useZenhubPipelineIssues } from "./hooks/zenhubPipelineIssues";

const zenhubWorkspaceId = getPreferenceValues().zenhubWorkspaceId;
const sprintBacklogPipelineName = getPreferenceValues().sprintBacklogPipelineName;

export default function Command() {
  const [showingDetail, setShowingDetail] = useState(true);
  const { data, isLoading } = useZenhubPipelineIssues({
    zenhubWorkspaceId,
    zenhubPipelineName: sprintBacklogPipelineName,
  });
  return (
    <List isLoading={isLoading} isShowingDetail={showingDetail}>
      {data &&
        data.workspace.pipelines.map((pipeline) => {
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: (
                  <List.Item.Detail
                    markdown={`# ${pipeline.name}\n\n- id: ${pipeline.id}\n
                    `}
                  />
                ),
              }
            : { accessories: [{ text: pipeline.name }] };
          return (
            <List.Item
              key={pipeline.id}
              title={pipeline.name}
              subtitle={`#${pipeline.id}`}
              {...props}
              actions={
                <ActionPanel>
                  <Action.CopyToClipboard title="Copy Link As MD" content={JSON.stringify(data)} />
                  {/* <Action.OpenInBrowser url={`https://www.pokemon.com/us/pokedex/${pokemon.name}`} /> */}
                  <Action title="Toggle Detail" onAction={() => setShowingDetail(!showingDetail)} />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
}
