<template>
    <form v-on:submit.prevent="submitForm">
        <h1>Thea's Pantry Guest Registration</h1>
        <p>This form is to be used by staff to track visits to Thea's Pantry by students.</p>
        <p>Please fill out all required sections of this form</p>
        <p>Resident or Commuter</p>
            <input type="radio" id="resdient" value="resident" name="campusStatus" v-model="campusStatus">
            <label for="resdient">Resident</label>
        <br>
            <input type="radio" id="commuter" value="commuter" name="campusStatus" v-model="campusStatus">
            <label for="commuter">Commuter</label>
        <br>
        <p>Students Zipcode(If resident put 01602)</p>
            <input v-model='zipCode'>
        <br>
        <p>How many people are in your household?</p>
        <select v-model="householdStatus">
            <option disabled value="">Please select one</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>More than 5...</option>
        </select>
        <br>
        <p>Student Age:</p>
            <select v-model="studentAge">
            <option disabled value="">Please select one</option>
            <option>0-4</option>
            <option>4-17</option>
            <option>18-64</option>
            <option>65 or Older...</option>
        </select>
        <br>
        <p>Employment Status:</p>
            <input type="radio" id="employed" value="employed" name="employmentStatus" v-model="employmentStatus">
            <label for="employed">Employed</label>
        <br>
            <input type="radio" id="unemployed" value="unemployed" name="employmentStatus" v-model="employmentStatus">
            <label for="unEmployed">Unemployed</label>
        <br>
        <p>Does the student recive any of the following?</p>
            <input type="checkbox" id="social_security" value="social_security" v-model="studentBenifets">
            <label for="social_security">Social Security</label>
            <p></p>
            <input type="checkbox" id="tanf_eadc" value="tanf_eadc" v-model="studentBenifets">
            <label for="tanf_eadc">TANF/EADC</label>
            <p></p>
            <input type="checkbox" id="snap_fs" value="snap_fs" v-model="studentBenifets">
            <label for="snap_fs">SNAP/Food Stamps</label>
            <p></p>
            <input type="checkbox" id="wic" value="wic" v-model="studentBenifets">
            <label for="wic">WIC</label>
            <p></p>
            <input type="checkbox" id="sfsp" value="sfsp" v-model="studentBenifets">
            <label for="sfsp">SFSP</label>
            <p></p>
            <input type="checkbox" id="schoolBreafast" value="schoolBreafast" v-model="studentBenifets">
            <label for="schoolBreafast">School Breakfast</label>
            <p></p>
            <input type="checkbox" id="schoolLunch" value="schoolLunch" v-model="studentBenifets">
            <label for="schoolLunch">School Lunch</label>
            <p></p>
            <input type="checkbox" id="finacialAid" value="files" v-model="studentBenifets">
            <label for="finacialAid">Finacial Aid</label>
            <p></p>
            <input type="checkbox" id="other" value="other" v-model="studentBenifets">
            <label for="other">Other</label>
            <p></p>
            <input type="checkbox" id="none" value="none" v-model="studentBenifets">
            <label for="none">None</label>
        <br>
        <p>Would the student like assistance applying for SNAP?</p>
            <input type="radio" id="yes" value="yes" name="snapAssistance" v-model="snapAssistance">
            <label for="yes">Yes</label>
        <br>
            <input type="radio" id="no" value="no" name="snapAssistance" v-model="snapAssistance">
            <label for="no">No</label>
        <br>
        <p>Number of pounds taken/donated:</p>
            <input v-model='pounds'>
        <br>
        <br>
        <button type="submit">Submit Form</button>
    </form>
</template>
    
<script>

import axios from 'axios';

export default {
  name: 'RegisterForm',
  data(){
    return {
      campusStatus: '',
      zipCode: '',
      householdStatus: '',
      studentAge: '',
      employmentStatus: '',
      studentBenifets: [],
      snapAssistance: '',
      pounds: '',
    }
  }, 
    methods: {
        async submitForm(){
            let newGuestInfo = { campusStatus: this.campusStatus, zipCode: this.zipCode, householdStatus: this.householdStatus, studentAge: this.studentAge, employmentStatus: this.employmentStatus, studentBenifets: this.studentBenifets, snapAssistance: this.snapAssistance, pounds: this.pounds};
            axios.post("http://localhost:10001/v0", newGuestInfo);
        }
    }
}
</script> 

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
