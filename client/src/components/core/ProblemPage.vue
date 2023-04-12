<template>
  <NavBar :problemPage="true"></NavBar>
  <div class="relative w-screen flex justify-between z-[1]">
    <div
      class="problemDiv min-w-[350px] w-[calc(100%-45%-7px)] h-[calc(100vh-47px)] bg-background-grey-dark"
    >
      <div class="w-full h-[50px] mt-3 flex flex-col justify-center">
        <h1 class="text-gray-200 font-robotomono text-2xl ml-2">
          1. Center A Div Without Googling
        </h1>
      </div>
      <hr class="border-b-1 mx-2 border-background-grey my-2" />
      <div class="w-full h-[40px] flex justify-around items-center px-2">
        <div
          class="grow h-full hover:bg-background-grey-dark cursor-pointer bg-background-grey flex flex-col justify-center items-center"
          v-on:click="showProblemTab"
          >
          <h1 class="font-robotomono text-gray-500 select-none cursor-pointer" >
            Problem
          </h1>
        </div>
        <div
          class="grow h-full hover:bg-background-grey-dark bg-background-grey cursor-pointer flex flex-col justify-center items-center"
          v-on:click="showSubmissionTab"
          >
          <h1 class="font-robotomono text-gray-500 cursor-pointer select-none" >Submissions</h1>
        </div>
        <div
          class="grow h-full hover:bg-background-grey-dark cursor-pointer bg-background-grey flex flex-col justify-center items-center"
          v-on:click="showLeaderboardTab"
          >
          <h1 class="font-robotomono text-gray-500 cursor-pointer select-none" >LeaderBoard</h1>
        </div>
      </div>
      <hr class="border-b-1 mx-2 border-background-grey my-2" />
      <div
        class="problem-container text-white mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
        v-if="problemTabVisible"
        v-html="markdownHtml"
      >
        
      </div>
      <div
        class="text-white mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
        v-if="submissionTabVisible"
      >
      <div class="w-full flex h-10 my-2 bg-background-grey">
	      <div class="w-12 font-robotomono text-sm mx-2 flex flex-col justify-center">Result</div>
	      <div class="ml-5 grow font-robotomono text-sm flex flex-col justify-center">Submission Name</div>
	      <div class="w-10 font-robotomono text-sm flex flex-col justify-center items-center">  T1 </div>
	      <div class="w-10 font-robotomono text-sm flex flex-col justify-center items-center">  T2 </div>
      </div>
      <hr class="h-[2px] border-background-grey my-1" />

        <SubmissionResult v-for="submission in submissionsList" :verdicts="submission"></SubmissionResult>

      </div>
      <div
        class="text-white mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
        v-if="leaderboardTabVisible"
      >
        Leaderboard
      </div>
    </div>
    <div
      class="w-[7px] max-w-[7px] cursor-w-resize bg-background-grey flex felx-col justify-center items-center"
    >
      <div class="resizer h-[40px] w-full bg-purple-700"></div>
    </div>
    <div
      class="codeEditor min-w-[300px] w-[45%] h-[calc(100vh-47px)] bg-background-grey-dark"
    >
      <div
        class="w-full h-[50px] mt-3 flex flex-col justify-center px-2 relative"
      >
        <div class="flex justify-end gap-3">
          <div
            class="h-[40px] font-robotomono rounded-xl bg-background-grey text-gray-100 hover:bg-gray-600 flex justify-between items-center px-4"
          >
            Upload File
          </div>
          <div
            v-on:click="selectLanguage"
            class="font-robotomono h-[40px] rounded-xl cursor-pointer bg-background-grey text-gray-100 hover:bg-gray-600 flex justify-between items-center px-4"
          >
            <p v-html="currentLang"></p>
            <svg
              class="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          <div
            class="w-[200px] z-[1] rounded-md absolute top-0 translate-y-[50px] bg-background-grey"
            :class="langSelect ? 'isnline' : 'hidden'"
          >
            <ul>
              <li
                class="py-2 pl-4 text-gray-100 font-lato hover:bg-gray-600"
                @click="(currentLang = 'JavaScript'), (langSelect = false)"
              >
                JavaScript
              </li>
              <hr class="w-full border-b-1 border-gray-600" />
              <li
                class="py-2 pl-4 text-gray-100 font-lato hover:bg-gray-600"
                @click="(currentLang = 'TypeScript'), (langSelect = false)"
              >
                TypeScript
              </li>
              <hr class="w-full border-b-1 border-gray-600" />

              <li
                class="py-2 pl-4 text-gray-100 font-lato hover:bg-gray-600"
                @click="(currentLang = 'cpp'), (langSelect = false)"
              >
                C++ 17
              </li>
              <hr class="w-full border-b-1 border-gray-600" />

              <li
                class="py-2 pl-4 text-gray-100 font-lato hover:bg-gray-600"
                @click="(currentLang = 'g++ 14'), (langSelect = false)"
              >
                g++ 14
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full h-[calc(100vh-180px)]">
        <CodeMirror></CodeMirror>
      </div>
      <div
        class="w-full h-60px flex flex-col justify-center items-end my-3 px-2"
      >
        <div
          class="px-8 py-2 rounded-2xl bg-background-grey text-gray-100 font-robotomono"
          v-on:click="submission"
        >
          Submit
        </div>
      </div>
    </div>
    <Popup></Popup>
  </div>

