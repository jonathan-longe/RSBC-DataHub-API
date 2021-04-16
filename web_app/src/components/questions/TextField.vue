<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <input :type="form_group.input_type"
         class="form-control form-control-sm"
         :id="form_group.id"
         :placeholder="form_group.placeholder"
          v-model.trim="payload.value"
          @change="update">
</div>
</template>

<script>
export default {
  name: "TextField",
  methods: {
    update() {
      console.log('inside TextField update()')
      this.$store.commit("updateFormField", this.payload)
    }
  },
  data() {
    return {
      payload: {
        id: this.form_group.id,
        value: null
      }
    }
  },
  props: {
    form_group_class: String,
    form_group: {
      id: String,
      label: String,
      placeholder: String,
      input_type: {
        type: Object,
        default: function () {
          return "text"
        }
      }
    }
  }
}
</script>

<style scoped>

</style>