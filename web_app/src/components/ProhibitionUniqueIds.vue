<template>
  <div class="card mt-3 bg-light border-secondary pt-1 pb-1">
    <div class="card-header">
      DRAFT - Batch of IDs retrieved: {{ getUniqueIdsRetrievedDate }}
    </div>
    <div class="card-body" v-for="schema in getAllAvailableForms" :key="schema.short_name">
      <h3>{{ schema.short_name }}</h3>
      <div class="d-flex flex-row">
          <div class="col-sm-4">ID</div>
          <div class="col-sm-4">Expiry</div>
      </div>
      <div class="d-flex flex-row" v-for="row in getUniqueIdsByType(schema.short_name)" :key="row.id">
          <div class="col-sm-4">{{ row.id }}</div>
          <div class="col-sm-4">{{ row.lease_expiry }}</div>
        </div>
      </div>

  </div>
</template>

<script>

import {mapGetters} from "vuex";
import moment from 'moment';

export default {
  name: "ProhibitionUniqueIds",
  computed: {
    ...mapGetters(["getAllAvailableForms", "getUniqueIdsRetrievedDate", "getUniqueIdsByType"]),
    formattedRetrievedDate() {
      return moment(this.getUniqueIdsRetrievedDate).format("YYYY-MM-DD")
    }
  }
}
</script>