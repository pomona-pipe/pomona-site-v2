// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'

interface IState {
  pageUid: string | null
  pageName: string | null
  isMobile: boolean | null
  mobileDrawer: boolean
  mainNavigation: any[]
  footerNavigation: any[]
}

export const state: () => IState = () => ({
  pageUid: null,
  pageName: null,
  isMobile: null,
  mobileDrawer: false,
  mainNavigation: [],
  footerNavigation: []
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
  },
  setFooterNavigation(state: IState, payload: any[]) {
    state.footerNavigation = payload
  }
}

export const actions = {
  async getMainNavigation({ commit }: { commit: any }, $prismic: IPrismic) {
    const byMainNavigation = $prismic.predicates.at(
      'document.type',
      'main_navigation'
    )
    const response = await $prismic.api.query(byMainNavigation, {})
    let mainNavigation = response.results[0].data.nav
    // ensure nav options have a label and a link
    mainNavigation = mainNavigation.filter(
      (option: any) =>
        option.primary.label.length > 0 &&
        option.primary.label[0].text &&
        option.primary.link.id
    )
    // ensure subnav options have a label and a link
    mainNavigation = mainNavigation.map((option: any) => {
      option.items = option.items.filter(
        (suboption: any) =>
          suboption.sub_nav_link_label.length > 0 &&
          suboption.sub_nav_link_label[0].text &&
          suboption.sub_nav_link.id
      )
      return option
    })
    commit('setMainNavigation', mainNavigation)
  },
  async getFooterNavigation({ commit }: { commit: any }, $prismic: IPrismic) {
    const byFooterNavigation = $prismic.predicates.at(
      'document.type',
      'footer_navigation'
    )
    const footerNavigation = await $prismic.api.query(byFooterNavigation, {})
    commit('setFooterNavigation', footerNavigation.results.map((result) => result))
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
