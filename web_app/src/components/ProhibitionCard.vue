<template>
    <div class="card">
      <div class="card-body">
      <h5 class="card-title text-dark">{{ form.full_name }}</h5>
<!--      <p class="card-text text-secondary">This is a longer card with supporting text below
as a natural lead-in to additional content. This content is a little bit longer.</p>-->
      <p class="card-text"><small class="text-muted">Last updated: {{ lastUpdatedFriendly }}</small></p>
        <button @click="serveForm" type="submit" class="btn btn-primary">Serve</button>
    </div>
    </div>
</template>

<script>

import moment from 'moment';

export default {
  name: "IssueProhibitions",
  props: {
      form: {}
  },
  methods: {
      serveForm() {
        this.$store.commit("setFormToServe", this.form)
      }
  },
  computed: {
     allForms() {
       return this.$store.getters.getAllForms;
     },
     lastUpdatedFriendly() {
       return moment(this.form.last_updated).fromNow()
     }

  }
}
</script>

<style scoped>
  .card {
    background-color: lightgray;
  }
</style>