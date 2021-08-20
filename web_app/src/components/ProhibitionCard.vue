<template>
    <div class="card border-light bg-secondary">
      <div class="card-header text-white text-left font-weight-bold small pl-3 pt-1 pb-1 bg-primary">
        {{ form.full_name }}
      </div>
      <div class="card-body bg-light">
      <p class="card-text text-dark">{{ form.description }}</p>
      <p class="card-text">
        <small class="text-muted">
          Prohibition IDs available: {{ getMinimumUniqueIdsOnHandByType(form.short_name) }}
        </small>
      </p>
        <button @click="viewForm" type="submit" class="btn btn-primary" :disabled="! isFormAvailable">
          View {{ form.short_name }} Form
        </button>
    </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "IssueProhibitions",
  props: {
      form: {}
  },
  methods: {
      viewForm() {
        this.$store.dispatch("setNewFormToEdit", this.form.short_name)
      }
  },
  computed: {
    ...mapGetters(["getMinimumUniqueIdsOnHandByType"]),
    isFormAvailable() {
      return this.getMinimumUniqueIdsOnHandByType(this.form.short_name) > 0
    }
  }
}
</script>
