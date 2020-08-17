<template>
  <v-card outlined tile>
    <v-card-title>
      Memo List in {{ getListName }}
    </v-card-title>
    <!-- If Memo exist -->
    <template v-if="isMemoExist">
      <v-slide-group show-arrows>
        <v-slide-item v-for="(memo, index) of memos" :key="index">
          <v-card class="ma-1" @click="memoInListClick(memo)">
            <v-card-title>
              {{memo.memoTitle}}
            </v-card-title>
            <v-card-text>
              {{memo.memoDate}}
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </template>
    <!-- If Memo not exist -->
    <template v-else>
      <v-card-title>
        No Memo Exist
      </v-card-title>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MemoList',
  props: {
    memos: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      currentList: state => state.views.currentList,
    }),
    getListName () {
      if (this.currentList === 'LS') {
        return 'Local Storage'
      } else if (this.currentList === 'VX') {
        return 'Vuex'
      } else {
        return null
      }
    },
    isMemoExist () {
      if (this.memos.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    memoInListClick (memo) {
      this.$store.commit('views/setCurrentMemo', memo)
      const viewObj = {
        topRight: 'MemoForm',
        bottom: 'Memo'
      }
      this.$store.commit('views/setCurrentView', viewObj)
    }
  }
}
</script>