<template>
    <form v-on:submit.prevent="submitForm">
        <div class="container">
            <h1>Guest Info</h1>
            <p>Guest Id Number: {{ID_Number}}</p>
            <p>Is the student a resident?</p>
                <input type="radio" id="yes" value="yes" name="campusStatus" v-model="campusStatus" required>
                <label for="yes">Yes</label>
                <br>
                <input type="radio" id="no" value="no" name="campusStatus" v-model="campusStatus" required>
                <label for="no">No</label>
            <p>Student Zip Code (If resident put 01602):</p>
                <input type="text" id="Zip Code" required minlength="5" maxlength="5" v-model="zipCode">
        </div>
        <div class="container">
            <h2>Income Sources</h2>
            <p>Does the student receive unemployemnt benefits?</p>
                <input type="radio" id="yes" value="yes" name="unemployementBenefit" v-model="unemploymentBenefit" required>
                <label for="yes">Yes</label>
                 <br>
                <input type="radio" id="no" value="no" name="unemploymentBenefit" v-model="unemploymentBenefit" required>
                <label for="no">no</label>
            <p>Does the student receive any of the following? (check as many as apply):</p>
                <input type="checkbox" id="social_security" value="social_security" v-model="studentBenefits">
                <label for="social_security">Social Security</label>
                <p></p>
                <input type="checkbox" id="tanf_eadc" value="tanf_eadc" v-model="studentBenefits">
                <label for="tanf_eadc">TANF/EADC</label>
                <p></p>
                <input type="checkbox" id="finacialAid" value="finacialAid" v-model="studentBenefits">
                <label for="finacialAid">Finacial Aid</label>
                <p></p>
                <input type="checkbox" id="other" value="other" v-model="studentBenefits">
                <label for="other">Other</label>
        </div>
        <div class="container">
            <h2>Assistance</h2>
            <p>Does the student receive any of the following? (Check as many as apply):</p>
                <input type="checkbox" id="snap_foodStamps" value="snap_foodStamps" v-model="assistance">
                <label for="snap_foodStamps">SNAP/Food Stamps</label>
                <p></p>
                <input type="checkbox" id="wic" value="wic" v-model="assistance">
                <label for="wic">WIC</label>
                <p></p>
                <input type="checkbox" id="schoolBreakfast" value="schoolBreakfast" v-model="assistance">
                <label for="schoolBreakfast">School Breakfast</label>
                <p></p>
                <input type="checkbox" id="schoolLunch" value="schoolLunch" v-model="assistance">
                <label for="schoolLunch">School Lunch</label>
                <p></p>
                <input type="checkbox" id="sfsp" value="sfsp" v-model="assistance">
                <label for="sfsp">SFSP</label>
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
        <button class="submit" @click="submitForm">Submit Form</button>
    </form>
</template>
    
<script>

import axios from 'axios';

export default {
  name: 'RegisterForm',
  data(){
    return {
      campusStatus: '',
      idNumber: this.$props,
      zipCode: '',
      unemployementBenefit: '',
      studentBenefits: [],
      assistance: [],
      household: [{
          age: ''
      }],
    }
  },
  props: {
      ID_Number: String //Guest's Id Number
  },
methods: {
        // Send Guest Information to Backend 
        async submitForm(){
            let newGuestInfo = { campusStatus: this.campusStatus, zipCode: this.zipCode, unemployementBenefit: this.unemployementBenefit, studentBenefits: this.studentBenefits, employmentStatus: this.employmentStatus, assistance: this.assistance, household: this.household};
            this.campusStatus = '';
            this.zipCode = '';
            this.unemployementBenefit = '';
            this.studentBenefits = [];
            this.assistance = [];
            this.household= [];
            axios.post("http://localhost:10001/v0", newGuestInfo);
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
