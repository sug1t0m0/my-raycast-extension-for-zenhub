import { createClient, fetchExchange } from "urql";
import { getPreferenceValues } from "@raycast/api";
import fetch from "cross-fetch";

const ZENHUB_GQL_ENDPOINT = "https://api.zenhub.com/public/graphql";

const zenhubGraphqlPersonalApiKey = getPreferenceValues().zenhubGraphqlPersonalApiKey;

export const zenhubClient = createClient({
  url: ZENHUB_GQL_ENDPOINT,
  fetch: fetch,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${zenhubGraphqlPersonalApiKey}`,
      "Content-Type": "application/json",
    },
  },
  exchanges: [fetchExchange],
});
