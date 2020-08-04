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
      const memoObj = {
        memoTitle: this.memoTitle,
        memoContent: this.memoContent,
        memoDate: new Date()
      }

      const memosInLS = JSON.parse(localStorage.getItem('memos'))
      console.log('LS check --->', memosInLS)
      if (!memosInLS || memosInLS.length === 0) {
        localStorage.setItem('memos', JSON.stringify([].push(memoObj)))
      } else {
        memosInLS.push(memoObj)
        localStorage.setItem('memos', memosInLS)
      }
    }
  }
}
</script>

<style>

</style>