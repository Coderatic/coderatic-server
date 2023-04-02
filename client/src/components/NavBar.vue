<template>
  <div class="bg-gradient-to-r from-purple-700 to-red-900 pb-[2px] sticky">
    <nav class="h-[70px] bg-background-grey-dark w-[100%] sticky">
      <div class="flex justify-between items-center h-[100%]">
		<div class="hidden sm:block md:block">
          <div class="flex justify-center items-center ml-4">
            <div class="h-[40px] w-[40px] rounded bg-purple-700 p-[1.5px]">
				<div class="bg-black h-[100%] w-[100%] rounded flex flex-col justify-around">
					<hr class="mx-2 mt-1 border-b-[1px]">
					<hr class="mx-2  border-b-[1px]">
					<hr class="mx-2 mb-1 border-b-[1px]">

				</div>
			</div>
           
          </div>
        </div>
        <div class="sm:hidden md:hidden">
          <h1
            class="font-montserrat text-white font-semibold text-2xl text-center ml-10"
          >
            CODE<span class="font-montserrat text-purple-700 font-black"
              >RATIC</span
            >
          </h1>
        </div>
        <div class="grow sm:hidden md:hidden">
          <ul class="flex gap-10 mr-20 justify-end">
            <li>
              <a
                class="text-white font-montserrat text-[15px] hover:bg-gray-700 py-2 px-1"
                :class="
                  currentRouteName === 'Home Page'
                    ? 'border-b-[3px] border-purple-700 hover:rounded'
                    : 'rounded'
                "
                href=""
                >Home</a
              >
            </li>
            <li>
              <a
                class="text-white font-montserrat text-[15px] hover:bg-gray-700 py-2 px-1"
                :class="
                  currentRouteName === 'Competition'
                    ? 'border-b-[3px] border-purple-700 hover:rounded'
                    : 'rounded'
                "
                href="/#/competition"
                >Competitons</a
              >
            </li>
            <li>
              <a
                class="text-white font-montserrat text-[15px] hover:bg-gray-700 py-2 px-1"
                :class="
                  currentRouteName === 'Practice'
                    ? 'border-b-[3px] border-purple-700 hover:rounded'
                    : 'rounded'
                "
                href=""
                >Practice</a
              >
            </li>
            <li>
              <a
                class="text-white font-montserrat text-[15px] hover:bg-gray-700 py-2 px-1"
                :class="
                  currentRouteName === 'Profile Page'
                    ? 'border-b-[3px] border-purple-700 hover:rounded'
                    : 'rounded'
                "
                href=""
                >Profile</a
              >
            </li>
          </ul>
        </div>
        <div class="grow hidden sm:block md:block">
          <div class="flex justify-center items-center">
            <!-- <div class="h-[40px] w-[40px] rounded bg-purple-700 p-[1px]">
				<div class="bg-black h-[100%] w-[100%] rounded">

				</div>
			</div> -->
            <h1
              class="font-montserrat text-white font-semibold text-2xl text-center ml-10"
            >
              C<span class="font-montserrat text-purple-700 font-black">R</span>
            </h1>
          </div>
        </div>
        <div>
          <div class="h-[40px] w-[40px] rounded-[50%] bg-white mr-10"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavBar",
  computed: {
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
};
</script>

<style scoped></style>
