<template>
  <div>
    <p class="small pb-0 mb-2">Driver's Licence Number</p>
    <div class="form-row">
      <div class="form-group">
        <label class="sr-only small" :for="form_group.id">Driver's Licence Number</label>
        <input type=text
             class="form-control form-control-sm"
             :id="form_group.id"
             placeholder="Driver's Licence Number">
      </div>
      <div class="form-group ml-1">
        <button disabled class="btn-sm btn-outline-light text-muted text-dark">ICBC Lookup</button>
      </div>
      <div class="form-group ml-2">
        <button class="btn-sm btn-primary">Scan</button>
      </div>
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