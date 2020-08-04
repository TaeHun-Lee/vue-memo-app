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
  data () {
    return {
      memoTitle: '',
      memoContent: '',
      memoDate: ''
    }
  },
  created () {
    const memoInLS = JSON.parse(localStorage.getItem('memos'))
    if (memoInLS && memoInLS.length > 0) {
      for (const memo of memoInLS) {
        this.memoTitle = memo.memoTitle
        this.memoContent = memo.memoContent
        this.memoDate = memo.memoDate
      }
    }
  }
}
</script>

<style>

</style>