import { Context } from '@nuxt/types'
import { find } from 'lodash'

interface Redirect {
  path: string
  redirect: string
}

export default function(context: Context) {
  const { route, redirect } = context
  const redirects: { [key: string]: Redirect } = {
    contact: {
      path: '/contact',
      redirect: '/about-us/contact'
    },
    team: {
      path: '/team',
      redirect: '/about-us/team'
    }
  }
  const routes = Object.values(redirects)
  const result = find(routes, { path: route.path })
  if (result) {
    return redirect(result.redirect)
  }
}
