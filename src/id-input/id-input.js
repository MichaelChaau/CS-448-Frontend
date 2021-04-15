function isDigit(key) {
    return key >= '0' && key <= '9';
}

Vue.createApp({
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
    }
  }
}).mount("#app");