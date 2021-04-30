<template>
  <div>
    <b-modal id="printConfirmationModal" hide-footer hide-header>
      <div class="d-block text-center">
        <h3>The Prohibition has been sent to RoadSafety</h3>
        <p class="text-muted small">
          The completed prohibition has been downloaded to your computer.
          Open the prohibition with Adobe Acrobat, print it and serve it
          to the citizen.
        </p>
      </div>
      <b-button class="mt-3" variant="success" block @click="saveAndSubmit">
        Yes, save and submit the prohibition to RoadSafetyBC
      </b-button>
      <b-button class="mt-2" variant="danger" block @click="returnToForm">
        No, return to editing the form
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "PrintConfirmationModal",
  methods: {
      saveAndSubmit() {
        this.$bvModal.hide('printConfirmationModal')
      },
      returnToForm() {
        this.$bvModal.hide('printConfirmationModal')
      }
    }
}
</script>

<style scoped>

</style>