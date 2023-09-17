<template>
  <div>
    <base-card>
      <h2>Request messages</h2>
      <ul v-if="hasRequest" >
        <RequestItem v-for="request in receiveRequests" :key="request.id" :email="request.userEmail" :message="request.message"></RequestItem>
      </ul>
      <p v-else>You have no any messages</p>
    </base-card>
  </div>
</template>
<script>
import RequestItem from "@/components/requests/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },
  computed: {
    receiveRequests()
    {
        console.log('nghia');
        return this.$store.getters['requests/requests'];
    },
    hasRequest()
    {
        return this.$store.getters['requests/hasRequests'];
    }
  },
};
</script>
