# next-actuator

[![Npm package version](https://img.shields.io/npm/v/@bueno-systems/next-actuator)](https://www.npmjs.com/package/@bueno-systems/next-actuator) [![Release workflow](https://img.shields.io/github/workflow/status/bueno-systems/next-actuator/Build/main)](https://github.com/bueno-systems/next-actuator/actions/workflows/release.yml)

Provide Next.js routes for monitoring and management of your application in Production.

Inspired by [rcruzper / express-actuator](https://github.com/rcruzper/express-actuator) but tailored for Next.js applications.

## Endpoints

| ID      | Description                                            |
| ------- | ------------------------------------------------------ |
| info    | Displays application information.                      |
| metrics | Shows metrics information for the current application. |
| health  | Shows application health information.                  |

## Installation

```shell
npm install --save @bueno-systems/next-actuator
# or
yarn add  @bueno-systems/next-actuator
```

💡 TypeScript types are included

## Usage

Create a file at `./pages/api/actuator/[...actuator].ts` (or similar) and
return a call to `nextActuator()`. Named or default exports are available.

```ts
// ./pages/api/actuator/[...actuator].ts
import { nextActuator } from '@bueno-systems/next-actuator'

// Export the handler function with some options
export default nextActuator()
```

## Configuration

```ts
nextActuator({
  enableHealth: true, // enable/disable /health endpoint (default true)
  enableMetrics: true, // enable/disable /metrics endpoint (default true)
  enableInfo: true, // enable/disable /info endpoint (default true)
  healthEndpoint: '/health', // change the /health endpoint to something else
  metricsEndpoint: '/metrics', // change the /metrics endpoint to something else
  infoEndpoint: '/info' // change the /info endpoint to something else
})
```

## Endpoints exmples

`GET http://localhost:3000/api/actuator/health`

```json
{
  "status": "UP"
}
```

`GET http://localhost:3000/api/actuator/info`

```json
{
  "build": {
    "name": "My Cool Project",
    "description": "Description from package.json",
    "version": "1.2.3"
  }
}
```

`GET http://localhost:3000/api/actuator/metrics`

```json
{
  "mem": {
    "rss": 550682624,
    "heapTotal": 244232192,
    "heapUsed": 213942064,
    "external": 191258086,
    "arrayBuffers": 188265357
  },
  "uptime": 2642.679833583
}
```
