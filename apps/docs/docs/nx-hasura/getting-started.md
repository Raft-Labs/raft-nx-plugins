---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 1
slug: /nx-hasura/getting-started
---

# Nx Plugin for Hasura

The Nx Plugin for Hasura contains generators for managing Hasura services and sdk within an Nx workspace. It provides:

- Integration with tools such as GraphQL Code Generator
- Scaffolding for sdk based on GraphQL API as library
- Scaffolding for hasura metadata and migration folder in services
- Utilities for environments based migrations

## Adding the Hasura plugin

Adding the Hasura plugin to a workspace can be done with the following:

```bash
#yarn
yarn add -D @raftlabs/nx-hasura
```

```bash
#npm
npm install -D @raftlabs/nx-hasura
```

The file structure for a Hasura application looks like:

```bash
myorg
├── apps
├── libs
├── nx.json
├── package.json
├── package-lock.json
├── README.md
├── services
│   └── hasura
│       ├── config.yaml
│       └── metadata
│           ├── actions.graphql
│           ├── actions.yaml
│           ├── allow_list.yaml
│           ├── cron_triggers.yaml
│           ├── databases
│           │   └── databases.yaml
│           ├── query_collections.yaml
│           ├── remote_schemas.yaml
│           └── version.yaml
├── tools
│   ├── generators
│   └── tsconfig.tools.json
├── tsconfig.base.json
└── workspace.json
```

## Executors / Builders

- hasura - exposes hasura cli with preloaded environment
- console - start hasura local console environment
- migrate - run hasura migrate & metadata command on environment
- generate - run graphql generator and update the sdk

## Generators

- application - Create an Hasura service
- sdk - Create an GraphQL based sdk in lib & configure graphql code generator
