<template lang="pug">
  header.the_header
    HeaderSiteTitle(:site="site")
    transition(name="submenu" appear)
      HeaderContentTitle(
        v-if="page.name && page.name !== 'index'"
        :page="page")
    HeaderContentTitle.hidden(
      v-if="page.name && page.name == 'index'"
      :page="page")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HeaderSiteTitle from '~/components/atoms/HeaderSiteTitle.vue'
import HeaderContentTitle from '~/components/atoms/HeaderContentTitle.vue'
@Component({
  components: {
    HeaderSiteTitle,
    HeaderContentTitle,
  },
})
export default class TheHeader extends Vue {
  @Prop(Object) site!: object
  @Prop(Object) page!: object
}
</script>

<style lang="sass" scoped>
.the_header
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
.submenu
  &-enter
    transform: translateX(2000px)
    &-active
      transition-delay: 500ms
      transition: all 500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0ms
    // &-to
  &-leave
    &-active
      // position: absolute
      transition: all 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0ms
    &-to
      transform: translateX(2000px)
.hidden
  transform: translateX(2000px)
</style>
