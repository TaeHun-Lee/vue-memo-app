<template>
  <div>
    <memo-form />
    <memo />
  </div>
</template>

<script>
import Memo from '../components/Memo'
import MemoForm from '../components/MemoForm'
export default {
  name: 'MemoApp',
  components: {
    Memo,
    MemoForm
  }
}
</script>

<style>

</style>