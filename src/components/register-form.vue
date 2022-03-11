<template>
    <form v-on:submit.prevent="submitForm" >
        <div class="container">
            <h1>Guest Info</h1>
            <p>Guest Id Number: {{studentID}}</p>
            <p>Is the student a resident?</p>
                <select v-model="resident">
                    <option disabled value="">Please select one</option>
                    <option :value='true'>Yes</option>
                    <option :value='false'>No</option>
                </select>
            <p>Student Zip Code (If resident put 01602):</p>
                <input type="text" id="Zip Code" required minlength="5" maxlength="5" v-model="zipCode">
        </div>
        <div class="container">
            <h2>Income Sources</h2>
            <p>Does the student receive unemployment benefits?</p>
                <select v-model="unemployment">
                    <option disabled value="">Please select one</option>
                    <option :value='true'>Yes</option>
                    <option :value='false'>No</option>
                </select>
            <p>Does the student receive any of the following? (check as many as apply):</p>
                <input type="checkbox" id="social_security" v-bind:value="true" v-model="assistance.socSec">
                <label for="social_security">Social Security</label>
                <p></p>
                <input type="checkbox" id="tanf_eadc" v-bind:value="true" v-model="assistance.TANF">
                <label for="tanf_eadc">TANF/EADC</label>
                <p></p>
                <input type="checkbox" id="finacialAid" v-bind:value="true" v-model="assistance.finAid">
                <label for="finacialAid">Finacial Aid</label>
                <p></p>
                <input type="checkbox" id="other" v-bind:value="true" v-model="assistance.other">
                <label for="other">Other</label>
        </div>
        <div class="container">
            <h2>Assistance</h2>
            <p>Does the student receive any of the following? (Check as many as apply):</p>
                <input type="checkbox" id="SNAP" v-bind:value="true"  v-model="assistance.SNAP">
                <label for="SNAP">SNAP/Food Stamps</label>
                <p></p>
                <input type="checkbox" id="assistance" v-bind:value="true" v-model="assistance.WIC">
                <label for="WIC">WIC</label>
                <p></p>
                <input type="checkbox" id="breakfast" v-bind:value="true"  v-model="assistance.breakfast">
                <label for="breakfast">School Breakfast</label>
                <p></p>
                <input type="checkbox" id="lunch" v-bind:value="true" v-model="assistance.lunch">
                <label for="lunch">School Lunch</label>
                <p></p>
                <input type="checkbox" id="SFSP" v-bind:value="true" v-model="assistance.SFSP">
                <label for="SFSP">SFSP</label>
        </div>
        <div class="container">
            <h2>Household</h2>
            <button @click.prevent="addMember">Add Household Member</button>
            <div class="household" v-for="(member,counter) in household" v-bind:key="counter">
                <span @click.prevent="deleteMember(counter)"></span>

                <label for="age">Age of household member:</label>
                    <select name="age" v-model="member.age">
                    <option>0-4 years</option>
                    <option>5-17 years</option>
                    <option>18-64 years</option>
                    <option>65+ years</option>
            </select>
             <i class="fas fa-times" @click.prevent="deleteMember(counter)"></i>
            </div>
        </div>
        <div v-show="addGuestStatus === 'errored'">Could not add Guest</div>
        <div v-show="addGuestStatus === 'sending'">Adding Guest. Please wait.</div>
        <button class="submit" @click="submitForm">Submit Form</button>
    </form>
</template>
    
<script>

import axios from 'axios';

export default {
  name: 'RegisterForm',
  data(){
    return {
        studentID: '',
        resident: false,
        zipCode: '',
        unemployment: false,
        assistance: {
            socSec: false,
            TANF: false,
            finAid: false,
            other: false,
            SNAP: false,
            WIC: false,
            breakfast: false,
            lunch: false,
            SFSP: false,
        },
        household: [{
          age: ''
      }],
      addGuestStatus: 'idle'
    }
  },
  props: {
      ID_Number: String //Guest's Id Number
  },
  beforeUpdate(){ //Called During form creation to save ID #
      this.saveID();
  },
  methods: {
        //Saves ID # to local variable idNumber upon form creation
        async saveID(){
            this.studentID = this.ID_Number;
        },
        // Send Guest Information to Backend 
        async submitForm(){
            this.addGuestStatus = 'sending';
            axios.put("http://localhost:10001/guest/" + this.studentID, {
                studentID: this.studentID,
                resident: this.resident,
                zipCode: this.zipCode,
                unemployment: this.unemployment,
                assistance: {
                    socSec: this.assistance.socSec,
                    TANF: this.assistance.TANF,
                    finAid: this.assistance.finAid,
                    other: this.assistance.other,
                    SNAP: this.assistance.SNAP,
                    breakfast: this.assistance.breakfast,
                    lunch: this.assistance.lunch,
                    SFSP: this.assistance.SFSP,
                },
                // Household will not be added in final version 
            })
                .then(() => {
                    this.addGuestStatus = 'idle';
                })
                .catch(error => {
                    console.error(error);
                    this.addGuestStatus = "errored";
                })
        },
        // Add household memeber to household array 
        addMember() {
            this.household.push({
                age: ''
            })
        },
        // Delete household memeber from household memebr array  
        deleteMember(counter){
            this.household.splice(counter, 1);
        }
    }
}
</script> 

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
form{
    max-width: 100%;
    margin:auto;
    padding: 0 5vw;
    text-align: left;
    background-color: rgb(200, 179, 206);
    font-size: 1.3em;
}

input:not([type=text]){
    margin-right: 10px;
    transform: scale(1.5);
}
 .fas
 {
        font-size: 1.2rem;
        color: red;
        margin-left: 5vw;
    }

</style>
