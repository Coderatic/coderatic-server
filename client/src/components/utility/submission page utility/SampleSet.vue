<template>
  <div class="w-full gap-10 min-h-[150px] flex justify-between my-3">
    <div
      class="max-w-[45%] flex-1 rounded flex flex-col bg-background-grey p-1"
    >
      <h1 class="font-lato text-white text-lg my-1 mx-1">Sample Input</h1>
      <div class="grow w-full text-white bg-black rounded overflow-x-auto">
        <p class="text-white" v-for="input in showInputs"></p>
      </div>
    </div>

    <div
      class="max-w-[45%] flex-1 rounded flex flex-col bg-background-grey p-1"
    >
      <h1 class="font-lato text-white text-lg my-1 mx-1">Sample Output</h1>
      <div class="grow w-full text-white bg-black rounded overflow-x-auto">
        <p class="text-white" v-for="output in showOutputs"></p>
      </div>
    </div>
  </div>
  <div
    class="w-full my-3 text-light-paragraph-text dark:text-dark-paragraph-text"
    v-html="markedDesc"
  ></div>
</template>

<script lang="ts">
import { marked } from "marked";

export default {
  name: "SampleSet",
  props: {
    sample: Object,
  },
  data() {
    return {
      inputs: [] as string[],
      outputs: [] as string[],
      description: "" as string,
    };
  },
  computed: {
    showInputs() {
      if (this.sample != undefined) {
        const inputs = this.sample.input.split("\n");
        return inputs;
      } else {
        return "";
      }
    },
    showOutputs() {
      if (this.sample != undefined) {
        const outputs = this.sample.output.split("\n");
        return outputs;
      } else {
        return "";
      }
    },
    markedDesc() {
      if (this.sample != undefined) {
        return this.sample.description;
      } else {
        return "";
      }
    },
  },
};
</script>
<!-- <script setup lang="ts">
import { ref } from 'vue';
const inputs = ref([] as string[]);
const outputs = ref([] as string[]);

const props = defineProps({sample:Array<string>})

</script> -->
<style></style>
