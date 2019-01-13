<template lang="pug">
  .content
    .profile-wrapper
      img.icon(src="kamon.png")
      .profile
        p.name
          ruby Aqui
            rt アキ
          | &nbsp;
          ruby TSUCHIDA
            //- rt ツチダ
          br
          | @Aqui.TCD
        p.bio
          | Web engineer
          br
          | Rubyist, JSer. a.k.a. Aqui the Yak Shaver
    p.message
      ruby 魔法使い
        rt Wizard
      | や
      ruby 忍者
        rt Ninja
      | には
      br
      | なれないかもしれないけど
      br
      | 「つくりたい」と思ったものを
      br
      | 自分でつくれる強さと
      br
      | その自由が持つ力を信じていきたい
    p.message
      | そうやって熱意を込めて作ったもので
      br
      | 自分と誰かがちょっと幸せな気持ちになったら良いなぁ
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
@Component
export default class extends Vue {
  // scrollToTop: true
  @Action('SELECT_PAGE_BY_NAME') selectPageByName
  async mounted() {
    await this.selectPageByName('index')
  }
}
</script>

<style lang="sass" scoped>
.content
  $outline-color: $bg-color-base
  text-shadow: $outline-color 2px 0,  $outline-color -2px 0, $outline-color 0 -2px, $outline-color 0 2px, $outline-color 2px 2px , $outline-color -2px 2px, $outline-color 2px -2px, $outline-color -2px -2px, $outline-color 1px 2px,  $outline-color -1px 2px, $outline-color 1px -2px, $outline-color -1px -2px, $outline-color 2px 1px,  $outline-color -2px 1px, $outline-color 2px -1px, $outline-color -2px -1px
  margin-top: -60px
  padding-bottom: 60px
.profile-wrapper
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  padding: 1rem
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
</style>
