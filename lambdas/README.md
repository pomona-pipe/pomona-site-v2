# Netlify Lambda Functions

## Overview

- Used to create API endpoints on a web server without the need to create a separate API
- AWS scales infrastructure automatically with usage
- Each file in this folder represents an endpoint, which can be reached at `<hostname>/.netlify/functions/<fileName>`

## Typescript Configuration

- This repo uses the NPM package `netlify-lambda` along with babel to allow functions to be written in Typescript, and later compiled into JS on the lambda build script
- The package.json script `npm run build` runs both the nuxt generate and lambda build commands, which allows Netlify to produce the static Nuxt site as well as the lambda API endpoints.
- Lambda files are then stored at the project root in `dist_lambdas`

## Usage

1. Local: Use `npm run start:lambda` to launch a local server for testing endpoints. The console will output information about the port to ping the API from (defaults to localhost:9000). Then use Postman to create a request. Updates to the TS file will automatically rebuild the JS endpoint file  
*Ex: test.ts => localhost:9000/.netlify/functions/test*

2. Remote (PR/Prod): Once the site has been deployed to either a PR link or to the production domain, you can make the same request as in local but just swap out the URL hostname:  
PR: <https://deploy-preview-25--pomona-supply.netlify.app/.netlify/functions/test>  
Prod: <https://www.pomonasupply.com/.netlify/functions/test>

## Resources

- Netlify Lambda Documentation: <https://github.com/netlify/netlify-lambda>
- Nuxt example: <https://github.com/wearelucid/nuxt-netlify-functions-example>
- Typescript example: <https://github.com/sw-yx/create-react-app-lambda-typescript>
