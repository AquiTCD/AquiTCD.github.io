<template lang="pug">
  .contents
    .content(v-for="content in currentPage.contents")
      .heading {{content.heading}}
      .image {{content.image}}
      .content {{content.content}}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Action } from 'vuex-class'

@Component
export default class extends Vue {
  // scrollToTop: true
  @State currentPage
  @Action('SELECT_PAGE_BY_NAME') selectPageByName
  async mounted() {
    await this.selectPageByName('products')
  }
}
</script>
<style lang="sass" scoped>
.page
  display: flex
  flex-direction: column
  min-height: 100vh
.header
  z-index: 1
  flex-grow: 1
.main-wrapper
  display: flex
  flex-direction: row
  padding-top: 4rem
  z-index: 1
.nav
  flex-grow: 10
.main
  flex-grow: 1
  padding: 0 4rem
.footer
  z-index: 1
  flex-grow: 1
.profile-wrapper
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  padding: 1rem
.content
  $outline-color: $bg-color-base
  text-shadow: $outline-color 2px 0,  $outline-color -2px 0, $outline-color 0 -2px, $outline-color 0 2px, $outline-color 2px 2px , $outline-color -2px 2px, $outline-color 2px -2px, $outline-color -2px -2px, $outline-color 1px 2px,  $outline-color -1px 2px, $outline-color 1px -2px, $outline-color -1px -2px, $outline-color 2px 1px,  $outline-color -2px 1px, $outline-color 2px -1px, $outline-color -2px -1px
.icon
  width: 128px
  height: 128px
.name
  padding: 1rem 0 0 3rem
  font-size: 3rem
  font-weight: bold
  word-wrap: break-word
  width: 100%
.bio
  padding: 1rem 0 0 3rem
  font-size: 2rem
.message
  padding-top: 4rem
  font-size: 3rem
  font-weight: bold
.background
  z-index: 0
  position: fixed
  height: 100vh
  width: 100vw
.overlay
  height: 100%
  width: 100%
.img
  height: 100%
  width: 100%
  object-fit: cover
</style>
