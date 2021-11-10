<template>
  <div class="card w-100 mt-3 mb-3">
      <div class="card-header text-white text-left font-weight-bold small pl-3 pt-1 pb-1 bg-primary">
        User Roles
      </div>
      <div class="card-body text-left pb-1">
        <table class="table table-striped">
          <tbody>
            <admin-user-role v-for="(user, index) in getAllUsers" :key="index" :user="user"></admin-user-role>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import AdminUserRole from "@/components/AdminUserRole";

export default {
  name: "Admin",
  computed: {
    ...mapGetters(['isUserAnAdmin', 'getAllUsers']),
  },
  methods: {
    ...mapActions(['fetchDynamicLookupTables', 'fetchStaticLookupTables'])
  },
  created() {
    // this.fetchStaticLookupTables("users")
    this.fetchDynamicLookupTables({url:'admin/users', type: "users"})
  },
  components: {
    AdminUserRole
  }
}
</script>

<style scoped>

</style>