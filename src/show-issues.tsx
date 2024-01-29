import { useState } from "react";
import { Action, ActionPanel, List, getPreferenceValues } from "@raycast/api";
import { useZenhubPipelineIssues } from "./hooks/zenhubPipelineIssues";
import { generateZenhubHtmlUrl } from "./domains/objects/zenhub/htmlUrl";

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
        data.issues.map((issue) => {
          const issueZenhubUrl = generateZenhubHtmlUrl({ workspace: data.workspace, issue: issue });
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: (
                  <List.Item.Detail
                    markdown={`${issue.body}`}
                    metadata={
                      <List.Item.Detail.Metadata>
                        <List.Item.Detail.Metadata.Label title="Issue Title" text={`${issue.title}`} />
                        <List.Item.Detail.Metadata.Link
                          title="Issue URL"
                          text={`${issue.repository.ownerName}/${issue.repository.name}#${issue.number}`}
                          target={issueZenhubUrl}
                        />
                      </List.Item.Detail.Metadata>
                    }
                  />
                ),
              }
            : { accessories: [{ text: issue.title }] };
          return (
            <List.Item
              key={issue.id}
              title={issue.title}
              subtitle={`#${issue.id}`}
              {...props}
              actions={
                <ActionPanel>
                  <Action.CopyToClipboard
                    title="Copy Link As MD"
                    content={`[${issue.title} ${issue.repository.ownerName}/${issue.repository.name}#${issue.number}](${issueZenhubUrl})`}
                  />
                  <Action.OpenInBrowser url={issue.htmlUrl} />
                  <Action title="Toggle Detail" onAction={() => setShowingDetail(!showingDetail)} />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
}
