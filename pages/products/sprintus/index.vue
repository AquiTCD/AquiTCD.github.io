<template lang="pug">
  .contents
    .content
      h2.content-heading Sprintus
      .content-body
        img(src="/sprintus_preview.png")
        ul.links
          li.link
            i.fab.fa-github.link-icon
            a(href="https://github.com/AquiTCD/sprintus" target="_blank").link-text GitHub - AquiTCD/sprintus
          li.link
            i.fas.fa-link.link-icon
            a(href="https://sprintus.solunita.net/" target="_blank").link-text Sprintus
        h3.body-heading 種類
        p.body-paragraph
          | Web App for Task Management with team on a week
        h3.body-heading 技術
        p.body-paragraph
          | Nuxt.js
          | Firebase Auth, Firestore, Firebase Hosting
          | CloudFunction
          | Jest
          | Spectre.css
        h3.body-heading 概要
        p.body-paragraph
          | Sprintusはチーム内でタスクを共有するシステムです。タスクの時間軸を一週間に限定することで、従来のチャートとは違い長期的目標とは別にまず集中してタスクをこなすことにフォーカスします。
          | チーム内でメンバーとお互いにタスクを共有して見える化すること、一週間にフォーカスすることが特徴です。
        h3.body-heading 作った理由
        p.body-paragraph
          | チームリーダー的な立ち位置としてやっていく中でチームメンバーの動きが把握しきれないことに困ったのが出発点。
          | たまたまFirestoreを試してみよう、ということになったので何かを作ってみようとした時に、丁度いいアイデアだったので勢いで作ってみた。
        h3.body-heading 開発秘話
        p.body-paragraph
          | まだアルファ版といったところで、良くするアイデアも修正しなければいけない箇所もやまもり。
          | また、ネットでFirestoreを使ってみたレベルの話はいろいろでてくるものの、実運用してる知見があまりみつかなかったところ、実際にとりあえずリリースまでしてみて良かった。
          | というのも、コストとパフォーマンスを考えた場合、Firestoreもいろいろと考えることがあり設計力も必要だと痛感させられた。
          | とはいえかなり便利でお手軽なので、面白い遊び道具を手に入れた感覚でこれからも触っていけたらと思っている。
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
