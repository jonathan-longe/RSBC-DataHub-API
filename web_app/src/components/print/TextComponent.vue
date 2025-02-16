<template>
  <text :x="adjustedStart.x" :y="adjustedStart.y" v-if="renderValue"
        :class="fontSizeClass"
        :id="field_name"
        fill="darkblue">{{ renderValue }}
  </text>
</template>

<script>

import RenderCommon from "@/components/print/RenderCommon";
import moment from "moment-timezone";

export default {
  mixins: [RenderCommon],
  name: "TextComponent",
  methods: {
    getValuesConcatenatedWithCommas(form_path, attributes_array) {
      let attributeValues = []
      attributes_array.forEach( (attribute) => {
          let value = this.getStringValue(form_path, attribute)
          if (value) {
              attributeValues.push(value)
          }
      })
      return attributeValues.join(", ")
    },

    getFormattedDate(form_path, [attribute, format_string]) {
      let value = this.getStringValue(form_path, attribute)
      if (value) {
        const date_time = moment(value, 'YYYYMMDD', true)
        return date_time.format(format_string)
      }
      return ''
    },

    getFormattedTime(form_path, [attribute, format_string]) {
      let value = this.getStringValue(form_path, attribute)
      if (value) {
        const date_time = moment(value, 'HHmm', true)
        return date_time.format(format_string)
      }
      return ''
    },

    getAreaCode(form_path, attribute) {
      let value = this.getStringValue(form_path, attribute)
      if (value) {
        return value.substr(0,3)
      }
      return ''
    },

    getPhone(form_path, attribute) {
      let value = this.getStringValue(form_path, attribute)
      if (value) {
        return value.substring(4)
      }
      return ''
    },

    conditionalLabel(form_path, [attribute, label]) {
      if(this.isExists(form_path, attribute)) {
        return label
      }
      return ''
    },

    conditionalMultiLabel(form_path, attribute_pairs) {
      let strings = []
      attribute_pairs.forEach( (pair) => {
        if(this.isExists(form_path, pair[0])) {
          strings.push(pair[1])
        }
      })
      return strings.join(" AND ")
    },

    label(form_path, attribute) {
      return attribute
    },

    concatenateDateAndTime(form_path, attributes_pairs) {
      let results = []
      attributes_pairs.forEach( (attributes_array) => {
        let dateValue = this.getStringValue(form_path, attributes_array[0])
        let timeValue = this.getStringValue(form_path, attributes_array[1])
        if (dateValue && timeValue) {
            const date_time = moment(dateValue + ' ' + timeValue, 'YYYYMMDD HHmm', true)
            results.push(date_time.format("YYYY-MM-DD HH:mm"))
        }
      })

      return results.join( );
    },

    getStringValueWithSuffix(form_path, attribute_array) {
      let value = this.getStringValue(form_path, attribute_array[0])
      if (value) {
        return value + ' ' + attribute_array[1]
      }
      return ''
    },

    conditionalAndNotBcGetString(form_path, [isExistsAttribute, jurisdictionCd, valueAttribute]) {
      // the last item in the attributes_array is the attribute to display
      const value = this.getStringValue(form_path, valueAttribute)
      const jurisdiction = this.getStringValue(form_path, jurisdictionCd)
      if (jurisdiction && jurisdiction !== 'BC') {
        if (this.isExists(form_path, isExistsAttribute)) {
          return value;
        }
      }
      return ''
    },

    getCarColourCodes(form_path, attribute) {
      const colourArray = this.getAttributeValue(form_path, attribute)
      if (colourArray) {
        return colourArray.map( color => color.code).join("");
      }
      return '';
    }

  }
}
</script>

<style scoped>
  .fontLarge {
    font-size: 3.5pt;
  }
  .fontMedium {
    font-size: 3pt;
  }
  .fontSmall {
    font-size: 2pt;
  }
</style>