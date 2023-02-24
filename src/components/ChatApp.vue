<template>
  <div class='chat-app'>
    <button class="log_out" @click="logout">Log out</button>
    <div ref='messages' class='messages'>
      <MessageView
          v-for='message in messages'
          :key='message.id'
          :text='message.content'
          :class='["message",{ right: message.isMine }]'
          :time='timeFormatter(message.sentTime)'
          :isMine='message.senderId === this.user.id'
          :author='message.sender.firstName + " " + message.sender.lastName'
      />
    </div>

    <ChatBox
        class='chat-box'
        @submit='onSubmit'
    />
  </div>
</template>

<script>

import MessageView from "@/components/MessageView";
import ChatBox from "@/components/ChatBox";
import axios from "axios";
import {BASE_URL} from "@/globals/variables";
import * as Stomp from "webstomp-client";
import * as SockJS from 'sockjs-client';
import router from "@/main";


export default {
  name: 'App',
  components: {
    ChatBox,
    MessageView
  },


  data() {
    return {
      messages: [],
      user: null,
      isConnected: false,
      stompClient: null,
      token: localStorage.getItem('token'),
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token
      }
    }
  },

  methods: {

    logout() {
      localStorage.removeItem('user')
      router.push('/login')
    },

    connect() {
      const socket = new SockJS('http://localhost:8080/mini-chat');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({},
          frame => {
            this.isConnected = true;
            console.log('Connected: ' + frame);
            this.stompClient.subscribe("/queue/message", message => {
              const messageBody = JSON.parse(message.body);
              this.messages.push(messageBody);
              this.$nextTick(() => this.scrollToEnd(true))
            });
          },

          error => {
            console.log(error);
            this.isConnected = false;
          });
    },

    disconnect() {
      if (this.stompClient != null)
        this.stompClient.disconnect();

      this.isConnected = false;
      console.log("Disconnected");
    },

    getChat() {
      const url = BASE_URL + 'api/messages';

      axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              token: this.token
            }
          })
          .then(response => {
            this.messages = response.data
            this.$nextTick(() => this.scrollToEnd(false))
          }).catch(e => {
        alert(e)

      })

    },

    onSubmit(event, text) {
      event.preventDefault()

      if (text !== undefined && this.stompClient && this.stompClient.connected) {
        const message = {
          "senderId": this.user.id,
          "content": text
        };

        this.post(message)
      }
    },

    timeFormatter(time) {
      if (typeof time === 'string' || time instanceof String)
        return time.substring(11, 16)

      const hours = time[3] < 10 ? "0" + time[3] : time[3];
      const minutes = time[4] < 10 ? "0" + time[4] : time[4];

      return hours + ":" + minutes;
    },

    post(message) {
      const url = BASE_URL + 'api/messages'

      axios
          .post(url, message, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              token: this.token
            }
          })
          .catch(e => alert(e));
    },

    scrollToEnd(isSmooth) {
      const element = this.$refs['messages'];
      if (isSmooth)
        element.scrollTo({behavior: 'smooth', top: element.scrollHeight});
      else
        element.scrollTo({top: element.scrollHeight});
    },

    getCurrentUser() {
      // const phoneNumber = localStorage.getItem('phoneNumber')
      const url = BASE_URL + 'api/users/current'
      axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              token: this.token
            }
          })
          .then(response => {
            this.user = response.data
            console.log(this.user)
            this.getChat()
          })
    }
  },


  mounted() {
    this.getCurrentUser()
    this.connect()
  }
}


</script>

<style>
* {
  box-sizing: border-box;
}

button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>


<style scoped>

.chat-app {
  max-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.log_out {
  color: white;
  margin-left: auto;
}

.messages {
  overflow: auto;
  padding: 1rem;
  width: 70%;
}

.message + .message {
  margin-top: 0.5rem;
}

</style>