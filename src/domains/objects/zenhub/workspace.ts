import { ZenhubPipeline } from "./pipeline";
import { ZenhubRepository } from "./repository";

export interface ZenhubWorkspace {
  id: string;
  name: string;
  repositories: ZenhubRepository[];
  pipelines: ZenhubPipeline[];
}
