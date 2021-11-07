<template>
  <div
    className="fixed top-0 left-0 w-screen h-16 flex flex-row justify-between items-center
    bg-gray-700 text-white shadow-lg"
  >
    <h3 className="mx-2">Supabase Demo ToDo List</h3>
    <h1 v-if="username" className="mx-2">Hello {{ username }}</h1>
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
