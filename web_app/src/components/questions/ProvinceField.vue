<template>
<div class="form-group" :class="fg_class">
  <label v-if="show_label" class="small" :for="id"><slot></slot></label>
  <select class="form-control form-control-sm" :id="id" @input="update">
    <option v-for="(province, key) in getArrayOfProvinces"
            :key="key"
            :selected="province === getAttributeValue(id)">
      {{ province }}
    </option>
  </select>

</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import { mapGetters } from 'vuex';

export default {
  name: "ProvinceField",
  mixins: [FieldCommon],
  computed: {
    ...mapGetters(["getArrayOfProvinces"])
  }
}
</script>
