import required from "vuelidate/lib/validators/required";
import minLength from "vuelidate/lib/validators/minLength";
import moment from 'moment';

// Custom validations rules listed below
// must return "true" to pass validation

const validDate = (value) => moment(value, "YYYY-MM-DD", true).isValid()

const validDateTime = (value) => moment(value, "YYYY-MM-DD HH:MM", true).isValid()

const validPhoneNumber = (value) => {
    if(value.length === 0) return true;
    const regexMatch = value.match("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
    if (Array.isArray(regexMatch)) {
        return regexMatch[0] === value;
    }
    return false;
}

const currentTime = (value) => {
    const timeAgo = moment().diff(moment(value), 'minutes')
    console.log("timeAgo: ", timeAgo)
    return timeAgo <= 120
};



export { required, minLength, validDate, validPhoneNumber, currentTime, validDateTime }


