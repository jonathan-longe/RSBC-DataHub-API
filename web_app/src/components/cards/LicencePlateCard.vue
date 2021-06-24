<template>
  <form-card title="Vehicle Licence Plate">
    <div v-if="isReadOnly" class="">
      <read-only-element id="plate_province">Jurisdiction</read-only-element>
      <read-only-element id="plate_number">Plate Number</read-only-element>
    </div>
    <form-row v-if="! isReadOnly">
      <province-field id="plate_province" fg_class="col-sm-2">Jurisdiction</province-field>
      <plate-number id="plate_number" fg_class="col-sm-6">Plate Number</plate-number>
    </form-row>
  </form-card>
</template>

<script>
import CardsCommon from "@/components/cards/CardsCommon";

export default {
  name: "LicencePlateCard",
  mixins: [CardsCommon]
}
</script>

<style scoped>

</style>