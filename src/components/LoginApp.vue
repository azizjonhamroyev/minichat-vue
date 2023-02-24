<template>
  <div class="form-section">
    <form class="login">
      <h2>Login</h2>
      <input type="text" placeholder="Phone number" v-model="user.phoneNumber">

      <input type="password" placeholder="Password" v-model="user.password">

      <button type="button" id="sign_in_btn" @click="login"
              :disabled='isNotAvailable([this.user.phoneNumber,this.user.password])'>Sign in
      </button>

      <button type="button" id="sign_in_google">
       <span class="logo">
         <img src="../assets/google_logo.svg" alt="google logo"/>

       </span>
        <span class="button-label"> Sign in with Google</span>

      </button>

      <router-link to="/registration" class="sign-in-link">Sign up</router-link>
    </form>
  </div>
</template>

<script>

import axios from "axios";
import {BASE_URL} from "@/globals/variables";
import router from "@/main";

export default {
  name: 'LoginApp',
  data() {
    return {
      user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        password: null,
      },
      isAuthenticated: localStorage.getItem('user') != null
    }
  },
  methods: {

    login() {


      const url = BASE_URL + 'api/auth/authenticate'

      const user = {
        phoneNumber: this.user.phoneNumber,
        password: this.user.password
      }

      const token = localStorage.getItem("token")
      axios
          .post(url, user, {
            headers: {
              Authorization: `Bearer ${token}`,
              token: token
            }
          })
          .then(response => {

            if (response.data) {
              this.user = response.data
              localStorage.setItem('phoneNumber', user.phoneNumber)
              localStorage.setItem('token', token)
              router.push('/chat')
            } else {
              alert("Your phone number or password is wrong!")
            }
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
  },

  mounted() {
    if (this.isAuthenticated)
      router.push('/chat')
    else
      router.push('/')
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

.login {
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
  color: #2c3e50;
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

button:disabled,
button[disabled] {
  background-color: rgba(71, 108, 255, 0.7);
  color: #fff;
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
