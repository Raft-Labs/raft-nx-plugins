# Nx Manage

- A helper cli for nx workspaces
- Helps with docker compose based deployments
- Manages environment variables with in the repo
- Deploys changed services only to the server (with help of nx affected)

```
npx nx-manage --help
```

```
Usage: nx-manage [options] [command]

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  affected-services [options]
  is-affected [options]
  prepare-arguments [options]
  encrypt [options]
  decrypt [options]
  help [command]               display help for command
```
