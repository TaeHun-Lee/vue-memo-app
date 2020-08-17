const memos = {
  namespaced: true,
  state: () => ({
    memoList: [], // Vuex에 등록되는 Memo List
    memoForm: {} // Form에 임시적으로 저장되는 Data
  }),
  mutations: {
    /**
     * Vuex에 Memo Data를 저장
     * @param {*} state 
     * @param {*} payload 
     */
    setMemosInStore (state, payload) {
      const options = {
        timzone: 'Asia/Seoul',
        month: 'long',
        day: '2-digit',
        weekday: 'short'
      }
      const memoDate = new Intl.DateTimeFormat('kr-KR', options).format(new Date())
      const memoObj = {
        memoTitle: payload.memoTitle,
        memoContent: payload.memoContent,
        memoDate
      }
      state.memoList.push(memoObj)
    },
    /**
     * Vuex에 있는 Memo data를 수정
     * @param {*} state 
     * @param {*} payload 
     */
    fixMemoInStore (state, payload) {
      const indexOfDeleting = state.memoList.findIndex(memo => memo.memoTitle === payload.origin.memoTitle)
      state.memoList[indexOfDeleting] = payload.fixed
    },
    /**
     * Vuex에 있는 Memo Data를 삭제
     * @param {*} state 
     * @param {*} payload 
     */
    deleteMemoInStore (state, payload) {
      const indexOfDeleting = state.memoList.findIndex(memo => memo.memoTitle === payload.memoTitle)
      state.memoList.splice(indexOfDeleting, 1)
    },
    /**
     * Form Data를 임시 저장
     * @param {*} state 
     * @param {*} payload 
     */
    setMemoForm (state, payload) {
      state.memoForm = payload
    }
  }
}

export default memos