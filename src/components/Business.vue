<template>
  <div>
    <vue-headful :title="doctitle" />
    <b-container class="mt-3">
        <b-row v-if="!loading">
            <b-col class="col-12">
                <h1 hidden>Företagslag 2021</h1>
                <h5 class="mt-4"></h5>
                   
             </b-col>              
                    </b-row>
                    
       
        <b-row v-if="loading">
            <b-col class="col-12 text-center mt-5 mb-5">
                <b-spinner type="grow" class="spinner-big ml-0 pl-0 mr-1 mb-1"></b-spinner>
            </b-col>
        
        </b-row>
       <b-row id="companies" v-if="!loading" align-h="center" class="justify-content-center align-self-center mt-4">
                <!-- PLUS -->
                <b-col class="col-12">
                    <h1>Företagslag +</h1>
                </b-col>
                <b-col v-for="(company,idx) in companies_plus" :key="idx"
                    class="company col-6 col-md-6 pl-0 pr-0 align-self-center text-center p-0 m-0"
                >              
                <a :href="company.companyurl" target="_blank">
               <b-img v-if="company.logourl" class="p-2 p-md-2" :src="getImageUrl(company.logourl,'w_300,f_auto,q_auto')"></b-img>               
                </a>              
                </b-col>

                <b-col class="col-12 mt-4 mb-4">
                    <hr />
                </b-col>

                <!-- NON PLUS -->
                <b-col class="col-12 mb-4">
                    <h1>Företagslag</h1>
                </b-col>
                <b-col v-for="(company,idx) in companies" :key="'A'+ idx"
                    class="company col-4 col-md-3 pl-0 pr-0 align-self-center text-center"
                >              
                <a :href="company.companyurl" target="_blank">
               <b-img v-if="company.logourl" class="p-3 p-md-5" :src="getImageUrl(company.logourl,'h_100,f_auto,q_auto')"></b-img>               
                </a>                
                             
                </b-col>
                
                </b-row>
    </b-container>
  </div>
</template>

<script>

import { globalState } from "../main.js";

  export default {
    name: 'Företagslag',
    data () {
      return { 
        closed: globalState.closed,
        doctitle: 'Våra företagslag 2021',        
        companies: [],
        companies_plus: [],           
        clubno: 0,        
        loading: true        
      }
    },
     created() {
   
  },
      mounted: function () {
        //console.log("ROUTE", this.$route.query.resetpw)
 this.getCompanies();  
  },
  computed: {
    fetchedcompanies() {
          return this.$store.getters.companies;
    }
  },
    methods: {
         getImageUrl(url, stringToAdd) {
      if (!url) {
        return;
      }
      let array = url.split("upload/");
      array.splice(1, 0, "upload/" + stringToAdd + "/");
      let urlString = array.join("");
      return urlString;
    }, 
       getCompanies() {        
      this.loading = true;    

      const handleResponse = (response) => {
        this.$store.dispatch('setCompanies', response)
        this.clubno = response.data.length;
        this.companies = response.data;
        //PLUS
        this.companies_plus = this.companies.filter((company) => {
          if (company.packageplus) return true;
        });
        //NON-PLUS
        this.companies = this.companies.filter((company) => {
          if (!company.packageplus) return true;
        });   
        
        this.loading = false;         
      }

      if (this.fetchedcompanies) {
          handleResponse(this.$store.state.companies)
          return
      }
  
      
      this.axios
        .post(globalState.admin_url + "getPaidCompanyTeams", {
          //getclubstoplist
          id: globalState.compid          
        })
        .then((response) => {
          handleResponse(response)
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
   
        compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
    }      
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.jumbotron-1 {
  border:5px solid #e9ecef;
  background: #FFF;
 }

img {
    max-width:95%;
}

.spinner-big {
    width:4em;
    height:4em;
}

.abc .btn {
  min-width: 45px;
}

.special {
  margin-left: -5px !important;
}
</style>
