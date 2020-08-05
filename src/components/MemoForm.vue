<template>
  <div>
    <input v-model="memoTitle" />
    <input v-model="memoContent" />
    <button @click="submitMemo">제출</button>
  </div>
</template>

<script>
export default {
  name: 'MemoForm',
  data () {
    return {
      memoTitle: '',
      memoContent: '',
      memoDate: ''
    }
  },
  methods: {
    submitMemo () {
      const options = {
        timzone: 'Asia/Seoul',
        month: 'long',
        day: '2-digit',
        weekday: 'short'
      }
      const memoDate = new Intl.DateTimeFormat('kr-KR', options).format(new Date())
      const memoObj = {
        memoTitle: this.memoTitle,
        memoContent: this.memoContent,
        memoDate
      }

      const memosInLS = JSON.parse(localStorage.getItem('memos'))
      if (!memosInLS || memosInLS.length === 0) {
        localStorage.setItem('memos', JSON.stringify([memoObj]))
      } else {
        memosInLS.push(memoObj)
        localStorage.setItem('memos', JSON.stringify(memosInLS))
      }
      this.$emit('memoListUpdated')
    }
  }
}
</script>

<style>

</style>