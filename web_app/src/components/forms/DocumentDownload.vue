<template>
  <div>
    <div @click="saveAndPrint" class="btn btn-primary">
      {{ document.name }}
      <b-spinner v-if="display_spinner" small label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "DocumentDownload",
  props: {
    document: {},
    kid: {}
  },
  data() {
    return {
      display_spinner: false,
    }
  },
  computed: {
    ...mapGetters(["getCurrentlyEditedFormObject", "getPdfFileNameString"]),
  },
  methods: {

    ...mapActions(["saveCurrentFormToDB", "createPDF"]),

    async saveAndPrint() {
      this.display_spinner = true;
      console.log("inside saveAndPrint()", this.display_spinner)
      let payload = {}
      payload['form_object'] = this.getCurrentlyEditedFormObject;
      payload['filename'] = this.getPdfFileNameString(payload.form_object, this.kid);
      payload['variants'] = this.document.variants;
      await this.saveCurrentFormToDB(payload.form_object)
      await this.createPDF(payload)
        .then( () => {
          this.display_spinner = false;
          console.log("saveAndPrint() complete", this.display_spinner)

        })

    }
  }

}
</script>
