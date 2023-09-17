<template>
  <section>
    <base-card>
      <h1>{{ fullName }}</h1>
      <h2>${{ rate }} / hour</h2>
    </base-card>
    <section>
      <base-card>
        <h2>Interested ? Reach out now</h2>
        <base-button link :to="contactLink"> Contact</base-button>
        <router-view></router-view>

      </base-card>
    </section>
  </section>
  <section>
    <base-card> 
    <div style="margin-bottom: 40px;">
        <base-bagde v-for="area in areas " :key="area" :title="area" :type="area"></base-bagde>
    </div>
    <div >
        {{ description }}
    </div>
   </base-card>
  </section>
 
</template>
<script>
export default{
    props:['id'],
    data(){
        return {
            selectCoached: null,
        }
    },
    created()
    {
      this.selectCoached = this.$store.getters['coaches/coaches'].find(coach => coach.id == this.id)
    },
    computed:{
        fullName()
        {
           return this.selectCoached.firstName +  ' ' + this.selectCoached.lastName;
        },
        contactLink()
        {
              return this.$route.path + "/" + "contact";
        },
        areas()
        {
            return this.selectCoached.areas;
        },
        rate(){
            return this.selectCoached.hourlyRate;
        },
        description()
        {
            return this.selectCoached.description;
        }
    }
}
</script>