// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'
import { result } from 'lodash'

interface IState {
  home: any[]
  aboutUs: any[]
  team: any[]
  contact: any[]
}

export const state: () => IState = () => ({
  home: [],
  aboutUs: [],
  team: [],
  contact: []
})

export const mutations = {
  setHome(state: IState, payload: any[]) {
    state.home = payload
  },
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
  async getHome({ commit }: { commit: any }, $prismic: IPrismic) {
    const byHome = $prismic.predicates.at('document.type', 'home_page')
    const home = await $prismic.api.query(byHome, {})
    commit(
      'setHome',
      home.results.map((result) => result)
    )
  },
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
