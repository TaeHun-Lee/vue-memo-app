<template>
  <div>
    <v-card outlined tile>
      <template v-if="isCurrentPositionTopRight">
        <div @click="clickTopRightMemoForm">
          <v-card-title>
            CLICK HERE FOR MEMO FORM
          </v-card-title>
          <v-form class="pa-4">
            <v-text-field label="Memo Title" v-model="this.memoForm.memoTitle">
            </v-text-field>
            <v-text-field label="Memo Content" v-model="this.memoForm.memoContent">
            </v-text-field>
          </v-form>
        </div>
      </template>
      <template v-else>
        <v-form class="pa-4">
          <v-text-field label="Memo Title" v-model="memoTitle" @change="onChangeValue">
          </v-text-field>
          <v-textarea label="Memo Content" v-model="memoContent" @change="onChangeValue">
          </v-textarea>
          <v-btn @click="submitMemo">
            SUBMIT
          </v-btn>
        </v-form>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MemoForm',
  data () {
    return {
      memoTitle: '',
      memoContent: '',
      memoDate: ''
    }
  },
  computed: {
    ...mapState({
      currentView: state => state.views.currentView,
      currentList: state => state.views.currentList,
      memoForm: state => state.memos.memoForm
    }),
    isCurrentPositionTopRight () {
      if (this.currentView.topRight === 'MemoForm') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.memoTitle = this.memoForm?.memoTitle
      this.memoContent = this.memoForm?.memoContent
    },
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
      if (this.currentList === 'LS') {
        const memosInLS = JSON.parse(localStorage.getItem('memos'))
        if (!memosInLS || memosInLS.length === 0) {
          localStorage.setItem('memos', JSON.stringify([memoObj]))
        } else {
          memosInLS.push(memoObj)
          localStorage.setItem('memos', JSON.stringify(memosInLS))
        }
      } else if (this.currentList === 'VX') {
        this.$store.commit('memos/setMemosInStore', memoObj)
      }
      this.$store.commit('memos/deleteMemoForm')
      this.$emit('memoListUpdated')
    },
    clickTopRightMemoForm () {
      const viewObj = {
        topRight: 'MemoList',
        bottom: 'MemoForm'
      }
      this.$store.commit('views/setCurrentView', viewObj)
    },
    onChangeValue () {
      const { memoTitle, memoContent } = this 
      this.$store.commit('memos/setMemoForm', {
        memoTitle,
        memoContent
      })
    }
  }
}
</script>