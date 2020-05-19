<template>
  <div class="info">
    <vue-headful :title="doctitle" />

    <b-container>
      <b-row class="justify-content-center" align-h="center">
        <b-col md="6" class="text-center">
          <h1 class="mt-5 mb-2 strong">
            <i class="far fa-golf-club mr-2"></i>Match
          </h1>
        </b-col>
      </b-row>

      <div v-if="loading" class="d-flex justify-content-center mb-3">
        <b-container>
          <b-row v-if="loading" align-h="center">
            <b-col md="6" class="text-center">
              <b-spinner
                big
                type="grow"
                class="m-5"
                style="width: 5rem; height: 5rem;"
              ></b-spinner>
              <p>Hämtar matchen...</p>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div v-if="notfound" class="d-flex justify-content-center mt-5">
        <b-container>
          <b-row align-h="center">
            <b-col md="6" class="text-center">
              <p>Hittar inte matchen...</p>
              <a href="/mymatchplay">Mitt lag</a>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <b-row align-h="center" v-if="!loading && !notfound">
        <b-col md="8">
          <b-container class="mt-3 mt-md-4">
            <b-row class="justify-content-center" align-h="center">
              <b-col class="col-12 col-md-6" :class="{ 'winner': winner && hometeam === winner, 'loser': winner && awayteam === winner}">
                <strong>HEMMALAG</strong><br />
                <span>{{hometeamleadername}}</span> &
                <span>{{hometeammembername}}</span
                ><br />
                <span v-if="hometeamcoursename">{{hometeamcoursename}}</span>
                <span v-if="!hometeamcoursename">Hemmaklubb saknas</span><br />
              </b-col>

              <b-col class="col-12 col-md-6 text-right mt-3 mt-md-0" :class="{ 'winner': winner && awayteam === winner, 'loser': winner && hometeam === winner}">
                <strong>BORTALAG</strong><br />
                <span>{{awayteamleadername}}</span> &
                <span>{{awayteammembername}}</span
                ><br />
                <span v-if="awayteamcoursename">{{awayteamcoursename}}</span>
                <span v-if="!awayteamcoursename">Hemmaklubb saknas</span><br />
              </b-col>
            </b-row>
          </b-container>
          <div hidden>
            {{winner}}<br />
            {{status}}<br />
          </div>
          <b-container hidden class="mt-2">
            <b-row class="justify-content-center" align-h="center">
              <b-col class="text-center">
                <b-button
                  v-if="isteamleader"
                  @click="startGame()"
                  size="sm"
                  class="mt-3"
                  ><i class="material-icons mr-1">play_arrow</i>Starta</b-button
                >
                <b-button
                  v-if="isteamleader"
                  @click="endGame()"
                  size="sm"
                  class="mt-3"
                  ><i class="material-icons mr-1">stop</i>Avsluta</b-button
                >
              </b-col>
            </b-row>
          </b-container>

          <b-container class="mt-3 mb-3 mt-md-5">
            <b-row class="justify-content-center" align-h="center">
              <b-col class="col-12 text-center p-0 m-0">
                <div class="mt-3" v-if="status==='Finished'">
                  <h2>Matchresultat</h2>
                  <div>{{gameresult}}</div>
                  <div>{{ getgamedate()}} {{gametime}}</div>
                  <div v-if="status==='Finished'">@ {{query}}</div>
                </div>
              </b-col>
            </b-row>
            <b-row class="justify-content-center" align-h="center">
              <b-col class="col-12 text-center p-0 mt-3">
                <b-tabs content-class="mt-4" v-model="tabIndex" no-key-nav>
                  <b-tab title-link-class="ml-1 p-2">
                    <template v-slot:title>
                      <span class="my-nav-item">Spelplats</span>
                    </template>

                      <b-alert
                            v-if="isteamleader && status!='Finished'"
                            show
                            class="mt-3 mb-0 small"
                            variant="info"
                          >
                            Hemmalaget (ni) bokar bana och speltid i samråd med bortalaget. Se kontaktuppgifter under kontaktfliken. Boka först tid på banan och välj sedan bana nedan, datum och tid för matchen och meddela era motståndare!
                          </b-alert>

                    <div v-if="!isteamleader && status!='Finished'">
                      <div v-if="gamedate">{{ getgamedate()}} {{gametime}}</div>
                      <div v-else>Speltid är inte bestämd än</div>
                      <div v-if="query">@ {{query}}</div>
                      <div v-else>@ (Golfbana saknas)</div>



                        <b-alert
                            v-if="status!='Finished'"
                            show
                            class="mt-3 mb-0 small"
                            variant="info"
                          >
                            Hemmalaget bokar bana och speltid i samråd med er. Se kontaktuppgifter under kontaktfliken.
                          </b-alert>

                    </div>

                    <div v-if="isteamleader">
                      <b-container class="mt-3">
                        <b-row class="justify-content-center" align-h="center">
                          <b-col class="col-6 text-left">
                            <b-form-group class="">
                              <label for="gamedate">Datum</label>
                              <v-date-picker
                                v-model="gamedate"
                                :attributes="attrs"
                              />
                            </b-form-group>
                          </b-col>
                          <b-col class="col-6 text-left">
                             <b-form-group class="">
                                <label for="gametime">Tid</label>
                                 <b-form-input v-model="gametime" placeholder="Tex 08:10"></b-form-input>
                             </b-form-group>
                          </b-col>
                         
                          <b-col hidden class="col-6 text-left">
                            <b-form-group class="">
                              <label for="gametime">Tid</label>
                              <vue-timepicker
                                v-model="gametime"
                                hide-disabled-items
                                :hour-range="[[5, 20]]"
                                :minute-interval="5"
                                :input-class="{
  'time-picker': true,  
  'form-control': true
}"
                                font-size="inherit"
                                input-width="100%"
                                input-class="test"
                              ></vue-timepicker>
                            </b-form-group>
                          </b-col>
                          <b-col class="col-12 text-left">
                            <b-form-group class="">
                              <label for="query">Var spelas matchen?</label>
                              <suggestions
                                v-model="query"
                                id="query"
                                :options="options"
                                :onInputChange="onCountryInputChange"
                                :onItemSelected="onSearchItemSelected"
                                style="width:100%;"
                              >
                                <div
                                  slot="item"
                                  slot-scope="props"
                                  class="single-item text-left"
                                >
                                  <span class="name">{{props.item.title}}</span>
                                </div>
                              </suggestions>
                              <b-form-input
                                hidden
                                id="clubid"
                                v-model="clubid"
                                readonly
                                placeholder="Id på klubben"
                              >
                              </b-form-input>
                            </b-form-group>

                            <b-button v-if="!isSaving"
                              @click="saveResult()"
                              variant="warning"
                              class="mr-1 mb-3 btn-sm"
                              ><i class="material-icons mr-2">save</i>Spara tid
                              & plats</b-button
                            >
                             <b-button v-if="isSaving" variant="success" class="mr-1 mb-3 btn-sm"
                          ><b-spinner
                            small
                            type="grow"
                            class="mr-2"
                          ></b-spinner
                          >Sparar...</b-button>
                            <a
                              v-if="awayteamleadermobile"
                              :href="'sms://'+awayteamleadermobile + '?&body=Dags att spela golf i Matchplay! Vi möts på ' + query + ' ' + getgamedate() + ' kl ' + gametime + '. MVH ' + hometeamleadername"
                              ><span
                                class="btn btn-info btn-sm text-white mr-1 mb-2"
                                ><i class="material-icons mr-2">textsms</i
                                >Skicka sms med info</span
                              ></a
                            >
                            <hr />
                          </b-col>
                        </b-row>
                      </b-container>
                    </div>
                  </b-tab>
                  <b-tab title-link-class="ml-1 p-2">
                    <template v-slot:title>
                      <span class="my-nav-item">Scorekort</span>
                    </template>

                    <b-container class="mt-3">
                      <b-row class="justify-content-center" align-h="center">
                        <b-col class="col-12 text-left">
                         
                          <b-alert show class="mt-1 small" variant="info">
                            Hemmalaget ansvarar för att föra score för matchen via vårt system!
                            Rätt hcp-regler används och vi hämtar aktuella
                            hcp/slope/tee från Svenska Golfförbundet.
                          </b-alert>

                           <b-alert
                            v-if="isteammember && status!='Finished'"
                            show
                            class="mt-1 mb-0 small"
                            variant="warning"
                          >
                            Endast hemmalaget
                            kan rapportera
                            resultatet för denna match.
                          </b-alert>

                           <b-alert
                            v-if="isteamleader && status!='Finished'"
                            show
                            class="mt-1 mb-0 small"
                            variant="warning"
                          >
                           Klicka på knappen <strong>STARTA MATCH</strong> nedanför för att välja klubb/slinga/tee för spelarna när det är dags att spela golf!
                          </b-alert>

                          <b-button v-if="isteamleader"
                          :disabled="status === 'Finished'"
                            @click="startGame()"
                            variant="success"
                            class="mr-1 mt-3"
                            ><i class="material-icons mr-2"
                              >play_circle_filled</i
                            >Starta match</b-button
                          >
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-tab>
                  <b-tab title-link-class="ml-1 p-2">
                    <template v-slot:title>
                      <span class="my-nav-item">Kontakt</span>
                    </template>

                <b-container class="mt-4 mt-md-5">
                    <b-row class="justify-content-center" align-h="center">
                      <!-- home team leader -->
                      <b-col v-if="!isteamleader" class="col-12 text-left">
                        <span class="contact"
                          >{{hometeamleadername}} ({{hometeamleadergolfid}})</span
                        >
                       
                        <a v-if="hometeamleadermobile" :href="'tel:'+hometeamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">phone</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="hometeamleadermobile" :href="'sms://'+hometeamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">textsms</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="hometeamleaderemail" :href="'mailto:' + hometeamleaderemail"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">alternate_email</i
                            >&nbsp;</span
                          ></a
                        >
                       
                        <p hidden class="mt-3 d-none d-sm-block hidden">
                          {{hometeamleadermobile}} |
                          <a
                            :href="'mailto:' + hometeamleaderemail"
                            >{{hometeamleaderemail}}</a
                          >
                        </p>
                      </b-col>
                       <!-- home team member -->
                       <b-col v-if="!isteamleader" class="col-12 text-left mt-3">
                        <span class="contact"
                          >{{hometeammembername}} ({{hometeammembergolfid}})</span
                        >
                       
                        <a v-if="hometeammembermobile" :href="'tel:'+hometeammembermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">phone</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="hometeammembermobile" :href="'sms://'+hometeammembermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">textsms</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="hometeammemberemail" :href="'mailto:' + hometeammemberemail"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">alternate_email</i
                            >&nbsp;</span
                          ></a
                        >
                       
                        <p hidden class="mt-3 d-none d-sm-block hidden">
                          {{hometeammembermobile}} |
                          <a
                            :href="'mailto:' + hometeammemberemail"
                            >{{hometeammemberemail}}</a
                          >
                        </p>
                      </b-col>

                      <!-- away team member -->

                      <b-col v-if="!isteammember" class="col-12 text-right">
                        <span class="contact"
                          >{{awayteamleadername}} ({{awayteamleadergolfid}})</span
                        >
                       
                        <a v-if="awayteamleadermobile" :href="'tel:'+awayteamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">phone</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="awayteamleadermobile" :href="'sms://'+awayteamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">textsms</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="awayteamleaderemail" :href="'mailto:' + awayteamleaderemail"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">alternate_email</i
                            >&nbsp;</span
                          ></a
                        >
                       
                        <p hidden class="mt-3 d-none d-sm-block hidden">
                          {{awayteamleadermobile}} |
                          <a
                            :href="'mailto:' + awayteamleaderemail"
                            >{{awayteamleaderemail}}</a
                          >
                        </p>
                      </b-col>

 <!-- away team member -->

                      <b-col v-if="!isteammember" class="col-12 text-right mt-3">
                        <span class="contact"
                          >{{awayteammembername}} ({{awayteammembergolfid}})</span
                        >
                       
                        <a v-if="awayteammembermobile" :href="'tel:'+awayteammembermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">phone</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="awayteammembermobile" :href="'sms://'+awayteammembermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">textsms</i
                            >&nbsp;</span
                          ></a
                        >
                        <a v-if="awayteammemberemail" :href="'mailto:' + awayteammemberemail"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">alternate_email</i
                            >&nbsp;</span
                          ></a
                        >
                     
                        <p hidden class="mt-3 d-none d-sm-block hidden">
                          {{awayteammembermobile}} |
                          <a
                            :href="'mailto:' + awayteammemberemail"
                            >{{awayteammemberemail}}</a
                          >
                        </p>
                      </b-col>



                    </b-row>
                  </b-container>
                    


                  </b-tab>
                </b-tabs>

                <div v-if="showresult && isteamleader && status!='Finished'">
                  <b-container class="mt-4 mt-md-5 resultform">
                    <!-- SKICKA IN -->
                    <b-row
                      hidden
                      class="justify-content-center mt-4 pt-2 "
                      align-h="center"
                    >
                      <b-col>
                        <b-button
                          v-if="!isSaving"
                          @click="saveResult()"
                          variant="success"
                          class="mr-1"
                          ><i class="material-icons mr-2">save</i
                          >Spara</b-button
                        >
                        <b-button v-if="isSaving" variant="success" class="mr-1"
                          ><b-spinner
                            small
                            type="grow"
                            class="mr-2 mb-1"
                          ></b-spinner
                          ><i class="material-icons mr-2">cloud_circle</i
                          >Sparar...</b-button
                        >
                        <b-button
                          @click="showResult()"
                          variant="danger"
                          class="ml-1"
                          ><i class="material-icons mr-2">cancel</i
                          >Avbryt</b-button
                        >
                      </b-col>
                    </b-row>

                    <b-row
                      v-if="!winner && isteamleader && status !='Finished'"
                      class=""
                      align-h="center"
                    >
                      <b-col class="text-left">
                        <span @click="showwo()"
                          ><i class="material-icons mr-2">{{default_wo}}</i
                          >Klicka här vid WO (flerval)</span
                        ><br />
                        <b-button
                          v-if="wo"
                          @click="setwo('home')"
                          variant="danger"
                          size="sm"
                          class="mt-2 mr-1"
                          ><i class="material-icons mr-2">cancel</i>Hemmalaget
                          lämnar WO</b-button
                        >
                        <b-button
                          v-if="wo"
                          @click="setwo('away')"
                          variant="danger"
                          size="sm"
                          class="mt-1 mr-1"
                          ><i class="material-icons mr-2">cancel</i>Bortalaget
                          lämnar WO</b-button
                        >
                      </b-col>
                    </b-row>
                  </b-container>
                  <hr />
                </div>
              </b-col>
            </b-row>
          </b-container>

          <b-container hidden class="mt-1 mt-md-2">
            <b-row class="justify-content-center" align-h="center">
              <b-col class="col-12 text-center p-0 m-0">
                <b-button
                  v-if="(isteamleader || isteammember)"
                  @click="showContacts()"
                  variant="info"
                  class="mt-1"
                  ><i v-if="showcontacts" class="material-icons"
                    >keyboard_arrow_down</i
                  ><i v-if="!showcontacts" class="material-icons"
                    >keyboard_arrow_right</i
                  >Se kontaktuppgifter</b-button
                >

                <div hidden v-if="showcontacts && (isteamleader || isteammember)">
                  <b-container class="mt-4 mt-md-5">
                    <b-row class="justify-content-center" align-h="center">
                      <b-col v-if="!isteamleader" class="col-12 text-left">
                        <span class="contact"
                          >{{hometeamleadername}}, {{hometeamcity}}</span
                        >
                        <span
                          hidden
                          class="contact mt-0"
                          >{{hometeamcity}}</span
                        >
                        <a :href="'tel:'+hometeamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">phone</i
                            >&nbsp;</span
                          ></a
                        >
                        <a :href="'sms://'+hometeamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">textsms</i
                            >&nbsp;</span
                          ></a
                        >
                        <a :href="'mailto:' + hometeamleaderemail"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">alternate_email</i
                            >&nbsp;</span
                          ></a
                        >
                        <br />
                        <p class="mt-3 d-none d-sm-block">
                          {{hometeamleadermobile}} |
                          <a
                            :href="'mailto:' + hometeamleaderemail"
                            >{{hometeamleaderemail}}</a
                          >
                        </p>
                      </b-col>

                      <b-col v-if="!isteammember" class="col-12 text-right">
                        <span class="contact"
                          >{{awayteamleadername}}, {{awayteamcity}}</span
                        >
                        <span
                          hidden
                          class="contact mt-0"
                          >{{awayteamcity}}</span
                        >
                        <a :href="'tel:'+awayteamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">phone</i
                            >&nbsp;</span
                          ></a
                        >
                        <a :href="'sms://'+awayteamleadermobile"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">textsms</i
                            >&nbsp;</span
                          ></a
                        >
                        <a :href="'mailto:' + awayteamleaderemail"
                          ><span
                            class="btn btn-info text-white btn-sm mt-2 pl-2 pr-0"
                            ><i class="material-icons mr-1">alternate_email</i
                            >&nbsp;</span
                          ></a
                        >
                        <br />
                        <p class="mt-3 d-none d-sm-block">
                          {{awayteamleadermobile}} |
                          <a
                            :href="'mailto:' + awayteamleaderemail"
                            >{{awayteamleaderemail}}</a
                          >
                        </p>
                      </b-col>
                    </b-row>
                  </b-container>
                  <hr />
                </div>
              </b-col>
            </b-row>
          </b-container>

          <b-container>
            <b-row class="justify-content-center mt-5 mt-md-5" align-h="center">
              <b-col class="col-6 text-center p-0 m-0">
                <span class="label">Spelperiod</span>
                <span class="team"
                  >{{getgamedate2(roundstartdate,'half')}} -
                  {{getgamedate2(roundenddate,'half')}}</span
                >
              </b-col>

              <b-col class="col-6 text-center p-0 m-0">
                <span class="label">Omgång</span>
                <span class="team">{{roundname}}</span>
              </b-col>
            </b-row>

            <b-row
              class="justify-content-center mt-4 mt-md-5 mb-5"
              align-h="center"
            >
              <b-col class="col-6 text-center p-0 m-0">
                <a
                  :href="`/mymatchplay`"
                  class="btn btn-light btn-sm mt-3 mr-md-2"
                  >Tillbaka</a
                >
              </b-col>

              <b-col hidden class="col-6 text-center p-0 m-0">
                <a
                  :href="game_url"
                  target="_blank"
                  class="btn btn-light btn-sm mt-3 mr-md-2"
                  >Matchlänk</a
                >
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
  import Suggestions from 'v-suggestions';
  import Calendar from 'v-calendar/lib/components/calendar.umd'
  import DatePicker from 'v-calendar/lib/components/date-picker.umd'
  import moment from 'moment';
  import {globalState} from '../main.js'
   import VueTimepicker from 'vue2-timepicker'
  import 'vue2-timepicker/dist/VueTimepicker.css'

  export default {
    name: 'game',
    components: {
        'suggestions': Suggestions,
        'v-calender': Calendar,
        'v-date-picker': DatePicker,
        'vue-timepicker': VueTimepicker
    },
    data () {
       let clubs = [];

      return {
         tabIndex: 0,
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
      query: '',
      clubs: clubs,
      clubid:'',
      clubname:'',
      selectedClub: null,
      options: {
           placeholder: 'Börja skriv så letar vi bana!',
           inputClass: 'form-control course'
        },
      isteamleader: false,
      isteammember: false,
      wo: false,
      default_wo: 'radio_button_unchecked',
       userid: '',
      loading: true,
      notfound: false,
      showresult: false,
      showgameinfo: false,
      showcontacts: false,
       status: '',
      winner: '',
      nowinneralert: false,
      roundstartdate:'',
      roundenddate:'',
      roundname: '',
      lastsaved: '',
      isErrorSave: false,
      gamedate: '',
      gametime: '',
      gameresult: '',
      hometeam: '',
      awayteam: '',
      hometeamcoursename: '',
      awayteamcoursename: '',
      hometeamleadername: '',
      hometeamleadergolfid: '',
      awayteamleadergolfid: '',
      hometeammembergolfid: '',
      awayteammembergolfid: '',
      hometeammembername: '',
      hometeamleadermobile: '',
      hometeamleaderemail: '',
      hometeammembername: '',
      hometeammembermobile: '',
      hometeammemberemail:'',
      awayteamleadername: '',
      awayteamleadermobile: '',
      awayteamleaderemail: '',
      awayteammembername: '',
      awayteammembermobile: '',
      awayteammemberemail:'',
      game_id: '',
      game_url: '',
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
    this.game_id = gameid;
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

                            this.hometeamname = response.data.hometeamname;
                            this.awayteamname = response.data.awayteamname;
                            this.roundstartdate = response.data.roundstartdate;
                            this.roundenddate = response.data.roundenddate;
                            this.roundname = response.data.roundname;

                            this.hometeamleadername = response.data.hometeamleadername;
                            this.awayteamleadername = response.data.awayteamleadername;

                            this.hometeamleadergolfid  = response.data.hometeamleadergolfid;
                            this.hometeammembergolfid  = response.data.hometeammembergolfid;
                            this.awayteamleadergolfid  = response.data.awayteamleadergolfid;
                            this.awayteammembergolfid  = response.data.awayteammembergolfid;

                            this.hometeamcoursename = response.data.hometeamcoursename;
                            this.awayteamcoursename = response.data.awayteamcoursename;

                            if (response.data.hasOwnProperty('hometeammembername')) {
                              this.hometeammembername = response.data.hometeammembername;
                            }

                            if (response.data.hasOwnProperty('awayteammembername')) {
                              this.awayteammembername = response.data.awayteammembername
                            }

                            this.hometeam = response.data.hometeam;
                            this.awayteam = response.data.awayteam;

                            if (response.data.hasOwnProperty('status')) {
                             this.status = response.data.status;
                            }

                            if (response.data.hasOwnProperty('winner')) {
                             this.winner = response.data.winner;
                            }


                            this.hometeamleadername = response.data.hometeamleadername;
                            //this.hometeamleaderid = response.data.hometeamleader;
                            this.hometeamleadermobile = response.data.hometeamleadermobile;
                            this.hometeamleaderemail = response.data.hometeamleaderemail;
                            this.hometeammemberemail = response.data.hometeammemberemail;
                            this.awayteamleadername = response.data.awayteamleadername;
                            this.awayteammembername = response.data.awayteammembername;
                            this.awayteamleadermobile = response.data.awayteamleadermobile;
                            this.awayteamleaderemail = response.data.awayteamleaderemail;
                            this.awayteammemberemail = response.data.awayteammemberemail;

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

                             //set result:
                            if (response.data.hasOwnProperty('result')) {
                             this.gameresult = response.data.result;
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


    //GET GOLF CLUBS
    this.getGolfClubs();


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
       showScorecard: function() {

        this.status = "In progress";
        this.saveResult();

          if (!this.showresult) {
            this.showresult = true; //activate the div to show resultform
          } else this.showresult = false;
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
      getGolfClubs: function () {
            this.axios
                .post(
                    globalState.admin_url + "getGolfclubs"
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
              return club.title.toLowerCase().includes(query.toLowerCase())
            })
        },
        onSearchItemSelected(item) {

            this.selectedSearchItem = item.title;
            this.query = item.title;
            this.clubid = item._id;
            this.clubname = item.title;

            //this.saveResult()

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
          okMessage = this.hometeamleadername + ' lämnar WO och det vinnande laget är ' + this.awayteamleadername + '?';
          thewinner = this.awayteam;
        } else {
          okMessage = this.awayteamleadername + ' lämnar WO och det vinnande laget är ' + this.hometeamleadername + '?';
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



                    } else {

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
      startGame() {
       location.href = "creategame?id="+this.game_id;
      },
      saveResult() {

        //if (this.lastsaved !== moment().format('HH:mm')) {
          this.isSaving = true;
        //}

        let gameid = this.$route.query.id;
       // console.log(gameid,)
        if (gameid === '') return;



    //FETCH DATA FROM ID AND METHOD
    //updateGame(_id) --> status :ok / error

                        this.axios.post(globalState.admin_url+'updateGame', {
                            "_id": gameid,
                            "gamedate": moment(this.gamedate).format('YYYY-MM-DD'),
                            "gametime": this.gametime,
                            "club": this.clubid
                            //"winner": this.winner,
                            //"status": this.status
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

.input.display-time {
  background-color: #fff !important;
}

.form-control:disabled,
.form-control[readonly] {
  background-color: #fff !important;
}

.time-picker {
  background-color: #fff;
  font-family: "Eurostile LT Std";
  font-size: 16px;
  line-height: 20px;
}

.time-picker input {
  height: 38px;
    line-height: 1.25;
    border-color: #cbd5e0;
    border-radius:4px !important;
}

.vue__time-picker input.display-time {
    border: 1px solid #000;
    width: 10em;
    height: 2.2em;
    padding: .3em .5em;
    font-size: 1em;
}

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

.result.loser, .loser{
  color: red;
  text-decoration: line-through;
}

.team.winner,
.foot.winner {

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

.my-nav-item {
  font-size: 0.85em;
}

@media only screen and (max-width: 330px) {
  /* iphone 5/se */
  .my-nav-item {
    font-size: 0.7em;
  }
}
</style>
