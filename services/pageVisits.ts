import Vue from 'vue'
import { Route } from 'vue-router/types'

export default function() {
  const vue = new Vue()
  const routerHistory: Partial<Route>[] = (vue as any).$nuxt.$store.state.layout
    .routerHistory
  const currentRoute = routerHistory[routerHistory.length - 1]
  let visits = 0
  routerHistory.forEach((visited) => {
    if (currentRoute.fullPath === visited.fullPath) {
      visits++
    }
  })
  return visits
}
