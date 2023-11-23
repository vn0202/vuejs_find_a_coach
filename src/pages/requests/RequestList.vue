<template>
  <div>
    <BaseDialog :show="!!error" @close="handleError" title="Unauthorization">
      <p>{{ error }}</p>
    </BaseDialog>
    <base-card>
      <h2>Request messages</h2>
      <ul v-if="hasRequest">
        <RequestItem
          v-for="request in receiveRequests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></RequestItem>
      </ul>
      <p v-else>You have no any messages</p>
    </base-card>
  </div>
</template>
<script>
import RequestItem from "@/components/requests/RequestItem.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
export default {
  components: {
    RequestItem,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadRequests();
  },
  computed: {
    receiveRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequest() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("requests/fetchRequests");

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.error = error.message;
      }
    },
    handleError(){
      this.error = null;
    }
  },
};
</script>
