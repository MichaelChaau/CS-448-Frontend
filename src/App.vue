<template>
    <idInput @notSeven="hideForm($event)" @sendForm="getForm" @sendId="saveId($event)"></idInput>
      <div v-show="showForm">
        <registerForm :ID_Number = "idnum" />
      </div>
</template>

<script>
import registerForm from "./components/register-form.vue"
import idInput from "./components/id-input.vue"

export default{
  components:{
    idInput,
    registerForm,
  },
  
  data(){
    return{
      showForm:false,
    }
  },
  methods:{

    //fires this method when user clicks submit button
    getForm(){
     this.showForm = true;
    },

    //Save Id Number from id-input.vue
    saveId(idnum){
      this.idnum = idnum;
    },

    //fires this method to hide the form when user does not enter all numbers
    hideForm(key){
      if(key.length < 7){
        this.showForm = false;
      }

    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.3em;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  max-width: 100vw;
  padding: 5vw;
  margin: auto;
}
.container{
    margin-bottom: 1.5vh;
    padding: 5vw;
    background-color: rgb(250, 248, 248);
    border-radius: 15px;
}
.submit{
    min-width: 10em;
    min-height: 4em;
    border-radius: 10px;
    background-color: blueviolet;
    color: white;
    font-size: 16px;
    font-weight: bold;
}
</style>