<template>
  <NavBar :problemPage="true"></NavBar>
  <div class="w-screen flex justify-between">
    <div class="w-[49.8%] h-[calc(100vh-47px)] bg-background-grey-dark">
      <div class="w-full h-[50px] mt-3 flex flex-col justify-center">
        <h1 class="text-gray-200 font-robotomono text-2xl ml-2">
          1. Center A Div Without Googling
        </h1>
      </div>
      <hr class="border-b-1 mx-2 border-background-grey my-2" />
      <div class="w-full h-[40px] flex justify-around items-center px-2">
        <div
          class="grow h-full hover:bg-background-grey-dark bg-background-grey flex flex-col justify-center items-center"
        >
          <h1 class="font-robotomono text-gray-500">Problem</h1>
        </div>
        <div
          class="grow h-full hover:bg-background-grey-dark bg-background-grey flex flex-col justify-center items-center"
        >
          <h1 class="font-robotomono text-gray-500">Submissions</h1>
        </div>
        <div
          class="grow h-full hover:bg-background-grey-dark bg-background-grey flex flex-col justify-center items-center"
        >
          <h1 class="font-robotomono text-gray-500">LeaderBoard</h1>
        </div>
      </div>
      <hr class="border-b-1 mx-2 border-background-grey my-2" />
      <div
        class="problem-container text-white mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
        v-html="markdownHtml"
      ></div>
    </div>
    <div
      class="grow bg-background-grey flex felx-col justify-center items-center"
    >
      <div class="h-[20px] w-[20px] rounded-[50%] bg-gray-300 absolute"></div>
    </div>
    <div class="w-[49.8%] h-[calc(100vh-47px)] bg-background-grey-dark">
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
            class="font-robotomono h-[40px] rounded-xl bg-background-grey text-gray-100 hover:bg-gray-600 flex justify-between items-center px-4"
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
                @click="(currentLang = 'g++ 11'), (langSelect = false)"
              >
                g++ 11
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
      <div class="w-full h-60px flex flex-col justify-center items-end my-3 px-2">
        <div class="px-8 py-2 rounded-2xl bg-background-grey text-gray-100 font-robotomono">Submit</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "../global/NavBar.vue";
import { marked } from "marked";
import CodeMirror from "../global/CodeMirror.vue";
export default {
  name: "ProblemPage",
  methods: {
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
  },
  data() {
    return {
      message: "",
      langSelect: false,
      currentLang: "g++ 11",
    };
  },
  components: {
    NavBar,
    CodeMirror,
  },
  computed: {
    markdownHtml() {
      return marked(this.message);
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
