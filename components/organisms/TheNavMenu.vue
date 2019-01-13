<template lang="pug">
  nav
    transition-group.menus(name="menu"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @enter-cancelled="afterEnter"
      tag="ul"
      appear)
      MenuItem(
        v-for="(menu, index) in menus",
        :data-index="index"
        :key="menu.name"
        :menu="menu"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MenuItem from '~/components/atoms/MenuItem.vue'
@Component({
  components: {
    MenuItem,
  },
})
export default class TheNavMenu extends Vue {
  @Prop(Array) menus?: [object]
  beforeEnter(el) {
    el.style.transitionDelay = 250 + 100 * parseInt(el.dataset.index, 10) + 'ms'
  }
  afterEnter(el) {
    el.style.transitionDelay = ''
  }
}
</script>

<style lang="sass" scoped>
.menus
  list-style-type: none
.menu
  &-enter
    transform: translateX(-2000px)
    &-active
      transition: all 500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 250ms
    // &-to
  &-leave
    &-active
      // position: absolute
      transition: all 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 100ms
    &-to
      transform: translateX(-2000px)
</style>
