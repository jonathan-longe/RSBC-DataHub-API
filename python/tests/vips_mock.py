import json


def status_has_never_applied(prohibition_type) -> dict:
    data = json.loads(json.dumps(status_get('2018-04-12')))  # deep copy
    data['data']['status']['notice_type'] = prohibition_type
    del data['data']['status']['reviews'][0]
    return data


def status_applied_and_paid_not_scheduled(prohibition_type) -> dict:
    data = json.loads(json.dumps(status_get('2018-04-12')))  # deep copy
    data['data']['status']['noticeTypeCd'] = prohibition_type
    del data['data']['status']['reviews'][0]['status']
    del data['data']['status']['reviews'][0]['reviewId']
    del data['data']['status']['reviews'][0]['reviewStartDtm']
    del data['data']['status']['reviews'][0]['reviewEndDtm']
    return data


def status_applied_not_paid(prohibition_type, date_served='2018-04-12') -> dict:
    data = json.loads(json.dumps(status_get(date_served)))  # deep copy
    data['data']['status']['noticeTypeCd'] = prohibition_type
    del data['data']['status']['reviews'][0]['status']
    del data['data']['status']['reviews'][0]['reviewId']
    del data['data']['status']['reviews'][0]['reviewStartDtm']
    del data['data']['status']['reviews'][0]['reviewEndDtm']
    del data['data']['status']['reviews'][0]['receiptNumberTxt']
    return data


def status_returns_html_response() -> str:
    return '<html><p>VIPS is offline</p></html>'


def status_not_found() -> dict:
    return {
      "resp": "fail",
      "error": {
        "message": "Record not found",
        "httpStatus": 404
      }
    }


def status_get(date_served) -> dict:
    return {
      "resp": "success",
      "data": {
        "status": {
          "noticeTypeCd": "UL",
          "noticeServedDt": date_served + " 00:00:00 -07:00",
          "reviewFormSubmittedYn": "N",
          "reviewCreatedYn": "N",
          "originalCause": "IRPINDEF",
          "surnameNm": "Gordon",
          "driverLicenceSeizedYn": "Y",
          "disclosure": [
            {
                "documentId": "1234",
                "disclosedDtm": "2019-01-02 17:30:00 -08:00"
            },
            {
                "documentId": "1234",
                "disclosedDtm": "2019-01-02 17:30:00 -08:00"
            }
          ],
          "reviews": [
            {
              "status": "cancelled",
              "receiptNumberTxt": "1234",
              "applicationId": "bb71037c-f87b-0444-e054-00144ff95452",
              "reviewStartDtm": "2021-02-24 12:00:00 -08:00",
              "reviewEndDtm": "2021-02-24 12:30:00 -08:00",
              "reviewId": "2466"
            }
          ]
        }
      }
    }


def application_get(presentation_type='ORAL') -> dict:
    return {
      "resp": "success",
      "data": {
        "applicationInfo": {
          "prohibitionNoticeNo": "21900309",
          "noticeTypeCd": "IRP",
          "reviewApplnTypeCd": "IRP",
          "noticeSubjectCd": "PERS",
          "presentationTypeCd": presentation_type,
          "reviewRoleTypeCd": "APPNT",
          "firstGivenNm": "Developer",
          "surnameNm": "Norris",
          "phoneNo": "2505551212",
          "email": "applicant_fake@gov.bc.ca",
          "manualEntryYN": "N",
          "formData": "PD94bWwgdmVyc2lv3ZlPCbT4KItZW50cz4KPC9kYXRhPg=="
        }
      }
    }


def application_get_not_found() -> dict:
    return {
      "resp": "fail",
      "error": {
        "message": "Record not found",
        "httpStatus": 404
      }
    }


def payment_patch_payload() -> dict:
    return {

    }
