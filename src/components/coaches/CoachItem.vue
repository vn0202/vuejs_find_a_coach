<template>
    <li>
      <h3>{{  lastName }}</h3>
      <h4>${{ rate }}/hour</h4>
      <div style="display:flex; gap:16px">
      
        <base-bagde :type="area" :title="area"  v-for="area in areas" :key="area"></base-bagde>
      </div>
      <div class="actions">
        <base-button link mode="outline" :to="coachContactLink">Contact</base-button>
        <base-button link :to="coachDetailsLink">View Details</base-button>
      </div>
    </li>
  </template>
  
  <script>
  export default {
   props:['id','firstName','lastName','areas','rate'],
   computed:{
    fullName()
    {
        return this.firstName + " " + this.lastName;
    },
    coachDetailsLink()
    {
        return this.$route.path + "/" + this.id;
    },
    coachContactLink()
    {
        return this.$route.path + '/' + this.id + "/contact";
    }
   }
  }
  </script>
  
  <style scoped>
  li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  h3,
  h4 {
    margin: 0.5rem 0;
  }
  
  div {
    margin: 0.5rem 0;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  </style>