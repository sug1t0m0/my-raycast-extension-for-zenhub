import { Client, gql } from "urql";

import { Zenhub } from "../domains/objects/zenhub";

import { GetWorkspaceQuery, GetWorkspaceQueryVariables } from "../__generated__/zhGraphql";

const queryGetWorkspace = gql`
  query getWorkspace($workspaceId: ID!) {
    workspace(id: $workspaceId) {
      id
      name
      repositoriesConnection {
        nodes {
          id
          ghId
          name
          ownerName
        }
      }
      pipelinesConnection {
        nodes {
          id
          name
        }
      }
    }
  }
`;

export const generaeWorkspaceRepository = (client: Client) => {
  return {
    get: async (zenhubWorkspaceId: string): Promise<Zenhub.Workspace> => {
      const result = await client
        .query<GetWorkspaceQuery, GetWorkspaceQueryVariables>(queryGetWorkspace, {
          workspaceId: zenhubWorkspaceId,
        })
        .toPromise()
        .catch((err) => {
          throw err;
        });

      return {
        id: result?.data?.workspace?.id ?? "",
        name: result?.data?.workspace?.name ?? "",
        repositories: result?.data?.workspace?.repositoriesConnection?.nodes ?? [],
        pipelines: result?.data?.workspace?.pipelinesConnection?.nodes ?? [],
      };
    },
  };
};
