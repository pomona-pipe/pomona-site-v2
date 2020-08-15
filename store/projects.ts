// TODO: create types for api response data/payloads

import { IPrismic } from '~/shims'

interface IState {
  projects: object[]
}

export const state = () => ({
  projects: []
})

export const mutations = {
  addProject(state: IState, payload: object) {
    state.projects.push(payload)
  },
  setProjects(state: IState, payload: object[]) {
    state.projects = payload
  }
}
export const actions = {
  async getProjects({ commit }: { commit: any }, $prismic: IPrismic) {
    const byProjects = $prismic.predicates.at('document.type', 'projects')
    const projects = await $prismic.api.query(byProjects, {
      orderings: '[my.projects.completion_date desc]'
    })
    commit(
      'setProjects',
      projects.results.map((result) => result)
    )
  }
}
