<template>
  <div
    class="hamburgerMenu hidden sm:block md:block w-screen bg-background-grey-dark py-4 absolute translate-y-[-154px] transition-all"
  >
    <ul class="flex flex-col gap-6 justify-center items-center">
      <li>
        <a
          class="text-white font-robotomono text-[15px] hover:bg-gray-700 py-2 px-1"
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
          class="text-white font-robotomono text-[15px] hover:bg-gray-700 py-2 px-1"
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
          class="text-white font-robotomono text-[15px] hover:bg-gray-700 py-2 px-1"
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
          class="text-white font-robotomono text-[15px] hover:bg-gray-700 py-2 px-1"
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
    <nav class="h-[45px] bg-background-grey-dark w-[100%] sticky">
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
            class="font-montserrat text-white font-semibold text-[20px] text-center ml-10"
          >
            CODE<span class="font-montserrat text-purple-700 font-black"
              >RATIC</span
            >
          </h1>
        </div>
        <div class="grow sm:hidden md:hidden">
          <div class="flex justify-center" v-if="problemPage">
            <div
              class="rounded-l-3xl rounded-r-3xl bg-purple-700 p-[2px] translate-y-[30%] mr-[110px]"
            >
              <div
                class="px-10 py-[8px] rounded-l-3xl rounded-r-3xl bg-background-grey flex flex-col justify-center"
              >
                <p class="font-robotomono text-lg text-white">2:53:34</p>
              </div>
            </div>
          </div>
          <ul class="flex gap-10 mr-8 justify-end" v-if="!problemPage">
            <li>
              <a
                class="text-white font-robotomono text-[13px] hover:bg-gray-700 py-2 px-1"
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
                class="text-white font-robotomono text-[13px] hover:bg-gray-700 py-2 px-1"
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
                class="text-white font-robotomono text-[13px] hover:bg-gray-700 py-2 px-1"
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
                class="text-white font-robotomono text-[13px] hover:bg-gray-700 py-2 px-1"
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
          <div class="flex justify-center" v-if="problemPage">
            <div
              class="rounded-l-3xl  rounded-r-3xl bg-purple-700 p-[2px] translate-y-[30%]"
            >
              <div
                class="px-5 py-[8px] rounded-l-3xl rounded-r-3xl bg-background-grey-dark flex flex-col justify-center"
              >
                <p class="font-robotomono text-xl text-white">2:53:34</p>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center" v-if="!problemPage">
            <h1
              class="font-montserrat text-white font-semibold text-2xl text-center"
              :class="isLoggedIn ? 'ml-[10px]' : 'ml-[25px]'"
            >
              C<span class="font-montserrat text-purple-700 font-black">R</span>
            </h1>
          </div>
        </div>
        <div class="mr-5 sm:mr-2 md:mr-2" v-if="!isLoggedIn">
          <div class="h-[35px] bg-gray-700 p-[1px] rounded hover:bg-purple-700">
            <div
              class="bg-black w-full h-full rounded hover:bg-gray-700 text-sm px-3 flex items-center"
            >
              <a class="text-white font-robotomono text-sm" href="/#/login">Log In</a>
            </div>
          </div>
        </div>
        <div class="mr-6 sm:mr-2 md:mr-2" v-if="isLoggedIn">
          <div
            class="w-[32px] h-[32px] rounded-[50%] bg-yellow-500"
            v-on:click="showProfileOptions"
          ></div>
        </div>
        <div
          class="absolute top-[65px] right-[40px] sm:right-[20px] md:right-[20px] bg-white border w-[150px] rounded transition-all"
          v-if="profileOpts"
        >
          <ul>
            <li>
              <div
                class="text-black font-robotomono text-sm text-start hover:bg-gray-300 pl-3 py-2"
                v-on:click="logOut"
              >
                Log Out
              </div>
            </li>
            <li>
              <div
                class="text-black font-robotomono text-sm text-start hover:bg-gray-300 pl-3 py-2"
              >
                Profile
              </div>
            </li>
            <li>
              <div
                class="text-black font-robotomono text-sm text-start hover:bg-gray-300 pl-3 py-2"
              >
                Dashboard
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  name: "NavBar",
  props: {
    problemPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      profileOpts: false,
      down: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    showProfileOptions() {
      this.profileOpts = !this.profileOpts;
    },
    translateBox() {
      const box = document.querySelector(".hamburgerMenu") as HTMLElement;
      if (!this.down) {
        box.style.transform = "translateY(47px)";
        this.down = true;
      } else {
        box.style.transform = "translateY(-154px)";
        this.down = false;
      }
    },
    async logOut() {
      try {
        await this.logout();
        this.$router.push("login");
      } catch (error) {
        console.log("There was a problem trying to logout");
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
};
</script>

<style scoped></style>
