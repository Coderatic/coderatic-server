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
      <textarea v-model="message" cols="30" rows="10"></textarea>
      <div  

        class="text-white mt-8 mb-[8px] px-4 w-full overflow-y-auto h-[calc(100%-168px)]"
        v-html="markdownHtml"
      ></div>
    </div>
    <div
      class="grow bg-background-grey flex felx-col justify-center items-center"
    >
      <div class="h-[20px] w-[20px] rounded-[50%] bg-gray-300 absolute"></div>
    </div>
    <div class="w-[49.8%] h-[calc(100vh-47px)] bg-background-grey-dark">
      <div class="my-5 text-white"></div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "../global/NavBar.vue";
import { marked } from "marked";
marked.use({
  pedantic: true,
  gfm: true,
  breaks: true,
  sanitize: true,
  smartypants: true,
  xhtml: true
});
export default {
  name: "ProblemPage",
  data() {
    return {
      message: "# Example",
    };
  },
  components: {
    NavBar,
  },
  computed: {
    markdownHtml() {
      return marked(this.message);
    },
  },
};
</script>

<style scoped>
pre{
	  width: 50vw;
	  padding: 5px;
	  color:rgb(215, 214, 214);
	  background-color: rgb(71, 71, 71);
	  border-radius: 5px;
	}
</style>
