<template>
<div class="card-body text-dark text-left">
  <div class="card w-100">
    <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
      <div class="container p-0 m-0">
        <div class="row p-0 mt-0 mb-0">
          <div class="col-6 pt-1">{{ title }}</div>
          <div class="col-6 text-right">
            <check-field :show_label="false" :id="id" :options="['Driver is the vehicle owner']">Driver is the vehicle owner</check-field>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body lightgray">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import CheckField from "@/components/questions/CheckField";

export default {
  name: "VehicleOwnerCard",
  components: {CheckField},
  props: {
    title: String
  },
  data() {
    return {
      id: "owner_is_driver",
      option: "Driver is the vehicle owner",
    }
  },
  methods: {
    ...mapMutations(["updateCheckBox"])
  },
  computed: {
    ...mapGetters(["checkBoxStatus"])
  }
}
</script>