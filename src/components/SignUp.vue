<template>
  <div>
    <b-modal :id="modalId" hide-footer>
      <template v-slot:modal-title>Sign Up for {{event.title}}</template>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="memberNameFieldSet" label="Your Name:" label-for="memberNameField">
          <b-form-input
            id="memberNameField"
            type="text"
            placeholder="Enter your name here..."
            v-model="newName"
            aria-describedby="event-title-live-feedback"
            :state="newNameValidation"
          ></b-form-input>
          <b-form-invalid-feedback
            :state="newNameValidation"
          >Please make sure you fill out your unique name here</b-form-invalid-feedback>
          <b-form-valid-feedback :state="newNameValidation">Looks Good.</b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="memberRoleFieldSet" label="Your Role:" label-for="memberRoleField">
          <b-form-select
            id="memberRoleField"
            placeholder="Enter your role here..."
            v-model="newRole"
            :options="roles"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="memberRoleFieldSet" label="Your Role:" label-for="memberRoleField">
          <b-form-select
            id="memberPrefDateFieldSet"
            v-model="prefDate"
            :options="dates"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="commentsFieldSet"
          label="Any Additional Comments:"
          label-for="memberCommentsField"
        >
          <b-form-textarea
            id="memberCommentField"
            type="textarea"
            rows="3"
            max-rows="6"
            placeholder="Enter your comments here..."
            v-model="newComment"
          ></b-form-textarea>
        </b-form-group>
        
        <b-row align>
          <b-col lg="12" class="text-center">
            <b-button type="submit" variant="primary">Sign Up!</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  props: ["event"],
  data() {
    return {
      componentId: "",
      eventId: "",
      newName: "",
      newRole: "",
      newComment: "",
      prefDate: "",
      roles: ["Tank", "Healer", "DPS"],
      dates: [],
      show: true
    };
  },
  created() {
    this.eventId = this.event.eventImageUrl.split(".")[0];
    for (let i = 0; i < this.event.dateTimes.length; i++) {
      let date = this.event.dateTimes[i].date;
      let time = this.event.dateTimes[i].time;
      let text = date + " at " + time;

      this.dates.push({
        value: i,
        text: text
      });
    }

    console.log(this.dates);
  },
  computed: {
    modalId() {
      return "sign-up-modal" + this.eventId;
    },
    newNameValidation() {
      return this.newName.length > 0;
    }
  }
};
</script>

<style>
</style>