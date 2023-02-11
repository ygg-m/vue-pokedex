<script setup>
import { RouterLink, RouterView } from "vue-router";

import Github from "vue-material-design-icons/Github.vue";
import PokeballIcon from "@/assets/pokéball-icon.png";

import "@/assets/main.css";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <div class="logo">
          <img :src="PokeballIcon" alt="Pokéball Icon" />
          <h1>Pokédex</h1>
        </div>
      </RouterLink>
      <a class="link" href="https://github.com/ygg-m/vue-pokedex"><Github /></a>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="sass">
@use './assets/variables' as v

nav
  color: v.$gray-1
  background: v.$gray-8
  padding: .5rem

  display: flex
  align-items: center
  justify-content: space-between

  h1
    font-size: 1.5rem

  .logo
    display: flex
    align-items: center
    gap: .5rem

    img
      max-width: 2rem

  .link
    transition: 200ms
    &:hover
      color: v.$orange
</style>
