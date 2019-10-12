<template>
  <div>
     <div v-bind:key="event.id" v-for="event in events" style="display: inline-block; margin-right: 20px;">
        <EventItem v-bind:event=event />
     </div>
  </div>
</template>

<script>
import EventItem from './EventItem'
import { db } from "../main.js"

export default {
  name: "EventCards",
  components: {
    EventItem
  },
  data() {
    return {
      events: [],
      eventId: []
    }
  },
  mounted() {
    db.collection('items').get().then(
      snap => {
        const events = [];
        var index = 0;
        snap.forEach(doc => {
          this.events.push( doc.data() );
        });
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
