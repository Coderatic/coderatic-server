<template>
  <div class="bg-background-grey h-screen w-screen">
    <h1
      class="font-montserrat text-white font-semibold text-3xl pb-[5rem] pt-[5rem] text-center"
    >
      CODE<span class="font-montserrat text-purple-700 font-black">RATIC</span>
    </h1>
    <div class="flex flex-col justify-center items-center">
      <RegisterComp></RegisterComp>
    </div>
  </div>
</template>

<script lang="ts">

import RegisterComp from "./RegisterComp.vue"
export default {
  name: "RegisterPage",
  components: {
    RegisterComp,
  },
};
</script>

<style scoped>

</style>
