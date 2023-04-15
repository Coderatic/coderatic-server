<template>

  <div class="w-full flex h-10 my-2 bg-light-primary dark:bg-dark-primary">
	<div class="w-12 font-robotomono text-sm mx-2 flex flex-col justify-center">Fail</div>
	<div class="ml-5 grow font-robotomono text-sm flex flex-col justify-center">Submission 1</div>
	<Verdict v-for="verdict in verdicts" :verdict="verdict"></Verdict>

  </div>
  <hr class="h-[2px] dark:border-dark-secondary border-light-secondary my-1" />
</template>

<script lang="ts">
  import Verdict from "./VerdictComp.vue";
export default {
  name: "SubmissionResult",
  props:{
	verdicts:Array<string>
  },
  components:{
    Verdict,
  }
};
</script>
<style></style>
