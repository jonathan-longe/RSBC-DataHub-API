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
            Approve <b-spinner v-if="approveSpinner" small></b-spinner>
          </button>
          <button class="btn-secondary btn btn-sm" v-if="isApproved">
            Delete <b-spinner v-if="deleteSpinner" small></b-spinner>
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
      approveSpinner: false,
      deleteSpinner: false
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
    ...mapActions(['adminApproveUserRole']),
    triggerApproveUserRole() {
      this.approveSpinner = true;
      this.adminApproveUserRole(this.user.username)
        .then( () => {
          this.approveSpinner = false;
        })
        .catch( () => {
          this.approveSpinner = false;
        })

    }
  }
}
</script>

<style scoped>

</style>