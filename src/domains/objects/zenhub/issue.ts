import { ZenhubRepository } from "./repository";

export interface ZenhubIssue {
  id: string;
  ghId: number | null;
  number: number;
  title: string;
  body: string;
  htmlUrl: string;
  repository: ZenhubRepository;
}
