<script>
import axios from "axios";
import PokeCard from "@/components/PokeCard.vue";

export default {
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
    this.fetchPokemon(this.$route.params.pokeName);
  },
  components: { PokeCard },
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
  <article v-if="!loading" :class="pokeInfo.base.types[0].type.name">
    <div class="basic-info">
      <span class="number">#{{ pokeInfo.base.id }}</span>
      <h1 class="name">{{ pokeInfo.base.name }}</h1>
    </div>
    <picture
      ><img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeInfo.base.id}.png`"
        alt=""
    /></picture>
    <div class="types">
      <div :class="pokeType.type.name" v-for="pokeType of pokeInfo.base.types">
        {{ pokeType.type.name }}
      </div>
    </div>
    <div class="infos">
      <div class="category">
        <div class="title">Abilities</div>
        <div class="items">
          <div class="item" v-for="ability of pokeInfo.base.abilities">
            {{ ability.ability.name }}
          </div>
        </div>
      </div>
      <div class="category">
        <div class="title">Category</div>
        <div class="item" v-for="gene of pokeInfo.species.genera">
          <span v-if="gene.language.name === 'en'">{{ gene.genus }}</span>
        </div>
      </div>
      <div class="category">
        <div class="title">Shape</div>
        <div class="item">
          {{ pokeInfo.species.shape.name }}
        </div>
      </div>
      <div class="category">
        <div class="title">Growth Rate</div>
        <div class="item">
          {{ pokeInfo.species.growth_rate.name }}
        </div>
      </div>
      <div class="split-category">
        <div class="category">
          <div class="title">Weight</div>
          <div class="item">{{ pokeInfo.base.weight / 10 }} kg</div>
        </div>
        <div class="category">
          <div class="title">Height</div>
          <div class="item">{{ pokeInfo.base.height / 10 }} m</div>
        </div>
      </div>
      <div class="stats">
        <div class="stat" v-for="stat of pokeInfo.base.stats">
          <span class="name">{{ stat.stat.name }}</span>
          <span class="value">{{ stat.base_stat }}</span>
        </div>
      </div>
      <section class="evolutions">
        <span class="title">Evolutions</span>
        <div class="list">
          <ul v-for="poke of evolutionList">
            <PokeCard :pokeName="poke" />
          </ul>
        </div>
      </section>
    </div>
  </article>
  <article v-else>loading</article>
</template>

<style lang="sass" scoped>
@use '../assets/variables' as v

article
    display: flex
    flex-direction: column
    align-items: center
    padding: 1rem
    text-transform: capitalize

    .evolutions
      margin-top: 1rem
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      gap: .5rem

      .title
        text-align: center

      .list
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: center
        gap: .5rem

    .basic-info
        text-align: center
        display: flex
        align-items: center
        flex-direction: column
        .number
            width: fit-content
            font-size: 1.5rem
            outline: solid 1px
            padding: .5rem
            border-radius: 10rem
        .name
            font-size: 3rem
            font-weight: 800

    picture
        position: relative
        z-index: 0
        img
            z-index: 5

    picture::before
        z-index: -1
        content: ''
        outline: 3px solid
        width: 100%
        height: 100%
        position: absolute
        border-radius: 100%
        scale: 0.85

    .types
        display: flex
        gap: .5rem

        div
            display: flex
            align-items: center
            justify-content: center
            padding: .5rem
            border-radius: .5rem
            flex-basis: 100%
            color: v.$gray-1
            font-size: 1.5rem



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

    .infos
        margin-top: 1rem
        background-color: v.$gray-1
        padding: 1rem
        border-radius: .5rem
        min-width: 400px
        outline: 1px solid

        .category
            display: flex
            justify-content: space-between
            border-bottom: 1px solid v.$gray-3
            padding: .5rem 0
            .items
                display: flex
                gap: .5rem
        .stats
            display: flex
            align-items: center
            justify-content: center
            flex-wrap: wrap
            gap: 1rem
            padding: 1rem 0 0

            .stat
                padding: .5rem
                text-align: center
                display: flex
                flex-direction: column
                align-items: center
                justify-content: center
                outline: 1px solid
                gap: .5rem
                border-radius: .5rem
                width: 30%

                .name
                    font-size: .75rem

                .value
                    font-weight: bold
</style>
