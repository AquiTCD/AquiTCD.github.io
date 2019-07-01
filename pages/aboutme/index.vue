<template lang="pug">
  .contents
    .content
      h2.content-heading Aqui TSUCHIDA
      p.content-body
        | Web engineer
        | Rubyist, JSer
        | a.k.a. Aqui the Yak Shaver
      p.content-body
        | 神奈川は横浜の地で生まれ育ち
        | 武術に明け暮れたり、海外に住んだり放浪したり
        | カスタマーサポートやイベント業界で仕事もしたり
        | 紆余曲折あった後、今は都内でWebエンジニアとして一生懸命に暮らしています
        |
        | 左手にはRuby、Railsの盾を構え
        | 右手にTypeScript、Vueの剣を持ち
        | 今日もサーバーサイドとフロントエンドの二つを戦場として生きています
    .content
      h2.content-heading Skills
      ul.skill-lists.content-body
        li.skill-list
          span.skillset Ruby
          ul
            li.skill
              span.skill_title Ruby On Rails
              span.skill_rating ★★★☆☆
            li.skill
              span.skill_title Rspec
              span.skill_rating ★★★☆☆
        li.skill-list
          span.skillset JavaScript(TypeScript)
          ul
            li.skill
              span.skill_title Vue.js
              span.skill_rating ★★★☆☆
            li.skill
              span.skill_title Google App Script
              span.skill_rating ★★★☆☆
            li.skill
              span.skill_title Jest
              span.skill_rating ★★☆☆☆
        li.skill-list
          span.skillset Infrastructure
          ul
            li.skill
              span.skill_title AWS
              span.skill_rating ★★☆☆☆
            li.skill
              span.skill_title GCP
              span.skill_rating ★★☆☆☆
        li.skill-list
          span.skillset Other TECHs
          ul
            li.skill
              span.skill_title Git
              span.skill_rating ★★★★☆
            li.skill
              span.skill_title HTML5
              span.skill_rating ★★★★☆
            li.skill
              span.skill_title CSS
              span.skill_rating ★★★★☆
            li.skill
              span.skill_title Electron
              span.skill_rating ★★☆☆☆
            li.skill
              span.skill_title Adobe Photoshop
              span.skill_rating ★★★☆☆
            li.skill
              span.skill_title Adobe Illustlator
              span.skill_rating ★★★☆☆
        li.skill-list
          span.skillset 語学
          ul
            li.skill
              span.skill_title 日本語
              span.skill_rating ★★★★★
            li.skill
              span.skill_title 英語
              span.skill_rating ★★★☆☆
            li.skill
              span.skill_title スペイン語
              span.skill_rating ★★☆☆☆
            li.skill
              span.skill_title 広東語
              span.skill_rating ★★☆☆☆
            li.skill
              span.skill_title 中国語（普通話）
              span.skill_rating ★☆☆☆☆
        li.skill-list
          span.skillset ソフトスキル
          ul
            li.skill
              span.skill_title_only カスタマーサポート経験
            li.skill
              span.skill_title_only マーケティング経験
            li.skill
              span.skill_title_only イベント制作経験
      .content
        h2.content-heading Strength
        cite 『StrengthFinder』の診断結果より
        dl.content-body
          dt.strength-title 公平性
          dd.strength-body バランスをとても大切にし、人々を平等に扱うことを強く信じています。
          dt.strength-title 学習欲
          dd.strength-body 知らない状態から着実で計画的プロセスを経て、能力を備えた状態に移行していくのを好みます。
          dt.strength-title 責任感
          dd.strength-body 自分がやると言ったことに対しては何でもやり遂げようという強い気持ちを持っています。
          dt.strength-title 回復志向
          dd.strength-body 状況を分析し、何が悪いのかを突き止め、解決策を見い出すという挑戦を楽しんで行なえます。
          dt.strength-title 調和性
          dd.strength-body 周囲の人々が異なる意見を持っていると、共通する部分を見出し調和に向かわせようとします
      .content
        h2.content-heading Details/Thoughts
        p.content-body
          nuxt-link(to="/thoughts") Thoughts
          | にまとめています
      .content
        h2.content-heading Activity History
        .content-body.history
          h3 Products
          p
            nuxt-link(to="/products") Products
            | にまとめています
          h3 Presentations/Talks
          h4 Public
          ul
            li
              a(href="https://speakerdeck.com/aquitcd/the-way-to-develop-gas-with-mocking-integration-test-by-jest" target="_blank") GAS開発のJestによるモック入り結合テスト仕立て@【エンジニア交流会】Google Apps Script 活用ミートアップ #3
          h4 Private
          ul
            li 2017年 （前職）社内勉強会 最優秀トーク賞
            li 2018年 （前職）社内勉強会 優秀トーク賞
          h3 Writing
          ul
            li
              | blog:
              a(href="https://blog.solunita.net/" target="_blank") Trial and Spiral
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class extends Vue {
  // scrollToTop: true
  @State currentPage;
  @Action("SELECT_PAGE_BY_NAME") selectPageByName;
  async mounted() {
    await this.selectPageByName("aboutme");
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
.skill-lists
  list-style: none
  display: flex
  flex-wrap: wrap
  justify-content: left
  width: 100%
  & > li
    padding: 0 2rem 1rem 1rem
    font-size: 2.5rem
    min-width: 350px
    & > ul
      padding-left: 1rem
      list-style: none
      & > li
        padding: 0.3rem
        font-size: 2rem
.skillset
  display: block
  border-bottom: 2px solid $grey-base
.skill
  text-align: right
.skill_title
  &:after
    content: ':'
    margin-left: 0.5rem
    margin-right: 0.5rem
.skill_rating
  display: inline-block
  padding-top: 0
  padding-bottom: 0
  margin-top: 0
.strength-title
  font-size: 3rem
  font-weight: bold
  &:after
    content: ':'
    margin-left: 0.5rem
.strength-body
  font-size: 2rem
  padding-left: 3rem
  &:not(:last-of-type)
    padding-bottom: 1rem
.history
  p
    padding-bottom: 2rem
    line-height: 1.75
  h4
    padding-left: 2rem
  ul
    padding-left: 7rem
    padding-bottom: 1rem
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
