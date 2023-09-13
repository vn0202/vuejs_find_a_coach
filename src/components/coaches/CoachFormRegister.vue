<template>
  <div>
    <form class="form" @submit.prevent="register">
      <div class="form-group">
        <div class="form-control">
          <label for="firstname">First name</label>
          <input type="text" id="firstname" v-model.trim="firstName" />
        </div>
        <div class="form-control">
          <label for="lastname">Last name</label>
          <input type="text" id="lastname" v-model.trim="lastName"/>
        </div>
      </div>

      <div class="form-control">
        <label for="description"> Description</label>
        <textarea id="description" cols="30" rows="5" v-model.trim="description"></textarea>
      </div>
      <div class="form-control">
        <h3>Arears of Expertises</h3>
       <div class="flex-row">
        <div>
          <label for="frontend">Frontend Developer</label>
          <input type="checkbox" id="frontend"  value="frontend" v-model="areas" />
        </div>
        <div>
          <label for="backend">Back Developer</label>
          <input type="checkbox" id="backend"  value="backend" v-model="areas"/>
        </div>
        <div>
          <label for="career">Career Developer</label>
          <input type="checkbox" id="career"  value="career" v-model="areas"/>
        </div>
       </div>
      </div>
      <div class="form-control">
        <label for="rate"> Rate</label>
        <input type="number" id="rate" v-model.number="rate">
      </div>
      <base-button>Register</base-button>
    </form>
  </div>
</template>
<script>
export default {
    emits:['register-coach'],
    data()
    {
        return{
            firstName:'',
            lastName: '',
            description: '',
            rate: null,
            areas: [],
        }
    },
    methods:{
        register()
        {
            const formData = {
                first: this.firstName,
                last: this.lastName,
                desc: this.description,
                rate: this.rate,
                areas : this.areas,
            };
            this.$emit('register-coach', formData);
        }
    }
};
</script>
<style>
.form {
  width: 100%;
}
 .form-group{
    display: flex;
    justify-content: space-between;
 }
 .form-group .form-control{
    width: 48%;
 }
 .form-control{
    margin-bottom: 32px;
 }
 .form-control > input,textarea {
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}
 .form-control > label {
  display: block;
  margin-bottom: 8px;
}
.flex-row{
    display: flex;
    gap:16px;
}

</style>
