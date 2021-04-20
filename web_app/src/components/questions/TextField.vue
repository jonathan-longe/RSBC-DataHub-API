<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <input :type="form_group.input_type"
         class="form-control form-control-sm"
         :id="form_group.id"
         :placeholder="form_group.placeholder"
          :value="form_group.value"
          @input="update">
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "TextField",
  mixins: [FieldCommon]

}
</script>
