<template lang="pug">
  .contents
    .content
      h2.content-heading MHW-cheatsheet
      .content-body
        img(src="https://pbs.twimg.com/media/DY5xqKeWAAI1s98.png:large")
        ul.links
          li.link
            i.fab.fa-github.link-icon
            a(href="https://github.com/AquiTCD/mhw-cheat-sheet" target="_blank").link-text GitHub - AquiTCD/mhw-cheat-sheet
          li.link
            i.fas.fa-link.link-icon
            a(href="https://mhw-cs.solunita.net/#/ja/" target="_blank").link-text MHW 弱点検索
        h3.body-heading 種類
        p.body-paragraph
          | SPA/PWA for Mobile
        h3.body-heading 技術
        p.body-paragraph
          | Nuxt.js
          | Netlify
          | Jest
          | Onsen UI
        h3.body-heading 概要
        p.body-paragraph
          | ビデオゲーム「MonsterHunterWorld」用モンスター弱点早見システム。
        h3.body-heading 作った理由
        p.body-paragraph
          | ゲーム発売してまもなくネットを見てたら早見表みたいな画像が凄くバズってたのを見て、画像じゃなくて操作できるもっと見やすいなにかをVue.jsでPWAにしてやってみようと思って。
        h3.body-heading 開発秘話
        p.body-paragraph
          | 開発自体は楽しいんだけどモンスターの情報入力とかは地道で面倒で辛かった。あとゲームプレイしたい時間を削って開発するのも辛かった。
          | でも一番辛かったのは、宣伝するのが難しくて火がつかなかったこと。使ってくれた人達にはすごく評判良かったものの、ゲームの全盛期でハッシュタグ付けてツイートしても流れが速すぎて目にとまらない。個人レベルでの宣伝って難しいのを思い知らされた。
          | 技術的にはPWAに触れれたし完全に静的にアップするんでもアイデア次第ではいろいろ活用できるなーって感触が得られたのは大きい。
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
    await this.selectPageByName('mhw-cheatsheet')
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
