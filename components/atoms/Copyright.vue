<template lang="pug">
  div.copyright
    div.copyright_wrap
      p.copyright_text Copyright &copy;&nbsp;
        span {{published}}&nbsp;
        span(v-if="published < updated") - {{updated}}&nbsp;
        span {{auther}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  components: {},
})
export default class Copyright extends Vue {
  @Prop(String) auther: string
  @Prop(Number) published: number
  @Prop(Number) updated?: number
}
</script>

<style lang="sass" scoped>
  .copyright
    width: 100%
    text-align: center
    transform: skew(0, -3deg)
    padding-top: 2rem
  .copyright_wrap
    padding: 1rem 3rem 0
  .copyright_text
    color: $black-base
</style>
