<template>
  <div
    class="hamburgerMenu hidden sm:block md:block w-screen bg-black py-4 absolute translate-y-[-129px] transition-all"
  >
    <ul class="flex flex-col gap-6 justify-center items-center">
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
  <div class="bg-gradient-to-r from-purple-700 to-red-900 pb-[2px] relative">
    <nav class="h-[70px] bg-background-grey-dark w-[100%] sticky">
      <div class="flex justify-between items-center h-[100%]">
        <div class="hidden sm:block md:block">
          <div class="flex justify-center items-center ml-4">
            <div class="h-[30px] w-[35px] rounded bg-purple-700 p-[1.5px]">
              <div
                v-on:click="translateBox"
                class="bg-black h-[100%] w-[100%] rounded flex flex-col justify-around hover:bg-gray-700"
              >
                <hr class="mx-2 mt-1 border-b-[1px]" />
                <hr class="mx-2 border-b-[1px]" />
                <hr class="mx-2 mb-1 border-b-[1px]" />
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
              class="font-montserrat text-white font-semibold text-2xl text-center ml-[80px]"
            >
              C<span class="font-montserrat text-purple-700 font-black">R</span>
            </h1>
          </div>
        </div>
        <div class="mr-10 sm:mr-2 md:mr-2" v-if="!isLoggedIn">
          <div
            class="h-[40px] bg-gradient-to-r from-purple-700 to-red-800 p-[1px] rounded"
          >
            <div
              class="bg-black w-full h-full rounded sm:text-sm md:text-sm px-2 sm:px-1 md:px-1 flex items-center"
            >
              <a class="text-white font-montserrat" href="/#/login"
                >Sign Up / Log In</a
              >
            </div>
          </div>
        </div>
        <div class="mr-10 sm:mr-2 md:mr-2" v-if="isLoggedIn">
          <div class="w-[50px] h-[50px] rounded-[50%] bg-white"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
var down = false;
export default {
  name: "NavBar",
  methods: {
    translateBox() {
      const box = document.querySelector(".hamburgerMenu") as HTMLElement;
      if (!down) {
        box.style.transform = "translateY(72px)";
        down = true;
      } else {
        box.style.transform = "translateY(-129px)";
        down = false;
      }
    },
  },
  computed: {
    isLoggedIn() {
      return (this.$store.getters.isAuthenticated);
    },
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
};
</script>

<style scoped></style>
