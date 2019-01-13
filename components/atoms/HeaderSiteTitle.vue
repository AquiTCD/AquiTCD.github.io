<template lang="pug">
div.site_title
  div.title_wrap
    h1.title_text
      nuxt-link(to="/") {{site.title}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  components: {},
})
export default class HeaderSiteTitle extends Vue {
  @Prop(Object) site!: Object
}
</script>

<style lang="sass" scoped>
  .site_title
    margin-right: -3rem
    width: 80%
    padding: 5px
    background-color: $black-base
    transform: skew(21deg, -3deg)
  .title_wrap
    background-color: $primary-color-base
    padding: 1.5rem 5rem
  .title_text
    text-align: left
    font-size: 5rem
    font-weight: bold
    color: $black-base
    transform: skew(-21deg, 0)
    a
      text-decoration: none
      &:link, &:active, &:visited, &:hover
        color: inherit
</style>
