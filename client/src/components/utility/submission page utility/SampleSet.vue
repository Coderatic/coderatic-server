<template>
  <div class="w-full gap-10 min-h-[150px] flex justify-between my-3">
    <div
      class="max-w-[45%] flex-1 rounded flex flex-col bg-background-grey p-1"
    >
      <h1 class="font-lato text-white text-lg my-1 mx-1">Sample Input</h1>
      <div class="grow w-full bg-black rounded overflow-x-auto">
        <p class="text-white px-2 pt-1" v-for="input in inputs">{{ input }}</p>
      </div>
    </div>

    <div
      class="max-w-[45%] flex-1 rounded flex flex-col bg-background-grey p-1"
    >
      <h1 class="font-lato text-white text-lg my-1 mx-1">Sample Output</h1>
      <div class="grow w-full bg-black rounded overflow-x-auto">
        <p class="text-white px-2 pt-1" v-for="output in outputs">
          {{ output }}
        </p>
      </div>
    </div>
  </div>
  <div class="w-full my-3 text-light-paragraph-text dark:text-dark-paragraph-text" v-html="markedDesc"></div>
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
  mounted() {
    this.inputs = this.sample!.Input;
    this.outputs = this.sample!.Output;
    this.description = this.sample!.Description;
  },
  computed:{
	markedDesc(){
		return marked(this.sample!.Description);
	}
  }
};
</script>
<!-- <script setup lang="ts">
import { ref } from 'vue';
const inputs = ref([] as string[]);
const outputs = ref([] as string[]);

const props = defineProps({sample:Array<string>})

</script> -->
<style></style>
