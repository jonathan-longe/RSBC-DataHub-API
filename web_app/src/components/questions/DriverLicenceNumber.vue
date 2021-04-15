<template>
  <div class="form-row">
    <div class="form-group">
      <label class="small" :for="form_group.id">Driver's Licence Number</label>
      <input type=text
           class="form-control form-control-sm"
           :id="form_group.id"
           placeholder="Driver's Licence Number">
    </div>
    <div class="form-group ml-1 mt-4">
      <button disabled class="btn-sm btn-primary">ICBC Lookup</button>
    </div>
    <div class="form-group ml-2 mt-4">
      <button disabled class="btn-sm btn-primary">Scan</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DriversLicenceNumber",
  props: {
    form_group_class: String,
    form_group: {
      id: String,
      label: String
    }
  }
}
</script>

<style scoped>

</style>