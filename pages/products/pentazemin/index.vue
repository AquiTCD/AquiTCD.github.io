<template lang="pug">
  .contents
    .content
      h2.content-heading Pentazemin
      .content-body
        img(src="https://aquitcd.github.io/Pentazemin/_nuxt/img/main.ba7a3e5.png")
        ul.links
          li.link
            i.fab.fa-github.link-icon
            a(href="https://github.com/AquiTCD/pentazemin" target="_blank").link-text GitHub - AquiTCD/Pentazemin
          li.link
            i.fas.fa-link.link-icon
            a(href="https://aquitcd.github.io/Pentazemin/" target="_blank").link-text Pentazemin - Introduction
        h3.body-heading 種類
        p.body-paragraph
          | Desktop App for Mac/Windows/Linux
        h3.body-heading 技術
        p.body-paragraph
          | Electorn
          | Vue.js
          | NeDB
          | karma + mocha
          | Buefy(Buluma)
        h3.body-heading 概要
        p.body-paragraph
          | Pentazeminは今やるべきことへフォーカスし集中しながらタスク消化を支援するアプリです。
          | よくあるただのToDoアプリではなく、タイムマネジメントに近いものです。
          | ToDoアプリやポモドーロタイマーアプリは既に数多くありますが、
          | Pentazeminはその2つを組み合わせました。
        h3.body-heading 作った理由
        p.body-paragraph
          | 自分用のタスク管理としてタスクシュート的なことをやっていたけど、全部のタスクを分単位でスケジューリングすることがツラくて粒度もまちまちだったのでそこまで上手くいってなかった。
          | そこで、単タスクを集中するために使ってたポモドーロテクニックを組み合わせてしかも強制的に連続でやるようになったら上手くいくんじゃないかと思って作った
        h3.body-heading 開発秘話
        p.body-paragraph
          | そもそもWebアプリが多いなか、Webでやる必要性がないものはデスクトップアプリでやるべき、という思いがあった。
          | Vue.jsを本格的に使ってみるにあたって、Electronと組み合わせれば作れるんじゃないかと思って挑戦した。
          | 当時まだそこまでVue.jsが使われていないなか、試行錯誤してVueRouter,Vuexも使ってみたりして、苦労もあったけど得るものも大きかった。
          | その結果、国内外とわずいくつかのサイトで紹介されたりもしたし、今でもちょこちょことGitHubスターが増えている。
          | さらに技術力が上がった今、できれば内部をリファクタするとともに新機能も追加してアップデートしていきたいと考えている。
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
    await this.selectPageByName('pentazemin')
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
