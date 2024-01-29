import { ZenhubIssue } from "./issue";
import { ZenhubPipeline } from "./pipeline";
import { ZenhubRepository } from "./repository";
import { ZenhubWorkspace } from "./workspace";
import { ZenhubHtmlUrl } from "./htmlUrl";

export namespace Zenhub {
  export type HtmlUrl = ZenhubHtmlUrl;
  export interface Issue extends ZenhubIssue {}
  export interface Pipeline extends ZenhubPipeline {}
  export interface Repository extends ZenhubRepository {}
  export interface Workspace extends ZenhubWorkspace {}
}
