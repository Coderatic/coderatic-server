<template>
  <nav class="h-[70px] bg-black w-[100%] sticky border-b-2 border-purple-700">
    <div class="flex justify-between items-center h-[100%]">
      <div>
        <h1
          class="font-montserrat text-white font-semibold text-2xl text-center ml-10"
        >
          CODE<span class="font-montserrat text-purple-700 font-black"
            >RATIC</span
          >
        </h1>
      </div>
      <div class="grow">
        <ul class="flex gap-10 mr-32 justify-end">
          <li>
            <a class="text-white font-montserrat text-[15px]" href="">Home</a>
          </li>
          <li>
            <a class="text-white font-montserrat text-[15px]" href="">Competitons</a>
          </li>
          <li>
            <a class="text-white font-montserrat text-[15px]" href="">Practice</a>
          </li>
          <li>
            <a class="text-white font-montserrat text-[15px]" href="">Profile</a>
          </li>
        </ul>
      </div>
      <div>
        <div class="h-[40px] w-[40px] rounded-[50%] bg-white mr-10"></div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: "NavBar",
};
</script>

<style scoped></style>
