/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import wrapWithProvider from "./src/repoLocal/store"
export const wrapRootElement = wrapWithProvider
