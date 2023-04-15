<template>
  <NavBar :problemPage="true"></NavBar>
  <SkeletonTheme color="#222222" highlight="#252525">
    <div class="relative w-screen flex justify-between z-[1]">
      <div
        class="problemDiv min-w-[350px] w-[calc(100%-45%-7px)] h-[calc(100vh-47px)] bg-light-primary dark:bg-dark-primary"
      >
        <div class="w-full h-[50px] mt-3 flex flex-col justify-center">
          <h1
            class="text-light-text-on-primary dark:text-dark-text-on-primary font-robotomono text-2xl ml-2"
          >
            <Skeleton :count="1" width="50%" height="30px">{{
              problemTitle
            }}</Skeleton>
          </h1>
        </div>
        <hr
          class="border-b-1 mx-2 border-light-secondary dark:border-dark-secondary my-2"
        />
        <div class="w-full h-[40px] flex justify-around items-center px-2">
          <div
            class="font-robotomono text-light-button-text-color dark:text-dark-button-text-color select-none grow h-full hover:bg-light-primary hover:text-light-text-on-primary dark:hover:text-dark-text-on-primary dark:hover:bg-dark-primary cursor-pointer bg-light-button-color flex flex-col justify-center items-center"
            v-on:click="
              showProblemTab();
              currentTab = 'problem';
            "
          >
            <h1
              :class="
                currentTab === 'problem'
                  ? 'border-b-2 border-light-highlight dark:border-dark-highlight'
                  : ''
              "
            >
              Problem
            </h1>
          </div>
          <div
            class="font-robotomono text-light-button-text-color dark:text-dark-button-text-color select-none grow h-full hover:bg-light-primary hover:text-light-text-on-primary dark:hover:text-dark-text-on-primary dark:hover:bg-dark-primary cursor-pointer bg-light-button-color flex flex-col justify-center items-center"
            v-on:click="
              showSubmissionTab();
              currentTab = 'submissions';
            "
          >
            <h1
              :class="
                currentTab === 'submissions'
                  ? 'border-b-2 border-light-highlight dark:border-dark-highlight'
                  : ''
              "
            >
              Submissions
            </h1>
          </div>
          <div
            class="font-robotomono text-light-button-text-color dark:text-dark-button-text-color select-none grow h-full hover:bg-light-primary hover:text-light-text-on-primary dark:hover:text-dark-text-on-primary dark:hover:bg-dark-primary cursor-pointer bg-light-button-color flex flex-col justify-center items-center"
            @click="
              showLeaderboardTab();
              currentTab = 'leaderboard';
            "
          >
            <h1
              :class="
                currentTab === 'leaderboard'
                  ? 'border-b-2 border-light-highlight dark:border-dark-highlight'
                  : ''
              "
            >
              Leaderboard
            </h1>
          </div>
        </div>
        <hr
          class="border-b-1 mx-2 border-light-secondary dark:border-dark-secondary my-2"
        />
        <div
          class="problem-container mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
          v-if="problemTabVisible"
        >
          <div
            class="problem-div text-light-text-on-primary dark:text-dark-text-on-primary"
            v-if="problemStatement != ''"
            v-html="markdownHtml"
          ></div>
          <div v-else>
            <div class="mb-3">
              <div class="mb-1">
                <Skeleton width="250px" height="35px"></Skeleton>
              </div>
              <Skeleton :count="2" width="90%" height="25px"></Skeleton>
              <Skeleton :count="1" width="50%" height="25px"></Skeleton>
            </div>
            <Skeleton :count="1" width="90%" height="25px"></Skeleton>
            <Skeleton :count="1" width="75%" height="25px"></Skeleton>
            <Skeleton :count="1" width="90%" height="25px"></Skeleton>
            <div class="my-3 w-full">
              <Skeleton class="pr-2" width="40%" height="250px"></Skeleton>
              <Skeleton class="pl-5" width="40%" height="250px"></Skeleton>
            </div>
            <div class="mb-1">
              <Skeleton width="350px" height="35px"></Skeleton>
            </div>
            <Skeleton :count="2" width="90%" height="25px"></Skeleton>
            <Skeleton :count="1" width="50%" height="25px"></Skeleton>
            <Skeleton :count="1" width="75%" height="25px"></Skeleton>
          </div>
          <SampleSet
            v-if="samples"
            v-for="sample in samples"
            :sample="sample"
          ></SampleSet>
        </div>

        <div
          class="text-light-text-on-primary dark:text-dark-text-on-primary mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
          v-if="submissionTabVisible"
        >
          <div
            class="w-full flex h-10 my-2 bg-light-secondary dark:bg-dark-secondary"
          >
            <div
              class="w-12 font-robotomono text-sm mx-2 flex flex-col justify-center"
            >
              Result
            </div>
            <div
              class="ml-5 grow font-robotomono text-sm flex flex-col justify-center"
            >
              Submission Name
            </div>
            <div
              class="w-10 font-robotomono text-sm flex flex-col justify-center items-center"
            >
              T1
            </div>
            <div
              class="w-10 font-robotomono text-sm flex flex-col justify-center items-center"
            >
              T2
            </div>
          </div>
          <hr
            class="h-[2px] dark:border-dark-secondary border-light-secondary my-1"
          />

          <SubmissionResult
            v-for="submission in reversedList"
            :verdicts="submission"
          ></SubmissionResult>
        </div>
        <div
          class="text-light-text-on-primary dark:text-dark-text-on-primary mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
          v-if="leaderboardTabVisible"
        >
          Leaderboard
        </div>
      </div>
      <div
        class="w-[7px] max-w-[7px] cursor-w-resize flex felx-col justify-center items-center"
      >
        <div
          class="resizer h-[40px] w-full bg-light-highlight dark:bg-dark-highlight"
        ></div>
      </div>
      <div
        class="codeEditor min-w-[300px] w-[45%] h-[calc(100vh-47px)] bg-light-primary dark:bg-dark-primary"
      >
        <div
          class="w-full h-[50px] mt-3 flex flex-col justify-center px-2 relative"
        >
          <div class="flex justify-end gap-3">
            <div
              class="h-[40px] font-robotomono rounded-xl bg-light-button-color dark:bg-dark-button-color text-light-button-text-color dark:text-dark-button-text-color hover:bg-light-button-hover-color dark:hover:bg-dark-button-hover-color flex justify-between items-center px-4"
            >
              Upload File
            </div>
            <div
              v-on:click="selectLanguage"
              class="font-robotomono h-[40px] rounded-xl cursor-pointer bg-light-button-color dark:bg-dark-button-color text-light-button-text-color dark:text-dark-button-text-color hover:bg-light-button-hover-color dark:hover:bg-dark-button-hover-color flex justify-between items-center px-4"
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
              class="w-[200px] z-[1] rounded-md absolute top-0 translate-y-[50px] bg-light-secondary dark:bg-dark-secondary"
              :class="langSelect ? 'isnline' : 'hidden'"
            >
              <ul>
                <li
                  class="py-2 pl-4 text-light-paragraph-text dark:text-dark-paragraph-text font-lato hover:bg-light-text-hover-color dark:hover:bg-dark-text-hover-color"
                  @click="(currentLang = 'rust'), (langSelect = false)"
                >
                  Rust
                </li>
                <hr class="w-full border-b-1 border-light-primary" />
                <li
                  class="py-2 pl-4 text-light-paragraph-text dark:text-dark-paragraph-text font-lato hover:bg-light-text-hover-color dark:hover:bg-dark-text-hover-color"
                  @click="(currentLang = 'py3'), (langSelect = false)"
                >
                  Python3
                </li>
                <hr class="w-full border-b-1 border-light-primary" />

                <li
                  class="py-2 pl-4 text-light-paragraph-text dark:text-dark-paragraph-text font-lato hover:bg-light-text-hover-color dark:hover:bg-dark-text-hover-color"
                  @click="(currentLang = 'cpp'), (langSelect = false)"
                >
                  C++ 17
                </li>
                <hr class="w-full border-b-1 border-light-primary" />

                <li
                  class="py-2 pl-4 text-light-paragraph-text dark:text-dark-paragraph-text font-lato hover:bg-light-text-hover-color dark:hover:bg-dark-text-hover-color"
                  @click="(currentLang = 'cpp'), (langSelect = false)"
                >
                  g++ 14
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-full h-[calc(100vh-180px)]">
          <codemirror
            v-model="code"
            :style="{ height: '100%', zIndex: 0 }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="8"
            :extensions="extensions"
          />
        </div>
        <div
          class="w-full h-60px flex flex-col justify-center items-end my-3 px-2"
        >
          <div
            class="px-8 py-2 rounded-2xl cursor-pointer bg-light-button-color dark:bg-dark-button-color text-light-button-text-color dark:text-dark-button-text-color hover:bg-light-button-hover-color dark:hover:bg-dark-button-hover-color font-robotomono"
            v-on:click="submission"
          >
            Submit
          </div>
        </div>
      </div>
      <Popup></Popup>
    </div>
  </SkeletonTheme>
