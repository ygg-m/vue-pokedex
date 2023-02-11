<script>
import axios from "axios";

export default {
  props: {
    pokeName: String,
  },
  data() {
    return {
      pokeInfo: {
        base: {},
        species: {},
        evolutionChain: {},
      },
      evolutionList: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchPokemon(this.pokeName);
  },
  methods: {
    async fetchPokemon(poke) {
      const url = `https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`;
      try {
        const response = await axios.get(url);
        this.pokeInfo.base = response.data;
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
      if (hasEvolution) this.evolutionList.push(chain.species?.name);
      const list = chain.evolves_to.map((e) => this.getEvolutionList(e));
      return list;
    },
  },
};
</script>
<template>
  <RouterLink :to="`/pokemon/${pokeName}`">
    <article :class="pokeInfo.base?.types[0]?.type?.name" v-if="!loading">
      <div class="info">
        <span class="number">#{{ pokeInfo.base.id }}</span>
        <span class="name">{{ pokeInfo.base.name }}</span>
        <div class="types">
          <div
            :class="pokeType.type.name"
            v-for="pokeType of pokeInfo.base.types"
          >
            {{ pokeType.type.name }}
          </div>
        </div>
      </div>
      <div class="image">
        <img
          :src="pokeInfo.base?.sprites?.front_default"
          alt="Pokémon Official Sprite"
        />
      </div>
    </article>
    <article v-else>loading</article>
  </RouterLink>
</template>
<style lang="sass" scoped>
@use '../assets/variables' as v

article
  display: flex
  align-items: center
  justify-content: space-between
  gap: .5rem
  text-transform: capitalize
  padding: .5rem
  border-radius: .5rem
  outline: 1px solid
  transition: 100ms

  &:hover
    z-index: 5
    scale: 1.05
    -webkit-box-shadow: 0px 16px 24px 0px rgba(0,0,0,0.09)
    -moz-box-shadow: 0px 16px 24px 0px rgba(0,0,0,0.09)
    box-shadow: 0px 16px 24px 0px rgba(0,0,0,0.09)

  .info
    display: flex
    flex-direction: column
    gap: .5rem

    .name
      font:
        size: 1.5rem
        weight: bold

    .types
      display: flex
      flex-wrap: wrap
      gap: .5rem

      div
        padding: .3rem .5rem
        border-radius: .5rem
        color: v.$gray-1

      .normal
        background-color: v.$normal

      .flying
        background-color: v.$flying

      .grass
        background-color: v.$grass

      .fire
        background-color: v.$fire

      .water
        background-color: v.$water

      .fighting
        background-color: v.$fighting

      .poison
        background-color: v.$poison

      .electric
        background-color: v.$electric

      .ground
        background-color: v.$ground

      .psychic
        background-color: v.$psychic

      .rock
        background-color: v.$rock

      .ice
        background-color: v.$ice

      .bug
        background-color: v.$bug

      .dragon
        background-color: v.$dragon

      .dark
        background-color: v.$dark

      .steel
        background-color: v.$steel

      .fairy
        background-color: v.$fairy

      .ghost
        background-color: v.$ghost
</style>
