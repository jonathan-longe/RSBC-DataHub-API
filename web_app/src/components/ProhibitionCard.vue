<template>
    <div class="card border-light bg-secondary">
      <div class="card-header text-white text-left font-weight-bold small pl-3 pt-1 pb-1 bg-primary">
        {{ form.full_name }}
      </div>
      <div class="card-body bg-light">
      <p class="card-text text-dark">{{ form.description }}</p>
      <p class="card-text">
        <small class="text-muted">
          Prohibition IDs available: {{ getFormTypeCount[form.form_type] }}
        </small>
      </p>
        <button @click="setNewFormToEdit(form.form_type)" type="submit" class="btn btn-primary" :disabled="! isFormAvailable">
          New {{ form.form_type }} Form
        </button>
    </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "IssueProhibitions",
  props: {
      form: {}
  },
  methods: {
    ...mapActions(["setNewFormToEdit"])
  },
  computed: {
    ...mapGetters(["getFormTypeCount"]),
    isFormAvailable() {
      return this.getFormTypeCount[this.form.form_type] > 0
    }
  }
}
</script>
