<template>
  <div>
    <v-card outlined tile>
      <v-card-title>
        메모 어플리케이션
      </v-card-title>
      <v-card-text @click="clickLS">
        Local Storage
      </v-card-text>
      <v-card-text @click="clickVX">
        Vuex
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    /**
     * List 형태를 Local Stroage로 Set
     */
    clickLS () {
      this.$store.commit('views/setCurrentList', 'LS')
    },
    /**
     * List 형태를 Vuex로 Set
     */
    clickVX () {
      this.$store.commit('views/setCurrentList', 'VX')
    }
  }
}
</script>