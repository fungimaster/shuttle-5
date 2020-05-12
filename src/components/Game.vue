<template>
	<div class="info">
		<vue-headful :title="doctitle" />
	</div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
 
  import {globalState} from '../main.js'
     
  export default {
    name: 'game',
 
    data () {
       let clubs = [];

      return {
        isSaving: false,
        //DATEPICKER
   attrs: [
        {
          key: 'today',
          dot: true,
          dates: new Date()
          
        },
      ],
       //TYPEAHEAD CLUBS
    
      doctitle: 'Match - ' + this.$store.state.conferencename
      }
    },
 created() {

     //check logged in
     let userinfo = localStorage.getItem('userinfo');
     
     if (!userinfo) {
       this.$router.push({
                path: "/"
            });
     }

     //set username top
     this.$store.dispatch('updateUserInfo');

     //get userinfo localstorage object json
     userinfo = JSON.parse(userinfo);     

     //get id from parameter
    let gameid = this.$route.query.id;
    if (gameid === '') return;
    this.game_url = globalState.admin_url+'livegame?id=' + gameid

    //FETCH DATA FROM ID AND METHOD
    //getGameData(id) -> game eller no game found
    //updateGame(_id) --> status :ok / error

                        this.axios.post(globalState.admin_url+"getGameData", {
                            "id": gameid,
                            "userid": userinfo._id
                        })
                        .then(response => {
                            if (response.data.hasOwnProperty('error')) {
                                console.log("error")
                                return;
                            }

                            if (response.data.hasOwnProperty('status')) {
                                if (response.data.status === "No game found") {
                                  this.notfound = true;
                                    this.loading = false;
                                    return;
                                }

                                
                            }
 
                            this.notfound = false;
                            //console.log(response.data)
                            //POPULATE VARS
                            let fullname;
                            this.hometeamname = response.data.hometeamname;
                            this.awayteamname = response.data.awayteamname;
                            this.roundstartdate = response.data.roundstartdate;                            
                            this.roundenddate = response.data.roundenddate;  
                            this.roundname = response.data.roundname;                   
                            fullname = response.data.hometeamleadername.split(' ');
                            this.hometeamleadername = fullname[1].substring(0,3);
                            fullname = response.data.awayteamleadername.split(' ');
                            this.awayteamleadername = fullname[1].substring(0,3);
                            this.hometeamcity = response.data.hometeamcity;
                            this.awayteamcity = response.data.awayteamcity;                            
                            if (response.data.hasOwnProperty('hometeammembername')) {
                              fullname = response.data.hometeammembername.split(' ');
                              this.hometeammembername = fullname[1].substring(0,3);
                            }

                            if (response.data.hasOwnProperty('awayteammembername')) {
                              fullname = response.data.awayteammembername.split(' ');
                              this.awayteammembername = fullname[1].substring(0,3);
                            }

                            this.hometeam = response.data.hometeam;
                            this.awayteam = response.data.awayteam;

                            if (response.data.hasOwnProperty('status')) {
                             this.status = response.data.status;
                            }

                            if (response.data.hasOwnProperty('winner')) {
                             this.winner = response.data.winner;
                            }
                           

                            this.hometeamleadernamefull = response.data.hometeamleadername;
                            //this.hometeamleaderid = response.data.hometeamleader;                          
                            this.hometeamleadermobile = response.data.hometeamleadermobile;
                            this.hometeamleaderemail = response.data.hometeamleaderemail;
                            this.awayteamleadernamefull = response.data.awayteamleadername;
                            //this.awayteamleaderid = response.data.awayteamleader;
                            this.awayteamleadermobile = response.data.awayteamleadermobile;
                            this.awayteamleaderemail = response.data.awayteamleaderemail;

                            //IS TEAM LEADER?
                            let userinfo = localStorage.getItem('userinfo');
                            userinfo = JSON.parse(userinfo);
                            //console.log(response.data.hometeamleader,userinfo._id)
                            this.userid = userinfo._id;
                            if (response.data.hometeamleader === userinfo._id || response.data.hometeammember === userinfo._id) {
                                this.isteamleader = true; //home
                            } 

                            if (response.data.awayteamleader === userinfo._id || response.data.awayteammember === userinfo._id) {
                                this.isteammember = true; //away
                            } 
                           

                            //GET SCORE         
                            
                            if (response.data.hasOwnProperty('homescore')) {
                             this.homescore = response.data.homescore;
                            } else {
                              //console.log('no game date')
                            }

                            if (response.data.hasOwnProperty('awayscore')) {
                             this.awayscore = response.data.awayscore;
                            } else {
                              //console.log('no game date')
                            }

                            if (response.data.hasOwnProperty('home1')) {
                             this.home1 = response.data.home1;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('home2')) {
                             this.home2 = response.data.home2;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('home3')) {
                             this.home3 = response.data.home3;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('away1')) {
                             this.away1 = response.data.away1;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('away2')) {
                             this.away2 = response.data.away2;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('away3')) {
                             this.away3 = response.data.away3;
                            } else {
                              //console.log('no game date')
                            }
                            
                            if (response.data.hasOwnProperty('homeset1')) {
                             this.homeset1 = response.data.homeset1;
                            } else {
                              //console.log('no game date')
                            }

                            if (response.data.hasOwnProperty('homeset2')) {
                             this.homeset2 = response.data.homeset2;
                            } else {
                              //console.log('no game date')
                            }

                            if (response.data.hasOwnProperty('homeset3')) {                              
                             this.homeset3 = response.data.homeset3;
                             this.showset3 = true;
                            } else {
                              //console.log('no game date')
                            }

                            if (response.data.hasOwnProperty('awayset1')) {
                             this.awayset1 = response.data.awayset1;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('awayset2')) {
                             this.awayset2 = response.data.awayset2;
                            } else {
                              //console.log('no game date')
                            }

                             if (response.data.hasOwnProperty('awayset3')) {
                             this.awayset3 = response.data.awayset3;
                             this.showset3 = true;
                            } else {
                              //console.log('no game date')
                            }

                            //set gamedate:
                            if (response.data.hasOwnProperty('gamedate')) {
                             this.gamedate = new Date(response.data.gamedate);
                            } else {
                              //console.log('no game date')
                            }

                            //set hour:
                            if (response.data.hasOwnProperty('gametime')) {
                             this.gametime = response.data.gametime;                            
                            } else {
                              //console.log('no game date')
                            }

                            //set club:
                            if (response.data.hasOwnProperty('club')) {
                             this.clubid = response.data.clubid;
                             this.query = response.data.clubname;
                            } else {
                              //console.log('no game date')
                            }

                            


                            this.loading = false;
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            this.loading = false;
                            this.notfound = true;
                        });


    //GET PADEL CLUBS
    this.getPadelClubs();


},
   
   methods: {
     getgamedate: function() {
        return moment(this.gamedate).format('YYYY-MM-DD')
     },
    getgamedate2: function(thedate,action) {
             if (action === 'full') {
                return moment(thedate).format('YYYY-MM-DD')
             } 
             if (action === 'half') {
                 return moment(thedate).format('D/M')
             }
     },
      startGame: function() {
               
        this.status = "In progress";
        this.saveResult();

          if (!this.showresult) {            
            this.showresult = true; //activate the div to show resultform
          }
      },

       endGame: function() {

        this.nowinneralert = false;

         if (this.winner === '') {           
           this.nowinneralert = true;
           return;
         }

          this.boxTwo = ''
            this.$bvModal.msgBoxConfirm('Är matchen avslutad?', {
                    title: 'Bekräfta?',
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'danger',
                    okTitle: 'Yes, vi är klara!',
                    cancelTitle: 'Nej',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if (value) {
                       this.status = "Finished";
                       this.saveResult();                       
                    }
                })
                .catch(err => {
                    // An error occurred
                })
               
        
          
      },
         compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
},
      getPadelClubs: function () {
            this.axios
                .post(
                    //"https://matchplay.meteorapp.com/methods/getPadelclubs"
                    "https://matchplay.meteorapp.com/methods/getGolfclubs"
                )
                .then(response => {
                    this.clubs = response.data;
                    this.clubs = this.clubs.sort(this.compareValues('name', 'asc'));
                    //console.log(this.clubs)

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },
        onCountryInputChange(query) {
            return this.clubs.filter((club) => {                
                return club.name.toLowerCase().includes(query.toLowerCase())
            })
        },
        onSearchItemSelected(item) {

            this.selectedSearchItem = item.name;
            this.query = item.name;           
            this.clubid = item._id;
            this.clubname = item.name;

            this.saveResult()

/*
            var x = document.getElementsByClassName("course");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].classList.add("is-valid");
                x[i].classList.remove("is-invalid");
            }
            */

        },
        setResult(id,set,action) {

          if (this.status === 'Pending') { //ask if continue
         
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm('Matchen kommer starta om du börjar fylla i resultat, ok?', {
                    title: 'Starta match?',
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'danger',
                    okTitle: 'Japp, vi är redo!',
                    cancelTitle: 'Avbryt',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if (value) {
                        this.setResult2(id,set,action);
                        this.status === 'In progress'
                    }
                })
                .catch(err => {
                    // An error occurred
                })
          } else { //if other status continue
              this.setResult2(id,set,action)
              this.status === 'In progress'
          }
         

        },
     setResult2(id,set,action) {

        let oldval = this[id+'set'+set];
        let newval = this[id+'set'+set] + action;
        let conval = 0;
        let con;

        if (id === 'home') {
          conval = this['awayset'+set];
          con = 'away'
        } else {
          conval = this['homeset'+set];
          con = 'home'
        }

        if (set < 3) {
          if (newval < 7 && newval > -1) {
            this[id+'set'+set] = newval;          
          }

          if (newval === 7 && conval > 4) {
            this[id+'set'+set] = newval;     
          }

          if (conval === 7 && newval > 5) {
            this[id+'set'+set] = 6;
          }
        } else { //set 3
           if (newval > -1) {
            this[id+'set'+set] = newval;
           }
        }
       
       

        //SET SCORE
    
        let home = [0, 0, 0];
        let away = [0, 0, 0];
        let i;

        //SET 1 & 2 SPECIALS
        if (set < 3) {     
          if (this[id+'set'+set] === 6 && this[id+'set'+set] - this[con+'set'+set] > 1) {
            this[id+set] = 1
            this[con+set] = 0
          }

          if (this[id +'set'+set] === 7 && this[id+'set'+set] > this[con+'set'+set]) {
            this[id+set] = 1
            this[con+set] = 0
          }

          if ((this[id +'set'+set] < 6) || (this[id+'set'+set] <= this[con+'set'+set]) ) {
            this[id+set] = 0
          }
        } else { //set 3            
            if (this[id+'set'+set] >= 10 && this[id+'set'+set] - this[con+'set'+set] > 1) {
              this[id+set] = 1
              this[con+set] = 0
            }

            if (this[id +'set'+set] >= 10 && this[id+'set'+set] - this[con+'set'+set] < 2) {
              this[id+set] = 0
              this[con+set] = 0
            }

            if ((this[id +'set'+set] < 10) || (this[id+'set'+set] <= this[con+'set'+set]) ) {
              this[id+set] = 0
            }
        } 
        //END SET 1 & 2 SPECIALS

       

        if (this[id +'set'+set] === this[con+'set'+set]) {
           this[id+set] = 0
           this[con+set] = 0
        }
        

           
        this.homescore = this.home1 + this.home2 + this.home3
        this.awayscore = this.away1 + this.away2 + this.away3

        if (this.homescore === 1 && this.awayscore === 1) {
          this.showset3 = true;
        }

        if ((this.homescore === 2 && this.awayscore === 0) || (this.homescore === 0 && this.awayscore === 2)) {
          this.showset3 = false;
        }

        if (this.homescore > 1) {          
          this.winner = this.hometeam;          
        }

        if (this.awayscore > 1) {
          this.winner = this.awayteam;          
        }

        if (this.homescore < 2 && this.awayscore < 2) {
          this.winner = '';
          this.status = "In progress"
        }


        //Save result
        this.saveResult();
       

     },
      goBack(team) {
           this.$router.push({
                path: "/myteam"
            });
      },
       showContacts() {
        if (this.showcontacts) {
          this.showcontacts = false;          
           window.scrollTo(0, 0);
        } else this.showcontacts = true;
        
      },
      showGameinfo() {
        if (this.showgameinfo) {
          this.showgameinfo = false;         
           window.scrollTo(0, 0);
        } else this.showgameinfo = true;
        
      },
      showResult() {
        if (this.showresult) {
          this.showresult = false;
          this.isSaving = false;
           window.scrollTo(0, 0);
        } else this.showresult = true;
        
      },
      showwo() {
        if (this.wo) {
          this.wo = false;
          this.default_wo = 'radio_button_unchecked';
        } else {
          this.wo = true;
          this.default_wo = 'radio_button_checked';
        }
      },
      setwo: function(team) {
        let okMessage = '';
        let thewinner = '';
        
        if (team==='home') {
          okMessage = this.hometeamname + ' lämnar WO och det vinnande laget är ' + this.awayteamname + '?';
          thewinner = this.awayteam;       
        } else {
          okMessage = this.awayteamname + ' lämnar WO och det vinnande laget är ' + this.hometeamname + '?';
          thewinner = this.hometeam;          
        }

            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm(okMessage, {
                    title: 'Bekräfta WO?',
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'danger',
                    okTitle: 'Bekräfta WO',
                    cancelTitle: 'Avbryt',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if (value) {                   
                      if (team==='home') {         
                        this.homeset1 = 0;
                        this.homeset2 = 0;
                        this.homeset3 = 0;
                        this.awayset1 = 6;
                        this.awayset2 = 6;
                        this.awayset3 = 0;
                        this.home1 = 0;
                        this.home2 = 0;
                        this.home3 = 0;
                        this.away1 = 1;
                        this.away2 = 1;
                        this.away3 = 0;
                        this.awayscore = 2;
                        this.homescore = 0;

                    } else {                     
                      this.homeset1 = 6;
                      this.homeset2 = 6;
                      this.homeset3 = 0;
                      this.awayset1 = 0;
                      this.awayset2 = 0;
                      this.awayset3 = 0; 
                      this.home1 = 1;
                      this.home2 = 1;
                      this.home3 = 0;
                      this.away1 = 0;
                      this.away2 = 0;
                      this.away3 = 0;
                      this.homescore = 2;
                      this.awayscore = 0;
                    }   
                       this.status = "Finished";                       
                       this.showwo = false;
                       this.winner = thewinner;                  
                       this.saveResult();              
                    }
                })
                .catch(err => {
                    // An error occurred
                })



      },
      saveResult() {
        if (this.lastsaved !== moment().format('HH:mm')) {
          this.isSaving = true;
        }

        let gameid = this.$route.query.id;
        if (gameid === '') return;

        

    //FETCH DATA FROM ID AND METHOD   
    //updateGame(_id) --> status :ok / error

                        this.axios.post(globalState.admin_url+'updateGame', {
                            "_id": gameid,
                            "gamedate": moment(this.gamedate).format('YYYY-MM-DD'),
                            "gametime": this.gametime,
                            "club": this.clubid,
                            "homescore": this.homescore,
                            "awayscore": this.awayscore,
                            "home1": this.home1,
                            "home2": this.home2,
                            "home3": this.home3,
                            "away1": this.away1,
                            "away2": this.away2,
                            "away3": this.away3,
                            "awayset1": this.awayset1,
                            "homeset1": this.homeset1,
                            "awayset2": this.awayset2,
                            "awayset3": this.awayset3,
                            "homeset2": this.homeset2,
                            "homeset3": this.homeset3,
                            "winner": this.winner,
                            "status": this.status
                        })
                        .then(response => {
                            if (response.data.hasOwnProperty('error')) {
                                console.log("error")
                                return;
                            }

                            //update lastsaved
                            if (this.lastsaved !== moment().format('HH:mm')) {
                              this.lastsaved = moment().format('HH:mm');
                            }
                            this.isErrorSave = false;
                            //console.log(response.data)
                                                                         
                            //gototopiffinished
                            if (this.status === 'Finished') {
                              window.scrollTo(0, 0);
                            }


                            this.isSaving = false;
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            this.isSaving = false;
                            this.isErrorSave = true;
                        });



        
      }
    
   },
    mixins: [tagsMixin]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "../styles/variables.scss";

	.text-white a {
		color: #fff !important;
	}

	.disable-dbl-tap-zoom {
		touch-action: manipulation;
	}

	.foot {
		text-transform: uppercase;
	}

	.winner {
		color: $success;
	}

	.result.loser {
		color: red;
	}

	.team.winner,
	.foot.winner {
		font-family: "Titillium Web Bold";
	}

	.team.loser,
	.foot.loser {
		text-decoration: line-through;
	}

	h1 {
		font-size: 1.9em !important;
	}

	.resultform button {
		font-size: 0.8em !important;
	}

	span.label {
		font-size: 0.9em;
		color: #666;
		display: block;
		margin: 0 0 10px 0;
	}

	span.team {
		font-size: 0.9em !important;
		display: block;
	}

	span.contact {
		display: block;
		font-family: "Titillium Web Bold";
	}

	span.contact,
	span.contact a {
		font-size: 0.8em !important;
	}

	span.circle {
		font-size: 3em !important;
		display: block;
		border-radius: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		display: inline-block;
		background-color: #f5f5f5;
		width: 2em;
		height: 2em;
		padding-top: 0.25em;
		margin: 0 auto;
	}

	span.result,
	span.set {
		font-size: 1.8em !important;
		display: block;
	}

	span.set {
		border-right: 1px solid #ccc;
	}

	.resultform .row.lines {
		border-top: 1px solid #ccc;
	}

	strong,
	span.set,
	.winner {
		font-family: "Titillium Web Bold";
	}

	p {
		margin-bottom: 0.5em;
	}

	@media print {
		.no-print,
		.no-print * {
			display: none !important;
		}
	}

	.time-picker input {
		padding: initial !important;
		height: initial !important;
		background-color: none !important;
	}

	.material-icons {
		font-size: 1.2em;
		padding-bottom: 3px;
	}

	.material-icons.big {
		font-size: 2em;
	}

	.go-back {
		position: absolute;
		z-index: 5;
		left: 5%;
		top: -50px;
		border-radius: 50%;
		padding: 5px;
		height: 40px;
		width: 40px;
		background-color: #ccc;
		border-color: #bbb;
		cursor: pointer;
	}
</style>