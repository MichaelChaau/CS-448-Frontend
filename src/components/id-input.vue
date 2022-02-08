<!-- Implement the id-input here -->
<template>
  <head>
    <meta charset="utf-8" />
    <title>ID Input</title>
    <!-- <script type="application/javascript" src="https://unpkg.com/vue@next" defer></script> -->
  </head>
  <body>
    <h1>Enter ID</h1>
    <main id="app">
      <p>
        Try typing spaces, punctuation, or special characters into each box to
        see the difference made by the key handler.
      </p>
      <input v-model="idnum" @keypress.prevent @keyup="idnumChange" />
      <button :disabled="!submit" @click="onClick()">Submit</button>
    </main>
  </body>
</template>

<script>
// import axios from 'axios';

function isDigit(key) {
    return key >= '0' && key <= '9';
}

export default{
    data() {
      return {
          idnum: '',
          idInputState: 'manual',
          swipeZeros: 0,
          submit: false,
        }
    },

    methods: {
      idnumChange(e) {
        // enter swipe mode if we get a semicolon as the first character
        if (this.idInputState === 'manual' && this.idnum.length === 0 && e.key === ';') {
            this.idInputState = 'swipe';
            this.swipeZeros = 0;
        } 
        // manual mode: accept only digits until we get 7
        else if (this.idInputState === 'manual') {
            this.accept7Digits(e.key);
        } 
        // swipe mode: watch for 4 zeros, then accept 7 digits
        else if (this.idInputState === 'swipe') {
            if (this.idnum.length === 0 && this.swipeZeros < 4) {
                if (e.key === '0') {
                    this.swipeZeros++;
                } else {
                    this.idInputState = 'manual'
                }
            } else {
            this.accept7Digits(e.key);
            }
        }
        },
      accept7Digits(key) {
        if (this.idnum.length < 7 && isDigit(key)) {
            this.idnum = this.idnum + key;
        if (this.idnum.length === 7) {
          this.submit = true;
        }
      }
    },
    onClick(){
        //  let data = axios.getUri("http://localhost:10001/" + this.idnum); 
        // console.log(data);
        if(this.idnum === '1234567'){
          console.log(this.idnum)
          this.$emit('');
        }
        else {
          if (this.idnum.length == 7) {
          // this.submit = true;
          this.$emit('sendForm');
          }
          else{
            // this.submit = false;
            console.log("ok");
          }
      }
  },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>