<script>
import AppHeader from './components/AppHeader.vue'
import store from './store'
import { provide } from '@vue/runtime-core'

export default {
  components: {
    AppHeader
  },
  setup() {
    provide('store', store)
    return {
      store
    }
  }
}
</script>

<template>
  <div
    className="flex flex-col justify-center items-center
              bg-gray-100 h-screen w-screen"
  >
    <AppHeader :username="store.state.user?.username" />
    <router-view></router-view>
  </div>
</template>
