<template>
  <div>
    <memo-form 
      @memoListUpdated="memoListUpdated"
    />
    <div class="columns">
      <memo class="column"
      v-for="(memo, i) of memosInArray"
      :memoTitle="memo.memoTitle"
      :memoContent="memo.memoContent"
      :memoDate="memo.memoDate"
      :key="i"
      />
    </div>
  </div>
</template>

<script>
import Memo from '@/components/Memo'
import MemoForm from '@/components/MemoForm'
export default {
  name: 'MemoApp',
  components: {
    Memo,
    MemoForm
  },
  data () {
    return {
      memosInArray: []
    }
  },
  created () {
    this.getMemosInLocalStorage()
  },
  methods: {
    getMemosInLocalStorage () {
      const tempArr = []
      const memoInLS = JSON.parse(localStorage.getItem('memos'))
      if (memoInLS && memoInLS.length > 0) {
        for (const memo of memoInLS) {
          tempArr.push(memo)
        }
      }
      this.memosInArray = tempArr
    },
    memoListUpdated () {
      console.log('emmited')
      this.getMemosInLocalStorage()
    }
  }
}
</script>