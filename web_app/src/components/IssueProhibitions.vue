<template>
    <div class="card w-100">
      <div class="card-body text-dark">
        <div class="form-inline align-items-center">
          <div class="d-flex">
            <div>
              <label for="form-selection" class="text-left">Select a Form to Serve</label>
              <select class="form-control" id="form-selection" v-model="selected_form">
                <option v-for="form in allForms" :key="form.short_name" :id="form" :value="form">
                  {{ form.full_name}}
                </option>
              </select>
            </div>
          </div>
          <div class="col-auto mt-4">
            <button @click="serveForm" type="submit" class="btn btn-primary">Go</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "IssueProhibitions",
  data() {
    return {
      selected_form: {
        short_name: null,
        full_name: null
      }
    }
  },
  methods: {
      serveForm() {
        this.$store.commit("setFormToServe", this.selected_form)
      }
  },
  computed: {
     allForms() {
       return this.$store.getters.getAllForms;
     }
  }
}
</script>

<style scoped>

</style>