<template>
  <div
    className="fixed top-0 left-0 w-screen h-16 flex flex-row justify-between items-center
    bg-gray-700 text-white shadow-lg"
  >
    <router-link :to="{ name: 'home' }">
      <h3 className="mx-2">Supabase Demo ToDo List</h3>
    </router-link>
    <h1 v-if="username" className="mx-2">Hello {{ username }}</h1>
    <router-link v-else :to="{ name: 'login' }">
      <h2 className="mx-2 border-5 rounded bg-blue-600 px-4 py-2">Sign In</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: ''
    }
  }
}
</script>
