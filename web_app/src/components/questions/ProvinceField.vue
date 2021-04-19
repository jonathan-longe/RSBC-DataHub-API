<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <select class="form-control form-control-sm" :id="form_group.id">
    <option>BC</option>
    <option>AB</option>
  </select>

</div>
</template>

<script>
export default {
  name: "ProvinceField",
  props: {
    form_group_class: String,
    form_group: {
      id: String,
      label: String
    }
  }
}
</script>
