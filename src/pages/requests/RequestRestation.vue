<template>
  <base-card>
    <h1>Register as a coach</h1>
    
    <coach-form-register @register-coach="saveData"></coach-form-register>
  </base-card>
</template>
<script>
import CoachFormRegister from "@/components/coaches/CoachFormRegister.vue";
export default {
  components: { CoachFormRegister },
  methods:{
    saveData(data){
        this.$store.dispatch('coaches/registerCoach',data);
        this.$router.replace('/coaches');
    }
  }
};
</script>
