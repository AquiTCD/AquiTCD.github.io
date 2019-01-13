<template lang="pug">
div.content_title
  div.title_wrap
    p.title_text {{page.title}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  components: {},
})
export default class HeaderContentTitle extends Vue {
  @Prop(Object) page!: Object
}
</script>

<style lang="sass" scoped>
  .content_title
    margin-right: -3rem
    width: 60%
    padding: 5px
    background-color: $black-base
    transform: skew(21deg, -3deg)
  .title_wrap
    background-color: $primary-color-base
    padding: 1rem 3rem
  .title_text
    text-align: left
    font-size: 3rem
    font-weight: bold
    color: $black-base
    transform: skew(-21deg, 0)
</style>
