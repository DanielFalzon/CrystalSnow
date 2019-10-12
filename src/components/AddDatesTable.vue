<template>
  <div class="row">
      
    <b-col sm="5">
      <b-form-group
        id="dateFieldSet"
        style="margin-bottom: 0.5rem"
        description="Add a date poll option."
        label="Date Option:"
        label-for="dateField"
      >
        <b-form-input id="newDate" v-model="newDate" type="date" :state="dateTimesValidation"></b-form-input>
      </b-form-group>
    </b-col>

    <b-col sm="5">
      <b-form-group
        id="timeFieldSet"
        style="margin-bottom: 0.5rem"
        description="Acommpanying time for date"
        label="Time Option:"
        label-for="timeField"
      >
        <b-form-input id="newTime" v-model="newTime" type="time" :state="dateTimesValidation"></b-form-input>
      </b-form-group>
    </b-col>

    <b-col sm="2">
      <b-form-group
        id="addDateBtnsET"
        label="Add..."
        label-for="addDateBtn"
      >
      <b-button id="addDateBtn" variant="primary" v-on:click="addData()"><font-awesome-icon icon="plus" /></b-button>
      </b-form-group>
    </b-col>
    <b-col sm="12">
    <b-form-invalid-feedback :state="dateTimesValidation">
        Atleast one date must be provided
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="dateTimesValidation">
        Good enough
      </b-form-valid-feedback>  
    </b-col>

    <label for="date-table" class="mt-4 col-sm-12">List of submitted dates:</label>
    <b-table outlined fixed id="date-table" class="mt-1 col-sm-12" striped hover :items="dateTimes" :fields="fields">
      <template v-slot:cell(modifiers)="data">
        <b-button id="removeDateBtn" variant="danger" v-on:click="removeData(data.index)"><font-awesome-icon icon="trash" /></b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "AddDatesTable",
  data() {
    return {
      fields: ["date", "time", { key: "modifiers" }],
      dateTimes: [],
      newDate: "",
      newTime: ""
    };
  },
  computed: {
    dateTimesValidation() {
      return this.dateTimes.length > 0;
    }
  },
  methods: {
    addData: function() {
      this.dateTimes.push({ date: this.newDate, time: this.newTime, votes: 1 });
      this.$emit('update-dates', this.dateTimes);
    },
    removeData: function(index) {
      this.dateTimes.splice(index, 1);
      this.$emit('update-dates', this.dateTimes);
    },
    clearAllData: function(){
      this.dateTimes = [],
      this.newDate = "",
      this.newTime = ""
    }
  }
};
</script>

<style scoped>
</style>