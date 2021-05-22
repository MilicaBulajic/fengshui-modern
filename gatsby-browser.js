/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

 exports.onClientEntry = () => {
    // NOTE: Don't polyfill Promise here (Gatsby already includes a Promise polyfill)
  
    // IntersectionObserver polyfill for gatsby-image (Safari, IE)
    if (typeof window.IntersectionObserver === `undefined`) {
      require(`intersection-observer`)
      console.log(`👍 IntersectionObserver is polyfilled`)
    }
  }