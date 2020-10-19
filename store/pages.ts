// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'
import { result } from 'lodash'

interface IState {
  home: any[]
  aboutUs: any[]
  team: any[]
  contact: any[]
  categoryPage: any[],
  projectListingPage: any[],
  applicationsPage: any[],
  technicalGuidesPage: any[],
  services: any[]
}

export const state: () => IState = () => ({
  home: [],
  aboutUs: [],
  team: [],
  contact: [],
  categoryPage: [],
  projectListingPage: [],
  applicationsPage: [],
  technicalGuidesPage: [],
  services: []
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
  },
  setCategoryPage(state: IState, payload: any[]) {
    state.categoryPage = payload
  },
  setProjectListingPage(state: IState, payload: any[]) {
    state.projectListingPage = payload
  },
  setApplicationsPage(state: IState, payload: any[]) {
    state.applicationsPage = payload
  },
  setTechnicalGuidesPage(state: IState, payload: any[]) {
    state.technicalGuidesPage = payload
  },
  setServices(state: IState, payload: any[]) {
    state.services = payload
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
  },
  async getCategoryPage({ commit }: { commit: any }, $prismic: IPrismic) {
    const byCategoryPage = $prismic.predicates.at('document.type', 'category_page')
    const categoryPage = await $prismic.api.query(byCategoryPage, {})
    commit(
      'setCategoryPage',
      categoryPage.results.map((result) => result)
    )
  },
  async getProjectListingPage({ commit }: { commit: any }, $prismic: IPrismic) {
    const byProjectListingPage = $prismic.predicates.at('document.type', 'projects_page')
    const projectListingPage = await $prismic.api.query(byProjectListingPage, {})
    commit(
      'setProjectListingPage',
      projectListingPage.results.map((result) => result)
    )
  },
  async getApplicationsPage({ commit }: { commit: any }, $prismic: IPrismic) {
    const byApplicationsPage = $prismic.predicates.at('document.type', 'applications_page')
    const applicationsPage = await $prismic.api.query(byApplicationsPage, {})
    commit(
      'setApplicationsPage',
      applicationsPage.results.map((result) => result)
    )
  },
  async getTechnicalGuidesPage({ commit }: { commit: any }, $prismic: IPrismic) {
    const byTechGuidesPage = $prismic.predicates.at('document.type', 'technical_guides_page')
    const techGuidesPage = await $prismic.api.query(byTechGuidesPage, {})
    commit(
      'setTechnicalGuidesPage',
      techGuidesPage.results.map((result) => result)
    )
  },
  async getServices({ commit }: { commit: any }, $prismic: IPrismic) {
    const byServices = $prismic.predicates.at('document.type', 'services_page')
    const services = await $prismic.api.query(byServices, {})
    commit(
      'setServices',
      services.results.map((result) => result)
    )
  }
}
