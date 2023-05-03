<template>
  <NavBar></NavBar>
  <div class="flex mt-4 justify-center items-center w-full">
    <div class="flex flex-col justify-center items-center px-6 w-[80%]">
      <div
        class="w-full bg-dark-secondary mt-4 flex justify-start gap-1 text-white"
      >
        <div
          class="h-10 select-none cursor-pointer px-3 mt-2 flex flex-col justify-center font-lato ml-2 hover:rounded-tl-[3px] hover:rounded-tr-[3px]"
          :class="
            currentTab === 'detail'
              ? 'bg-dark-primary hover:bg-red-700'
              : 'hover:bg-slate-800'
          "
          v-on:click="currentTab = 'detail'"
        >
          Details
        </div>
        <div
          class="h-10 select-none cursor-pointer px-3 mt-2 flex flex-col justify-center font-lato ml-2 hover:rounded-tl-[3px] hover:rounded-tr-[3px]"
          :class="
            currentTab === 'challenges'
              ? 'bg-dark-primary hover:bg-red-700'
              : 'hover:bg-slate-800'
          "
          v-on:click="currentTab = 'challenges'"
        >
          Challenges
        </div>
        <div
          class="h-10 select-none cursor-pointer px-3 mt-2 flex flex-col justify-center font-lato ml-2 hover:bg-slate-800 hover:rounded-tl-[3px] hover:rounded-tr-[3px]"
          v-on:click="currentTab = 'detail'"
        >
          Hemlo
        </div>
        <div
          class="h-10 select-none cursor-pointer px-3 mt-2 flex flex-col justify-center font-lato ml-2 hover:bg-slate-800 hover:rounded-tl-[3px] hover:rounded-tr-[3px]"
          v-on:click="currentTab = 'detail'"
        >
          Hemlo
        </div>
      </div>

      <div
        class="px-2 py-5 w-full bg-dark-primary flex justify-center items-center text-white"
      >
        <div
          class="flex flex-col items-start w-full gap-5"
          v-if="currentTab === 'detail'"
        >
          <h1 class="text-3xl">Contest Details</h1>
          <p class="mb-5 text-gray-500">
            Please provide detail for your competition. The details will be
            visible to thos taking part in teh competiton.
          </p>
          <div class="flex justify-center gap-20">
            <div class="flex flex-col justify-around gap-10">
              <h1 class="whitespace-nowrap flex flex-col justify-center">
                Competition Name
              </h1>
              <h1 class="whitespace-nowrap flex flex-col justify-center">
                Start Time
              </h1>
              <h1 class="whitespace-nowrap flex flex-col justify-center">
                End Time
              </h1>
            </div>
            <div class="flex flex-col justify-center gap-10">
              <input
                class="border-[2px] border-gray-900 bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                type="text"
                name=""
                id=""
              />
              <div class="flex justify-center items-center gap-5">
                <Calendar v-model="start_date" dateFormat="dd/mm/yy" showIcon />
                <p class="px-2">at</p>
                <input
                  class="border-[2px] bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                  :class="startTimeCheck ? 'border-gray-900' : 'border-red-500'"
                  v-model="start_time"
                  type="text"
                  placeholder="HH:MM:SS am|pm"
                />
                PKT
              </div>
              <div class="flex justify-center items-center gap-5">
                <Calendar v-model="end_date" dateFormat="dd/mm/yy" showIcon />
                <p class="px-2">at</p>
                <input
                  class="border-[2px] border-gray-900 bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                  :class="endTimeCheck ? 'border-gray-900' : 'border-red-500'"
                  v-model="end_time"
                  type="text"
                  placeholder="HH:MM:SS am|pm"
                />
                PKT
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col items-start w-full gap-5"
          v-if="currentTab === 'challenges'"
        >
          <h1 class="text-3xl">Contest Challenges</h1>
          <p class="mb-5 text-gray-500">
            Please provide the challenges you want to add in your competition
            here.
          </p>
          <div
            class="w-full flex flex-col justify-center items-start"
            v-if="addchallenge"
          >
            <div class="flex justify-center items-center gap-10">
              <h1 class="w-[200px]">Problem Title</h1>

              <input
                class="border-[2px] bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                type="text"
              />
            </div>
            <div class="w-full flex justify-start items-center gap-10">
              <h1 class="w-[200px]">Problem Statement</h1>

              <textarea
                class="border-[2px] bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                
              ></textarea>
            </div>
            <div class="w-full flex justify-start items-center gap-10">
              <h1 class="w-[200px]">Input Format</h1>

              <textarea
                class="border-[2px] bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                
              ></textarea>
            </div>
            <div class="w-full flex justify-start items-center gap-10">
              <h1 class="w-[200px]">Output Format</h1>

              <textarea
                class="border-[2px] bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[200px] my-3 font-robotomono"
                
              ></textarea>
            </div>
          </div>
          <div
            class="border-[0.5px] select-none cursor-pointer rounded hover:bg-gray-800 px-2 py-2"
            v-on:click="addchallenge = !addchallenge"
          >
            ADD CHALLENGE
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "primevue/calendar";
import NavBar from "../global/NavBar.vue";
export default {
  name: "CreateComp",
  components: {
    NavBar,
    Calendar,
  },
  data() {
    return {
      currentTab: "detail",
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      addchallenge: false,
    };
  },
  computed: {
    startTimeCheck() {
      var timeregex = /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9] (am|pm)$/;
      return this.start_time === "" || timeregex.test(this.start_time);
    },
    endTimeCheck() {
      var timeregex = /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9] (am|pm)$/;
      return this.end_time === "" || timeregex.test(this.end_time);
    },
  },
};
</script>

<style></style>
