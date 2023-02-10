<template>
  <section>
    <input type="text" v-model="pokemonId" />
    <button @click="fetchPokemon">Fetch Pokemon</button>
    <ul v-if="pokemonList.length">
      <li v-for="pokemon in pokemonList" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </section>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      pokemonId: "",
      pokemonList: [],
    };
  },
  methods: {
    async fetchPokemon() {
      const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`;
      try {
        const response = await axios.get(url);
        this.pokemonList = [response.data];
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style></style>
