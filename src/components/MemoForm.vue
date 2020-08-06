<template>
  <div class="memoForm">
    <input v-model="memoTitle" placeholder="메모 제목" />
    <textarea v-model="memoContent" placeholder="메모 내용" />
    <input class="memoSubmit" type="submit" @click.prevent="submitMemo" value="제출" />
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