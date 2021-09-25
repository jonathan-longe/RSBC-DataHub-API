<template>
  <form-card title="Download Documents">
    <div class="d-flex justify-content-between">
      <div v-for="(document, kid) in documentObjects" :key="kid"
          @click="saveAndPrint(kid)"
          class="btn btn-outline-primary">
        {{ document.name }}
      </div>
    </div>
  </form-card>
</template>

<script>
import CardsCommon from "@/components/forms/CardsCommon";
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  name: "DocumentDownload",
  mixins: [CardsCommon],
  computed: {
    ...mapGetters(["getCurrentlyEditedFormObject", "documentObjects", "getXdfFileNameString", "getPDFTemplateFileName", "getXFDF"]),
  },
  methods: {

    ...mapActions(["saveDoNotPrint", "fetchStaticLookupTables", "saveCurrentFormToDB"]),
    ...mapMutations(["stopEditingCurrentForm"]),

    saveAndPrint(document_type) {
      console.log("inside saveAndPrint()")
      let pdf_template_filepath = this.getPDFTemplateFileName(document_type)
      let form_object = this.getCurrentlyEditedFormObject
      this.saveCurrentFormToDB(form_object)
      const xml_file = this.getXFDF(pdf_template_filepath, form_object, document_type);
      const href = window.URL.createObjectURL(xml_file); //create the download url
      const downloadElement = document.createElement("a");
      downloadElement.href = href;
      downloadElement.download =  this.getXdfFileNameString(form_object, document_type);
      document.body.appendChild(downloadElement);
      downloadElement.click(); //click to file
      document.body.removeChild(downloadElement); //remove the element
      window.URL.revokeObjectURL(href); //release the object  of the blob
    }
  }

}
</script>
