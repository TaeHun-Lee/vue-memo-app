<template>
  <div>
    <app-header />
    <memo-app />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import MemoApp from '@/views/MemoApp'

export default {
  name: 'Base',
  components: {
    AppHeader,
    MemoApp
  }
}
</script>

<style>

</style>