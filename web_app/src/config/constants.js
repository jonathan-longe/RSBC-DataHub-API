export default {
    // TODO - remove before flight
    //  inject root URLS per environment

    // root URLs should NOT end with a "/"
    URL_ROOT: "https://rsbc-dh-prohibition-web-service-dev.apps.silver.devops.gov.bc.ca",

    // Number of days before this app will refresh unique prohibition ids.  The unique
    // id expiry date is set by the prohibition web service (currently set to 30 days),
    // but this app determines when to refresh the list.  If the app waited until the
    // unique ids had expired the officer could be find themselves offline with no
    // unique ids.
    UNIQUE_ID_REFRESH_DAYS: 15,

    // The minimum number of unique ids per type to have in storage before requesting more.
    MINIMUM_NUMBER_OF_UNIQUE_IDS_PER_TYPE: 1
}