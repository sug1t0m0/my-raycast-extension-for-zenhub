# My Zenhub

## Introduction

This is a Raycast extension for quickly connecting to Zenhub information. It displays a list of issues for a specific pipeline in a specific workspace.

## Develop

### Build

1. get GrapQL Schema file of Zenhub

```
npx @apollo/rover graph introspect https://api.zenhub.com/public/graphql \
  --header "Authorization: Bearer Zenhub_GraphQL_Personal_API_Key" > zhGraphql.graphql
```

1. generate GraphQL code

```
npm run codegen:graphql
```

1. run build command

```
npm run build
```
