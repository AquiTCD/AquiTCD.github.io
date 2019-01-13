<template lang="pug">
  div.back_button
    div.button_wrapper
      button.button
        //- nuxt-link.button_text(:to="path") back
        a.button_text(@click="back") back
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  components: {},
})
export default class BackButton extends Vue {
  @Prop(String) parent!: string
  get path(): string {
    if (this.parent === 'index') {
      return '/'
    } else {
      return '/' + this.parent
    }
  }
  back(): void {
    this.$router.go(-1)
  }
}
</script>

<style lang="sass" scoped>
.back_button
  width: 25%
  padding: 0 0 1.5rem 0
  transform: skew(21deg, -3deg)
.button_wrapper
  padding: 5px
  background: $black-base
.button
  width: 100%
  background: $primary-color-base
  &:hover
    background: $black-base
.button_text
  display: block
  padding: 1rem 4rem
  text-align: right
  font-weight: bold
  font-size: 3rem
  transform: skew(-21deg, 0)
a
  color: $black-base
  text-decoration: none
  &:link
    color: $black-base
    text-decoration: none
  &:visited
    color: $black-base
  &:hover
    color: $primary-color-base
</style>
