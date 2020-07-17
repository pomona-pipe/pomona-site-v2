// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'

interface IState {
  pageUid: string | null
  pageName: string | null
  isMobile: boolean | null
  mobileDrawer: boolean
  mainNavigation: any[]
}

export const state: () => IState = () => ({
  pageUid: null,
  pageName: null,
  isMobile: null,
  mobileDrawer: false,
  mainNavigation: []
})

export const mutations = {
  setPageUid(state: IState, payload: string) {
    const pageUid = payload.split('/').slice(-1)[0] || 'home'
    state.pageUid = pageUid
  },
  setPageName(state: IState, payload: string) {
    state.pageName = parseNameFromUid(payload)
  },
  setIsMobile(state: IState, value: boolean) {
    state.isMobile = value
  },
  setMobileDrawer(state: IState, value: boolean) {
    state.mobileDrawer = value
  },
  toggleMobileDrawer(state: IState) {
    state.mobileDrawer = !state.mobileDrawer
  },
  setMainNavigation(state: IState, payload: any[]) {
    state.mainNavigation = payload
  }
}

export const actions = {
  async getMainNavigation({ commit }: { commit: any }, $prismic: IPrismic) {
    const byMainNavigation = $prismic.predicates.at(
      'document.type',
      'main_navigation'
    )
    const mainNavigation = await $prismic.api.query(byMainNavigation, {})
    commit('setMainNavigation', mainNavigation.results[0].data.nav)
  }
}

function parseNameFromUid(uid: string) {
  const words = uid.split('-')
  const conversions: { [key: string]: string } = {
    and: '&'
  }
  words.forEach((word, index) => {
    // capitalize first letter
    words[index] = word.charAt(0).toUpperCase() + word.substr(1)
    // convert key words to symbols
    if (Object.keys(conversions).includes(word)) {
      words[index] = conversions[word]
    }
  })
  return words.join(' ')
}
