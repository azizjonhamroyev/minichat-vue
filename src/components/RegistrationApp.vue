<template>
  <div class="form-section">
    <form class="registration">
      <h2>Registration</h2>
      <input type="text" placeholder="First name" id="name" v-model="user.firstName">

      <input type="text" placeholder="Last name" id="last_name" v-model="user.lastName">

      <input type="text" placeholder="Phone number" id="phone_number" v-model="user.phoneNumber">

      <input type="password" placeholder="Password" id="password" v-model="user.password">

      <button type="button"
              :disabled="isNotAvailable([this.user.firstName,this.user.lastName,this.user.phoneNumber,this.user.password])"
              id="sign_in_btn" @click="signUp">Sign up
      </button>

      <button type="button" id="sign_in_google">
       <span class="logo">
         <img src="../assets/google_logo.svg" alt="google logo"/>
       </span>
        <span class="button-label"> Sign up with Google</span>
      </button>

      <router-link to='/' class="sign-in-link">Sign in</router-link>
    </form>
  </div>
</template>


<script>


import axios from "axios";
import {BASE_URL} from "@/globals/variables";
import router from "@/main";

export default {
  name: "RegistrationApp",
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        password: null
      }
    }
  },
  methods: {
    signUp() {
      const url = BASE_URL + 'api/auth/register';


      axios
          .post(url, this.user)
          .then(response => {
            alert("Successfully registered!")
            localStorage.setItem("token", response.data)
            router.push('/')
          })
          .catch(e => {
            alert(e)
          })
    },

    isValid(s) {
      if (s == null) return false;

      for (let i = 0; i < s.length; i++)
        if (s.charAt(i) !== ' ' && s.charAt(i) !== '\n') return true;

      return false;
    },

    isNotAvailable(fields) {
      for (let i = 0; i < fields.length; i++)
        if (!this.isValid(fields[i])) return true;

      return false;
    }

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.form-section {
  display: flex;
  justify-content: center;
}

button:disabled,
button[disabled] {
  background-color: rgba(71, 108, 255, 0.7);
  color: #fff;
}

.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.sign-in-link {
  align-self: end;
}


input {
  width: 100%;
  background: #D9D9D9;
  border: none;
  padding: 16px 24px;
  margin-bottom: 16px;
  outline: 1px solid lightblue;

}

input::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

}


button {
  background: #476CFF;
  width: 100%;
  font-size: 16px;
  color: #fff;
  border: none;
  outline: none;
  margin-bottom: 16px;

}

h5 {
  color: #476CFF;
  text-underline: #476CFF;
  text-decoration: underline;
}

#sign_in_btn {
  padding: 15px;
}

#sign_in_google {
  display: flex;
  justify-content: space-between;
  padding: 0;
}

#sign_in_google span {
  display: inline-block;
}

.button-label {
  padding: 15px;
  flex: 1;

}

.logo {
  height: 100%;
  width: 45px;
  padding: 0 10px;
  display: flex !important;
  align-items: center;
  background-color: #E5E5E5;
}

a {
  color: #42b983;
}
</style>