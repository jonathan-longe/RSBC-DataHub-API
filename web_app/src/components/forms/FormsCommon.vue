<script>
import FormContainer from "@/components/forms/FormContainer";
import FormStep from "@/components/forms/FormStep";
import FormCard from "@/components/forms/FormCard";
import FormRow from "@/components/forms/FormRow";
import TextField from "@/components/questions/TextField";
import ProvinceField from "@/components/questions/ProvinceField";
import DriverLicenceNumber from "@/components/questions/DriverLicenceNumber";
import TypeAheadField from "@/components/questions/TypeAheadField";
import GenderField from "@/components/questions/GenderField";
import PhoneField from "@/components/questions/PhoneField";
import DateTime from "@/components/questions/DateTime";
import DateField from "@/components/questions/DateField";
import DobField from "@/components/questions/DoBField";
import PlateNumber from "@/components/questions/PlateNumber";
import PrintConfirmationModal from "@/components/PrintConfirmationModal";
import RadioField from "@/components/questions/RadioField";
import CheckField from "@/components/questions/CheckField";
import ShadowBox from "@/components/forms/ShadowBox";
import VehicleOwnerCard from "@/components/cards/VehicleOwnerCard";
import VehicleInformationCard from "@/components/cards/VehicleInformationCard";
import VehicleImpoundmentCard from "@/components/cards/VehicleImpoundmentCard";
import { mapGetters } from "vuex";


export default {
  name: "FormsCommon",
    props: {
      data: {},
      name: null
  },
  data() {
    return {
      xml_file: null
    }
  },
  computed: {
    ...mapGetters(["getArrayOfBCCityNames"]),
  },
  components: {
    FormContainer,
    FormStep,
    FormCard,
    FormRow,
    DobField,
    TextField,
    ProvinceField,
    DriverLicenceNumber,
    TypeAheadField,
    GenderField,
    PhoneField,
    DateTime,
    PrintConfirmationModal,
    PlateNumber,
    RadioField,
    CheckField,
    DateField,
    ShadowBox,
    VehicleOwnerCard,
    VehicleInformationCard,
    VehicleImpoundmentCard

  }
}
</script>
