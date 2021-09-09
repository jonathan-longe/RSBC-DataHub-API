<template>
  <form-card title="Officer">
    <div v-if="isReadOnly" class="">
      <read-only-element id="agency">Agency</read-only-element>
      <read-only-element id="badge_number">Badge Number</read-only-element>
      <read-only-element id="officer_name">Officer name</read-only-element>
    </div>
    <form-row v-if="! isReadOnly">
      <text-field id="agency" rules="required" fg_class="col-sm-2">Agency</text-field>
      <text-field id="badge_number" rules="required" fg_class="col-sm-2">Badge Number</text-field>
      <text-field id="officer_name" rules="required" fg_class="col-sm-8">Full Name of Peace Officer Serving Prohibition Notice</text-field>
    </form-row>
  </form-card>
</template>

<script>
import CardsCommon from "@/components/forms/CardsCommon";

export default {
  name: "OfficerDetailsCard",
  mixins: [CardsCommon]
}
</script>
