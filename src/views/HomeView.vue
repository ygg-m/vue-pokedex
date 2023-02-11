<script setup>
import { storeToRefs, mapActions } from "pinia";
import Magnify from "vue-material-design-icons/Magnify.vue";
import PokeCard from "@/components/PokeCard.vue";

import { useMainStore } from "@/stores/main.js";
const main = useMainStore();

const { input, pokeList } = storeToRefs(main);
const { fetchPokemon } = mapActions(useMainStore, ["fetchPokemon"]);
</script>

<template>
  <section>
    <div class="input-container">
      <input type="text" v-model="input" @keyup.enter="fetchPokemon(input)" />
      <button @click="fetchPokemon(input)"><Magnify /></button>
    </div>
  </section>
  <section>
    <ul v-for="poke of pokeList">
      <PokeCard :pokeName="poke" />
    </ul>
  </section>
</template>

<style lang="sass">
@use '../assets/variables' as v

section
    display: flex
    justify-content: center

    padding: 1rem
    color: v.$gray-8

    input
        padding: .5rem

    .input-container
        display: flex
        border-radius: .5rem
        background-color: v.$gray-1
        outline: 1px solid v.$gray-8

        button
            cursor: pointer
            display: flex
            align-items: center
            border-radius: .5rem
            padding: 0 1rem
            color: v.$gray-1
            background: v.$gray-8

            span
                display: flex
                align-items: center
</style>
