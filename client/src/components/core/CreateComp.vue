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
            visible to those taking part in the competiton.
          </p>
          <div class="flex flex-col justify-center">
            <div class="flex justify-between gap-10">
              <h1>Competition Name</h1>
              <div class="flex flex-col justify-center">
                <QInput v-model="competition_name" dark filled color="purple">
                </QInput>
              </div>
            </div>
            <div class="flex justify-between gap-10">
              <h1>Start Time</h1>
              <div class="flex flex-col justify-center">
                <QInput v-model="start_date_time" dark filled color="purple">
                  <template #prepend>
                    <QIcon name="event" class="cursor-pointer">
                      <QPopupProxy
                        trasition-show="scale"
                        trasition-hide="scale"
                      >
                        <QDate :mask="date_format" v-model="start_date_time" dark color="purple" />
                      </QPopupProxy>
                    </QIcon>
                  </template>
                  <template #append>
                    <QIcon name="access_time" class="cursor-pointer">
                      <QPopupProxy
                        trasition-show="scale"
                        trasition-hide="scale"
                      >
                        <QTime :mask="date_format" v-model="start_date_time" dark color="purple" />
                      </QPopupProxy>
                    </QIcon>
                  </template>
                </QInput>
              </div>
            </div>
            <div class="flex justify-between gap-10">
              <h1>End Time</h1>
              <div class="flex flex-col justify-center">
                <QInput v-model="end_date_time" dark filled color="purple">
                  <template #prepend>
                    <QIcon name="event" class="cursor-pointer">
                      <QPopupProxy
                        trasition-show="scale"
                        trasition-hide="scale"
                      >
                        <QDate :mask="date_format" v-model="end_date_time" dark color="purple" />
                      </QPopupProxy>
                    </QIcon>
                  </template>
                  <template #append>
                    <QIcon name="access_time" class="cursor-pointer">
                      <QPopupProxy
                        trasition-show="scale"
                        trasition-hide="scale"
                      >
                        <QTime :mask="date_format" v-model="end_date_time" dark color="purple" />
                      </QPopupProxy>
                    </QIcon>
                  </template>
                </QInput>
              </div>
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
</template>
<script>
import Calendar from "primevue/calendar";
import NavBar from "../global/NavBar.vue";
import { ref } from "vue";
import { QDate, QInput, QTime, QPopupProxy } from "quasar";
export default {
  name: "CreateComp",
  components: {
    NavBar,
    Calendar,
    QDate,
    QInput,
    QTime,
    QPopupProxy,
  },
  setup() {
    return {
      currentTab: ref("detail"),
      competition_name: ref(""),
      start_date_time: ref(""),
      end_date_time: ref(""),
      addchallenge: ref(false),
      date_format: "DD/MM/YYYY HH:mm A"
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
