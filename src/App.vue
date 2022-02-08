<template>
  <idInput @sendForm="getForm"></idInput>
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
      test: '',
    }
  },
  methods:{
    getForm(){
     this.showForm = !this.showForm;
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