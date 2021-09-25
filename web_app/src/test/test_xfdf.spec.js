import { getters } from '../store/getters.js';

const state = {
    "forms": {
        "24Hour": {
            "AA-111111": {
                "form_id": "AA-111111",
                "form_type": "24Hour",
                "served_timestamp": "2021-08-15",
                "lease_expiry": "2021-09-02",
                "data": {
                    "last_name": "Smith",
                    "first_name": "David",
                    "drivers_number": "5161222",
                    "drivers_licence_jurisdiction": "BC",
                    "dob": "20001231",
                    "address1": "123 Main Street",
                    "city": "Victoria",
                    "province": "BC",
                    "postal": "V8R1A1",
                    'prohibition_type': 'Alcohol 215(2)',
                    "prohibition_start_time": "20210922 225900",
                    "offence_city": "Saanich",
                    "badge_number": "4444",
                    "agency": "WVPD",
                    "file_number": "2021-1234",
                    "owners_first_name": "Jane",
                    "owners_last_name": "Smith",
                    "owners_address1": "1234 Main Street",
                    "owners_province": "BC",
                    "owners_city": "Sooke",
                    "owners_postal": "V8R1B1",
                    "owners_phone": "2505551212",
                    "plate_number": "RHL123",
                    "plate_province": "BC",
                    "plate_year": "2021",
                    "plate_val_tag": "6029101",
                    "registration_number": "0292020292114",
                    "vehicle_model": "ACCO",
                    "vehicle_make": "HONDA",
                    "vehicle_type": "2DR",
                    "vehicle_year": "2004",
                    "vehicle_color": "BLU",
                    "puj_code": "BC",
                    "nsc_number": "610029",
                    "vin_number": "2C3CCAGT1DH646504",
                    "vehicle_impounded": "Yes",
                    "impound_lot_operator":  "Buster's Towing Ltd, 435 Industrial Avenue, Vancouver, 604-685-7246",
                    "location_of_keys": "With Vehicle",
                    "vehicle_released_to": "Dad Smith"

                }
            }
        }
    }
};

const form_object = {
    "form_id": "AA-111111",
    "form_type": "24Hour",
}

const getXfdfValue = getters.getXfdfValue(state)
const getXfdfRadioValue = getters.getXfdfRadioValue(state)
const getXfdfRedactedValue = getters.getXfdfRedactedValue()
const getXfdfListValues = getters.getXfdfListValues(state)


test('test getXfdfMappings() returns only data appropriate for ILO copy', () => {

    const document_type = 'ilo'
    const actual = getters.getXfdfMappings(state,
        {getXfdfValue, getXfdfRadioValue, getXfdfRedactedValue, getXfdfListValues})(form_object,document_type)
    expect(actual['VIOLATION_NUMBER']).toEqual("111111")
    expect(actual['DRIVER_SURNAME']).toEqual("--")
    expect(actual['DRIVER_GIVEN']).toEqual("--")
    expect(actual['DRIVER_DL_NUMBER']).toEqual("--")
    expect(actual['DRIVER_DL_PROVINCE']).toEqual("--")
    expect(actual['DRIVER_DOB_YYYY']).toEqual("--")
    expect(actual['DRIVER_DOB_MM']).toEqual("--")
    expect(actual['DRIVER_DOB_DD']).toEqual("--")
    expect(actual['DRIVER_DOB_DD']).toEqual("--")

    expect(actual['DRIVER_ADDRESS']).toEqual("--")
    expect(actual['DRIVER_CITY']).toEqual("--")
    expect(actual['DRIVER_PROVINCE']).toEqual("--")
    expect(actual['DRIVER_POSTAL_CODE']).toEqual("--")

    expect(actual['REASON_ALCOHOL']).toEqual("Yes")
    expect(actual['REASON_DRUGS']).toEqual("")

    expect(actual['NOTICE_TIME']).toEqual("22:59")
    expect(actual['NOTICE_DAY']).toEqual("22nd")
    expect(actual['NOTICE_MONTH']).toEqual("September")
    expect(actual['NOTICE_YEAR']).toEqual("2021")

    expect(actual['DL_SURRENDER_LOCATION']).toEqual("Saanich")
    expect(actual['OFFICER_BADGE_NUMBER']).toEqual("4444")
    expect(actual['AGENCY_NAME']).toEqual("WVPD")
    expect(actual['AGENCY_FILE_NUMBER']).toEqual("2021-1234")

    expect(actual['OWNER_SURNAME']).toEqual("Smith")
    expect(actual['OWNER_GIVEN']).toEqual("Jane")
    expect(actual['OWNER_ADDRESS']).toEqual("1234 Main Street")
    expect(actual['OWNER_CITY']).toEqual("Sooke")
    expect(actual['OWNER_PROVINCE']).toEqual("BC")
    expect(actual['OWNER_POSTAL_CODE']).toEqual("V8R1B1")
    expect(actual['OWNER_PHONE_AREA_CODE']).toEqual("250")
    expect(actual['OWNER_PHONE_NUMBER']).toEqual("555-1212")

    expect(actual['VEHICLE_LICENSE_NUMBER']).toEqual("RHL123")
    expect(actual['VEHICLE_PROVINCE']).toEqual("BC")
    expect(actual['VEHICLE_LICENSE_YEAR']).toEqual("2021")
    expect(actual['VEHICLE_TAG_NUMBER']).toEqual("6029101")
    expect(actual['VEHICLE_REGISTRATION_NUMBER']).toEqual("0292020292114")
    expect(actual['VEHICLE_TYPE']).toEqual("2DR")
    expect(actual['VEHICLE_MAKE']).toEqual("HONDA")
    expect(actual['VEHICLE_MODEL']).toEqual("ACCO")
    expect(actual['VEHICLE_YEAR']).toEqual("2004")
    expect(actual['VEHICLE_COLOUR']).toEqual("BLU")
    expect(actual['VEHICLE_NSC_PUJ']).toEqual("BC")
    expect(actual['VEHICLE_NSC_NUMBER']).toEqual("610029")
    expect(actual['VEHICLE_VIN']).toEqual("2C3CCAGT1DH646504")

    expect(actual['IMPOUNDED']).toEqual("Yes")
    expect(actual['NOT_IMPOUNDED']).toEqual("")

    expect(actual['IMPOUNDED_LOT']).toEqual("Buster's Towing Ltd")
    expect(actual['IMPOUNDED_ADDRESS']).toEqual("435 Industrial Avenue")
    expect(actual['IMPOUNDED_CITY']).toEqual("Vancouver")
    expect(actual['IMPOUNDED_PHONE_AREA_CODE']).toEqual("604")
    expect(actual['IMPOUNDED_PHONE_NUMBER']).toEqual("685-7246")

    expect(actual['RELEASE_LOCATION_KEYS']).toEqual("With Vehicle")
    expect(actual['RELEASE_PERSON']).toEqual("Dad Smith")

})


