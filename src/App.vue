<template>
    <idInput @notSeven="hideForm($event)" @sendForm="getForm"></idInput>
      <div v-show="showForm">
        <registerForm/>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>