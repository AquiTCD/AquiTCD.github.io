<template lang="pug">
  .contents
    .content
      h2.content-heading YANTAN
      .content-body
        img(src="https://aquitcd.github.io/yantan/_nuxt/img/main.5588380.png")
        ul.links
          li.link
            i.fab.fa-github.link-icon
            a(href="https://github.com/AquiTCD/yantan" target="_blank").link-text GitHub - AquiTCD/yantan
          li.link
            i.fas.fa-link.link-icon
            a(href="https://aquitcd.github.io/yantan/" target="_blank").link-text YANTAN - Markdown note with favorite image in New tab
        h3.body-heading 種類
        p.body-paragraph
          | GoogleChromeExterntion: Markdown note with favorite image in New tab
        h3.body-heading 技術
        p.body-paragraph
          | Vue.js
          | Jest
          | Element UI
        h3.body-heading 概要
        p.body-paragraph
          | YANTAN はGoogle Chromeの「新しいタブ」を置き替えます。
          | Markdownで書けるノート機能をベースとして、好きな画像を背景に設定することができます。すぐに使えるメモ、タスクリストとしてもお使いいただけます。
        h3.body-heading 作った理由
        p.body-paragraph
          | 新しいタブ用の拡張って前からしっくり来てなくて。と言うのも綺麗だけど自分がとった写真じゃなくてどっかの誰かがとったやつだったりとか。あとは単純なメモが欲しかった。ある日に、あれ、SPAの技術使えばChrome拡張って作れるんじゃね？とひらめいたから作った。
        h3.body-heading 開発秘話
        p.body-paragraph
          | 苦戦したのは、Markdownのリスト記法の入力補完とか。入力補完って自分で実装すると以外に泥くさいことしなきゃなんなくて。とはいえなかなか楽しかった。マーケティング的に上手くいってない。やっぱり自分のTwitter、GitHub、ブログ以外のところで上手いこと宣伝活動していかないといけないんだなぁと思う。
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
    await this.selectPageByName('sprintus')
  }
}
</script>
<style lang="sass" scoped>
.contents
  width: 80vw
.content
  $outline-color: $bg-color-base
  text-shadow: $outline-color 2px 0,  $outline-color -2px 0, $outline-color 0 -2px, $outline-color 0 2px, $outline-color 2px 2px , $outline-color -2px 2px, $outline-color 2px -2px, $outline-color -2px -2px, $outline-color 1px 2px,  $outline-color -1px 2px, $outline-color 1px -2px, $outline-color -1px -2px, $outline-color 2px 1px,  $outline-color -2px 1px, $outline-color 2px -1px, $outline-color -2px -1px
  &:not(:last-child)
    padding-bottom: 3rem
.content-heading
  border-bottom: 3px solid $grey-base
  font-weight: bold
  font-size: 5rem
.content-body
  white-space: pre-wrap
  padding: 1rem 2rem 0
  font-size: 2rem
.links
  list-style: none
  padding: 3rem
  font-size: 3rem
.link
  vertical-align: middle
  padding-bottom: 1rem
.link-icon
  font-size: 5rem
  padding-right: 1rem
.body-heading
  border-bottom: 2px solid $grey-base
.body-paragraph
  padding-top: 1rem
  padding-bottom: 2rem
a
  background-color: rgba(0,0,0, 0.4)
  padding: 0.125rem 0.5rem
  border-radius: 0.25rem
  margin: 0 0.125rem
  text-decoration: none
  &:link, &:visited
    color: $primary-color-light
  &:hover
    color: $secondary-color-light
  &:active
    color: $secondary-color-dark
</style>
