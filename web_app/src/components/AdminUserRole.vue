<template>
    <tr>
        <td class="small">{{ user.username }}</td>
        <td><h2 class="badge badge-secondary">{{ user.role_name }}</h2></td>
        <td class="text-muted small">{{ user.submitted_dt }}</td>
        <td>
          <h2 class="badge badge-secondary" v-if="isApproved">
            <b-icon-check variant="success"></b-icon-check> Approved
          </h2>
          <button class="btn-secondary btn btn-sm" v-if="! isApproved" @click="triggerApproveUserRole">
            Approve <b-spinner v-if="showSpinner" small></b-spinner>
          </button>

        </td>
    </tr>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "AdminUserRole",
  data() {
    return {
      showSpinner: false
    }
  },
  props: {
      user: {
        username: {},
        role_name: {},
        approved_dt: {},
        submitted_dt: {}
      }
  },
  computed: {
    ...mapGetters(['isUserAnAdmin', 'getAllUsers']),
    isApproved() {
      return this.user.approved_dt
    }
  },
  methods: {
    ...mapActions(['fetchStaticLookupTables', 'adminApproveUserRole']),
    triggerApproveUserRole() {
      this.showSpinner = true;
      this.adminApproveUserRole(this.user.username)
        .then( () => {
          this.showSpinner = false;
        })
        .catch( () => {
          this.showSpinner = false;
        })

    }
  },
  created() {
    this.fetchStaticLookupTables('users')
  }
}
</script>

<style scoped>

</style>