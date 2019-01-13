<template lang="pug">
li.menu_item
  nuxt-link.item_wrapper(
    :to="menu.path"
    :class="[menu.type === 'list' ? 'is-list' : 'is-block']"
  )
    .item.is-list(v-if="menu.type === 'list'")
      p.item_title {{menu.title}}
    .item.is-block(v-else)
      p.item_title {{menu.title}}
      img.item_img(:src="menu.image")
      p.item_description {{menu.description}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class MenuItem extends Vue {
  @Prop(Object) menu: object
}
</script>

<style lang="sass" scoped>
  .menu_item
    padding: 5px
    margin-left: -3rem
  .item_wrapper
    display: block
    padding: 5px
    background: $primary-color-base
    &:link, &:visited
      text-decoration: none
      .item_title
        color: $black-base
      .item_description
        color: $font-color-base
    &.is-list
      width: 25vw
      transform: skew(-21deg, -3deg)
      .item_title
        font-size: 3rem
    &.is-block
      width: 89vw
      transform: skew(-13deg, 0)
      .item_title
        font-size: 5rem
  .item
    background: $black-base
    text-align: left
    &:hover
      background: $primary-color-base
      .item_title
        color: $black-base
      .item_description
        color: $black-base
        font-weight: bold
        $outline-color: $font-color-base
        text-shadow: $outline-color 2px 0,  $outline-color -2px 0, $outline-color 0 -2px, $outline-color 0 2px, $outline-color 2px 2px , $outline-color -2px 2px, $outline-color 2px -2px, $outline-color -2px -2px, $outline-color 1px 2px,  $outline-color -1px 2px, $outline-color 1px -2px, $outline-color -1px -2px, $outline-color 2px 1px,  $outline-color -2px 1px, $outline-color 2px -1px, $outline-color -2px -1px
    &.is-list
      padding: 1rem 4rem
      .item_title
        transform: skew(21deg, 0)
    &.is-block
      padding: 2rem 4rem
      .item_title
        transform: skew(13deg, 0)
  .item_title
    font-weight: bold
    $outline-color: $font-color-base
    text-shadow: $outline-color 2px 0,  $outline-color -2px 0, $outline-color 0 -2px, $outline-color 0 2px, $outline-color 2px 2px , $outline-color -2px 2px, $outline-color 2px -2px, $outline-color -2px -2px, $outline-color 1px 2px,  $outline-color -1px 2px, $outline-color 1px -2px, $outline-color -1px -2px, $outline-color 2px 1px,  $outline-color -2px 1px, $outline-color 2px -1px, $outline-color -2px -1px
  .item_img
    transform: skew(13deg, 0)
    display: block
    margin: 0 auto
    max-width: 70%
    max-height: 480px
    text-align: center
  .item_description
    transform: skew(13deg, 0)
    font-size: 2rem
    white-space: pre-wrap
    padding: 1rem 2rem 1rem 10rem
</style>
