<template>
  <div>
    <h1>{{ memoTitle }}</h1>
    <h2>{{ memoContent }}</h2>
    <h3>{{ memoDate }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    memoTitle: {
      type: String,
      required: true
    },
    memoContent: {
      type: String,
      required: false
    },
    memoDate: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>