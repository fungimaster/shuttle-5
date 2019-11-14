<template>
  <div class="sessions-container my-schedule">
    <vue-headful
    :title="doctitle"

    />
   
    <div class="container">
    
       <b-row class="mb-5 mt-5">
         
              <b-col md="1" class="">               
              </b-col>

<!---------------------------- LOGGED IN --------------------------------------->
<b-col md="10" class="" v-if="!showlogin">
                <h2 class="teaser-header orange">Din information</h2>

                    <b-form-input
                        id="firstName"
                        v-model="userdetails.firstName"
                        type="text"
                        label="Förnamn"                        
                        readonly
                      ></b-form-input>
                       <b-form-input
                        id="lastName"
                        v-model="userdetails.lastName"
                        type="text"
                        label="Efternamn"                        
                        readonly
                      ></b-form-input>
                       <b-form-input
                        id="mobile"
                        v-model="userdetails.mobile"
                        type="text"
                        label="Mobilnr"                        
                        readonly
                      ></b-form-input>
                       <b-form-input
                        id="email"
                        v-model="userdetails.email"
                        type="text"
                        label="E-post"                        
                        readonly
                      ></b-form-input>

                <button class="btn btn-primary mt-2" v-on:click="logout()">Logga ut</button>
              </b-col>

 <!---------------------------- LOGIN --------------------------------------->
              
               <b-col md="10" class="" v-if="showlogin">
                 <h2 class="teaser-header orange">Logga in</h2>
                 <br>           


          <b-form @submit.stop.prevent @submit="login" v-if="showlogin">
             <b-form-group>
               <label for="email">E-post</label>
                  <b-input v-model="form.email"
                    inputmode="email"                    
                    type="email"          
                    class="form-control"
                    id="email"
                    placeholder="Ange din e-postadress"
                    value
                    required
                  />       
             </b-form-group>
              <b-form-group>    
                <label for="pwd">Lösenord</label>                  
                  <b-input v-model="form.pwd"
                    type="password"                  
                    class="form-control"                
                    id="pwd"
                    placeholder="Ange ditt lösenord"
                    value
                    required
                  />     
              </b-form-group>
                   <b-button type="submit" variant="primary" class="btn blue-bg"><b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Logga in</b-button>             
          <b-alert v-if="showerror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post eller lösenord stämmer inte, försök igen eller återställ ditt lösenord.</b-alert>   
                </b-form>

              </b-col>
              <b-col md="1" class="">
                  
              </b-col>
            </b-row>

    </div>
    
    
  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
  import Spinner from "./spinner/Spinner";
  import Map from "./map/Map";

  export default {
    name: 'login',
    components: {
      'c-spinner':Spinner,
      'c-map':Map
    },
    watch:{
      '$route' (to, from){
        if (to.path != from.path) {
          this.myscheduleid = this.$route.params.id;
          this.getSchedule();
        }

      }
    },
    data () {
      return {
        showlogin: false,
        showloginspinner: false,
        showerror: false,
        userdetails: {
          userId: '',
          firstName: '',
          lastName: '',
          mobile: '',
          email: ''
        },
        form: {
          email: '',
          pwd: ''
        },        
        doctitle: 'Logga in'
      }
    },
    created() {
     
    },
    mixins: [tagsMixin],
    methods: {
    login(evt) {      
      evt.preventDefault();         
      this.showloginspinner = true;

/*
      //DDP LOGIN
      const simpleDDP = require("simpleddp");
      const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

      let opts = {
          endpoint: "wss://www.mobelutveckling.se/websocket",
          SocketConstructor: WebSocket,
          reconnectInterval: 5000
      };
      const server = new simpleDDP(opts,[simpleDDPLogin]);

      let password = this.form.pwd;
      let email = this.form.email;
      let parentVue = this;
     
 
    // doAsyncOperation1() returns a promise.
trylogin()
.then(() => { 
   console.log('logged in with creds',server.token);      
   parentVue.showerror = false;
   localStorage.setItem('auth_token',server.token);
   parentVue.showlogin = false;
   parentVue.showloginspinner = false;
   parentVue.doctitle = 'Inloggad';
   //Set params for user
   let userinfo = server.collections.users[0].profile;
   localStorage.setItem('userinfo',JSON.stringify(userinfo));
   this.setuserinfoform();
})
.then((output) => {
  
})
.catch((err) => {  
   console.log('NOT logged in with creds, show error on form')
   parentVue.showerror = true;
   parentVue.showloginspinner = false;
});

    async function trylogin() { // (1)
      let response = await server.login(
        {
        password,
        user: {          
            email
        }
      }
      );   
    }


    },
    isloggedin: function() {

server.on('login',(m)=>{
  console.log('User logged in as', m);
});  
*/
    },

    logout: function() {
      /*
      //console.log('inne logout')
      const simpleDDP = require("simpleddp");
      const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

      let opts = {
          endpoint: "wss://www.mobelutveckling.se/websocket",
          SocketConstructor: WebSocket,
          reconnectInterval: 5000
      };
      const server = new simpleDDP(opts,[simpleDDPLogin]);
      let parentVue = this;

      localStorage.setItem('auth_token','');

      async function trylogout() { // (1)
        let response = await server.logout(); // (2)
        //console.log(server);
        parentVue.doctitle = 'Logga in';
        parentVue.showlogin = true;
        parentVue.showloginspinner = false;
        if (server._loggedIn) {
          //console.log('logged in with token',server.token)
          //console.log(server)
        } else {
          //console.log('NOT logged in with token, show form')
          //this.showlogin = true;
        }
      }

      trylogout();

      server.on('logout',()=>{
        console.log('User logged out');
      });
      */
    },
    setuserinfoform: function() {
      console.log('set userinfo form');

    let userinfo = localStorage.getItem('userinfo');
    if (userinfo) {
      //console.log('found ls')
      try {
        //SET KEYS in form        
        userinfo = JSON.parse(userinfo);
        //console.log(userinfo)
        this.userdetails.firstName = userinfo.firstName;
        this.userdetails.lastName = userinfo.lastName;
        this.userdetails.mobile = userinfo.mobile;
        this.userdetails.email = userinfo.signupEmail; //CHANGE THIS WITH NEW COLLECTION
        
      } catch(e) {
        console.log('error')
      //something went wrong, maybe the token is too old or not valid
      }
    } else {
      console.log('NOT logged in with token, show form')
      this.showlogin = true;
    }
      
     
            
      //console.log(Object.keys(jsonObj));  // returns ["person", "age"]
      //this.userdetails.firstName = myJsonString.firstName;
    }
    },

    updated: function() {
    },
    mounted:function(){
    
    
     
    },
    beforeMount: function() {
      //LOGIN
/*
    const simpleDDP = require("simpleddp"); // nodejs   
    const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

    let opts = {
        endpoint: "wss://www.mobelutveckling.se/websocket",
        SocketConstructor: WebSocket,
        reconnectInterval: 5000
    };
    const server = new simpleDDP(opts,[simpleDDPLogin]);

    let parentVue = this;

    let auth_token = localStorage.getItem('auth_token');
    if (auth_token) {
      trytoken();
      try {
        resume();
      } catch(e) {
      //something went wrong, maybe the token is too old or not valid
      }
    } else {
      console.log('NOT logged in with token, show form')
      this.showlogin = true;
    }

  
    async function trytoken() { // (1)
      let response = await server.login({resume:auth_token}); // (2)
      if (server._loggedIn) {
        console.log('logged in with token',server.token);
        parentVue.doctitle = 'Inloggad Matchplay';
        let userinfo = server.collections.users[0].profile;
        localStorage.setItem('userinfo',JSON.stringify(userinfo));
        //console.log(server)
        //populate values in user info form
        parentVue.setuserinfoform();
      } else {
        console.log('NOT logged in with token, show form')
        parentVue.showlogin = true;
      }
    }
    */
    }
    
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sessions-container.my-schedule .row.session {
    display: none !important;
  }
  .sessions-container.my-schedule .row.session {
    opacity: 0.3;
  }
  .sessions-container.my-schedule .row.session.active {
    display:flex !important;
    opacity: 1;
}

  .no-my-schedule {
    margin: 10rem 0;
  }
  i.big {
    z-index: -1;
    position: absolute;
    font-size: 22rem;
    opacity: 0.2;
    line-height: 7rem;
    margin-left: -11rem;
  }

</style>
