import { usePromise } from "@raycast/utils";
import { zenhubClient } from "../api/zenhub";
import { generaeWorkspaceRepository } from "../repository/workspace";
import { generaeIssuesRepository } from "../repository/issues";
import { Zenhub } from "../domains/objects/zenhub";

const getZenhubPipelineIssues = async (p: {
  zenhubWorkspaceId: string;
  zenhubPipelineName: string;
}): Promise<{ workspace: Zenhub.Workspace; issues: Zenhub.Issue[] }> => {
  const workspaceRepository = generaeWorkspaceRepository(zenhubClient);
  const workspace = await workspaceRepository.get(p.zenhubWorkspaceId);
  const pipeline = workspace.pipelines.find((pipeline) => pipeline.name === p.zenhubPipelineName);
  if (!pipeline) {
    return {
      workspace,
      issues: [],
    };
  }

  const issuesRepository = generaeIssuesRepository(zenhubClient);
  const issues = await issuesRepository.getAll({
    pipelineId: pipeline.id,
  });

  return {
    workspace,
    issues,
  };
};

export const useZenhubPipelineIssues = (p: { zenhubWorkspaceId: string; zenhubPipelineName: string }) => {
  return usePromise(getZenhubPipelineIssues, [p]);
};
