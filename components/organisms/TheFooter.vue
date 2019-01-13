<template lang="pug">
footer.the_footer
  transition(
    name="button" appear
  )
    BackButton.backbutton(
      v-if="page.parent"
      :parent="page.parent")
  Copyright.copyright(
    :auther="site.auther"
    :published="site.published"
    :updated="site.updated")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BackButton from '~/components/atoms/BackButton.vue'
import Copyright from '~/components/atoms/Copyright.vue'
@Component({
  components: {
    BackButton,
    Copyright,
  },
})
export default class TheFooter extends Vue {
  @Prop(Object) site!: object
  @Prop(Object) page!: object
}
</script>

<style lang="sass" scoped>
.the_footer
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
  padding-bottom: 3rem
.backbutton
  padding-bottom: 3.5rem
.copyright
  background-color: $primary-color-base
  border-top: 5px solid $black-base
  padding-bottom: 10rem
  margin-bottom: -10rem
  overflow-y: hidden
.button
  &-enter
    transform: translateX(2000px)
    &-active
      transition-delay: 500ms
      transition: all 500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 500ms
    // &-to
  &-leave
    &-active
      // position: absolute
      transition: all 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 250ms
    &-to
      transform: translateX(2000px)
</style>
