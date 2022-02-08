<!-- This is the main page used to connect two files in components -->
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

</style>