</template>

<script lang="ts">
import getProblem from "../../services/GetProblem";
import submitCode from "../../services/Submit";
import NavBar from "../global/NavBar.vue";
import SubmissionResult from "../utility/submission page utility/SubmissionResult.vue";
import { marked } from "marked";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import store from "../../store";
import SampleSet from "../utility/submission page utility/SampleSet.vue";
import { Skeleton } from "vue-loading-skeleton";
import { SkeletonTheme } from "vue-loading-skeleton";
import "vue-loading-skeleton/dist/style.css";
export default {
  name: "ProblemPage",
  data() {
    return {
      code: "",
      problemStatement: "",
      problemTitle: "",
      langSelect: false,
      currentLang: "cpp",
      extensions: [cpp(), oneDark] as any[],
      problemTabVisible: true,
      submissionTabVisible: false,
      leaderboardTabVisible: false,
      submissionsList: [["WA"], ["P"]] as string[][],
      samples: [] as object[],
      problem_id: this.$route.params.problem_id as string,
      currentTab: "problem",
    };
  },

  components: {
    NavBar,
    Codemirror,
    SubmissionResult,
    SampleSet,
    Skeleton,
    SkeletonTheme,
  },
  computed: {
    reversedList() {
      return this.submissionsList.slice().reverse();
    },
    markdownHtml() {
      return marked(this.problemStatement);
    },
  },
  mounted() {
    const response = getProblem(this.problem_id)
      .then((res) => {
        this.problemStatement = res.data.problem.description;
        this.problemTitle = res.data.problem.name;
      })
      .catch((err) => {
        console.log(err);
      });

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
    async submission() {
      const lang = {
        name: this.currentLang,
      };
      const user_id = store.getters.giveUserId;
      const problem_id = this.$route.params.problem_id as string;
      //const problem_id = "saadIsADumbFuckWhoWillShitOnHisHeadIfHesToldToByASweatyPedoNerdOnline";
      try {
        const response = await submitCode(problem_id, user_id, this.code, lang);
        this.submissionsList.push(response.data.verdicts);
      } catch (e: any) {
        console.log(e.response.data.message);
      }
    },

    selectLanguage() {
      this.langSelect = !this.langSelect;
    },
    showProblemTab() {
      this.submissionTabVisible = false;
      this.leaderboardTabVisible = false;
      this.problemTabVisible = true;
    },
    showSubmissionTab() {
      this.problemTabVisible = false;
      this.leaderboardTabVisible = false;
      this.submissionTabVisible = true;
    },
    showLeaderboardTab() {
      this.submissionTabVisible = false;
      this.problemTabVisible = false;
      this.leaderboardTabVisible = true;
    },
  },
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
  color: #ff7777;
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
.problem-div > h1 {
  font-size: 2em;
  font-weight: bold;
}
.problem-div > h2 {
  font-size: 1.5em;
  font-weight: bold;
}
.problem-div > h3 {
  font-size: 1.17em;
  font-weight: bold;
}
.problem-div > h4 {
  font-size: 1em;
  font-weight: bold;
}
.problem-div > h5 {
  font-size: 0.83em;
  font-weight: bold;
}
.problem-div > h6 {
  font-size: 0.67em;
  font-weight: bold;
}
</style>
