<script>
import TextField from "@/components/questions/TextField";
import ProvinceField from "@/components/questions/ProvinceField";
import DriverLicenceNumber from "@/components/questions/DriverLicenceNumber";
import CityField from "@/components/questions/CityField";
import GenderField from "@/components/questions/GenderField";
import PhoneField from "@/components/questions/PhoneField";
import DateTime from "@/components/questions/DateTime";
import DoBField from "@/components/questions/DoBField";
import { validationMixin } from 'vuelidate'
import * as Validators from "@/validators/validators";


export default {
  name: "FormsCommon",
    props: {
      data: {},
      prohibition_number: null,
      name: null
  },
  mixins: [validationMixin],
  validations() {
        console.log("inside FormsCommon.vue validations(): ", this.data )
        let deliverables = Object.keys(this.data).reduce((rules, elementName) => {
            const item = this.data[elementName]
            if (! Object.prototype.hasOwnProperty.call(item,'validations')) return rules

            console.log(" - item has validations:", item)
            const validations = {}
            for (let rule in item.validations) {
                const params = item.validations[rule].params

                if (params) {
                    validations[rule] = Validators[rule](params)
                } else {
                    validations[rule] = Validators[rule]
                }
            }
            if (typeof rules[elementName] === "undefined") {
                rules[elementName] = Object();
            }
            rules[elementName]["value"] = validations
            return rules
        }, {})
        console.log("validation rules: ", {data: deliverables})
        return {data: deliverables}
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
      console.log("inside FormsCommon.vue updateValidation()", payload)
      if(payload.id in this.$v.data) {
        this.$v.data[payload.id].value.$touch();
      }
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
      console.log("inside deleteEditedForm()", this.prohibition_number)
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
    CityField,
    GenderField,
    PhoneField,
    DateTime
  }
}
</script>
