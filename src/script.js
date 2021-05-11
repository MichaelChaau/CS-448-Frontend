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
            env: null,
            guest: null,
            status: 'loading', // loaded, errored
            resident: false,
            zipCode: '02717',
            unemployment: null,
            assistance: {
                ss: false,
                tanf: false,
                financialAid: false,
                other: false,
                snap: false,
                wic: false,
                breakfast: false,
                lunch: false,
                sfsp: false
            },
            household: [{
                age: ''
            }],
            addGuestStatus: 'idle', // sending, errored
        }
    },
    async mounted() {
        try {
            await this.getEnv();
            this.getItems();
        }
        catch (error) {
            console.error(error);
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
        async getEnv() {
            let response = await axios.get(window.location.href + "env.json");
            this.env = response.data;
        },
        async getGuest() {
            try {
                let guestUrl = this.env.BACKEND_BASE_URL + "/guest-info/" + this.idnum;
                console.log("In the right place");
                console.log(guestUrl);
                let response = await axios.get(guestUrl);
                if (response != null){
                    this.guest = response.data;
                    this.resident = this.guest.resident;
                    this.zipCode = this.guest.zipCode;
                    this.unemployment = this.guest.unemployment;
                    this.assistance = this.guest.assistance;
                    this.household = this.guest.household;
                }
                this.status = 'loaded';
            } catch (error) {
                console.error(error);
                console.error("Hello");
                this.status = 'errored';
                this.resident = true;
                this.zipCode = '02717';
            }
        },
        addMember() {
            this.household.push({
                age: ''
            })
        },
        deleteMember(counter) {
            this.household.splice(counter,1);
        },
        addGuest() {
            let newGuest = { 
                    studentID: this.idnum, 
                    resident: this.resident,  
                    zipCode: this.zipCode, 
                    unemployment: this.unemployment, 
                    assistance: this.assistance,
                    household: this.household,
            };
            this.idnum = '';
            this.resident = null;
            this.zipCode = '';
            this.unemployment = null;
            this.assitance.ss = false;
            this.assitance.tanf = false;
            this.assitance.financialAid = false;
            this.assitance.other = false;
            this.assitance.snap = false;
            this.assitance.wic = false;
            this.assitance.breakfast = false;
            this.assitance.lunch = false;
            this.assitance.sfsp = false;
            this.household = null;
            this.addGuestStatus = 'sending';
            axios.put(this.env.BACKEND_BASE_URL + "/guest-info/" + newGuest.studentID, newGuest)
                .then(() => {
                    this.addGuestStatus = 'idle';
                })
                .catch(error => {
                    console.error(error);
                    this.addGuestStatus = 'errored';
                })
            this.guest = null;
        }
    }
}).mount("#app");
