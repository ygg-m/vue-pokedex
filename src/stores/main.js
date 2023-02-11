import axios from "axios";
import { defineStore } from "pinia";
// import { computed, ref } from "vue";

export const useMainStore = defineStore("main", {
  state: () => ({
    input: "",
    pokeInfo: {
      base: {},
      species: {},
      evolutionChain: {},
    },
    pokeList: [],
    loading: true,
  }),
  actions: {
    async fetchPokemon(poke) {
      const url = `https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`;
      try {
        const response = await axios.get(url);
        this.pokeInfo.base = response.data;
        this.pokeList = [];
        await this.species();
      } catch (error) {
        console.error(error);
      }
    },
    async species() {
      const speciesUrl = this.pokeInfo.base.species.url;
      try {
        const speciesResponse = await axios.get(speciesUrl);
        this.pokeInfo.species = speciesResponse.data;
        await this.evolutionChain();
      } catch (error) {
        console.error(error);
      }
    },
    async evolutionChain() {
      const evoChainUrl = this.pokeInfo.species.evolution_chain.url;
      try {
        const evoChainResponse = await axios.get(evoChainUrl);
        this.pokeInfo.evolutionChain = evoChainResponse.data;
        this.getEvolutionList(this.pokeInfo.evolutionChain.chain);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    getEvolutionList(chain) {
      const hasEvolution = chain.species?.name !== null;
      if (hasEvolution) this.pokeList.push(chain.species?.name);
      const list = chain.evolves_to.map((e) => this.getEvolutionList(e));
      return list;
    },
  },
});
