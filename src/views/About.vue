<template>
  <div class="about mt-4 container">
     <b-jumbotron :header-level= "4" header-tag= "h4">
      <template v-slot:header >Create an Event</template>
        <template v-slot:lead>Fill out the fields below to create an event that will show in the home page</template>
        <hr class="my-4">
        <AddEventForm />
     </b-jumbotron>
  </div>
</template>

<script>
import AddEventForm from '@/components/AddEventForm'

export default {
  components: {
    AddEventForm
  }
}

</script>

<style scoped>
  .display-4{
    font-size: 2.7rem;
    margin-bottom: 1.5rem;
  }
  
  .jumbotron {
    background-color: #edf6ff;
  }
</style>>