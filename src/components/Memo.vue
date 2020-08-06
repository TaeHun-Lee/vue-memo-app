<template>
  <div>
    <h2>{{ memoTitle }}</h2>
    <p>{{ memoContent }}</p>
    <p>{{ memoDate }}</p>
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