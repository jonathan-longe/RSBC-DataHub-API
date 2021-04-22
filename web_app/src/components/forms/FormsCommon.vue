<script>
import TextField from "@/components/questions/TextField";
import ProvinceField from "@/components/questions/ProvinceField";
import DriverLicenceNumber from "@/components/questions/DriverLicenceNumber";
import CityField from "@/components/questions/CityField";
import DoBField from "@/components/questions/DoBField";
import { validationMixin } from 'vuelidate'


export default {
  name: "FormsCommon",
    props: {
      data: {},
      prohibition_number: null,
      name: null
  },
  mixins: [validationMixin],
  validations() {
    return this.$store.getters.getValidationRules(this.data);
  },

  computed: {
    formData() {
      // Merge validation errors and form data into a single
      // object that can be passed to field components.
      let formData = {data: this.data}
      Object.entries(formData.data).forEach( entry => {
        const [key] = entry;
        if(key in this.$v.data) {
          formData.data[key].errors = this.$v.data[key].value;
        }
      })
      return formData
    },
    displayValidationErrors() {
      return this.$v.$error;
    }
  },
  methods: {
    updateValidation(payload) {
      console.log("inside updateValidation()", payload)
      this.$v.data[payload.id].value.$touch();
    },
    saveDoNotPrint() {
      this.$v.$touch()
      if( ! this.$v.$invalid) {
        this.$store.commit("saveDoNotPrint");
      } else {
        console.log("inside saveDoNotPrint() - not valid")
      }
    },
    exitDoNotSave() {
      this.$store.commit("deleteEditedForm", this.prohibition_number)
    },
    saveAndPrint() {
      this.$v.$touch()
      console.log("TODO")
    }
  },
  components: {
    DoBField,
    TextField,
    ProvinceField,
    DriverLicenceNumber,
    CityField
  }
}
</script>
