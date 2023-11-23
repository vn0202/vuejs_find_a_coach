<template>
  <div>
  <base-dialog :show="!!errorMassage" title="Some thing wrong" @close="handleError">
  <template v-slot:header>
      what happen
    </template>
    {{ errorMassage }}</base-dialog>
    <base-card>
      <form action="" @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            v-model="email.val"
            @input="clearValidate('email')"
          />
          <p v-if="!email.isValid">Email is invalid</p>
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password.val"
            @blur="clearValidate('password')"
          />
          <p v-if="!password.isValid">Password is invalid</p>
        </div>
        <div class="form-group">
          <base-button @click="actionAuth()"> {{ mode }} </base-button>
          <base-button type="button" mode="fat" @click="switchMode()">{{ switchModeTo }}</base-button>
        </div>
      </form>
      <base-spinner v-if="isFetching"></base-spinner>
    </base-card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      errorMassage:'',
      isFetching: false,
      email: {
        val: "",
        type: String,
        isValid: true,
        rule: ["required", "min:6"],
      },
      password: {
        val: "",
        type: String,
        isValid: true,
        rule: ["required", "min:6"],
      },
      isValidData: false,
      mode: "login",
      messageErrors: {},
    };
  },
  computed:{
    switchModeTo()
    {
      if(this.mode == 'login')
      {
        return "Sign up";
      }
      return "Login";
    }
  },
  methods: {
    handleError()
    {
      this.errorMassage = '';
    },

   async actionAuth()
    {
      this.isFetching = true;
      const data = {
        email: this.email.val,
        password: this.password.val,
      };
      try {
        if(this.mode == 'signup')
      {

         await this.$store.dispatch('signup', data);
      
      }else{
       await this.$store.dispatch('login',data);
      }
      } catch (error) {
        this.errorMassage = error.message || "something wrong!";

      }finally{
  this.isFetching = false;
      }
    
    },
    generateMessage(field, rule) {
      if (rule == "required") {
        if (this[field].val.length == 0) {
          let message = "The " + field + "must not be empty!";
          if (!(field in this.messageErrors)) {
            this.messageErrors[field] = new Array();
          }
          this.messageErrors[field].push(message);
          this[field].isValid = false;
        }
      }
      if (rule.startsWith("min:")) {
        let min = rule.split(":")[1];
        if (this[field].val.length < min) {
          let message = "The " + field + "must at least " + min + " characters";
          if (!(field in this.messageErrors)) {
            this.messageErrors[field] = new Array();
          }
          this.messageErrors[field].push(message);
          this[field].isValid = false;
        }
      }
      if (rule.startsWith("max:")) {
        let max = rule.split(":")[1];
        if (this[field].val.length > max) {
          let message = "The " + field + "must maximum " + max + " characters";
          if (!(field in this.messageErrors)) {
            this.messageErrors[field] = new Array();
          }
          this.messageErrors[field].push(message);
          this[field].isValid = false;
        }
      }
    },
    clearValidate(field) {
      this[field].isValid = true;
      delete this.messageErrors[field];
    },
    validateData() {
      let fields = Object.keys(this.$data);
      fields = fields.filter((field) => this[field].rule);
      for (const field of fields) {
        for (const rule of this[field].rule) {
          this.generateMessage(field, rule);
        }
      }

      this.isValidData =
        Object.keys(this.messageErrors).length > 0 ? false : true;
    },

    submitForm() {
      this.validateData();
    },
    switchMode()
    {
      if(this.mode == 'login'){
        this.mode = "signup";
      }
      else{
        this.mode = 'login';
      }
    }
  },
};
</script>
<style scoped>
.form {
  width: 100%;
}
.form-group {
  display: flex;
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
input {
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
.invalid label {
  color: red;
}
</style>
