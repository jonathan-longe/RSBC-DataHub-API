<script>
import TextField from "@/components/questions/TextField";
import ProvinceField from "@/components/questions/ProvinceField";
import DriverLicenceNumber from "@/components/questions/DriverLicenceNumber";
import CityField from "@/components/questions/CityField";
import DoBField from "@/components/questions/DoBField";

export default {
  name: "FormsCommon",
    props: {
      data: {},
      prohibition_number: null,
  },
  methods: {
    stopEditingForm() {
      this.$store.commit("stopEditingForm");
    },
    exitDoNotSave() {
      this.$store.commit("deleteEditedForm", this.prohibition_number)
    },
    saveAndPrint() {
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
