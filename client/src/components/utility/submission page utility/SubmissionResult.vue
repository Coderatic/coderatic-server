<template>
  <div class="w-full flex h-10 my-2 bg-light-primary dark:bg-dark-primary">
    <div class="w-12 font-robotomono text-sm mx-2 flex flex-col justify-center">
      {{}}
    </div>
    <div class="ml-5 grow font-robotomono text-sm flex flex-col justify-center">
      {{ formatDate() }}
    </div>
    <Verdict v-for="verdict in verdicts" :verdict="verdict"></Verdict>
  </div>
  <hr class="h-[2px] dark:border-dark-secondary border-light-secondary my-1" />
</template>

<script lang="ts">
import Verdict from "./VerdictComp.vue";
import moment, { Moment } from "moment";
export default {
  name: "SubmissionResult",
  props: {
    verdicts: Array<string>,
    submission_time: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  methods: {
    formatDate(): string {
      const formattedDate = moment(this.submission_time).format(
        "MMM DD YYYY, h:mm A"
      );
      return formattedDate;
    },
  },
  components: {
    Verdict,
  },
};
</script>
<style></style>
