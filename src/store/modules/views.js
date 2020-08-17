const views = {
  namespaced: true,
  state: () => ({
    currentView: {
      topRight: 'MemoList', // 우측 상단 Component
      bottom: 'MemoForm' // 하단 중앙 Component
    },
    currentList: 'LS', // List의 형태 (Local Storage | Vuex)
    currentMemo: {} // 하단 중앙 Component가 Memo가 될 때 Display할 Data
  }),
  mutations: {
    /**
     * 가변 Component를 정의
     * @param {*} state 
     * @param {*} payload 
     */
    setCurrentView(state, payload) {
      state.currentView.topRight = payload.topRight
      state.currentView.bottom = payload.bottom
    },
    /**
     * List 형태를 정의하면서 UI 초기화
     * @param {*} state 
     * @param {*} payload 
     */
    setCurrentList(state, payload) {
      state.currentView.topRight = 'MemoList'
      state.currentView.bottom = 'MemoForm'
      state.currentList = payload
    },
    /**
     * Memo Component에 Display할 Data Set
     * @param {*} state 
     * @param {*} payload 
     */
    setCurrentMemo(state, payload) {
      state.currentMemo.memoTitle = payload.memoTitle
      state.currentMemo.memoContent = payload.memoContent
      state.currentMemo.memoDate = payload.memoDate
    }
  }
}

export default views