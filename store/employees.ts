// TODO: create types for api response data/payloads
import Prismic from '~/shims/prismic'

interface IState {
  employees: any []
}

export const state: () => IState = () => ({
  employees: []
})

export const mutations = {
  setEmployees(state: IState, payload: any[]) {
    state.employees = payload
  }
}

export const actions = {
  async getEmployees({ commit }: { commit: any }, $prismic: Prismic) {
    const byEmployees = $prismic.predicates.at(
      'document.type',
      'employees'
    )
    const employees = await $prismic.api.query(byEmployees, {orderings: '[my.employees.order_number]'})
    commit('setEmployees', employees.results.map((result) => result))
  }

}
