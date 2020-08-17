<template>
  <v-card class="ma-1">
    <!-- 읽기 상태 -->
    <template v-if="isRead">
      <v-card-title @click="changeToFixState">
        {{memo.memoTitle}}
      </v-card-title>
      <v-card-subtitle @click="changeToFixState">
        {{memo.memoContent}}
      </v-card-subtitle>
      <v-card-text>
        {{memo.memoDate}}
      </v-card-text>
      <v-btn @click="memoDelete">
        DELETE
      </v-btn>
    </template>
    <!-- 수정 상태 -->
    <template v-else>
      <v-form class="pa-4">
        <v-text-field label="Memo Title" v-model="fixMemoTitle" :value="memo.memoTitle">
        </v-text-field>
        <v-textarea label="Memo Content" v-model="fixMemoContent" :value="memo.memoContent">
        </v-textarea>
        <v-btn @click="fixMemo">
          SUBMIT
        </v-btn>
        <v-btn @click="memoDelete">
          DELETE
        </v-btn>
      </v-form>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Memo',
  props: {
    memo: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      currentList: state => state.views.currentList
    })
  },
  data () {
    return {
      isRead: true, // 읽기 상태 | 수정 상태
      fixMemoTitle: this.memo.memoTitle, // 수정일 경우 수정 중인 Data
      fixMemoContent: this.memo.memoContent, // 수정일 경우 수정 중인 Data
      fixMemoDate: this.memo.memoDate // 수정일 경우 수정 중인 Data
    }
  },
  methods: {
    /**
     * Memo 삭제
     */
    memoDelete () {
      if (this.currentList === 'LS') { // Local Storage 일 때
        const memosInLS = JSON.parse(localStorage.getItem('memos'))
        const indexOfDeleting = memosInLS.findIndex(memo => memo.memoTitle === this.memo.memoTitle)
        memosInLS.splice(indexOfDeleting, 1)
        localStorage.setItem('memos', JSON.stringify(memosInLS))
        this.$store.commit('views/setCurrentList', 'LS')
      } else if (this.currentList === 'VX') { // Vuex 일 때
        console.log('VX DELTE')
        this.$store.commit('memos/deleteMemoInStore', this.memo)
        this.$store.commit('views/setCurrentList', 'VX')
      }
      this.$emit('memoListUpdated') // 삭제 이후 List Update
    },
    /**
     * 읽기 상태에서 수정 상태로 전환
     */
    changeToFixState () {
      this.isRead = false
    },
    /**
     * 수정 이후 Submit
     */
    fixMemo () {
      const options = {
        timzone: 'Asia/Seoul',
        month: 'long',
        day: '2-digit',
        weekday: 'short'
      }
      const memoDate = new Intl.DateTimeFormat('kr-KR', options).format(new Date())
      const memoObj = {
        memoTitle: this.fixMemoTitle,
        memoContent: this.fixMemoContent,
        memoDate
      }
      if (this.currentList === 'LS') { // Local Storage 일 때
        const memosInLS = JSON.parse(localStorage.getItem('memos'))
        if (!memosInLS || memosInLS.length === 0) {
          localStorage.setItem('memos', JSON.stringify([memoObj]))
        } else {
          const indexOfDeleting = memosInLS.findIndex(memo => memo.memoTitle === this.memo.memoTitle)
          memosInLS[indexOfDeleting] = memoObj
          localStorage.setItem('memos', JSON.stringify(memosInLS))
        }
        this.$store.commit('views/setCurrentList', 'LS')
      } else if (this.currentList === 'VX') { // Vuex일 때
        this.$store.commit('memos/fixMemoInStore', { origin: this.memo, fixed: memoObj })
        this.$store.commit('views/setCurrentList', 'VX')
      }
      this.$emit('memoListUpdated') // 수정 이후 List Update
    }
  }
}
</script>