<template>
  <b-container class="home mt-4 mb-4">
    <HelloWorld msg="Event Manager"/>
    <EventCards />
  </b-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import EventCards from '@/components/EventCards.vue'
import Vue from 'vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    EventCards
  }
}
</script>

<style>



</style>