<template>
  <v-main>
    <v-container>
      <memo-app />
    </v-container>
  </v-main>
</template>

<script>
import MemoApp from '@/views/MemoApp'

export default {
  name: 'Base',
  components: {
    MemoApp
  }
}
</script>