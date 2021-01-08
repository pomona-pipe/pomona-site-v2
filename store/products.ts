import { uniqBy } from 'lodash'

// TODO: create types for api response data/payloads
import { IPrismic } from '~/shims'

interface IState {
  productCategories: object[]
  products: object[]
}

export const state = () => ({
  productCategories: [],
  products: []
})

export const mutations = {
  addProductCategory(state: IState, payload: object) {
    state.productCategories = uniqBy(
      state.productCategories.concat([payload]),
      'id'
    )
  },
  setProductCategories(state: IState, payload: object[]) {
    state.productCategories = payload
  },
  addProducts(state: IState, payload: object[]) {
    state.products = uniqBy(state.products.concat(payload), 'id')
  }
}
export const actions = {
  async getProductCategories({ commit }: { commit: any }, $prismic: IPrismic) {
    const byCategories = $prismic.predicates.at(
      'document.type',
      'product_categories'
    )
    const productCategories = await $prismic.api.query(byCategories, {
      orderings: '[my.product_categories.order_number]'
    })
    commit(
      'setProductCategories',
      productCategories.results.map((result) => result)
    )
  },
  async getProductsByCategory(
    { commit }: { commit: any },
    { $prismic, catId }: { $prismic: IPrismic; catId: string }
  ) {
    const byCategory = $prismic.predicates.at(
      'my.products.product_category',
      catId
    )
    const product = await $prismic.api.query(byCategory, {
      orderings: '[my.products.order_number]'
    })
    commit(
      'addProducts',
      product.results.map((result) => result)
    )
  }
}
