// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'

interface IState {
  aboutUs: any[]
  team: any[]
  contact: any[]
}

export const state: () => IState = () => ({
  aboutUs: [],
  team: [],
  contact: []
})

export const mutations = {
  setAboutUs(state: IState, payload: any[]) {
    state.aboutUs = payload
  },
  setTeam(state: IState, payload: any[]) {
    state.team = payload
  },
  setContact(state: IState, payload: any[]) {
    state.contact = payload
  }
}

export const actions = {
  async getAboutUs({ commit }: { commit: any }, $prismic: IPrismic) {
    const byAboutUs = $prismic.predicates.at('document.type', 'about_us_page')
    const aboutUs = await $prismic.api.query(byAboutUs, {})
    commit(
      'setAboutUs',
      aboutUs.results.map((result) => result)
    )
  },
  async getTeam({ commit }: { commit: any }, $prismic: IPrismic) {
    const byTeam = $prismic.predicates.at('document.type', 'team_page')
    const team = await $prismic.api.query(byTeam, {})
    commit(
      'setTeam',
      team.results.map((result) => result)
    )
  },
  async getContact({ commit }: { commit: any }, $prismic: IPrismic) {
    const byContact = $prismic.predicates.at('document.type', 'contact_page')
    const contact = await $prismic.api.query(byContact, {})
    commit(
      'setContact',
      contact.results.map((result) => result)
    )
  }
}
