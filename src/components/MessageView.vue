<template>
  <div :class='["message",{isMine}]'>

    <h5>{{ author }}</h5>
    <p class="text">{{ text }}</p>
    <h6>{{ time }}</h6>

  </div>
</template>

<script>
export default {
  name: 'MessageView',
  props: [
    'text',
    'author',
    'isMine',
    'time',
  ]
}
</script>

<style scoped>

.message {
  background: #e7e7e7;
  border-radius: 20px;
  max-width: 300px;
  padding-bottom: 1px;
}

h6 {
  vertical-align: bottom;
  text-align: end;
  margin-right: 10px;
}

.message.isMine {
  background: #e9eaf6;
  margin-left: auto;
}

h5 {
  font-weight: bold;
  margin: 0 0 .5rem 0;
  text-align: start;
  padding-top: 10px;
  padding-left: 10px;
}

.text {
  margin-left: 10px;
  text-align: start;
}
</style>