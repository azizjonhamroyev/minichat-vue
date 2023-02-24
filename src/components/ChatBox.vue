<template>
  <form class='chat-box' @submit='onSubmit($event)'>
    <input
        v-model='text'
        placeholder='Write a message'
        type='text'
    />
    <button :disabled='isNotAvailable([this.text])'>Send</button>
  </form>
</template>

<script>

export default {
  name: 'ChatBox',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onSubmit(event) {
      this.$emit("submit", event, this.text);
      this.text = '';
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


input {
  width: 100%;
}


.chat-box {
  display: flex;
  width: 70%;
}

button{
  color: white;
}

button:disabled {
  opacity: 0.5;
}

</style>