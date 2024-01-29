import { Client, gql } from "urql";

import { Zenhub } from "../domains/objects/zenhub";

import { SearchIssuesByPipelineQuery, SearchIssuesByPipelineQueryVariables } from "../__generated__/zhGraphql";

const querySearchIssuesByPipeline = gql`
  query searchIssuesByPipeline($pipelineId: ID!, $after: String) {
    searchIssuesByPipeline(pipelineId: $pipelineId, after: $after, filters: {}) {
      nodes {
        id
        ghId
        ghNodeId
        number
        title
        body
        htmlUrl
        repository {
          id
          ghId
          name
          ownerName
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const generaeIssuesRepository = (client: Client) => {
  const get = async (p: {
    pipelineId: string;
    after?: string;
  }): Promise<{ issues: Zenhub.Issue[]; pageInfo: { hasNextPage: boolean; endCursor: string } }> => {
    const result = await client
      .query<SearchIssuesByPipelineQuery, SearchIssuesByPipelineQueryVariables>(querySearchIssuesByPipeline, {
        pipelineId: p.pipelineId,
        after: p.after,
      })
      .toPromise()
      .catch((err) => {
        throw err;
      });
    const nodes = result?.data?.searchIssuesByPipeline?.nodes ?? [];
    const resultIssues = nodes.map((node): Zenhub.Issue => {
      return {
        id: node.id,
        ghId: node.ghId ?? null,
        number: node.number,
        title: node.title,
        body: node.body ?? "",
        htmlUrl: node.htmlUrl,
        repository: node.repository,
      };
    });

    const resultPageInfo = {
      endCursor: result?.data?.searchIssuesByPipeline?.pageInfo?.endCursor ?? "",
      hasNextPage: result?.data?.searchIssuesByPipeline?.pageInfo?.hasNextPage ?? false,
    };

    return {
      issues: resultIssues,
      pageInfo: resultPageInfo,
    };
  };

  return {
    get,
    getAll: async (p: { pipelineId: string }): Promise<Zenhub.Issue[]> => {
      const issues: Zenhub.Issue[] = [];
      let after: string | undefined = undefined;
      let hasNextPage = true;
      while (hasNextPage) {
        const result = await get({ pipelineId: p.pipelineId, after });
        issues.push(...result.issues);
        after = result.pageInfo.endCursor;
        hasNextPage = result.pageInfo.hasNextPage;
      }
      return issues;
    },
  };
};
