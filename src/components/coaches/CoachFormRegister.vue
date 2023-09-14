<template>
  <div>
    <form class="form" @submit.prevent="register">
      <div class="form-group">
        <div
          class="form-control"
          :class="{ invalid: messageErrors.hasOwnProperty('firstName') }"
        >
          <label for="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            v-model.trim="firstName.val"
            @blur="clearValidate('firstName')"
          />
          <p v-if="messageErrors.hasOwnProperty('firstName')">
            {{ messageErrors.firstName[0] }}
          </p>
        </div>
        <div
          class="form-control"
          :class="{ invalid: messageErrors.hasOwnProperty('lastName') }"
        >
          <label for="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            v-model.trim="lastName.val"
            @blur="clearValidate('lastName')"
          />
          <p v-if="messageErrors.hasOwnProperty('lastName')">
            {{ messageErrors.lastName[0] }}
          </p>
        </div>
      </div>

      <div class="form-control" :class="{ invalid: !description.isValid }">
        <label for="description"> Description</label>
        <textarea
          id="description"
          cols="30"
          rows="5"
          v-model.trim="description.val"
          @blur="clearValidate('description')"
        ></textarea>
        <p v-if="!description.isValid">This field mustn't be empty!</p>
      </div>
      <div class="form-control" :class="{ invalid: !areas.isValid }">
        <h3>Arears of Expertises</h3>
        <div class="flex-row">
          <div>
            <label for="frontend">Frontend Developer</label>
            <input
              type="checkbox"
              id="frontend"
              value="frontend"
              v-model="areas.val"
              @blur="clearValidate('areas')"
            />
          </div>
          <div>
            <label for="backend">Back Developer</label>
            <input
              type="checkbox"
              id="backend"
              value="backend"
              v-model="areas.val"
              @blur="clearValidate('areas')"
            />
          </div>
          <div>
            <label for="career">Career Developer</label>
            <input
              type="checkbox"
              id="career"
              value="career"
              v-model="areas.val"
              @blur="clearValidate('areas')"
            />
          </div>
        </div>
        <p v-if="!areas.isValid">This field mustn't be empty!</p>
      </div>
      <div class="form-control" :class="{ invalid: !rate.isValid }">
        <label for="rate"> Rate</label>
        <input
          type="number"
          id="rate"
          v-model.number="rate.val"
          @blur="clearValidate('rate')"
        />
        <p v-if="!rate.isValid">This field mustn't be empty!</p>
      </div>
      <base-button>Register</base-button>
    </form>
  </div>
</template>
<script>
export default {
  emits: ["register-coach"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
        rule: ["required", "min:6"],
      },
      lastName: {
        val: "",
        isValid: true,
        rule: ["required", "min:10"],
      },
      description: {
        val: "",
        isValid: true,
        rule: ["required"],
      },
      rate: {
        val: 0,
        isValid: true,
        rule: ["required"],
      },
      areas: {
        val: [],
        isValid: true,
        rule: ["required"],
      },
      isValidData: true,
      messageErrors: {},
    };
  },

  methods: {
    generateMessage(field, rule) {
      if (rule == "required") {
        if (this[field].val.length == 0) {
          let message = "The " + field + "must not be empty!";
         if(!this.messageErrors.hasOwnProperty(field))
         {
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
          if(!this.messageErrors.hasOwnProperty(field))
         {
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
          if(!this.messageErrors.hasOwnProperty(field))
         {
          this.messageErrors[field] = new Array();
         }
          this.messageErrors[field].push(message);
          this[field].isValid = false;
        }
      }
    },

    clearValidate(field) {
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
      this.isValidData = Object.keys(this.messageErrors) ? false : true;
      console.log(this.isValidData);
    },
    register() {
      this.isValidData = true;

      this.validateData();

      if (!this.isValidData) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit("register-coach", formData);
    },
  },
};
</script>
<style>
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
.form-control > label {
  display: block;
  margin-bottom: 8px;
}
.flex-row {
  display: flex;
  gap: 16px;
}
</style>