test('test getXfdfMappings() returns only data appropriate for Notice to driver', () => {

    const document_type = 'notice'
    const actual = getters.getXfdfMappings(state, {getXfdfValue, getXfdfRadioValue})(form_object,document_type)
    expect(actual['VIOLATION_NUMBER']).toEqual("111111")
    expect(actual['DRIVER_SURNAME']).toEqual("Smith")
    expect(actual['DRIVER_GIVEN']).toEqual("David")
    expect(actual['DRIVER_DL_NUMBER']).toEqual("5161222")
    expect(actual['DRIVER_DL_PROVINCE']).toEqual("BC")
    expect(actual['DRIVER_DOB_YYYY']).toEqual("2000")
    expect(actual['DRIVER_DOB_MM']).toEqual("12")
    expect(actual['DRIVER_DOB_DD']).toEqual("31")
    expect(actual['DRIVER_DOB_DD']).toEqual("31")

    expect(actual['DRIVER_ADDRESS']).toEqual("123 Main Street")
    expect(actual['DRIVER_CITY']).toEqual("Victoria")
    expect(actual['DRIVER_PROVINCE']).toEqual("BC")
    expect(actual['DRIVER_POSTAL_CODE']).toEqual("V8R1A1")

    expect(actual['REASON_ALCOHOL']).toEqual("Yes")
    expect(actual['REASON_DRUGS']).toEqual("")

    expect(actual['NOTICE_TIME']).toEqual("22:59")
    expect(actual['NOTICE_DAY']).toEqual("22nd")
    expect(actual['NOTICE_MONTH']).toEqual("September")
    expect(actual['NOTICE_YEAR']).toEqual("2021")

    expect(actual['DL_SURRENDER_LOCATION']).toEqual("Saanich")
    expect(actual['OFFICER_BADGE_NUMBER']).toEqual("4444")
    expect(actual['AGENCY_NAME']).toEqual("WVPD")
    expect(actual['AGENCY_FILE_NUMBER']).toEqual("2021-1234")

    expect(actual['OWNER_SURNAME']).toEqual("Smith")
    expect(actual['OWNER_GIVEN']).toEqual("Jane")
    expect(actual['OWNER_ADDRESS']).toEqual("1234 Main Street")
    expect(actual['OWNER_CITY']).toEqual("Sooke")
    expect(actual['OWNER_PROVINCE']).toEqual("BC")
    expect(actual['OWNER_POSTAL_CODE']).toEqual("V8R1B1")
    expect(actual['OWNER_PHONE_AREA_CODE']).toEqual("250")
    expect(actual['OWNER_PHONE_NUMBER']).toEqual("555-1212")

    expect(actual['VEHICLE_LICENSE_NUMBER']).toEqual("RHL123")
    expect(actual['VEHICLE_PROVINCE']).toEqual("BC")
    expect(actual['VEHICLE_LICENSE_YEAR']).toEqual("2021")
    expect(actual['VEHICLE_TAG_NUMBER']).toEqual("6029101")
    expect(actual['VEHICLE_REGISTRATION_NUMBER']).toEqual("0292020292114")
    expect(actual['VEHICLE_TYPE']).toEqual("2DR")
    expect(actual['VEHICLE_MAKE']).toEqual("HONDA")
    expect(actual['VEHICLE_MODEL']).toEqual("ACCO")
    expect(actual['VEHICLE_YEAR']).toEqual("2004")
    expect(actual['VEHICLE_COLOUR']).toEqual("BLU")
    expect(actual['VEHICLE_NSC_PUJ']).toEqual("BC")
    expect(actual['VEHICLE_NSC_NUMBER']).toEqual("610029")
    expect(actual['VEHICLE_VIN']).toEqual("2C3CCAGT1DH646504")


    expect(actual['IMPOUNDED']).toEqual("Yes")
    expect(actual['NOT_IMPOUNDED']).toEqual("")
    expect(actual['NOT_IMPOUNDED_REASON']).toEqual("")


    expect(actual['IMPOUNDED_LOT']).toEqual("Buster's Towing Ltd")
    expect(actual['IMPOUNDED_ADDRESS']).toEqual("435 Industrial Avenue")
    expect(actual['IMPOUNDED_CITY']).toEqual("Vancouver")
    expect(actual['IMPOUNDED_PHONE_AREA_CODE']).toEqual("604")
    expect(actual['IMPOUNDED_PHONE_NUMBER']).toEqual("685-7246")

    expect(actual['RELEASE_LOCATION_KEYS']).toEqual("With Vehicle")
    expect(actual['RELEASE_PERSON']).toEqual("Dad Smith")

})
