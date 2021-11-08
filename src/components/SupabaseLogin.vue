<template>
  <div className="w-full max-w-xs">
    <form
      className="flex flex-col justify-center items-center
        bg-gray-100 shadow-lg rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          v-model="username"
          className="shadow appearance-none border rounded w-full
            py-2 px-3 text-gray-700 leading-tight focus:ring-2"
          type="text"
          placeholder="Username..."
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          className="shadow appearance-none border rounded w-full
            py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-2"
          type="password"
          placeholder="Password..."
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded
            focus:outline-none focus:shadow-outline"
          type="button"
          @click="store.methods.login(username, password)"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
  setup() {
    const store = inject('store')
    return {
      store
    }
  },
  data() {
    return { username: '', password: '' }
  }
}
</script>