</template>

<script lang="ts">

import submitCode from "../../services/Submit"
import NavBar from "../global/NavBar.vue";
import SubmissionResult from "../utility/SubmissionResult.vue"
import { marked } from "marked";
import CodeMirror from "../global/CodeMirror.vue";
import store from "../../store";
export default {
  name: "ProblemPage",
  data() {
    return {
      code:"",
      message: "",
      langSelect: false,
      currentLang: "g++ 11",
      problemTabVisible: true,
      submissionTabVisible: true,
      leaderboardTabVisible: true,
      submissionsList:[['CE','P','TLE'],['P','CE'],['P','CE','P','P']]
    };
  },

  components: {
    NavBar,
    CodeMirror,
    SubmissionResult
  },
  computed: {
    markdownHtml() {
      return marked(this.message);
    },
  },
  mounted() {
    let resizer = document.querySelector(".resizer"),
      problemDiv = document.querySelector(".problemDiv"),
      codeeditor = document.querySelector(".codeEditor");
    function initResizerFn(resizer: any, problemDiv: any, codeeditor: any) {
      console.log("Resized");
      var x: any, w_c: any, w_p: any;

      function rs_mousedownHandler(e: any) {
        x = e.clientX;

        var ceWidth = window.getComputedStyle(codeeditor).width;
        w_c = parseInt(ceWidth, 10);

        var ceWidth = window.getComputedStyle(problemDiv).width;
        w_p = parseInt(ceWidth, 10);

        document.addEventListener("mousemove", rs_mousemoveHandler);
        document.addEventListener("mouseup", rs_mouseupHandler);
      }

      function rs_mousemoveHandler(e: any) {
        var dx = e.clientX - x;
        var cw = w_c - dx;
        var pw = w_p + dx;

        if (Math.abs(dx) > 1) {
          codeeditor.style.width = `${cw}px`;
          problemDiv.style.width = `${pw}px`;
        }
      }

      function rs_mouseupHandler() {
        document.removeEventListener("mouseup", rs_mouseupHandler);
        document.removeEventListener("mousemove", rs_mousemoveHandler);
      }

      resizer.addEventListener("mousedown", rs_mousedownHandler);
    }

    initResizerFn(resizer, problemDiv, codeeditor);
  },
  methods: {
    async submission(){
      const lang = {
        name: this.currentLang
      }
      const user_id = store.getters.giveUserId;
      // const problem_id = (this.$route.params.problem_id)[0];
      const problem_id = "saadIsADumbFuckWhoWillShitOnHisHeadIfHesToldToByASweatyPedoNerdOnline";
      try{
        const response = await submitCode(problem_id,user_id,this.code,lang);
        this.submissionsList.push(response.data.verdicts);
      }catch(e:any){
        console.log(e.response.data.message);
      }
    },
    markdown() {
      document.addEventListener("DOMContentLoaded", function () {
        const codeElement = document.querySelector("p code") as HTMLElement;
        if (codeElement != null) {
          const divElement = document.createElement("div") as HTMLElement;
          divElement.classList.add("scroll-inline-code");
          codeElement.parentNode!.insertBefore(divElement, codeElement);
          divElement.appendChild(codeElement);
        }
      });
    },
    selectLanguage() {
      this.langSelect = !this.langSelect;
    },
    showProblemTab() {
      this.submissionTabVisible= false;
      this.leaderboardTabVisible=false;
      this.problemTabVisible = true;
    },
    showSubmissionTab() {
      this.problemTabVisible = false;
      this.leaderboardTabVisible=false;
      this.submissionTabVisible=true;
    },
    showLeaderboardTab() {
      this.submissionTabVisible=false;
      this.problemTabVisible =false;
      this.leaderboardTabVisible=true;
    },
  }
};
</script>

<style>
.scroll-inline-code {
  outline: 2px;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

p > div > code,
p > code {
  padding: 5px;
  color: #ff6666;
  background-color: rgb(53, 53, 53);
  border-radius: 5px;
}
pre {
  margin: 30px 0;
  padding: 5px;
  color: rgb(228, 228, 228);
  background-color: rgb(53, 53, 53);
  border-radius: 5px;
}
.problem-container > h1 {
  font-size: 2em;
  font-weight: bold;
}
.problem-container > h2 {
  font-size: 1.5em;
  font-weight: bold;
}
.problem-container > h3 {
  font-size: 1.17em;
  font-weight: bold;
}
.problem-container > h4 {
  font-size: 1em;
  font-weight: bold;
}
.problem-container > h5 {
  font-size: 0.83em;
  font-weight: bold;
}
.problem-container > h6 {
  font-size: 0.67em;
  font-weight: bold;
}
</style>
