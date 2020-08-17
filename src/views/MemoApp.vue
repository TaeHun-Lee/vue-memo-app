<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row>
        <v-col md="4" sm="12">
          <!-- LocalStorage / Vuex 선택 -->
          <memo-header />
        </v-col>
        <v-col md="8" sm="12">
          <!-- Store 상태에 따라 Form / List 형태로 Component 가변 -->
          <component class="topRight" :is="this.currentView.topRight" :memos="topRightProps" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <!-- Store 상태에 따라 Form / Memo 형태로 Component 가변 -->
      <component class="bottom" :is="this.currentView.bottom" :memo="bottomProps" @memoListUpdated="memoListUpdated"/>
    </v-col>
  </v-row>
</template>

<script>
import MemoHeader from '@/components/MemoHeader'
import MemoList from '@/components/MemoList'
import MemoForm from '@/components/MemoForm'
import Memo from '@/components/Memo'
import { mapState } from 'vuex'
export default {
  name: 'MemoApp',
  components: {
    MemoHeader,
    MemoList,
    MemoForm,
    Memo
  },
  computed: {
    ...mapState({
      currentView: state => state.views.currentView, // 우측 상단과 하단 중앙의 List | Form | Memo Component 여부
      currentList: state => state.views.currentList, // List 내부의 데이터가 Local Storage | Vuex 여부
      currentMemo: state => state.views.currentMemo, // 하단 중앙 Component가 Memo일 경우 노출할 데이터
    }),
    /**
     * 우측 상단 Component에 전달할 가변 Props
     */
    topRightProps () {
      if (this.currentView.topRight === 'MemoList') {
        return this.memosInArray
      } else {
        return null
      }
    },
    /**
     * 하단 중앙 Component에 전달할 가변 Props
     */
    bottomProps () {
      if (this.currentView.bottom === 'Memo') {
        return this.currentMemo
      } else {
        return null
      }
    }
  },
  data () {
    return {
      memosInArray: [] // LocalStorage 혹은 Vuex 내부의 Memo List Data
    }
  },
  watch: {
    /**
     * UI 변경 시마다 Memo List 확인
     */
    currentList () {
      this.getMemos()
    }
  },
  created () {
    this.getMemos()
  },
  methods: {
    /**
     * Local Storage 혹은 Vuex에서 Memo Data 파싱
     */
    getMemos () {
      if (this.currentList === 'LS') {
        const tempArr = []
        const memoInLS = JSON.parse(localStorage.getItem('memos'))
        if (memoInLS && memoInLS.length > 0) {
          for (const memo of memoInLS) {
            tempArr.push(memo)
          }
        }
        this.memosInArray = tempArr
      } else if (this.currentList === 'VX') {
        const vuexMemoList = this.$store.state.memos.memoList
        this.memosInArray = vuexMemoList
      }
    },
    /**
     * Form 등에서 Data 변경시 Emit되어 호출되는 함수
     */
    memoListUpdated () {
      this.getMemos()
    }
  }
}
</script>