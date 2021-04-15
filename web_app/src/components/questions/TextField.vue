<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <input :type="form_group.input_type"
         class="form-control form-control-sm"
         :id="form_group.id"
         :placeholder="form_group.placeholder">
</div>
</template>

<script>
export default {
  name: "TextField",
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