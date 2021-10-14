<template>
  <form-card title="Officer">
    <div>
      <read-only-element id="agency">Agency</read-only-element>
      <read-only-element id="badge_number">Badge Number</read-only-element>
      <read-only-element id="officer_name">Officer name</read-only-element>
    </div>
  </form-card>
</template>

<script>
import CardsCommon from "@/components/forms/CardsCommon";

export default {
  name: "OfficerDetailsCard",
  mixins: [CardsCommon]
}
</script>
