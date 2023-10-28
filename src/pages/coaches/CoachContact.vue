<template>
    <base-card>
     <form @submit.prevent="validate">
        <div class="form-control" >
            <label for="email"> Your email</label>
            <input id="email" type="text" v-model.trim="email" placeholder="Enter your email">
        </div>
        <div class="form-control">
            <label for="message"> Your message</label>
            <textarea id="message" rows="10" v-model.trim="message"></textarea>
        </div>
        <p v-if="!isValidForm" class="invalid">Your information is invalid</p>

        <div class="action">
            <base-button>Send</base-button>
        </div>
     </form>
    </base-card>
</template>
<script>
export default{
    data(){
        return {
            email:"",
            message:"",
            isValidForm: true,
        }
    },
    methods: {
        validate()
        {
            this.isValidForm = true;
            if(this.email.length == 0 || !this.email.includes('@') || this.message.length == 0)
            {
                this.isValidForm = false;
                return; 
            }
            try {
              this.$store.dispatch('requests/contactCoach',{
              email: this.email,
              message: this.message,
              coachId: this.$route.params.id
            } );
            } catch (error) {
              console.log(error);
            }
        
            this.$router.replace('/requests');


        }
    },
}
</script>
<style scoped>
.form {
  width: 100%;
}
.form-group {
  display: flex;
  justify-content: space-between;
}
.form-group .form-control {
  width: 48%;
}
.form-control {
  margin-bottom: 32px;
}
.form-control > input,
textarea {
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}
input, textarea {
  outline: none;
  border: 1px solid #ccc;
}
.form-control.invalid {
  color: red;
}
.invalid input {
  border: 1px solid red;
}
.invalid input,
.invalid {
  color: red;
}
.form-control > label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
}
.flex-row {
  display: flex;
  gap: 16px;
}
</style>