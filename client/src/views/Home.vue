<template>
  <div class="home row">
    <div class="chat-box col-sm-4">
      <div class="chats row">
        <div class="sub-chat">
          <h3>چت من ...</h3>
        </div>
        <ul>
          <li class="you">
            <div class="you-user">شما:</div>
            <div class="you-chat">سلام</div>
          </li>
          <li class="other">
            <div class="other-user">اون:</div>
            <div class="other-chat">سلام</div>
          </li>
          <li class="you">
            <div class="you-user">شما:</div>
            <div class="you-chat">سلام</div>
          </li>
          <li class="other">
            <div class="other-user">اون:</div>
            <div class="other-chat">سلام</div>
          </li>
          <li class="you">
            <div class="you-user">شما:</div>
            <div class="you-chat">سلام</div>
          </li>
          <li class="other">
            <div class="other-user">اون:</div>
            <div class="other-chat">سلام</div>
          </li>
          <li class="you">
            <div class="you-user">شما:</div>
            <div class="you-chat">سلام</div>
          </li>
          <li class="other">
            <div class="other-user">اون:</div>
            <div class="other-chat">سلام</div>
          </li>
        </ul>
      </div>
      <div class="chat-form row mb-3">
        <div class="col-12">
          <b-form inline @submit.passive="clickButton" class="row">
            <div class="col-10">
              <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="newMessage" placeholder="پیام ..."></b-form-input>
            </div>
            <div class="chat-send-icon col-2">
              <b-icon class="h4" icon="arrow-left-square" variant="success"></b-icon>

            </div>
          </b-form>
        </div>
        <div style="padding:10px;">
          <span class="glyphicon glyphicon-share-alt"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      newMessage: ''
    }
  },
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('create', 'data')
    }
  },
  mounted() {
    this.sockets.subscribe('create', (data) => {
      console.log(data)
    });
  }
}
</script>
<style scoped>
.home{
  height: 500px;
  direction: rtl;
  align-items: center;
  justify-content: center;
}
.chat-box{
  height: 400px;
}
.chat-send-icon{
  display: flex;
  align-items: center;
  justify-content: center;
}
.chats{
  height: 80%;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 1%;
}
.chats ul{
  background-color: #42b983;
  border-radius: 5px;
  list-style: none;
  color: black;
  padding: 1%;
  max-height: 80%;
  overflow-y: scroll;
}
.chats ul li{
  margin: 10px 0;
  padding: 1%;
}
.chats ul li > div{
  padding: 1%;
  border-radius: 5px;
}
.chats ul li > div:first-child{
  color: white;
}
.you{
  text-align: right;
}
.other{
  text-align: left;
}
.chats ul li >div.you-chat{
  background-color: #fff;
  display: inline-block;
}
.chats ul li >div.other-chat{
  background-color: #ccc;
  display: inline-block;
  float: left;
}
</style>
