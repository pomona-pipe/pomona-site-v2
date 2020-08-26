# Overview

This directory contains your un-compiled assets such as LESS, SASS, or JavaScript.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#webpacked).

## Vuetify

- Vuetify has default scss variables that provide application base styles. Overwriting these variables should be the first step taken to customize the application. Details about overwriting can be found in the `vuetify.scss` file of this directory.
- Vuetify's theme controls the application color palette for light/dark mode of the application (light is the default). Colors can be modified and added in `~/settings/theme.ts`.
  - Theme variables can be accessed inside other scss files, or in component styles. Use css variable syntax: e.g. `var(--v-primary-base)` is the primary color var. A list of these variables can be seen by inspecting the root html element in the browser

## Custom Styles

- Custom styles should be used as the last resort for customizing application styles.
- Custom application variables can be managed in the `variables.scss` file of this directory. They can be used inside `app.scss` directly, or imported into component styles using `@import '~/assets/style/variables.scss'`. Use normal scss variable syntax: e.g. `$my-var`
