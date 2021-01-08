// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'

interface IState {
  applications: object[]
}

export const state = () => ({
  applications: []
})

export const mutations = {
  addApplication(state: IState, payload: object) {
    state.applications.push(payload)
  },
  setApplications(state: IState, payload: object[]) {
    state.applications = payload
  }
}
export const actions = {
  async getApplications({ commit }: { commit: any }, $prismic: IPrismic) {
    const byApplications = $prismic.predicates.at(
      'document.type',
      'applications'
    )
    const applications = await $prismic.api.query(byApplications, {
      orderings: '[my.applications.order_number]'
    })
    commit(
      'setApplications',
      applications.results.map((result) => result)
    )
  }
}
