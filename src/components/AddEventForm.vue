<template>
  <div class="mt-4 mb-4 add-form container">
    <b-form @submit.stop.prevent="onSubmit">
      <b-row>
        <b-col lg="6">
          <b-row>
            <b-col lg="12">
              <b-form-group
                id="eventTitleFieldSet"
                label="Event Title:"
                label-for="eventTitleField"
                >
                <b-form-input
                  id="eventTitleField"
                  type="text"
                  placeholder="Enter the title over here..."
                  v-model="eventTitle"
                  aria-describedby="event-title-live-feedback"
                  :state="eventTitleValidation"
                ></b-form-input>
                <b-form-invalid-feedback :state="eventTitleValidation">
                  Your user ID must be greater than/equal to 10 characters long.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="eventTitleValidation">
                  Looks Good.
                </b-form-valid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group
                id="eventLevelFieldSet"
                description="Level needed to join event."
                label="Level:"
                label-for="eventLevelField"
              >
                <b-form-input id="eventLevelField" v-model.number="eventLevel" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group
                id="eventItemLvlFieldSet"
                description="Item level needed to join event."
                label="iLevel:"
                label-for="eventLevelField"
              >
                <b-form-input id="totalPlayersField" v-model.number="eventItemLevel" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group
                id="totalPlayersFieldSet"
                description="Max total of players needed"
                label="Total Players:"
                label-for="eventLevelField"
              >
                <b-form-input id="eventItemLvlField" v-model.number="totalPlayers" type="number"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <label>Required players in each class:</label>
            </b-col>
          </b-row>
          <b-row style="margin-top:5px">
            <b-col sm="4">
              <b-input-group>
                <template v-slot:prepend>
                  <img style="width:38px; height:38px" src="../assets/tank-icon.png" alt="image" />
                </template>
                <b-form-input id="numOfTanksField" v-model.number="numOfTanks" type="number"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col sm="4">
              <b-input-group>
                <template v-slot:prepend>
                  <img style="width:38px; height:38px" src="../assets/heal-icon.png" alt="image" />
                </template>
                <b-form-input id="numOfHealersField" v-model.number="numOfHealers" type="number"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col sm="4">
              <b-input-group>
                <template v-slot:prepend>
                  <img style="width:38px; height:38px" src="../assets/dps-icon.png" alt="image" />
                </template>
                <b-form-input id="numOfDpsField" v-model.number="numOfDps" type="number"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group
                id="additionalCommentsFieldSet"
                class="mt-3"
                description="Any further details you wish to add about the event"
                label="Additional Comments:"
                label-for="additionalCommentsField"
              >
              <b-form-textarea
                  id="textarea"
                  v-model="additionalComments"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="6">
          <b-row>
            <b-col lg="12">
              <b-form-group label="Event Image" label-for="eventImageField" @change="onPickFile">
                <b-form-file
                  id="eventImageField"
                  accept="image/jpeg, image/png, image/gif"
                  ref="fileInput"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  :v-if="uploadReady"
                  :state="eventImageValidation"
                  @change = "onFilePicked"
                ></b-form-file>
                <div v-bind:class = "[activeImgPreviewClass]">
                  <img :src="eventImageUrl" height="150">
                </div>

                <b-form-invalid-feedback :state="eventImageValidation">
                  Image must be provided and needs to be less than 5MB
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="eventImageValidation">
                  Looks Good.
                </b-form-valid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
              <AddDatesTable ref="dateChildComponent" @update-dates="updateDateTimesProp"/>
        </b-col>
      </b-row>
      <b-row align>
        <b-col lg="12" class="text-right">
          <b-button variant="primary" type="submit">Add Event</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import AddDatesTable from "../components/AddDatesTable";
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: "AddEventForm",
  components: {
    AddDatesTable
  },
  data() {
    return {
        eventTitle: '',
        eventLevel: 0,
        eventImageUrl: '',
        eventImage: null,
        eventItemLevel: 0,
        totalPlayers: 0,
        numOfTanks: 0,
        numOfHealers: 0,
        numOfDps: 0,
        dateTimes: [],
        additionalComments: '',
        
        //Auxiliary data for functionality.
        isMounted: false,
        currentEventImageFiles: null,
        uploadReady: true,
        activeImgPreviewClass: ''
    };
  },
  computed: {
    eventTitleValidation() {
      this.activeImgPreviewClass = '';
      this.eventImageUrl = '';
      return this.eventTitle.length >= 10
    },

    eventImageValidation() {
      if(!this.isMounted){
        this.eventImageUrl = '';
        this.activeImgPreviewClass = '';
        return false;
      }

      if(this.currentEventImageFiles == null){
        this.eventImageUrl = '';
        this.activeImgPreviewClass = '';
        return false;
      }

      const file = this.currentEventImageFiles[0];

      if (!file) {
        alert('No file chosen');
        this.eventImageUrl = '';
        this.activeImgPreviewClass = '';
        return false;
      }
      if (file.size > 1024 * 1024 * 5) {
        alert('File too big (> 5MB)');
        this.eventImageUrl = '';
        this.activeImgPreviewClass = '';
        return false;
      }
      this.activeImgPreviewClass = "img-preview-success";
      return true;
    },

    dateTimesValidation() {
      return this.dateTimes.length > 0;
    }
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    onSubmit: function() {
      if (!(this.eventTitleValidation && this.eventTitleValidation && this.dateTimesValidation)){
        console.log(this.numOfDps);
        console.log("me has error");
        return
      }
      const eventData = {
        eventTitle: this.eventTitle,
        eventLevel: this.eventLevel,
        eventImageUrl: this.eventImageUrl,
        eventImage: this.eventImage,
        eventItemLevel: this.eventItemLevel,
        totalPlayers: this.totalPlayers,
        numOfTanks: this.numOfTanks,
        numOfHealers: this.numOfHealers,
        numOfDps: this.numOfDps,
        dateTimes: this.dateTimes,
        additionalComments: this.additionalComments,
        created_at: Date.now()
      }
      var tempTitle = this.eventTitle;
      this.$store.dispatch('setItems', eventData)
      this.makeToast(tempTitle);
      this.reset();
    },

    reset: function() {
      this.eventTitle = "",
      this.eventLevel = 0,
      this.eventImageUrl = "",
      this.$refs.fileInput.value = "";
      this.$refs.fileInput.files = null,
      this.currentEventImageFiles = null,
      this.eventItemLevel = 0,
      this.additionalComments = "",
      this.totalPlayers = 0,
      this.numOfTanks = 0,
      this.numOfHealers = 0,
      this.numOfDps = 0,
      this.dateTimes = [],
      this.$refs.dateChildComponent.clearAllData();
    },

    updateDateTimesProp: function(value){
      this.dateTimes = value;
    },

    onPickFile (){
      this.$refs.fileInput.click()
      eventImageValidation()
    }, 

    onFilePicked (event) {
      this.currentEventImageFiles = event.target.files
      let filename = this.currentEventImageFiles[0].name
      if (filename.lastIndexOf('.') <= 0 ){
        return alert('please add a valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.eventImageUrl = fileReader.result
      })
      fileReader.readAsDataURL(this.currentEventImageFiles[0])
      this.eventImage = this.currentEventImageFiles[0]
    },
    
    makeToast (title = "Event"){
      this.$bvToast.toast('Event titled ' + title + ' has been added successfully', {
        title: 'Event Created',
        variant: 'success',
        toaster: 'b-toaster-top-center',
        solid: true,
        autoHideDelay: 4000
      })
    }
  }
};
</script>

<style>
.row {
  margin-top: 20px;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.error, .error.message{
  font-weight: 400;
  color: #f66;
}

.img-preview-success{
    padding: 15px;
    padding-top: 14px;
    border-radius: 6px;
    margin-top: 10px;
    text-align: center;
    background-color:#a6dab2;
    border-radius: 10px;
}

</style>