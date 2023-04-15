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
</template>

<script lang="ts">
export default {
  name: "SampleSet",
  props: {
    sample: Array<string>,
  },
  data() {
    return {
      inputs: [] as string[],
      outputs: [] as string[],
    };
  },
  mounted() {

      
        let sliceIndex = 0;
        for (let i = 0; i < this.sample!.length; i++) {
          if (this.sample![i] == "InputEnd") {
            sliceIndex = i;
            break;
          }
        }
        this.inputs = this.sample!.slice(0, sliceIndex);
        this.outputs = this.sample!.slice(sliceIndex + 1, this.sample!.length);
      
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
