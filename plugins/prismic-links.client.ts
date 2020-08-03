/*
 ** Handles links to Primsic Documents from PrismicRichText component
 ** From issue: https://github.com/nuxt-community/prismic-module/issues/60
 ** Solution: https://gist.github.com/johndigital/21b04f00abca2dca35595289fd51e680
 */
export default ({ redirect }: { redirect: typeof Response.redirect }) => {
  window.addEventListener(
    'click',
    (event) => {
      // If the clicked element doesn't have the right selector, bail
      if (!(event.target as HTMLAnchorElement).matches('a[data-nuxt-link]'))
        return

      // Don't follow the link
      event.preventDefault()

      // Push link destination to router
      redirect((event.target as HTMLAnchorElement).pathname)
    },
    false
  )
}
