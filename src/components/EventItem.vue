<template>
  <div>
    <SignUp :event="event" />
    <b-card
      :title="event.title"
      :img-src="eventCardImageUrl"
      style="max-width: 22rem; position:relative; height:651px;"
    >
      <div class="top-align top-align-left event-level-div">{{event.itemLevel}}</div>
      <div class="top-align top-align-right event-level-div">{{event.level}}</div>
      <div class="bottom-image-align text-center w-100 p-2">
        <Countdown :date="mostVotedDate" />
      </div>
      <b-card-text class="small text-muted">
        Most Preferred Date:
        <span style="font-weight:bold">{{mostVotedDate}}</span>
      </b-card-text>
      <b-card-text class="classes-needed mt-1">
        <b-row class="text-center">
          <b-col>
            <img src="../assets/tank-icon.png" />
            <div class="small text-muted">1 {{maxTanks}}</div>
          </b-col>
          <b-col>
            <img src="../assets/heal-icon.png" />
            <div class="small text-muted">1 {{maxHealers}}</div>
          </b-col>
          <b-col>
            <img src="../assets/dps-icon.png" />
            <div class="small text-muted">2 {{maxDps}}</div>
          </b-col>
        </b-row>
      </b-card-text>
      <b-card-text class="additional-comments mt-4 text-center">
        <small class="text-muted">{{event.additionalComments}}</small>
      </b-card-text>
      <DatePoll :dateTimes="event.dateTimes" />
      <b-card-text class="mt-4 text-center">
        <b-row>
          <b-col sm="2" class="height-100 bottom-column-left">
            <small class="text-muted"><font-awesome-icon icon="user" /> 4 {{maxPlayers}}</small>
          </b-col>
          <b-col sm="8">
            <b-button @click="showModal()">Sign Up!</b-button>
          </b-col>
          <b-col sm="2" class="height-100 bottom-column-right">
            <small class="text-muted"><font-awesome-icon icon="edit" /></small>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
    <!-- <img :src="cardImageUrl" style="height:100px" id="eventImage"/> -->
  </div>
</template>

<script>
import { dbs } from "../main";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DatePoll from "./DatePoll";
import Countdown from "./Countdown";
import SignUp from "./SignUp";

export default {
  name: "EventItem",
  props: ["event"],
  components: {
    DatePoll,
    Countdown,
    SignUp
  },
  data() {
    return {
      eventImageUrl: this.event.eventImageUrl,
      eventCardImageUrl: "",
      currDateTimes: this.event.dateTimes,
      totalPlayers: this.event.totalPlayers,
      totalTanks: this.event.numOfTanks,
      totalHealers: this.event.numOfHealers,
      totalDps: this.event.numOfDps,
      signedMembers: this.event.members
    };
  },
  created() {
    const storeRef = dbs.ref();
    storeRef
      .child(this.eventImageUrl)
      .getDownloadURL()
      .then(url => {
        this.eventCardImageUrl = url;
      })
      .catch(function(error) {
        switch (error.code) {
          case "storage/object-not-found":
            console.log("file doesnt exist at" + url);
            break;

          case "storage/unauthorized":
            console.log("unauthorized storaged at" + url);
            break;

          case "storage/canceled":
            console.log("cancelled storage at" + url);
            break;

          case "storage/unknown":
            console.log(error.code);
            break;
            console.log(error.code);
        }
      });
      //console.log(this.signedMembers[0].role);
  },
  computed: {
    modalId() {
      return "sign-up-modal" + this.eventImageUrl.split(".")[0];
    },
    mostVotedDate() {
      var votes = 0;
      var returnedDate = "";
      for (var i = 0; i < this.currDateTimes.length; i ++){
        if (this.currDateTimes[i].votes >= votes){
          votes = this.currDateTimes[i].votes;
          returnedDate = this.currDateTimes[i];
        }
      }
      var dateString = returnedDate.date + " " + returnedDate.time;
      var date = new Date(dateString);
      return date;
    },
    maxPlayers() {
      if (this.totalPlayers < 1){
        return " "
      } else {
        return " / " + this.totalPlayers
      }
    },
    maxTanks() {
      if (this.totalTanks < 1){
        return " "
      } else {
        return " / " + this.totalTanks
      }
    },
    maxHealers() {
      if (this.totalHealers < 1){
        return " "
      } else {
        return " / " + this.totalHealers
      }
    },
    maxDps() {
      if (this.totalDps < 1){
        return " "
      } else {
        return " / " + this.totalDps
      }
    },

  },
  methods: {
    showModal() {
      this.$bvModal.show(this.modalId);
    }
  }
};
</script>>

<style scoped>
.is-complete {
  color: green;
}

.top-align {
  position: absolute;
  color: black;
  font-weight: 500;
  background-color: #ffffffa8;
  top: 0.8rem;
}

.bottom-image-align {
  color: White;
  position: absolute;
  top: 139px;
  left: 0rem;
  height: 84px;
  background-color: #000000c7;
}

.top-align-right {
  right: 1rem;
}

.top-align-left {
  left: 1rem;
}

.event-level-div {
  border-radius: 100px;
  padding: 7px 10px;
  font-weight: bold;
}

.countdown.time {
  font-size: 25px;
}

.countdown.days {
  font-size: 15px;
}


.card-img {
  min-height: 224px;
  height: 224px !important;
}

.classes-needed div {
  font-weight: bold !important;
}

.classes-needed img {
  max-height: 40px;
}

.bottom-column
{
    float: none;
    display: table-cell;
    vertical-align: bottom;
}

.bottom-column-left small{
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.bottom-column-right small{
  position: absolute;
  bottom: 0;
  width: 100%;
  right: 0;
}
</style>