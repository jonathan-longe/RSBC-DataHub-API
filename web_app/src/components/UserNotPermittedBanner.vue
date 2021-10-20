<template>
  <div class="card bg-light border-secondary mb-3">
      <div class="card-body text-dark">
        <span class="font-weight-bold">Welcome!</span>
        it looks like you haven't used this app before.<br />
        <span class="small">Until you're authorized, some features of this app are disabled.
          <span @click="showApplication = ! showApplication" class="text-secondary">
            {{ this.showApplicationLabel }}
          </span>
        </span>
        <div v-if="showApplication" class="d-flex justify-content-center mt-2">
          <div class="form-inline">
            <div class="form-group">
              <label v-if="false" for="keycloak_username">Username</label>
              <input type="text"
                   class="form-group"
                   id="keycloak_username"
                   :value=getKeycloakUsername
                   :disabled=true>
              <button @click="dispatchUnlock" class="btn btn-secondary">
                Apply
                <b-spinner v-if="showSpinner"></b-spinner>
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";


export default {
  name: "UserNotPermittedBanner",
  data() {
    return {
      showApplication: false,
      showSpinner: false
    }
  },
  methods: {
    ...mapActions(['applyToUnlockApplication']),
    dispatchUnlock() {
      this.showSpinner = true
      this.applyToUnlockApplication()
        .then(() => {
          this.showSpinner = false
        })
        .catch(() => {
          this.showSpinner = false
        })
    }
  },
  computed: {
    ...mapGetters(['getKeycloakUsername']),
    showApplicationLabel() {
      if (this.showApplication) {
        return 'Hide'
      } else {
        return 'Unlock this app'
      }
    }
  }
}
</script>