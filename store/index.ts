const contentData = require('../static/contents-data.yml') // eslint-disable-line typescript/no-var-requires
export const state = (): object => ({
  site: contentData.site,
  currentPage: contentData.currentPage,
  pages: contentData.pages,
})

export const actions = {
  // async nuxtServerInit({ commit }, { app }) {
  //   const contentsData = await app.$axios.$get('./contents-data.json')
  //   commit('setSite', contentsData.site)
  //   commit('setPages', contentsData.pages)
  //   commit('setCurrentPage', contentsData.currentPage)
  // },
  async SELECT_PAGE_BY_NAME({ commit, state }, key: string) {
    const currentPage = await state.pages[key]
    commit('setCurrentPage', currentPage)
  },
}

export const mutations = {
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage
  },
  setSite(state, site) {
    state.site = site
  },
  setPages(state, pages) {
    state.pages = pages
  },
}
