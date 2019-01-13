<template lang="pug">
  div.body
    TheHeader.body-header(:site="site", :page="currentPage")
    .body-main
      TheNavMenu.main-nav(:menus="currentPage.menus")
      transition(
        name="main"
        tag="main"
        appear
      )
        nuxt.main
    TheFooter.body-footer(:site="site", :page="currentPage")
    .body-background
      transition(name="back" appear)
        img.background-img(:src="currentPage.background" v-if="currentPage.background")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'
import TheHeader from '~/components/organisms/TheHeader.vue'
import TheNavMenu from '~/components/organisms/TheNavMenu.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'

@Component({
  components: {
    TheHeader,
    TheNavMenu,
    TheFooter,
  },
})
export default class extends Vue {
  @State site
  @State currentPage
}
</script>


<style lang="sass" scoped>
.body
  display: flex
  flex-direction: column
  min-height: 100vh
  overflow-x: hidden
  overflow-y: auto
.body-header
  margin-bottom: auto
  padding-bottom: 7rem
  z-index: 1
.body-main
  display: flex
  flex-direction: row
  flex-grow: 1
  z-index: 1
.body-footer
  margin-top: auto
  z-index: 1
.body-background
  z-index: 0
  height: 100vh
  position: fixed
  width: 100vw
  background-color: #000
.background-img
  height: 100%
  width: 100%
  object-fit: cover
  filter: brightness(125%) contrast(125%) saturate(125%) grayscale(0%) sepia(0%) hue-rotate(0deg) invert(0%) opacity(50%) blur(0px)
.main
  padding: 0 4rem
  &-enter
    opacity: 0
    filter: blur(5px)
    &-active
      transition: all 500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 350ms
    // &-to
  &-leave
    &-active
      position: absolute
      transition: all 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)
    &-to
      opacity: 0
      filter: blur(5px)
.back
  &-enter
    filter: blur(200px) grayscale(100%)
    &-active
      transition: all 500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 250ms
    // &-to
  &-leave
    &-active
      position: absolute
      transition: all 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)
    &-to
      grayscale(100%)
      filter: blur(200px)
</style>
