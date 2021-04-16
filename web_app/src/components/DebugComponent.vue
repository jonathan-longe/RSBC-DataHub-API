<template>
    <div class="card w-100 mt-3 mb-3">
      <div class="card-body text-dark text-left">
        <ul>
          <li v-for="prohibition_number in getAllProhibitionNumbers" :key="prohibition_number">
            {{ getSpecificForm(prohibition_number).data }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: "DebugComponent",
  methods: {
    getSpecificForm(prohibition_number) {
      return this.$store.getters.getSpecificForm(prohibition_number);
    }
  },
  computed: {
    getAllProhibitionNumbers() {
      return this.$store.getters.getAllEditedProhibitionNumbers;
    }
  }
}
</script>

<style scoped>

</style>