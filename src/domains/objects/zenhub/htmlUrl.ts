import { ZenhubIssue } from "./issue";
import { ZenhubWorkspace } from "./workspace";

export type ZenhubHtmlUrl = string;

export function generateZenhubHtmlUrl(param: { workspace: ZenhubWorkspace; issue: ZenhubIssue }): ZenhubHtmlUrl {
  const workspaceName = param.workspace.name.toLowerCase();
  return `https://app.zenhub.com/workspaces/${workspaceName}-${param.workspace.id}/issues/gh/${param.issue.repository.ownerName}/${param.issue.repository.name}/${param.issue.number}`;
}
