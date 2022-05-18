<template>


	<div ref="scorecardTest" v-bind:class="{bg: authorized,bg2:!authorized, extraheight: ((winnerSent && !gameClosed) && !viewedInModal) || (setTieBreak && !viewedInModal) || (gameClosed && !viewedInModal),extraheight2: (setTieBreak && !gameClosed) || winnerDeclared && !gameClosed}">
		<vue-headful :title="doctitle" />
		<div v-if="loadingSpinner"  class="text-center min-vh-100 mt-5">
	 		<b-spinner hidden big type="grow" class="align-items-center m-5" style="width: 5rem; height: 5rem;"></b-spinner>
			 <b-progress height="1rem" variant="success" striped animated class="m-5">           
									<b-progress-bar :value="loadingprogress">
									</b-progress-bar>
								</b-progress> 
				<div v-if="authorized && !viewedInModal" class="text-center p-3">
					Laddar scorekortet
				</div>

			 	<div class="text-center" v-if="viewedInModal">
					 Matchen presenteras av:<br><br>
				 <!-- sponsors -->
						 <span
                        v-for="(item) in testLimited"
                        :key="item.message"
                      >
					  <a :href="item.url" target="_blank">
						<b-img class="mr-2 topimage2" v-if="viewedInModal" :src="getImageUrl(item.image,'w_200,f_auto,q_auto')" alt=""></b-img>
					  </a>       
						</span>
				</div>
		</div>

		<b-modal id="modal-legend" title="Välkommen till matchen!" ok-only ref="modal-legend">
			
			Se till att registrera scoren fortlöpande på väg till nästa tee eller innan ni slår ut på nästa så att dom som följer matchen ser de uppdaterade resultaten.
			<br><br>
			<span class="red">När er match är avgjord är det viktigt att trycka på knappen <strong>avsluta matchen</strong> som blinkar rött högst upp på scorekortet!</span>
			<br><br>
			<div v-if="!freeplay">
				Ta gärna ett foto på ditt lag eller hela gänget nu innan ni slår ut på första tee: <label v-if="authorized" for="file"><span class=" pulse-button btn btn-primary"><span style="font-size:1.5em;" class="material-icons mr-0">add_a_photo</span></span></label>
						<br><span class="small">Bilden kommer visas på resultatsidan.</span>
			</div>
			<h5 class="mt-4 mb-3">Symbolförklaring</h5>
			<b-row class="legend mb-3">
				<b-col class="col-6 small mb-3">
					<i style="font-size:0.3em;" class="fas fa-circle dots align-middle"></i> = Antal extraslag
				</b-col>
				<b-col class="col-6 small mb-3">
					<span class="showWinnerOverviewTeam1 p-1">&nbsp;x&nbsp;</span> = Vinnande score
				</b-col>
				<b-col class="col-6 small mb-3">
					<span class="eagle">x</span> = Eagle
				</b-col>
				<b-col class="col-6 small mb-3">
					<span class="birdie">x</span> = Birdie
				</b-col>
				<b-col class="col-6 small">
					<span class="bogey">x</span> = Bogey
				</b-col>
				<b-col class="col-6 small">
					<span class="doubleBogey">x</span> = Dubbelbogey (eller mer)
				</b-col>
			
			</b-row>

		</b-modal>

		<b-container class v-if="!loadingSpinner">
			<div id="saveprogress" v-if="saveprogress && !overview" class="p-1"><b-spinner small type="grow" class=""></b-spinner></div>
		
			<b-row class="justify-content-center" align-h="center">
				<b-col md="6" class="p-0">					
					<b-container class v-if="!overview && authorized" id="landscape">
						<!--  HEADER  -->
						<b-row class="holeRow pt-4">
							<b-col class="col-2 pr-0 text-left">								
								<button
									@click="activeHole--, saveData(), currentStrokes(activeHole)"
									class="holeButtons disable-dbl-tap-zoom"
									id="buttonLeft"
									:disabled="activeHole === 1"
									:style="activeHole === 1 ? 'opacity: 0.3' : null"
								>
									<span class="material-icons">arrow_back_ios</span>
								</button>
							</b-col>

							<b-col class="col-8 text-center p-0">
								<b-row>
									<b-col xs="4" class="pl-2 pr-0 text-right">
										<span class="holepar" :class="{holeparModal: viewedInModal}">Par: {{ par }}</span>
									</b-col>
									<b-col xs="4" class="p-0 pr-1 pl-1">
										<span class="activeHole">{{ activeHole }}</span>
									</b-col>
									<b-col xs="4" class="pl-0 pr-2 text-left">
										<span class="holepar">Index: {{ index }}</span>
									</b-col>
								</b-row>
							</b-col>

							<b-col class="rightArrowCol col-2 pl-0 text-right">
								<button
									@click="activeHole++, saveData(),currentStrokes(activeHole), sendInProgress()"
									class="holeButtons disable-dbl-tap-zoom"
									id="buttonRight"
									:style="activeHole === 18 ? 'opacity: 0.3' : null"
									:disabled="activeHole === 18"
								>
									<span class="material-icons">arrow_forward_ios</span>
								</button>
							</b-col>
						</b-row>

						<!-- LÄMNADE HÄR FÖR ATT ENKELT KUNNA DUBBELKOLLA ATT SLAG PER SPELARE STÄMMER-->

						<!--  	<ul v-for="hole in course" :key="hole.index">
          							<li>{{ hole.hole }} : {{ hole.slag }}</li>
						</ul>-->


						<!-- AVSLUTA MATCH OCH SÄRSPEL -->
						<app-tie-break-modal v-if="(setTieBreak && !gameClosed) && !winnerSent"></app-tie-break-modal>

						<b-row v-if="setTieBreak && !gameClosed" align-v="center" align-h="center">
							<b-col cols="12" class="text-center small">								
								<button
									@click="sendTiebreakWinner(homeTeamId)"
									v-if="setTieBreak && !gameClosed"
									class="btn btn-danger disable-dbl-tap-zoom"
									:class="{'pulse-button2': !winnerSent && !gameClosed}"
								>Vinnare: <span v-initials>{{this.players[0].name}}</span> &
									<span v-initials>{{this.players[1].name}}</span>
								</button>

								<button
									@click="sendTiebreakWinner(awayTeamId)"
									v-if="setTieBreak && !gameClosed"
									class="btn btn-danger disable-dbl-tap-zoom"
									:class="{'pulse-button2': !winnerSent && !gameClosed}"
								>
									Vinnare:								
									<span v-initials>{{this.players[2].name}}</span> & <span v-initials>{{this.players[3].name}}</span>																	
								</button>

							</b-col>							

							<!-- TIE_BREAK: Avslutad ej stängd -->
						</b-row>

						<b-row align-h="center" v-if="winnerSent && !gameClosed">
							<b-col cols="11" class="winnerJumbotron text-center p-2">
								<p hidden>
									Resultat inskickat
									<i class="material-icons pb-1 pr-1">send</i>
								</p>
								<p>
									{{winningTeam}}
									<i class="material-icons pb-1 pr-1">emoji_events</i>
								</p>

								<p>Avsluta matchen för att låsa för redigering</p>
							</b-col>
						</b-row>

						<!-- TIE_BREAK: Avslutad och stängd -->
						<b-row align-h="center" v-if="winnerSent && gameClosed">
							<b-col cols="11" class="winnerJumbotron text-center p-2">
								<p>
									Resultat inskickat
									<i class="material-icons pb-1 pr-1">send</i>
								<br />
									Match avslutad
									<i class="material-icons pb-1 pr-1">done</i>
								<br />
									<span class="nameOfWinner">Vinnare: {{winningTeam}}
									<i class="material-icons pb-1 pr-1">emoji_events</i> </span>
								</p>
							</b-col>
							<b-col cols="12" class="p-2 text-center mb-3">
						 		<a href="/mymatchplay" v-if="winnerSent && gameClosed && !freeplay">
									<button class="btn btn-warning btn-sm disable-dbl-tap-zoom ">
										Tillbaka till din sida
									</button>
								 </a>
								 <a href="/freeplay" v-if="winnerSent && gameClosed && freeplay">
									<button class="btn btn-warning btn-sm disable-dbl-tap-zoom ">
										Tillbaka till freeplay
									</button>
								 </a> 
							</b-col>
						</b-row>

						<b-row v-if="(setTieBreak && !gameClosed) || winnerDeclared && !gameClosed" align-v="center" align-h="center">
							<b-col class="col-12 pt-0 mt-0 text-center mb-3">
							<button
								:disabled="winnerSent === false"
								v-if="setTieBreak && !gameClosed"
								@click="sendWinner('Finished'), closeGame()"
								class="btn btn-danger disable-dbl-tap-zoom"
								:class="{'pulse-button2': winnerSent && !gameClosed}"
							>Avsluta matchen</button>

							<!--  STÄNGA MATCH EJ SÄRSPEL  -->

							<button
								v-if="winnerDeclared && !gameClosed"
								@click="winnerDeclared = true,  sendWinner('Finished'), closeGame()"
								class="btn btn-danger disable-dbl-tap-zoom pulse-button2"
							>Avsluta matchen</button>
							</b-col>
						</b-row>

						<!-- SÄRSPEL SLUT -->

						<!-- TEAM 1 CONTAINER -->
						<div v-if="activeHole===1" class="sponsor mb-3 text-center">							
							<b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_40,q_auto,e_colorize:100,co_rgb:ffffff/v1612367112/matchplay/logos/Logo_Colburn.png"></b-img>
						</div>
					
						<div v-if="activeHole===3" class="sponsor mb-3 text-center">							
							<b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_40,q_auto/v1612334969/matchplay/logos/fsidesrpxcu1bljhxpxo.png"></b-img>
						</div>

						<div v-if="activeHole===5" class="sponsor mb-3 text-center">
							<b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_40,q_auto/v1647639944/matchplay/logos/fefwqznr5uuace2ingcn.png"></b-img>
						</div>
						
						<div v-if="activeHole===7" class="sponsor mb-3 text-center">
							<b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_40,q_auto/v1614790192/matchplay/logos/gleipnergruppen.png"></b-img>
						</div>

						<div v-if="activeHole===9" class="sponsor mb-3 text-center">
							<b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_40,q_auto,e_colorize:100,co_rgb:ffffff/v1620295945/matchplay/logos/spc_moyl9g.png"></b-img>
						</div>			

						<div v-if="activeHole===11" class="sponsor mb-3 text-center">
							<b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_40,q_auto/v1650225113/matchplay/logos/avpvs06elxonjrlwmw1b.png"></b-img>
						</div>	
									

						<div
							class="team1ScoreCard pt-2 pb-2"
							:class="[
            singleHoleWinner < 0 && displayToast === false ? 'holeWinner' : '',
            singleHoleWinner > 0 && displayToast === false ? 'holeLoser' : ''
          ]"
						>						
							<div v-for="(player, index) in players.slice(0, 2)" :key="player.index">
								<!--  SLAG OCH HCP TEAM 1 -->
								<b-row class="playerRow">
									<div hidden class="teamColor1"></div>
									<b-col class="col-7 playerNameContainer pr-0">
										<p class="playerName ml-2">{{ player.name }}</p>

										<div class="playerInfo ml-2" :class="{playerInfoModal: viewedInModal}">
											<span>SHCP {{ slopedHcpPlayers[index] }}</span>
											<span
												:class="{ hideSlag: slag(index) === 0 ? true : false }"
											>&#9642; <strong>SLAG {{ slag(index) }}</strong></span>
										</div>
									</b-col>

									<!-- SCOREBUTTON -->
									<!-- SPELARE 1 -->
									<b-col class="col-5 text-right pl-0 pr-4">
										<div v-if="index === 0">
											<button
												class="btn btn-secondary disable-dbl-tap-zoom"
												@click="$bvModal.show('modal-1'), (counter = 1)"
												v-if="
                      currentStrokesList.slice(0, 1)[0] !==
                        currentStrokesList.slice(0, 1)[0]
                    "
											>-</button>
											<button
												class="btn btn-secondary disable-dbl-tap-zoom"
												v-else
												@click="$bvModal.show('modal-1'), (counter = 1)"
											>{{ currentStrokesList.slice(0, 1)[0] }}</button>
										</div>
										<!-- SPELARE 2 -->
										<div v-if="index === 1">
											<button
												@click="$bvModal.show('modal-2'), (counter = 2)"
												class="btn btn-secondary disable-dbl-tap-zoom"
												v-if="
                      currentStrokesList.slice(1, 2)[0] !==
                        currentStrokesList.slice(1, 2)[0]
                    "
											>-</button>

											<button
												@click="$bvModal.show('modal-2'), (counter = 2)"
												class="btn btn-secondary disable-dbl-tap-zoom"
												v-else
											>{{ currentStrokesList.slice(1, 2)[0] }}</button>
										</div>
									</b-col>
								</b-row>
							</div>
						</div>

						<button
							hidden
							@click="winnerDeclared = !winnerDeclared"
							class="btn btn-info"
						>Declare winner? ( {{winnerDeclared}})</button>

						<!-- TEAM 2 CONTAINER -->
						<div
							class="team2ScoreCard pt-2 pb-2"
							:class="[
            singleHoleWinner > 0 && displayToast === false ? 'holeWinner' : '',
            singleHoleWinner < 0 && displayToast === false ? 'holeLoser' : ''
          ]"
						>
							<div v-for="(player, index) in players.slice(2, 4)" :key="player.index">
								<!--  SLAG OCH HCP TEAM 2 -->
								<b-row class="playerRow">
									<div hidden class="teamColor2"></div>
									<b-col class="col-7 playerNameContainer pr-0">
										<p class="playerName ml-2">{{ player.name }}</p>

										<div class="playerInfo ml-2" :class="{playerInfoModal: viewedInModal}">
											<span>SHCP {{ slopedHcpPlayers[index + 2] }}</span>
											<span
												:class="{ hideSlag: slag(index + 2) === 0 ? true : false }"
											>&#9642; <strong>SLAG {{ slag(index + 2) }}</strong></span>
										</div>
									</b-col>
									<!-- SCOREBUTTON -->
									<!-- SPELAR 3 -->
									<b-col class="col-5 text-right pl-0 pr-4">
										<div v-if="index === 0">
											<button
												@click="$bvModal.show('modal-3'), (counter = 3)"
												class="btn btn-secondary disable-dbl-tap-zoom"
												v-if="
                      currentStrokesList.slice(2, 3)[0] !==
                        currentStrokesList.slice(2, 3)[0]
                    "
											>-</button>
											<button
												@click="$bvModal.show('modal-3'), (counter = 3)"
												class="btn btn-secondary disable-dbl-tap-zoom"
												v-else
											>{{ currentStrokesList.slice(2, 3)[0] }}</button>
										</div>
										<!-- SPELAR 4 -->
										<div v-if="index === 1">
											<button
												class="btn btn-secondary disable-dbl-tap-zoom"
												@click="$bvModal.show('modal-4'), (counter = 4)"
												v-if="
                      currentStrokesList.slice(3, 4)[0] !==
                        currentStrokesList.slice(3, 4)[0]
                    "
											>-</button>
											<button
												@click="$bvModal.show('modal-4'), (counter = 4)"
												class="btn btn-secondary disable-dbl-tap-zoom"
												v-else
											>{{ currentStrokesList.slice(3, 4)[0] }}</button>
										</div>
									</b-col>
								</b-row>
							</div>
						</div>

						<!-- SCORING MODAL -->
						<app-scoring
							v-if="!gameClosed"
							:players="players"
							:activehole="activeHole"
							:active="active"
							:par="par"
							:indexProp="indexProp"
							:counter="counter"
							:nameCount="nameCount"
							@sendScore="currentStrokes"
							@updateCounter="updateCounter"
							@close="saveData"
						></app-scoring>

						<!-- NÄSTA HÅL & ÖVERSIKT BUTTONS -->

						<b-row class="mt-4">
							<b-col v-if="uploading" class="col-12 mb-3">
								<b-progress height="1rem" variant="secondary" striped animated>           
									<b-progress-bar :value="progress">
									</b-progress-bar>
								</b-progress> 
							</b-col>
							<b-col class="col-5">
								<b-button
									class="btn-md pl-3 pr-3 bottombuttons"
									:class="{bottombuttonsModal: viewedInModal}"
									variant="primary"
									@click="overview = !overview, overviewButtonClicked = true, saveData(), sendInProgress()"
								>
									<span hidden class="material-icons" v-if="!viewedInModal">reorder</span>Översikt
								</b-button>
							</b-col>
							<b-col class="col-2 text-center p-0 m-0">
								<input v-if="authorized" type="file" accept=".jpg, .png"  id="file" ref="file" class="inputfile" v-on:change="handleFileUpload()"/>
						 		<label v-if="authorized" for="file"><span class="btn btn-primary"><span style="font-size:1.5em;" class="material-icons mr-0">add_a_photo</span></span></label>
							</b-col>
							<b-col class="col-5 text-right">
								<b-button
									v-if="activeHole < 18"
									id="nextHole"
									class="btn-md pl-3 pr-3 bottombuttons"
									:class="{bottombuttonsModal: viewedInModal, 'pulse-button': allScores(activeHole)}"
									variant="primary"
									@click="currentStrokes(activeHole),makeToast('danger'),activeHole++, saveData(), sendInProgress()"
								>
									Hål {{activeHole + 1}}
									<span class="material-icons" v-if="!viewedInModal">arrow_forward_ios</span>
								</b-button>	
																								
							</b-col>
						</b-row>

						<h4 hidden>{{ dormy }}</h4>
						<h3 hidden>winner declared? {{ winnerDeclared }}</h3>
						<h4
							hidden
							:style="winnerDeclared === true ? 'background-color: red' : 'background-color: white' "
						>
							VINNARE:
							{{ winner }} Resultat: {{ totalWins.totalWins1 }} vs
							{{ totalWins.totalWins2 }}
						</h4>

						<!-- FOOTER - LEADER SECTION -->
						<b-col hidden class="col-4 leaderTeam1 text-right">
							<h4 v-if="leader && !tie">{{ matchScore }}</h4>
						</b-col>

						<b-col hidden class="col-4 leaderTeam2">
							<h4 v-if="!leader && !tie">{{ matchScore * -1 }}</h4>
						</b-col>

						<footer class="fixed-bottom" v-if="!viewedInModal">
							<b-row class="leaderSection" align-v="center" align-h="center">
								<!-- HOME TEAM -->
								<b-col class="col-4 scoreTeam text-left pl-2 pr-0" :class="[{ scoreTeam1: leader && !tie }, {scoreTeamDormy: setDormyClass(dormy2) }]">
									<span
										style="float:left;"										
									>{{getInitials(players[0].name)}} & {{getInitials(players[1].name)}}</span>
									<i v-if="!tie && winnerDeclared && leader" class="material-icons pb-1 pl-1">emoji_events</i>
									<span v-if="!tie && !winnerDeclared" class="dormy">{{dormy2}}</span>
								</b-col>
								<!-- score -->
								<b-col
									class="col-4 text-center score pl-0 pr-0"
									:class="{ leaderRight: leader && !tie, leaderLeft: !leader && !tie, tie: tie, winnerdeclared: winnerDeclared}"
								>
									<span v-if="tie" id="tie">A/S</span>
									<span v-if="!leader && !tie && !winnerDeclared">{{ matchScore * -1 }}UP</span>
									<!-- away leads -->
									<span
										v-if="!leader && winnerDeclared && holesLeft !== 0"
									>{{ matchScore * -1 }}&{{holesLeft}}</span>
									<!-- away wins -->
									<span v-if="!leader && winnerDeclared && holesLeft === 0">{{ matchScore * -1 }}UP</span>
									<!-- away wins on last hole -->

									<!--  -->

									<span v-if="leader && !tie && !winnerDeclared">{{ matchScore }}UP</span>
									<!-- home leads -->
									<span v-if="leader && winnerDeclared &&  holesLeft !== 0">{{ matchScore }}&{{holesLeft}}</span>
									<!-- home wins -->
									<span v-if="leader && winnerDeclared && holesLeft === 0">{{ matchScore }}UP</span>
									<!-- home wins on last hole -->
								</b-col>

								<!-- away team -->
								<b-col class="col-4 scoreTeam text-right pr-2 pl-0" :class="[{ scoreTeam2: !leader && !tie }, {scoreTeamDormy: setDormyClass(dormy1)}]">
									<i v-if="!tie && winnerDeclared && !leader" class="material-icons pb-1 pr-1">emoji_events</i>
									<span
										:style="(dormy1 === '') || (setTieBreak === true) ? 'float:right' : 'float:left'"
									>{{getInitials(players[2].name)}} & {{getInitials(players[3].name)}}</span>
									<span style="clear:right;" v-if="!tie && !winnerDeclared" class="dormy">{{dormy1}}</span>
								</b-col>
							</b-row>
						</footer>
					</b-container>
				</b-col>
			</b-row>
		</b-container>
		<!--  LEADER BOARD -->
		<div  v-if="!loadingSpinner">
			<b-container id="overview" v-if="overview">

			
			<div v-if="!authorized">
			<b-row align-v="center" align-h="center" class="mb-2">
					<b-col class="col-6 text-left">
						<router-link class="" to="/" v-if="!viewedInModal">
						<b-img class="mt-3" src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,c_scale/v1573118127/matchplay/matchplay-new-logo-2020.png" alt=""></b-img>        
						</router-link>
						
						<b-img class="mt-1 ml-2 topimage" v-if="viewedInModal" src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,c_scale/v1573118127/matchplay/matchplay-new-logo-2020.png" alt=""></b-img>   
						
					</b-col>
					<b-col class="col-6 text-right mt-2">						
						<b-img class="mr-2 topimage2"  :src="getLogoImage(logourl,'h_70,f_auto,q_auto')" alt=""></b-img>
					</b-col>

					<b-col hidden class="col-6 text-right mt-2">
						<!-- sponsors -->
						 <span
                        v-for="(item) in testLimited"
                        :key="item.message"
                      >
					  <a :href="item.url" target="_blank">
						<b-img class="mr-2 topimage2" v-if="viewedInModal" :src="getImageUrl(item.image,'w_200,f_auto,q_auto')" alt=""></b-img>
					  </a>       
						</span>
					</b-col>

						<b-col v-if="!authorized && status !== 'Finished'" cols="12" class="mt-4">
							 <h5><b-spinner small type="grow" class="mr-2 mb-1 red"></b-spinner>Match pågår <span v-if="gametime">(start {{gametime}})</span> </h5>
							 <b-button id="refresh_button" class="float-right btn-sm" @click="refreshGame3()" variant="warning" show><b-spinner v-if="updating" small type="grow" class="mr-1 red"></b-spinner>Uppdatera</b-button>
							 <h5 class="mb-0"><span class="lowerCase timeUpdated">Senaste score: {{getgamedate(modifiedAt)}}</span></h5>
							 <h5><span class="lowerCase timeUpdated">Nästa score ca: {{getgamedatepredict(modifiedAt,holesLeft,holesArr)}}</span></h5>
							 
							 
						</b-col>
			
			</b-row>							
				
			</div>

				<b-row class="pt-3" align-v="center" align-h="center">
					<!-- HOME TEAM -->
					<b-col class="col-4 scoreTeam text-left pl-2 pr-0" :class="[{ scoreTeam1: leader && !tie }, {scoreTeamDormy: setDormyClass(dormy2)},  {scoreTeamModal: viewedInModal}]">
						<span
							style="float:left;"
							v-bind:class="{'text-black': (viewedInModal || !authorized) && (winnerDeclared && !leader || matchScore === 0)}"						
						>{{ players.length !== 0 ? getInitials(players[0].name): ''}} & {{players.length !== 0 ? getInitials(players[1].name) : ''}}</span>
						<i v-if="!tie && winnerDeclared && leader" class="material-icons pb-1 pl-1">emoji_events</i>
						<span v-if="!tie && !winnerDeclared" class="dormy">{{dormy2}}</span>
					</b-col>

					<!-- score top overview -->
					<b-col
						class="col-4 text-center score pl-0 pr-0"
						:class="{ leaderRight: leader && !tie, leaderLeft: !leader && !tie, tie: tie, winnerdeclared: winnerDeclared}"
					>					
						<span v-if="tie" id="tie" v-bind:class="{'text-black': (viewedInModal || !authorized) && (matchScore === 0)}">A/S</span>
						
						<span v-if="!leader && !tie && !winnerDeclared" v-bind:class="{'text-black': (viewedInModal || !authorized) && (matchScore === 0)}">{{ matchScore * -1 }}UP</span>
						<!-- away leads -->
						<span
							v-if="!leader && winnerDeclared && holesLeft !== 0 && matchScore !==0"
						>{{ matchScore * -1 }}&{{holesLeft}}</span>
						<!-- away wins -->												
						<span v-if="!leader && winnerDeclared && holesLeft === 0 && matchScore !== 0">{{ matchScore * -1 }}&0</span>
						<!-- away wins on last hole -->

						<!--  -->

						<span v-if="leader && !tie && !winnerDeclared">{{ matchScore }}UP</span>
						<!-- home leads -->
						<span v-if="leader && winnerDeclared &&  holesLeft !== 0">{{ matchScore }}&{{holesLeft}}</span>
						<!-- home wins -->
						<span v-if="leader && winnerDeclared && holesLeft === 0">{{ matchScore }}&0</span>
						<!-- home wins on last hole -->
					</b-col>

					<!-- away team -->
					<b-col class="col-4 scoreTeam text-right pr-2 pl-0" :class="[{ scoreTeam2: !leader && !tie }, {scoreTeamDormy: setDormyClass(dormy1)}, {scoreTeamModal: viewedInModal}]">						
						<i v-if="!tie && winnerDeclared && !leader" class="material-icons pb-1 pr-1">emoji_events</i>
						<span
						v-bind:class="{'text-black': (viewedInModal || !authorized) && ((winnerDeclared && leader) || matchScore === 0) }"
							:style="(dormy1 === '') || (setTieBreak === true) ? 'float:right' : 'float:left'"
						>{{players.length !== 0 ? getInitials(players[2].name) : ''}} & {{players.length !== 0 ? getInitials(players[3].name) : ''}}</span>
						<span style="clear:right;" v-if="!tie && !winnerDeclared" class="dormy">{{dormy1}}</span>
										
					</b-col>
					<b-col class="col-12 mb-0" v-if="tie && winnerDeclared && status === 'Finished'">
						<b-alert show variant="warning" class="mb-0">
						<p class="small">Matchen avgjordes i särspel, vinnare: {{winningTeam}}.</p>
						</b-alert>
					</b-col>
				</b-row>
				

				<b-row hidden class="leaderBoardPlayers">
					<b-col s="4" class="scoreTeam1">
						<p>{{ team1 }}</p>
					</b-col>
					<div class="leaderTeam1">
						<h4 v-if="leader && !tie">{{ matchScore }}</h4>
					</div>
					<b-col s="2" :class="{ leaderRight: leader, leaderLeft: !leader }">
						<p v-if="tie" id="tie">0</p>

						<div v-if="!tie" :class="{ triangleRight: leader, triangleLeft: !leader }"></div>
					</b-col>
					<div class="leaderTeam2">
						<h4 v-if="!leader && !tie">{{ matchScore * -1 }}</h4>
					</div>
					<b-col s="4" class="scoreTeam2">
						<p>{{ team2 }}</p>
					</b-col>
				</b-row>

				<!--  TABELL CLUBNAME AND LOOP (EGEN TABELL FÖR ATT KUNNA SÄTTA TEXT-OVERFLOW: ELLIPSIS--> 											
				<table class="tableClubAndLoop mt-3">					
					<tr>							
						<td colspan="2" class="tableClubAndLoopTd pt-1" v-bind:class="{'text-black': viewedInModal || !authorized}">{{ clubname }}: {{ loop }}</td>
					</tr>
				</table>

				<!--  TABELL HÅL 1-9 --> 
				<table class="table9" v-if="showfront9">
					
					<tr>
						<th>Hål:</th>
						<td @click="showMatch(hole.hole)" v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.hole }}</td>
					</tr>
					<tr>
						<th>Par:</th>
						<td @click="showMatch(hole.hole)" v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.par }}</td>
					</tr>
					<tr>
						<th>Ind:</th>
						<td @click="showMatch(hole.hole)" v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.index }}</td>
					</tr>

					<!--  SPELARE 1 -->
					<tr class="scorecard-row" v-for="player in players.slice(0, 1)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+1)"
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(0)[index] && valueOfLowestScoreInTeam(index,0) }]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
					>								
					<span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes === holes.par+1, doubleBogey: holes.strokes >= holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
					<span hidden :class="[{ hideSlag: slagTable(0, index) === 0 ? true : false }, 'slagInTable']">
						{{slagTable(0, index)}}
					</span>	
					<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(0, index) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(0, index)" :key="dot.index" class="fas fa-circle dots"></i>
					</div>	
					</td>						
					</tr>

					<!-- SPELARE 2 -->
					<tr class="scorecard-row" v-for="player in players.slice(1, 2)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+1)"
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(1)[index] && valueOfLowestScoreInTeam(index,1)}]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>
						<span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes === holes.par+1, doubleBogey: holes.strokes >= holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
						<span hidden :class="[{ hideSlag: slagTable(1, index) === 0 ? true : false }, 'slagInTable']">
						{{slagTable(1, index)}}
					</span>	
					<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(1, index) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(1, index)" :key="dot.index" class="fas fa-circle dots"></i>
					</div>	
						</td>
						
					</tr>

					<tr class="emptyRow">
						<td class="emptyRow">
							<p></p>
						</td>
					</tr>

					<!-- SPELARE 3 -->
					<tr class="scorecard-row" v-for="player in players.slice(2, 3)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+1)"
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(2)[index] && valueOfLowestScoreInTeam(index,2)}]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>
						
						<span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes === holes.par+1, doubleBogey: holes.strokes >= holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
						<span hidden :class="[{ hideSlag: slagTable(2, index) === 0 ? true : false }, 'slagInTable']">
						{{slagTable(2, index)}}
					</span>	
					<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(2, index) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(2, index)" :key="dot.index" class="fas fa-circle dots"></i>
					</div>	
						</td>
					
					</tr>

					<!-- SPELARE 4 -->
					<tr class="scorecard-row" v-for="player in players.slice(3, 4)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+1)"
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(3)[index] && valueOfLowestScoreInTeam(index,3)}]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>
						
						<span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes === holes.par+1, doubleBogey: holes.strokes >= holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
						<span hidden :class="[{ hideSlag: slagTable(3, index) === 0 ? true : false }, 'slagInTable']">
						{{slagTable(3, index)}}
					</span>	
					<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(3, index) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(3, index)" :key="dot.index" class="fas fa-circle dots"></i>
					</div>	
						</td>
						
					</tr>
				</table>

				<!--  TABELL HÅL 10-18 -->
				<table class="table18" v-if="showback9">
					<tr>
						<th>Hål:</th>
						<td @click="showMatch(hole.hole)" v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.hole }}</td>
						
					</tr>
					<tr>
						<th>Par:</th>
						<td @click="showMatch(hole.hole)" v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.par }}</td>
						
					</tr>
					<tr>
						<th>Ind:</th>
						<td @click="showMatch(hole.hole)" v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.index }}</td>
					</tr>

					<!-- SPELARE 1 -->
					<tr class="scorecard-row" v-for="player in players.slice(0, 1)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+10)"
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(0)[index + 9] && valueOfLowestScoreInTeam(index + 9,0)}]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						><span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes === holes.par+1, doubleBogey: holes.strokes >= holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
						<span hidden :class="[{ hideSlag: slagTable(0, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(0, index +9)}}</span>
						<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(0, index + 9) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(0, index + 9)" :key="dot.index" class="fas fa-circle dots"></i>
						</div>
						</td>
					</tr>

					<!-- SPELARE 2 -->
					<tr class="scorecard-row" v-for="player in players.slice(1, 2)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+10)"
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(1)[index + 9] && valueOfLowestScoreInTeam(index + 9,1)}]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						><span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes === holes.par+1, doubleBogey: holes.strokes >= holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
						<span hidden :class="[{ hideSlag: slagTable(1, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(1, index +9)}}</span>
						<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(1, index + 9) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(1, index + 9)" :key="dot.index" class="fas fa-circle dots"></i>
						</div>
						</td>		
					</tr>

					<tr class="emptyRow">
						<td class="emptyRow">
							<p></p>
						</td>
					</tr>
					<!-- SPELARE 3 -->
					<tr class="scorecard-row" v-for="player in players.slice(2, 3)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+10)"
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(2)[index + 9] && valueOfLowestScoreInTeam(index + 9,2)}]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						><span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes >= holes.par+1, doubleBogey: holes.strokes === holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span>
						<span hidden :class="[{ hideSlag: slagTable(2, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(2, index +9)}}</span>
						<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(2, index + 9) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(2, index + 9)" :key="dot.index" class="fas fa-circle dots"></i>
						</div>
						</td>	
					</tr>

					<!-- SPELARE 4 -->
					<tr class="scorecard-row" v-for="player in players.slice(3, 4)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td class="align-top" @click="showMatch(index+10)"
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(3)[index + 9] && valueOfLowestScoreInTeam(index + 9,3)}]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						><span :class="{eagle: holes.strokes === holes.par-2 ,birdie: holes.strokes === holes.par-1,bogey: holes.strokes >= holes.par+1, doubleBogey: holes.strokes === holes.par+2   }">{{ holes.strokes === 0 ? null : holes.strokes }}</span> 
						<span hidden :class="[{ hideSlag: slagTable(3, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(3, index +9)}}</span>
						<div class="mt-1 mb-0 pb-0" :class="[{ hideSlag: slagTable(3, index + 9) === 0 ? true : false }, 'slagInTable']">
						<i v-for="dot in slagTable(3, index + 9)" :key="dot.index" class="fas fa-circle dots"></i>
						</div>
						</td>
					</tr>
				</table>

				

				<!-- BUTTON FÖR MATCH VY -->
				<b-row class="mt-3 mb-2">
					<b-col v-if="uploading" class="col-12 mb-3">
						<b-progress height="1rem" variant="secondary" striped animated>           
                    		<b-progress-bar :value="progress">
							</b-progress-bar>
						</b-progress> 
					</b-col>

					<b-col class="col-5 text-left pr-0 mr-0">						
						<button class="btn btn-primary pulse-button btn-md" @click="showMatch(null)" v-if="authorized">
							<span class="material-icons">create</span>
							Score
						</button>
					</b-col>
					<b-col class="col-2 text-center pl-0 pr-0 ml-0 mr-0">
						<button hidden v-if="authorized" v-b-modal.modal-1 class="btn btn-primary btn-small btn-md" >
							<span style="font-size:2em;" class="material-icons mr-0">add_a_photo</span>
						</button>					
						 <input v-if="authorized" type="file" id="file" ref="file" class="inputfile" v-on:change="handleFileUpload()"/>
						 <label v-if="authorized" for="file"><span class="btn btn-primary"><span style="font-size:1.5em;" class="material-icons mr-0">add_a_photo</span></span></label>
					</b-col>
					<b-col class="col-5 text-right ml-0 pl-0">
						<button v-if="authorized && (status !== 'Finished')" class="btn btn-primary btn-small btn-md" @click="resetGame">
								<span style="font-size:1.2em;" class="material-icons">close</span>								
							</button>							
							<app-hcp-modal
							:course-rating="courseRating"
							:slope-rating="slopeRating"
							:banans-par="banansPar"
							:players="players"
							:slope="slopedHcpPlayers"
							:slope-handicap-list="slopeHandicapList"
							:hcpUnmutated="hcpUnmutated"
							:modalMounted="modalMounted"
							:authorized="authorized"
							@hidingModalInComponent="hideOverview"
						></app-hcp-modal>
						
						</b-col>
					</b-row>
					
					<b-row hidden class="mt-2">
						<b-col class="col-5">
						
						</b-col>
						
					</b-row>
					<b-row align-v="center" no-gutters v-if="!authorized">
						<b-col cols="12" class="text-right legend">
							<p class="small">
							<i style="font-size:0.3em;" class="fas fa-circle dots"></i> = Antal extraslag - 
							<span class="eagle">x</span> = Eagle - 
							<span class="birdie">x</span> = Birdie - 
							<span class="bogey">x</span> = Bogey - 
							<span class="doubleBogey">x</span> = Dubbelbogey (eller mer) - 							
							<span class="showWinnerOverviewTeam1 p-1">x</span> = Vinnande score 
							</p>
						</b-col>
						<b-col class="col-12 p-0 m-0 mt-3">
							<b-container>
								<b-row>
									<b-col class="m-0 p-0 ml-1">
										<h4>Spelare</h4>
									</b-col>
								</b-row>
								<b-row>									
							 <b-col class="col-6 p-1" v-for="({name}, index) in players" :key="name.index">
							<div class="displayNamesNoAuth mb-2 p-2" :class="{team1ScoreCard: index<2, team2ScoreCard: index>1}">
								<p>{{name}} </p>	
								<p>HCP (match): {{slopedHcpPlayers[index]}} </p>
								<p>HCP: <span v-negativeToPostive>{{ hcpUnmutated[index] }}</span></p>
							</div>
						</b-col>
								</b-row>
							</b-container>
						</b-col>
						<b-col class="col-12">
							 <app-game-image-gallery v-if="images" :images="images"></app-game-image-gallery>	
						</b-col>

					</b-row>

			</b-container>
		</div>
		
	</div>

</template>
<script>
	import axios from "axios";
	import { shcp } from "../helpers.js";
	import ScoringVue from "./Scoring.vue";
	import HcpModalVue from "./HcpModal.vue";
	import TieBreakModalVue from "./TieBreakModal.vue";
	import { globalState } from "../main.js";
	import AppGameImageGallery from "./GameImageGallery";

	import moment from 'moment';
	
	moment.locale('sv');

	moment.updateLocale('sv', {
	    relativeTime : {
	        future: "om %s",
	        past:   "%s",
	        ss : '%d sek',
	        m:  "1 minut",
	        mm: "%d min",
	        h:  "en timme",
	        hh: "%d timmar",
	        d:  "en dag",
	        dd: "%d dagar",
	        M:  "en månad",
	        MM: "%d mån",
	        y:  "ett år",
	        yy: "%d år"
	    }
	});

	export default {
		mounted() {
			if (this.viewedInModal) {

			}
		},
		created() {
			this.$route.name === "viewer" ? this.viewedInModal = true : null 
            this.gameID = this.$route.query.id;
			let userinfo = localStorage.getItem("userinfo");

			this.loadingprogress = 10;

			//check if freeplay
			if (this.$route.query.freeplay) {
				if (this.$route.query.freeplay === 'true')
				this.freeplay = true;
			}

			

			//console.log('freeplay='+this.freeplay)


			//ej Inloggad
			if (!userinfo) {
				this.authorized = false;
				//start function to setinterval for update
				this.refreshGame();				
				return;
			}

            userinfo = JSON.parse(userinfo)
			let teams = [...userinfo.teams]
			this.loadingprogress = 20;

            const url = globalState.admin_url + "getGameData";
            const gameID = {
				id: this.gameID,
				freeplay: this.freeplay,
				userid: userinfo._id
			};

			if (teams.length === 0) { //logged in but no teams
				this.authorized = false;
				//start function to setinterval for update
				this.loadingprogress = 30;

				if (this.freeplay) {
					this.authorized = true;
					if (response.data.scorecard[0].holes[0].strokes === 0) {						
						this.$bvModal.show('modal-legend');
					}
				} else {
					this.refreshGame();					
					return;
				}

				
			}

			this.loadingprogress = 40;
			//hanterar om inloggad med lag men någon annans scorecard
            let awayteam = ""
			let hometeam = ""
            axios.post(url, gameID)
                .then(response =>  {
                     awayteam = response.data.awayteam
					 hometeam = response.data.hometeam

					 
					
                        for (const team of teams) {							
							//console.log(team)
                                //if(team._id === awayteam || team._id === hometeam || userinfo.golfid === '780110-015') {
								//console.log(team._id,hometeam)
									if(team._id === hometeam || userinfo.golfid === '780110-015') {
																
									this.authorized = true;
									//show legend modal if no scores yet
									if (response.data.scorecard[0].holes[0].strokes === 0 && !this.viewedInModal) {
										
										this.$bvModal.show('modal-legend');
									}

									if (this.$route.name === "viewer") {
										this.authorized = false;
									}

									break;

								} else { //either not logged in or not auth
									if (!this.freeplay) {
										this.authorized = false;									
										this.refreshGame();
										return;
									} else { //freeplay
										this.authorized = true;
										if (response.data.scorecard[0].holes[0].strokes === 0) {
											this.$bvModal.show('modal-legend');
										}
									}
									//start function to setinterval for update
								}
						}
						
						if (!this.authorized) { //check if freeplay
						
 							if (this.freeplay) {
								
								this.authorized = true;
									if (response.data.scorecard[0].holes[0].strokes === 0) {
										this.$bvModal.show('modal-legend');
									}
							}
						}

				})
				/* .then( () => {
					console.log(this.authorized)			
					this.refreshGame();
				}) */
                .catch(error => {
                    console.log(error)
				})

				

		},
		components: {
			appScoring: ScoringVue,
			appHcpModal: HcpModalVue,
			appTieBreakModal: TieBreakModalVue,
			appGameImageGallery: AppGameImageGallery
		},
		directives: {		
			changeNanAndZero(el, bind) {				
				if (bind.value.score !== bind.value.score) {
					//el.innerHTML = "-";
					el.children[0].innerHTML = "-";
				}
				if (bind.value.score === 0) {
					//el.innerHTML = null;
					el.children[0].innerHTML = null;
				}
			},
			initials(el) {
				
				if (el.innerText.length === 3) {
					return;
				}

				let array = el.innerText.split(" ");
				if (array.length === 3) { //if extra space in name from GIT or double name
					if (array[1].length < 3) {
						array = el.innerText.split("  ");
					} else {
						array = el.innerText.split(" ");
					}					
				}

				const intialsArray = array.map(e => e.slice(0, 1));				
				
				el.innerHTML = intialsArray[0] + "." + intialsArray[1];
			},
			bold(el) {
				el.style.fontWeight = "900";
			},
				negativeToPostive(el) {					
				let number = parseFloat(el.innerHTML);
				if (number > 0) {
					return;
				}
				el.innerHTML = "+" + number * -1;
			}
		},
		data() {
			return {
				holesArr: null,
				modifiedAt: null,
				loadingprogress: 0,
				doctitle: 'Scorekort',
				uploading: false,
				progress:0,
				images: [],
				 sponsors: [					
				{
					title: 'Future IT',
					url: 'https://futureitpartner.se/',
					image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1619248516/matchplay/sponsors/future_logo.png'
				},
				{
					title: 'Scandic',
					url: 'https://www.scandichotels.se/',
					image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1614942462/matchplay/sponsors/scandic.png'
				},
					{ 
					title: 'Colburn',
					url: 'https://www.colburn.se/',
					image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1619248516/matchplay/sponsors/Logo_Colburn.png'
				},				
					{ 
					title: 'Professionell Säkerhet',
					url: 'https://professionellsakerhet.se/',
					image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1614942462/matchplay/sponsors/prosak_logo_2016.png'
				},
					{ 
					title: 'Elgiganten',
					url: 'https://elgiganten.se/',
					image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/v1614942462/matchplay/sponsors/Vinn-Elgiganten-Phonehouse.png'
				}
				
				],
				file: null,
				freeplay:false,
				holes:null,
				showfront9: true,
				showback9:true,
				active: true,
				players: [],
				activeHole: 1,
				team1: [],
				team2: [],
				overview: true,
				nameCount: [
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				],
				saveprogress: false,
				displayToast: true,
				parData: 0,
				slopedHcpPlayers: [],
				holeWinner: [],
				winnerDeclared: false,
				scoringView: false,
				indexProp: "",
				counter: 1,
				lowestScoreOnHole: [],
				modalVisible: false,
				slopeHandicapList: [],
				dormy1: "",
				dormy2: "",
				lowestSingleScoreOnHole: [],
				tieBreak: false,
				gameID: "",
				homeTeamId: "",
				awayTeamId: "",
				winnerSent: false, 
				winningTeam: "",
				gameClosed: false, 
				hcpUnmutated: [],
				clubname:"Klubbnamn", 
				logourl:"", 
				loop: "Slinga",
				modalMounted: false, 
				overviewButtonClicked: false, 
				authorized: false, 
				status: "", 
				viewedInModal: false, 
				loadingSpinner: true, 
				updating: false,
				updatedAt: null,		
				gametime: '',		

				//Fiktiv data nedan
				course: [
					{ hole: 1, par: 5, index: 18, slag: [0, 0, 0, 0] },
					{ hole: 2, par: 3, index: 12, slag: [0, 0, 0, 0] },
					{ hole: 3, par: 3, index: 11, slag: [0, 0, 0, 0] },
					{ hole: 4, par: 4, index: 1, slag: [0, 0, 0, 0] },
					{ hole: 5, par: 4, index: 5, slag: [0, 0, 0, 0] },
					{ hole: 6, par: 5, index: 16, slag: [0, 0, 0, 0] },
					{ hole: 7, par: 4, index: 17, slag: [0, 0, 0, 0] },
					{ hole: 8, par: 3, index: 8, slag: [0, 0, 0, 0] },
					{ hole: 9, par: 4, index: 9, slag: [0, 0, 0, 0] },
					{ hole: 10, par: 3, index: 14, slag: [0, 0, 0, 0] },
					{ hole: 11, par: 4, index: 13, slag: [0, 0, 0, 0] },
					{ hole: 12, par: 3, index: 2, slag: [0, 0, 0, 0] },
					{ hole: 13, par: 4, index: 6, slag: [0, 0, 0, 0] },
					{ hole: 14, par: 3, index: 3, slag: [0, 0, 0, 0] },
					{ hole: 15, par: 5, index: 7, slag: [0, 0, 0, 0] },
					{ hole: 16, par: 3, index: 10, slag: [0, 0, 0, 0] },
					{ hole: 17, par: 4, index: 15, slag: [0, 0, 0, 0] },
					{ hole: 18, par: 3, index: 4, slag: [0, 0, 0, 0] }
				],

				//OBS! används som exempel i HCP-Modal
				 courseRating: 69.9,
				 slopeRating: 129,
				 banansPar: 70
			};
		},

		computed: {
			testLimited() {
				let randoms = this.shuffle(this.sponsors);
				return randoms.slice(0, 1)
			},
			 testRandom() {
				return this.shuffle(this.sponsors)
			},
			setTieBreak() {
				let tieBreak = false;
				if (this.tie === true && this.holesLeft < 1) {
					tieBreak = true;
				}
				return tieBreak;
			},
			singelHoleTeamWinner() {
				if (singleHoleWinner < 0) {
				}
				this.players;
			},
			currentStrokesList() {
				let strokesList = [];
				let strokes = [];
				this.players.forEach(holes => {
					holes.holes.forEach(hole => {
						strokesList.push(hole);
					});
				});
				strokesList.forEach(hole => {
					if (hole.hole === this.activeHole) {
						strokes.push(hole.strokes);
					}
				});

				return strokes;
			},

			holesLeft() {
				const { totalWins1, totalWins2, draws } = this.totalHoleWins();
				const holesPlayed = totalWins1 + totalWins2 + draws;
				const holesLeft = 18 - holesPlayed;
				return holesLeft;
			},
			totalWins() {
				const { totalWins1, totalWins2, draws } = this.totalHoleWins();

				return { totalWins1, totalWins2, draws };
			},
			winner() {
				const { totalWins1, totalWins2, draws } = this.totalHoleWins();

				const holesPlayed = totalWins1 + totalWins2 + draws;
				const holesLeft = 18 - holesPlayed;

				if (totalWins1 - totalWins2 > holesLeft) {
					return "TEAM 1 är vinnare", (this.winnerDeclared = true);
				}
				if (totalWins2 - totalWins1 > holesLeft) {
					return "TEAM 1 vinnare ", (this.winnerDeclared = true);
				}
				this.winnerDeclared = false;
				return null;
			},

			dormy() {
				const { totalWins1, totalWins2, draws } = this.totalHoleWins();

				const holesPlayed = totalWins1 + totalWins2 + draws;
				const holesLeft = 18 - holesPlayed;

				this.dormy2 = "";
				this.dormy1 = "";

				if (totalWins1 - totalWins2 === holesLeft) {
					this.dormy2 = ": DORMY";
					//return "TEAM 2 är dormy";
				}
				if (totalWins2 - totalWins1 === holesLeft) {
					this.dormy1 = ": DORMY";
					//return "TEAM 1 dormy";
				}

				return null;
			},

			singleHoleWinner() {
				return this.holeWinner[this.activeHole - 1];
			},
			par() {
				let par = this.course.find(e => e.hole === this.activeHole);
				return par.par;
			},
			parFirstNine() {
				const par = this.course.map(hole => hole.par);
				par.splice(9, 18);
				const parTotal = par.reduce((a, b) => a + b, 0);
				return parTotal;
			},
			parTotal() {
				const par = this.course.map(hole => hole.par);
				const parTotal = par.reduce((a, b) => a + b, 0);
				return parTotal;
			},
			index() {
				let index = this.course.find(e => e.hole === this.activeHole);
				//för att kunna skicka till Scoring.vue gör jag även detta:
				this.indexProp = index.index;
				return index.index;
			},
			playerScoreTotal() {
				const strokesTotal = [];
				let cleanedArray = [];
				const strokes = this.listOfStrokesList();

				const replaceNaN = number => (number !== number ? (number = 0) : number);

				strokes.forEach(e => {
					cleanedArray.push(e.map(replaceNaN));
				});

				cleanedArray.forEach(e => {
					strokesTotal.push(e.reduce((a, b) => a + b));
				});
				return strokesTotal;
			},
			playerScoreFrontNine() {
				const strokesTotal = [];
				let cleanedArray = [];

				const strokes = this.listOfStrokesList();
				strokes.forEach(e => e.splice(9, 18));

				const replaceNaN = number => (number !== number ? (number = 0) : number);

				strokes.forEach(e => {
					cleanedArray.push(e.map(replaceNaN));
				});

				cleanedArray.forEach(e => {
					strokesTotal.push(e.reduce((a, b) => a + b));
				});
				return strokesTotal;
			},
			playerScoreBackNine() {
				const strokesTotal = [];
				let cleanedArray = [];

				const strokes = this.listOfStrokesList();
				strokes.forEach(e => e.splice(0, 9));

				const replaceNaN = number => (number !== number ? (number = 0) : number);

				strokes.forEach(e => {
					cleanedArray.push(e.map(replaceNaN));
				});

				cleanedArray.forEach(e => {
					strokesTotal.push(e.reduce((a, b) => a + b));
				});
				return strokesTotal;
			},

			matchScore() {
				//  för att få bort ett error-meddelande när sidan laddas.
				if (this.players.length === 0) {
					return;
				}
				
				let score = 0;
				const strokes = this.listOfStrokesList();

				let slag = this.course.filter(element => element.slag);

				const getSlagPlayers = (array, index) => {
					const newArray = [];
					array.forEach(element => {
						newArray.push(element.slag[index]);
					});
					return newArray;
				};

				// slag för varje spelare.
				const slag0 = getSlagPlayers(slag, 0);
				const slag1 = getSlagPlayers(slag, 1);
				const slag2 = getSlagPlayers(slag, 2);
				const slag3 = getSlagPlayers(slag, 3);

				//Skapar enskilda poänglistor
				let strokes0SlagNotCalc = strokes.slice(0, 1);
				let strokes1SlagNotCalc = strokes.slice(1, 2);
				let strokes2SlagNotCalc = strokes.slice(2, 3);
				let strokes3SlagNotCalc = strokes.slice(3, 4);

				strokes0SlagNotCalc = strokes0SlagNotCalc[0];
				strokes1SlagNotCalc = strokes1SlagNotCalc[0];
				strokes2SlagNotCalc = strokes2SlagNotCalc[0];
				strokes3SlagNotCalc = strokes3SlagNotCalc[0];

				//tar bort slag från score. Men om score-slag är så sätter den ett tillfälligt värde som sedan tas bort.
				const subtractSlagFromScore = (scoreArray, slagArray) => {
					let newArray = [];
					scoreArray.forEach((element, index) => {
						//detta tar hand om scenariot score - slag blir 0.
						if (slagArray[index] > 0 && element - slagArray[index] === 0) {
							newArray.push(999);
						}
						//detta är scenariot med negativ score (hole in one med slag 2 eller mer).
						else if (
							element !== 0 &&
							slagArray[index] > 0 &&
							element - slagArray[index] < 0
						) {
							newArray.push(9999);
						} else {
							newArray.push(element - slagArray[index]);
						}
					});
					return newArray;
				};

				const replaceZero = number => (number <= 0 ? (number = 99) : number);
				const replaceNaN = number => (number !== number ? (number = 99) : number);
				const replaceHoleInOneWith1Slag = number =>
					number === 999 ? (number = 0.1) : number;
				const replaceHoleInOneWith2Slag = number =>
					number === 9999 ? (number = 0.01) : number;

				//lowestSingleScoreOnHole används för att marka vem lägsta score i översikten och har inget att göra med resten av uträkningen.
				this.lowestSingleScoreOnHole = [
					strokes0SlagNotCalc.map(replaceZero).map(replaceNaN),
					strokes1SlagNotCalc.map(replaceZero).map(replaceNaN),
					strokes2SlagNotCalc.map(replaceZero).map(replaceNaN),
					strokes3SlagNotCalc.map(replaceZero).map(replaceNaN)
				];
				//-------------------

				let strokes0 = subtractSlagFromScore(strokes0SlagNotCalc, slag0);
				let strokes1 = subtractSlagFromScore(strokes1SlagNotCalc, slag1);
				let strokes2 = subtractSlagFromScore(strokes2SlagNotCalc, slag2);
				let strokes3 = subtractSlagFromScore(strokes3SlagNotCalc, slag3);

				strokes0 = strokes0
					.map(replaceZero)
					.map(replaceNaN)
					.map(replaceHoleInOneWith1Slag)
					.map(replaceHoleInOneWith2Slag);
				strokes1 = strokes1
					.map(replaceZero)
					.map(replaceNaN)
					.map(replaceHoleInOneWith1Slag)
					.map(replaceHoleInOneWith2Slag);
				strokes2 = strokes2
					.map(replaceZero)
					.map(replaceNaN)
					.map(replaceHoleInOneWith1Slag)
					.map(replaceHoleInOneWith2Slag);
				strokes3 = strokes3
					.map(replaceZero)
					.map(replaceNaN)
					.map(replaceHoleInOneWith1Slag)
					.map(replaceHoleInOneWith2Slag);

				const bestStrokesTeam1 = strokes0.map((num, index) =>
					num <= strokes1[index] ? num : strokes1[index]
				);
				const bestStrokesTeam2 = strokes2.map((num, index) =>
					num <= strokes3[index] ? num : strokes3[index]
				);
				const matchScore = bestStrokesTeam1.map(
					(num, index) => num - bestStrokesTeam2[index]
				);

				//lowestScoreOnHole används för att visa vem som tog hem hålet i översikten
				this.lowestScoreOnHole = bestStrokesTeam1.map((num, index) =>
					num <= bestStrokesTeam2[index] ? num : bestStrokesTeam2[index]
				);

				//holeWinner används för att visa hålvinnare.
				this.holeWinner = matchScore;

				//POSTAR IN SCORE HÄR SÅ MAN KOMMER ÅT DET SOM UNAUTH TITTARE
				if (this.winnerDeclared && this.nameCount[this.activeHole-1].length === 5 && this.status !== "Finished") {					
					(async () => {
  						const data = {
						_id: this.gameID,
						scorecard: this.players,
						};

						const url = "https://admin.matchplay.se/methods/updateGame";
						try {
							let response = await axios.post(url, data);
						} catch (e) {
							error => console.log(error);
						}
						})()
						
				}


				matchScore.forEach(subtractedScore => {
					if (subtractedScore != 0) {
						if (subtractedScore > 0) {
							score--;
						} else {
							score++;
						}
					}
				});
				return score;
			},
			leader() {
				let leader = true;
				this.matchScore > 0 ? (leader = true) : (leader = false);
				return leader;
			},
			tie() {
				let tie = undefined;
				this.matchScore === 0 ? (tie = true) : (tie = false);
				return tie;
			}
		},
		

		beforeMount() {
			this.loadingprogress = 65;	
			this.players = [
					{
						name: "Spelare 1",
						holes: [
							{ hole: 1, strokes: 0, slag: 0 },
							{ hole: 2, strokes: 0, slag: 0 },
							{ hole: 3, strokes: 0, slag: 0 },
							{ hole: 4, strokes: 0, slag: 0 },
							{ hole: 5, strokes: 0, slag: 0 },
							{ hole: 6, strokes: 0, slag: 0 },
							{ hole: 7, strokes: 0, slag: 0 },
							{ hole: 8, strokes: 0, slag: 0 },
							{ hole: 9, strokes: 0, slag: 0 },
							{ hole: 10, strokes: 0, slag: 0 },
							{ hole: 11, strokes: 0, slag: 0 },
							{ hole: 12, strokes: 0, slag: 0 },
							{ hole: 13, strokes: 0, slag: 0 },
							{ hole: 14, strokes: 0, slag: 0 },
							{ hole: 15, strokes: 0, slag: 0 },
							{ hole: 16, strokes: 0, slag: 0 },
							{ hole: 17, strokes: 0, slag: 0 },
							{ hole: 18, strokes: 0, slag: 0 }
						],
						hcp: 0,
						tee: "svart"
					},
					{
						name: "Spelare 2",
						holes: [
							{ hole: 1, strokes: 0, slag: 0 },
							{ hole: 2, strokes: 0, slag: 0 },
							{ hole: 3, strokes: 0, slag: 0 },
							{ hole: 4, strokes: 0, slag: 0 },
							{ hole: 5, strokes: 0, slag: 0 },
							{ hole: 6, strokes: 0, slag: 0 },
							{ hole: 7, strokes: 0, slag: 0 },
							{ hole: 8, strokes: 0, slag: 0 },
							{ hole: 9, strokes: 0, slag: 0 },
							{ hole: 10, strokes: 0, slag: 0 },
							{ hole: 11, strokes: 0, slag: 0 },
							{ hole: 12, strokes: 0, slag: 0 },
							{ hole: 13, strokes: 0, slag: 0 },
							{ hole: 14, strokes: 0, slag: 0 },
							{ hole: 15, strokes: 0, slag: 0 },
							{ hole: 16, strokes: 0, slag: 0 },
							{ hole: 17, strokes: 0, slag: 0 },
							{ hole: 18, strokes: 0, slag: 0 }
						],
						hcp: 0,
						tee: "vit TEXT"
					},
					{
						name: "Spelare 3",
						holes: [
							{ hole: 1, strokes: 0 },
							{ hole: 2, strokes: 0 },
							{ hole: 3, strokes: 0, slag: 0 },
							{ hole: 4, strokes: 0, slag: 0 },
							{ hole: 5, strokes: 0, slag: 0 },
							{ hole: 6, strokes: 0, slag: 0 },
							{ hole: 7, strokes: 0, slag: 0 },
							{ hole: 8, strokes: 0, slag: 0 },
							{ hole: 9, strokes: 0, slag: 0 },
							{ hole: 10, strokes: 0, slag: 0 },
							{ hole: 11, strokes: 0, slag: 0 },
							{ hole: 12, strokes: 0, slag: 0 },
							{ hole: 13, strokes: 0, slag: 0 },
							{ hole: 14, strokes: 0, slag: 0 },
							{ hole: 15, strokes: 0, slag: 0 },
							{ hole: 16, strokes: 0, slag: 0 },
							{ hole: 17, strokes: 0, slag: 0 },
							{ hole: 18, strokes: 0, slag: 0 }
						],
						hcp: 0,
						tee: "Gul"
					},
					{
						name: "Spelare 4",
						holes: [
							{ hole: 1, strokes: 0, slag: 0 },
							{ hole: 2, strokes: 0, slag: 0 },
							{ hole: 3, strokes: 0, slag: 0 },
							{ hole: 4, strokes: 0, slag: 0 },
							{ hole: 5, strokes: 0, slag: 0 },
							{ hole: 6, strokes: 0, slag: 0 },
							{ hole: 7, strokes: 0, slag: 0 },
							{ hole: 8, strokes: 0, slag: 0 },
							{ hole: 9, strokes: 0, slag: 0 },
							{ hole: 10, strokes: 0, slag: 0 },
							{ hole: 11, strokes: 0, slag: 0 },
							{ hole: 12, strokes: 0, slag: 0 },
							{ hole: 13, strokes: 0, slag: 0 },
							{ hole: 14, strokes: 0, slag: 0 },
							{ hole: 15, strokes: 0, slag: 0 },
							{ hole: 16, strokes: 0, slag: 0 },
							{ hole: 17, strokes: 0, slag: 0 },
							{ hole: 18, strokes: 0, slag: 0 }
						],
						hcp: 0,
						tee: "Blå"
					}
				];	

			this.gameID = this.$route.query.id;
		
		
			//fixar team-namn
			this.team1 = "lag 1"; //data.gameData[0].team;
			this.team2 = "lag 2";																																																																																																																											
			

			 (async () => {
				//shcp nedan och loopen behöver datan som skapas med getGameData. Där av async/await. 
				await this.getGameData()
				//kallar på shcp-metoden. 
				this.shcp();
				this.loadingprogress = 80;	

				//uppdaterar nameCount med namn som spelaren har poäng/score inrapporterat redan på hålet. 
				let counter = -1
				this.players.forEach(player => {					
					counter++
						player.holes.forEach( (hole, index) => {	
							//gör om null till NaN
							if (hole.strokes === null ){
							 	this.players[counter].holes[index].strokes = NaN
							 }
							//lägger till namn i NamnCount i scores eller streck finns
							if (hole.strokes > 0 || hole.strokes !== hole.strokes) {
								 this.nameCount[index].push(this.players[counter].name)								
							 }
						});
					});	
				//kallar på CurrentStrokes för att makeToast ska uppdatera så att vinnar-klass sätts korrekt på teamrutorna. 
				this.currentStrokes(1)	

				//lägger till par på this.player.holes för att komma åt par under översikten
				this.players.forEach(player => {
					player.holes.forEach((hole, index) => {
						hole.par = this.course[index].par;
					});
				});
				this.loadingprogress = 90;	
				
				if (this.viewedInModal) {
					setTimeout(() => {
						this.loadingprogress = 100;	
                       this.loadingSpinner = false;                      
                      },2000);
				} else {
					this.loadingprogress = 100;	
					this.loadingSpinner = false;
				}


				//gör så att hcpmodal visas en gång när sidan hämtas men inte varje gång översiken hämtas. 
				if (this.status === "Finished") {
						this.overview = false
						setTimeout(() => {
							this.overview = true
						}, 0);
						return
				} 
				else if ((this.status === "In progress" || this.status === "Pending") && this.authorized === false) {
							this.overview = false
				  	setTimeout(() => {
							this.overview = true
				 		}, 0);
						return
				}
				else {
					this.modalMounted = true
				}

			 })()
			
		},
		watch: {
			winnerDeclared: {
				handler: function() {
					//this.sendWinner(); 
				}
			},
			
		},
		methods: {	
			setScores() {
				
			},
			 getgamedatepredict: function (updated,holesLeft,holes) {
				let nexthole = 19-holesLeft;
				let nextpar = holes[nexthole-1];
				let addmin = 12;
				//console.log('nextpar',nextpar)
				if (nextpar.par === 4) addmin = 14;
				if (nextpar.par === 5) addmin = 17;


				let gamedate2 = new Date(updated);
				var predict = moment(gamedate2);
        		predict.add(moment.duration(addmin, 'minutes'));
				return moment(predict).format("HH:mm:ss");
				//return moment(gamedate2).format("HH:mm:ss")
				//var gamedate2 = '"' + gamedate + '"' + ' ' + gametime; //return moment(gamedate2, "YYYY-MM-DD hh:mm").add(3, 'hours').fromNow();
			},
			 getgamedate: function (updated) {
				let gamedate2 = new Date(updated);
				//return moment(gamedate2, "hh:mm:ss");
				return moment(gamedate2).format("HH:mm:ss")
				//var gamedate2 = '"' + gamedate + '"' + ' ' + gametime; //return moment(gamedate2, "YYYY-MM-DD hh:mm").add(3, 'hours').fromNow();
			},
			 getLogoImage(logourl,preset) {
				 if (logourl)
				var first_url = logourl.split("/upload/").pop();           
				return 'https://res.cloudinary.com/dn3hzwewp/image/upload/' + preset + '/' + first_url;
            },
			    getImageUrl(url, stringToAdd) {
					if (!url) {
						return;
					}
					let array = url.split("upload/");
					array.splice(1, 0, "upload/" + stringToAdd + "/");
					let urlString = array.join("");
					return urlString;
					}, 
			 shuffle(o) {
				for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			},
		 handleFileUpload(){
		this.parentVue = this;
		this.uploading = true;
		this.progress = 0;
			
		var CLOUDINARY_URL = '';
		var CLOUDINARY_UPLOAD_PRESET = '';
		var base_url = '';
		var parentVue = this;

		this.file = this.$refs.file.files[0];
		
		CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dn3hzwewp/image/upload';
		CLOUDINARY_UPLOAD_PRESET = 'tveal75k';
		base_url = 'https://res.cloudinary.com/dn3hzwewp/image/upload/q_auto,w_800/';
		this.progress = 20;
		var formData = new FormData();
		formData.append('file', this.file);
		formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
		this.progress = 30;

		 fetch(CLOUDINARY_URL, {
			method: 'POST',
			body: formData
		})
    .then(function(response) {		
		
		return response.json();
		parentVue.progress = 40;
	})
    .then(function(data) {		
      //if (data.secure_url !== '') {
		  	parentVue.progress = 60;
			if (data.public_id !== '') {				
        //var uploadedFileUrl = data.secure_url;
				//console.log(data);
				var uploadedFileUrl = data.secure_url;
				parentVue.progress = 80;
				//console.log(uploadedFileUrl)

				parentVue.axios.post('https://matchplay.meteorapp.com/methods/updateGame', {           
				"_id":parentVue.gameID,	
              "imageurl": uploadedFileUrl
                         }
          )
          .then(response => {
			parentVue.progress = 100;
			parentVue.uploading = false;        
           //console.log(response)
	parentVue.$bvToast.toast("Bilden är uppladdad och kommer visas live på vår resultatsida :)", {
					title: "Bilden är uppladdad",
					autoHideDelay: 3000,
					variant: 'success',
					solid: true
				});
							
                      
           
          })
          .catch(error => {
			parentVue.progress = 0;
			parentVue.uploading = false;
            console.log(error);
          });

							
			
			
									
				
				
      }
    })


      	},
			b_mount() {
	
			//this.gameID = this.$route.query.id;
				
			//fixar team-namn
			//this.team1 = "lag 1"; //data.gameData[0].team;
			//this.team2 = "lag 2";																																																																																																																											
			
			 (async () => {
				//shcp nedan och loopen behöver datan som skapas med getGameData. Där av async/await. 
				await this.getGameData()
				//kallar på shcp-metoden. 
				this.shcp();

				//uppdaterar nameCount med namn som spelaren har poäng/score inrapporterat redan på hålet. 
				let counter = -1
				this.players.forEach(player => {
					counter++
						player.holes.forEach( (hole, index) => {	
							//gör om null till NaN
							if (hole.strokes === null ){
							 	this.players[counter].holes[index].strokes = NaN
							 }
							//lägger till namn i NamnCount i scores eller streck finns
							if (hole.strokes > 0 || hole.strokes !== hole.strokes) {
								 this.nameCount[index].push(this.players[counter].name)								
							 }
						});
					});	
				//kallar på CurrentStrokes för att makeToast ska uppdatera så att vinnar-klass sätts korrekt på teamrutorna. 
				//this.currentStrokes(1)	

				//lägger till par på this.player.holes för att komma åt par under översikten
				this.players.forEach(player => {
					player.holes.forEach((hole, index) => {
						hole.par = this.course[index].par;
					});
				});
				//this.loadingSpinner = false
				//gör så att hcpmodal visas en gång när sidan hämtas men inte varje gång översiken hämtas. 
										
					this.overview = false;							
				  	setTimeout(() => {
						this.overview = true;
						this.updating = false;					
					 }, 0);					 
					return;
				

			 })()
			
			},
			refreshGame3() {	
				this.updating = true;
				this.b_mount();
				this.updatedAt = moment().format('LTS');				
										
/* 

 (async () => {
		await this.b_mount();
				
				this.shcp();
				
				console.log(this.players[0])
			
				//test1
				
				
				//end

				this.updatedAt = moment().format('LTS');
				//console.log(this.players)
 })() */

				
			},
			allScores(hole) {
				if (!hole) return false;
				let current_hole = hole-1;
				let scores = 0;
				//check if all players has score for activehole			
				for (let i = 0; i < this.players.length; i++) {				
					//console.log('player ' + [i+1] + '=' + this.players[i].holes[current_hole].strokes);
					if (this.players[i].holes[current_hole].strokes !== 0) {
						scores++;
					}
				}
				
				if (scores === 4) { //all players has scores
					this.displayToast = false;
					return true;
				} else {
					this.displayToast = true;
					return false;
				}
				
					
			},		
			showMatch(hole) {
				if (!this.authorized) return;
				window.scroll(0, 0)
				if (hole) {
					this.activeHole = hole;
				}
				
				this.overview = !overview;
			},		
			refreshGame() {
								
				this.updatedAt = moment().format('LTS');
				//console.log('start auto update x seconds');

/*
				setInterval(() => {
					this.refreshGame3();
				}, 5000); 
				*/
				
			},
			setDormyClass (dormy) {
				if(dormy !== '' && this.setTieBreak === false) {
					return true
				} else return false
				 
			},
			hideOverview() {
				this.overviewButtonClicked === false ?	this.overview = false : null
			},
			closeGame () {
				this.$bvModal.msgBoxConfirm('Vill du avsluta matchen? Matchen kommer stängas för redigering och går ej att öppna igen.',
					 {
						title: "Avsluta mathchen",
						size: "md",
						buttonSize: "md",
						okVariant: "danger",
						okTitle: "Japp, jag är säker",
						cancelTitle: "Nej tack",
						footerClass: "p-2",
						hideHeaderClose: false,
						centered: true,
					}
					
					)
					.then(value => {
						if(value) {											
							this.gameClosed = true
						}
					})
					.catch(err => {
						// An error occurred
					})

			},
			async sendTiebreakWinner(winningTeamId) {

				const data = {
					_id: this.gameID,
					scorecard: this.players,
					status: "Finished",
					result: "",
					winner: winningTeamId
				};

				if (winningTeamId === this.homeTeamId) {
					//hometeam winner
					data.result = `${this.matchScore * -1}&${this.holesLeft}`
					this.winningTeam = `${this.players[0].name} och  ${this.players[1].name}`
				} else {
					//awayteam winner
					data.result = `${this.matchScore}&${this.holesLeft}`
					this.winningTeam = `${this.players[2].name} och  ${this.players[3].name}`
				}

				const url = "https://admin.matchplay.se/methods/updateGame";
				
			
				try {
					let response = await axios.post(url, data);
				} catch (e) {
					error => console.log(error);
				}
				this.winnerSent = true
				

			},

			async getGameData() {

				let userinfo = localStorage.getItem("userinfo");
				let temp_user_id = '';
				//if no userid in request getgamedata removes some of data in its response
				if (userinfo) {
					userinfo = JSON.parse(userinfo);
					temp_user_id = userinfo._id;
				} 				

				const url = globalState.admin_url + "getGameData";
				const gameID = {
					id: this.gameID,
					freeplay: this.freeplay,
					userid: temp_user_id
				};

				try {
					let response = await axios.post(url, gameID);
					this.clubname = response.data.clubname
					this.loop = response.data.loopname
					this.modifiedAt = response.data.modifiedAt
					this.logourl = response.data.logourl
					this.status = response.data.status
					this.course = response.data.holes;
					this.players  = response.data.scorecard
					this.homeTeamId = response.data.hometeam
					this.awayTeamId = response.data.awayteam
					this.gametime = response.data.gametime
					this.images = response.data.imagesurl
					this.holesArr = response.data.holes
                 
					const [ hcp1, hcp2, hcp3, hcp4 ] = response.data.scorecard
					this.hcpUnmutated = [ hcp1.orghcp, hcp2.orghcp, hcp3.orghcp, hcp4.orghcp ]
					
					//lägger till golf-id på this.players för att kunna använda dessa i vid uppräkning i nameCount
					const golfId = [response.data.hometeamleadergolfid, response.data.hometeammembergolfid, response.data.awayteamleadergolfid, response.data.awayteammembergolfid,   ]
					let i = 0
					for (const player of this.players) {
						player.id = golfId[i]
						i++
					}
					
					//hanterar vad som händer när man öppnar upp en stängd match
					if (response.data.status === "Finished") {
									this.gameClosed = true
									this.winnerSent = true
									this.winnerDeclared = true
								}
					if (response.data.status === "Finished") {
							if (response.data.winner === response.data.hometeam) {
								this.winningTeam = `${this.players[0].name} och  ${this.players[1].name}`

							} else {
								this.winningTeam = `${this.players[2].name} och  ${this.players[3].name}`

							}
								}
			
			

				} catch (e) {
					error => console.log(error);
				}
			},

			async sendWinner(winnerStatus) {
				
				//Sendwinner triggas så fort winnerDeclared byter värde. Så för att inte avslutade matcher 
				// ska skickas in igen som pending så retunerar funktionen om gameClosed. 
				if (!this.winnerDeclared || this.gameClosed) {
					return;	
					}						
											
				const data = {
				_id: this.gameID,
				scorecard: this.players,
				result: "",
				winner: "",
				};


				if (this.leader) {
					//hometeam winner
					data.result = `${this.matchScore}&${this.holesLeft}`
					if (this.freeplay) {
						data.winner = 'home'
					}
					else {
						data.winner = this.homeTeamId
					}					
					this.winningTeam = `${this.players[0].name} och ${this.players[1].name}`

				} else {
					//awayteam winner
					data.result = `${this.matchScore *-1}&${this.holesLeft}`
					if (this.freeplay) {
						data.winner = 'away'
					}
					else {
						data.winner = this.awayTeamId
					}	
					this.winningTeam = `${this.players[2].name} och ${this.players[3].name}`
				}
					
				//om matchen är avslutad: 
				if(winnerStatus) {
					data.status = winnerStatus
					this.winnerSent = true
				}

				const url = "https://admin.matchplay.se/methods/updateGame";
				
			
				try {
					let response = await axios.post(url, data);
					//sätter lokal status till Finished för att protokollförare inte ska kunna skicka in in progress igen genom att byta hål. 
					this.status = winnerStatus
				} catch (e) {
					error => console.log(error);
				}

			},
			async sendInProgress() {
				if (this.nameCount[0].length < 5 || this.status === "Finished") {
					return;
				}
				
				const url = "https://admin.matchplay.se/methods/updateGame";
				const data = {
							_id: this.gameID,
							status: "In progress"
						};
				try {
					let response = await axios.post(url, data);
				} catch (error) {
					error => console.log(error);
				}
			
			},
			slagTable(playerIndex, holeIndex) {
				// skickar tillbaka slag för den spelare och hålindex man skickar in. 
				let slag = this.course.find(e => e.hole === holeIndex +1);
				return slag.slag[playerIndex];
			},
			async resetGame() {

					this.$bvModal.msgBoxConfirm('Väljer du att starta om matchen får du välja bana, slinga och tee igen. Notera att all data går förlorad från matchen med score per hål och ev. matchresultat!',
					 {
						title: "Whoops, Mulligan!",
						size: "md",
						buttonSize: "md",
						okVariant: "danger",
						okTitle: "Japp, jag är säker",
						cancelTitle: "Nej tack",
						footerClass: "p-2",
						hideHeaderClose: false,
						centered: true,
					}
					
					)
					.then(value => {
						if(value) {											
							(async () => {
								const url = "https://admin.matchplay.se/methods/updateGame";
								const data = {
											_id: this.gameID,
											status: "Pending"
										};
								try {
									let response = await axios.post(url, data);
									if (this.freeplay) {
										location.href = "creategame_free";
									} else {
										location.href = "creategame?id=" + this.gameID;
									}
								} catch (error) {
									error => console.log(error);
								}
							})()
						}
					})
					.catch(err => {
						// An error occurred
					})
			
				

			},
			valueOfLowestScoreInTeam(holeIndex,player) { //tex hål 2 och spelare 0 (1)
								
				let player_score = this.lowestSingleScoreOnHole[player][holeIndex] - this.slagTable(player, holeIndex);
												
				if (player===0) { //compare against player 2(1)					
					let compare_score = this.lowestSingleScoreOnHole[1][holeIndex] - this.slagTable(1, holeIndex);					
					if (player_score === compare_score) return true;
					if (player_score < compare_score) return true;
					if (player_score > compare_score) return false;
				}

				if (player===1) { //compare against player 1(0)					
					let compare_score = this.lowestSingleScoreOnHole[0][holeIndex] - this.slagTable(0, holeIndex);					
					if (player_score === compare_score) return true;
					if (player_score < compare_score) return true;
					if (player_score > compare_score) return false;
				}

				if (player===2) { //compare against player 4(3)					
					let compare_score = this.lowestSingleScoreOnHole[3][holeIndex] - this.slagTable(3, holeIndex);					
					if (player_score === compare_score) return true;
					if (player_score < compare_score) return true;
					if (player_score > compare_score) return false;
				}

				if (player===3) { //compare against player 3(2)					
					let compare_score = this.lowestSingleScoreOnHole[2][holeIndex] - this.slagTable(2, holeIndex);					
					if (player_score === compare_score) return true;
					if (player_score < compare_score) return true;
					if (player_score > compare_score) return false;
				}
				
				
			},
			valueOfLowestScoreOnHole(holeIndex) {
				//Om delat hål --> return
				if (this.holeWinner[holeIndex] === 0) {
					return;
				}

				//hittar minsta värdet.
				let [score0, score1, score2, score3] = this.lowestSingleScoreOnHole;

				const values = [];
				values.push(
					score0[holeIndex],
					score1[holeIndex],
					score2[holeIndex],
					score3[holeIndex]
				);

				const lowestValue = Math.min(...values);

				let counter = 0;
				for (const iterator of values) {
					iterator === lowestValue ? counter++ : null;
				}

				if (counter >= 2) {
					return;
				}

				return lowestValue;
			},
			isInWinningHoleTeam(index) {
				const winner = [];

				this.holeWinner.forEach(hole => {
					if (index === 0 || index === 1) {
						if (hole < 0) {
							winner.push(true);
						} else {
							winner.push(false);
						}
					} else {
						if (hole > 0) {
							winner.push(true);
						} else {
							winner.push(false);
						}
					}
				});

				return winner;
			},

			getInitials(name) {				
				let array = name.split(" ");

				if (array.length === 3) { //if extra space in name from GIT or double name
					if (array[1].length < 3) {
						array = name.split("  ");
					} else {
						array = name.split(" ");
					}					
				}

				const intialsArray = array.map(e => e.slice(0, 1));
				
				return (
					//name.split(" ")[0].substring(0, 1) + name.split(" ")[1].substring(0, 1)
					intialsArray[0] + "." + intialsArray[1]
				);
			},

			updateCounter(count) {
				this.counter = count;
			},
			getPar() {
				this.parData = this.course.find(e => e.hole === this.activeHole);
			},
			currentStrokes(activehole, player = { name: "lorem", id: 123 }) {
				const currentIndex = activehole - 1;

				//hål 1 får ett ingångsvärde här som de andra hålen får vid hålbyte.
				if (this.nameCount[0].length === 0) {
					this.nameCount[0].push("lorem123");
				}

				
				const { name, id } = player;

				let uniqueName = name + id;

				if (this.nameCount[currentIndex].includes(uniqueName)) {
					null;
				} else if (this.nameCount[currentIndex][name] == null) {
					this.nameCount[currentIndex].push(uniqueName);
					this.displayToast = true;
				}

				if (this.nameCount[currentIndex].length >= 5) {
					this.displayToast = false;
				} else {
					this.displayToast = true;
				}

				if (this.freeplay && this.allScores(activehole)) {
					this.displayToast = false;
				}

							},
	
			async saveData() {
				//hindrar att status byts om man öppnar sin egna avslutade match och börjar byta hål. 
				if (this.status === "Finished") {
					return;
				}

				//exit om inte alla scorer är inrapporterade
				if (!this.allScores(this.activeHole)) {					
					return;
				}

				//check network
				//console.log(window.navigator.onLine)
						
				this.saveprogress = true;
				
				const data = {
					_id: this.gameID,
					scorecard: this.players,
					result: this.matchScore,
					holesleft: this.holesLeft
				};

				const url = "https://admin.matchplay.se/methods/updateGame";				
			
				try {
					let response = await axios.post(url, data);
					this.saveprogress = false;
					
				} catch (e) {
					this.saveprogress = false;					
					error => console.log(error);					
				}

			},

			async shcp() {
				const { slopeHandicapList, newHcpPrel } = shcp(this.players);

				//detta värde bröts ut för att kunna skickas vidare till
				this.slopeHandicapList = slopeHandicapList;

				this.slopedHcpPlayers = newHcpPrel;
				const value1 = newHcpPrel[0];
				const value2 = newHcpPrel[1];
				const value3 = newHcpPrel[2];
				const value4 = newHcpPrel[3];
				this.assignSlagPerIndex(value1, 0);
				this.assignSlagPerIndex(value2, 1);
				this.assignSlagPerIndex(value3, 2);
				this.assignSlagPerIndex(value4, 3);
				const sortedByHole = this.course.sort((a, b) => a.hole - b.hole);
				this.course = sortedByHole;
			},
			assignSlagPerIndex(value, playerIndex) {
				const sortedByIndex = this.course.sort((a, b) => a.index - b.index);
				for (let i = 0; i < value; i++) {
					if (i === 18) {
						value = value - i;
						i = 0;
					}
					sortedByIndex[i].slag[playerIndex]++;
				}
				return sortedByIndex;
			},
			slag(index) {
				let slag = this.course.find(e => e.hole === this.activeHole);
				return slag.slag[index];
			},
			listOfStrokesList() {
				let listOfStrokesList = [];
				const holes = this.players.map(player => player.holes);
				holes.forEach(e => {
					listOfStrokesList.push(e.map(hole => hole.strokes));
				});

				return listOfStrokesList;
			},
			strokes(index) {
				const listOfStrokesList = this.listOfStrokesList();
				return listOfStrokesList[index];
			},
			makeToast(variant = null) {				
				
				if (this.displayToast === false) {
					return;
				}
				this.activeHole--;				
				this.$bvToast.toast("Fyll i resultat på alla spelare", {
					title: "Varning",
					autoHideDelay: 3000,
					variant: variant,
					solid: true
				});
			},
			totalHoleWins() {
				let totalWins1 = 0;
				let totalWins2 = 0;
				let draws = 0;

				this.holeWinner.forEach((winner, index) => {
					if (this.nameCount[index].length > 2 && winner === 0) {
						draws++;
					}
					if (winner < 0) {
						totalWins1++;
					}
					if (winner > 0) {
						totalWins2++;
					}
				});

				return { totalWins1, totalWins2, draws };
			}
		}
	};
</script>
<style lang="scss" scoped>

@import "../styles/variables.scss";

>>> .modal-content {
		//min-height: 590px;
		border-radius: 0;
	}

/* 	>>> .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
}

>>> .modal-body {
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
} */

.text-black {
	color:#000 !important;
}

.topimage {
	max-width:70%;
}

.topimage2 {
	max-width:100%;
}

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.inputfile + label {
	cursor: pointer; /* "hand" cursor */
}

.bg {
 background-repeat: no-repeat;

  background-position: right 0px top 50%;
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_800,q_auto,e_colorize:60,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/e_improve,w_300,h_600,c_thumb,g_auto,e_colorize:50,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
  height:calc(100vh);
  background-size: cover;
}


.bg2 {
	background:white;
}

.sponsor {
	margin-top:-15px;
}

.sponsor img {
	max-width:90%;	
}

.fa-smile {
	color:$blue;
}

#saveprogress {
	position:absolute;
	top:0;
	right:3px;
	z-index: 10000;
    color: white;
}


.pulse-button2 {
    position: relative;  
	overflow:hidden;
    border: none;
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 1);
    background-color: #dc3545 !important;   
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}


.pulse-button {  
	 box-shadow: 0 0 0 0 $orange;
    background-color: $orange !important;   
  }

	/* Scorecard figures */

	.dots {
		color:#333;
	}

	.scorecard-row td {
		font-size:1em;
		padding-top:0.7em;
		padding-bottom:0.5em;
		padding-left: 0px;
    	padding-right: 0px;
    	margin-left: 0px;
    	margin-right: 0px;
		position:relative;
	}

	.eagle {		
		border: 3px double #333;
		border-radius: 50%;
	}

	.birdie {
		border: 1px solid #333;
		border-radius: 50%;
	}

	.bogey {		
		border: 1px solid #333;
	}

	.doubleBogey {		
		border: 3px double #333;
	}

	.eagle, .birdie, .bogey, .doubleBogey {				
		border-color: #333;
		padding-top: 0.5em !important;
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.25em;
	}

	.legend .eagle, .legend .birdie, .legend .bogey, .legend .doubleBogey {				
		border-color: #333;
		padding-top: 0.20em !important;
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.20em;
		line-height:2em;
	}


	


	/*  Särspel och vinnargrejor */
	.winnerJumbotron {
		border-radius: 10px;
		background-color: #286245;
		padding: 10px;
		margin-bottom: 10px;
		-webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
		-moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
		box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
		border-radius: 10px;
		padding: 5px 10px;
	}
	.winnerJumbotron h4 {
		color: white;
	}
	.winnerJumbotron h5 {
		color: white;
	}
	.winnerJumbotron p {
		color: white;
	}

	.btn-danger {
		margin: 10px !important;
	}

	.nameOfWinner {
		color: $orange !important;
	}

	/* ------------------- */

	.container {
		/* fix for no padding on scorecard phone */
		padding-top: 0px;	
	}

	.disable-dbl-tap-zoom {
		touch-action: manipulation;
	}

	.btn-primary .material-icons {
		font-size: 1em;
		vertical-align: bottom;
		margin-bottom: 6px;
	}

	.btn-primary span {
		margin-top:3px;
	}

	.holepar {
		font-size: 0.7em;
		line-height: 0;
	}

	.nav-link:focus,
	.nav:focus {
		outline: none !important;
	}

	.tabs ul.nav-tabs:focus {
		outline: none;
	}

	.nav > li:focus {
		outline: none !important;
	}

	.form-control:focus {
		outline: none !important;
	}

	.form-control > div:focus {
		outline: none;
	}

	li:focus,
	.nav-item:focus,
	.nav-item:active {
		outline: none !important;
	}

	li[role="presentation"]:focus {
		outline: none !important;
	}

	div[role="group"]:focus {
		outline: none !important;
	}

	*:focus {
		outline: none;
	}

	/* leader board */
	.displayNamesNoAuth {		
		background-color: #e1e1e1;
		color: #000; 						
		border-radius: 5px;
		//min-height: 48px;
		font-size: clamp(
			1.1em,      /*min */
			2vw,      /*value */
			1.5em   /*max */
		);
	
	}
	.displayNamesNoAuth, p {
		margin-bottom: 3px; 
	}

	.lowerCase {
		text-transform: none;
	}

	.timeUpdated {
		font-size: 13px;
	}

	.initialsTeam1 {
		color: #fd9b37;
	}
	.initialsTeam2 {
		color: #69b3fe;
	}

	.leaderBoardStrokes {
		margin: 4px;
		background-color: white;
		color: black;
		width: 30px;
		text-align: center;
	}
	.leaderBoardPlayers {
		margin-top: 40px;
		text-align: left;
		background: #286245;
		color: white;
		border-radius: 4px;
		padding-top: 20px;
		border-bottom: black solid 1px;
	}
	.leaderBoardNames {
		margin: 4px;
		list-style-type: symbols;
	}
	.btn {
		touch-action: manipulation;
	}

	.btn-danger {
		font-size: 16px;
	}
	
	/* leader board      ---> table */

	.table9 {
		margin-top: 0
	}	

	.table9, .table18 {
		background:rgba(255,255,255,0.88)
	}

	.tableClubAndLoop{
		margin-bottom: 0;
		text-align: left;
		table-layout: fixed;
		font-size: 0.75em;
		width: 100%;
	}
	.tableClubAndLoopTd {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		border-bottom: 0;
	}

	table {
		table-layout: fixed;
		text-align: left;
		width: 100%;
		margin: 10px auto;
		/* border-collapse: inherit; */
		font-size: 12px;
	}

	th,
	td {
		border: 1px solid #ccc;
		padding:3px;
	}

	.emptyRow {
		border: none;
	}

	.tableClubAndLoop tr, .tableClubAndLoop th, .tableClubAndLoop td {
		background:none !important;
		border:none !important;
	}

	tr:nth-child(1) {
		background: #286245;
		color: white;
	}
	tr:nth-child(2) {
		background: #286245;
		color: white;
	}
	tr:nth-child(3) {
		background: #286245;
		color: white;
	}
	td {
		padding: 3px;
		text-align: center;
	}

	.showWinnerOverviewTeam1, .showWinnerOverviewTeam2 {
		//background-color: #fd9b37;	
		//background: repeating-linear-gradient(0deg, #fd9b37, #fd9b37 20px, #fff 20px, #fff 40px);
		background: #c8e3c8;
		//background: repeating-linear-gradient(45deg, #c8e3c8, #c8e3c8 10px, #fff 10px, #fff 20px)
	}

	.slagInTable {
		vertical-align: text-top;
		font-size: 0.5em;
		position: absolute;
   		bottom: 0px;
		right:2px;
	}


	/* HEADER ROW */
	.holeRow {
		margin-bottom: 15px;
		height: 70px;
		padding-top: 20px;
		//background-color: #195a3a;
		color: white;
		font-size: 20px;
	}
	.activeHole {
		border-top: 0;
		font-weight: 900;
		font-size: 1.8em;
		line-height: 1;
	}
	.par {
		float: left;
	}
	.holeRow p {
		margin-top: 15%;
	}

	/*  SCORE CARD  */
	.score {
		line-height: 2.3em;
		letter-spacing: 2px;
	}

	.holeWinner {
		background: repeating-linear-gradient(
			45deg,
			#ecf5ec,
			#ecf5ec 10px,
			#fff 10px,
			#fff 20px
		) !important;
	}
	.holeLoser {
		background: repeating-linear-gradient(
			45deg,
			#fceded,
			#fceded 10px,
			#fff 10px,
			#fff 20px
		) !important;
	}

	.hideSlag {
		display: none;
	}
	.classDisplayNone {
		display: none;
	}
	.team1ScoreCard,
	.team2ScoreCard {
		-webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
		-moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
		box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
		border-radius: 10px;
		padding: 5px 10px;
		background:rgba(255,255,255,0.9)
	}

	.team1ScoreCard {
		border-left: 7px solid #fd9b37;
	}

	.team2ScoreCard {
		border-left: 7px solid #69b3fe;
		margin-top: 13px;
	}

	.strokes {
		padding: 0px;
		font-size: 20px;
	}

	.teamColor1,
	.teamColor2 {
		display: inline-block;
		margin-left: 25px;
		height: 20px;
		width: 20px;
		margin-top: 22px;
		margin-bottom: 20px;
		border-radius: 10px;
	}

	.teamColor1 {
		border: 3px solid #fd9b37;
		/*background:#fd9b37;*/
	}

	.teamColor2 {
		border: 3px solid #69b3fe;
		/*background:#69b3fe;*/
	}

	.holeWinner .teamColor1 {
		background-color: #fd9b37;
	}

	.holeWinner .teamColor2 {
		background-color: #69b3fe;
	}

	.playerRow {
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.playerName {
		font-weight: 900;
		text-align: left;
		line-height: 16px;
		font-size: 16px;
		margin-top: 17px;
		margin-bottom: 10px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.playerNameContainer {
		overflow: hidden;
	}
	.playerInfo {
		color: #585454;
		font-size: 12px;
		margin-bottom: 5px;
		margin-top: 10px;
		text-align: left;
		line-height: 1px;
	}
	.playerInfoModal {
			//skriver över .playerIndo om scorecard visas i Modal.
			font-size: 10px;
		}
	.playerTotalScore {
		margin-top: 8px !important;
		text-align: left;
		font-size: 10px;
	}
	/* SCORE-CARD BUTTONS */
	.holeButtons {
		background: 0;
		border: 0;
		font-weight: 900;
		font-size: 25px;
	}
	#buttonLeft {
		float: left;
		color: white;
	}
	#buttonRight {
		float: right;
		color: white;
	}
	.buttons {
		margin-top: 15px;
	}
	.btn-secondary,
	.btn-success {
		/* border-radius: 50%; */
		width: 77px;
		height: 54px;
		color: white;
		font-weight: 900;
		background-color: #286245;
		border: 0;
		font-size: 25px;
	}

	.btn-success .material-icons,
	.btn-secondary .material-icons {
		font-size: 1.4em;
		margin-left: -4px;
	}

	.btn.btn-primary.active,
	.btn.btn-primary:active {
		background-color: #286245 !important;
		transform: scale(0.95) !important;
		border: 0 !important;
		border-color: #286245 !important;
	}
	.btn-secondary,
	.btn-secondary:hover,
	.btn-secondary:active,
	.btn-secondary:visited,
	.btn-secondary:focus,
	.btn-secondary:disabled {
		background-color: #286245 !important;
		color: white !important;
		border: 0 !important;
		box-shadow: 0 !important;
	}
	.btn-secondary:focus,
	.btn-secondary.focus {
		box-shadow: 0 !important;
	}
	.btn.btn-primary,
	.btn-btn-primary:disabled {
		background-color: #286245 !important;
		border-radius: 50px !important;
		box-shadow: 0 !important;
		border-color: #286245 !important;
	}
	/* LEADER SECTION  */
	.dormy {
		font-size: 0.8em;
		overflow: hidden;
	}

	.leaderSection {
		/* border-top: 1px solid #333; */
		position: fixed;
		bottom: 0;
		height: 80px;
		width: 100%;
		margin: 0;
		color:#FFF;
		//background-color: #fff;
	}
	.scoreTeam {
		font-size: 0.6em;
		color:#FFF;
	}
	.scoreTeamModal {
		//skriver over scoreTeam ovan om Scorevard öppnad i modal
		font-size: 0.6em;
	}

	.scoreTeam span {
		display: block;
	}

	.scoreTeam1 {
		background: #fd9b37;
		position: relative;
		color: #fff;
		font-weight: 900;
		line-height: 44px;
		margin-left:-1px;
		padding-bottom: 1px;
	}

	.scoreTeam2 {
		background: #69b3fe;
		position: relative;
		color: #fff;
		font-weight: 900;
		line-height: 44px;
		padding-bottom: 1px;
	}

	.leaderTeam1 {
		/*  background-color: #fd9b37;
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			  border: 1px #fd9b37 solid; */
		background-color: #fff;
		width: 20px;
		padding: 0;
		border: 0;
	}
	.leaderTeam2 {
		/* background-color: #69b3fe;
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																				  border: 1px #69b3fe solid; */
		background-color: #fff;
		width: 20px;
		padding: 0;
		border: 0;
	}
	.scoreTeam1.scoreTeam2,
	p {
		font-size: 0.7em;
		/* text-overflow: ellipsis;
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							  white-space: nowrap;
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							  overflow: hidden; */
	}

	.leaderTeam1 h4 {
		line-height: 3.3;
	}
	.leaderTeam2 h4 {
		line-height: 3.3;
	}
	.leaderLeft {
		text-align: right;
		background: #69b3fe;
		color: #fff;
		font-size: 1.1em;
		border-top-left-radius:3px;
		border-bottom-left-radius:3px;
		
	}
	.leaderRight {
		text-align: left;
		background: #fd9b37;
		position: relative;
		color: #fff;
		font-weight: 900;
		color: #fff;
		font-size: 1.1em;
		margin-left:-1px;
	}

	.leaderRight::after {
		content: "";
		position: absolute;
		left: 100%;
		width: 0;
		height: 0;
		border-top: 22px solid transparent;
		border-bottom: 22px solid transparent;
		border-left: 22px solid #fd9b37;
		clear: both;
	}

	.leaderLeft::before {
		content: "";
		position: absolute;
		right: 99%;
		width: 0;
		height: 0;
		border-top: 22px solid transparent;
		border-bottom: 22px solid transparent;
		border-right: 22px solid #69b3fe;
		clear: both;
	}

	.winnerdeclared::before,
	.winnerdeclared::after {
		content: none;
	}

	#tie {
		font-size: 1em;
		color:#FFF;
	}
	.tie {
		//background: #fff;
	}

	.tie::before,
	.tie::after {
		content: "" !important;
	}

	#landscape {
		//height: calc(100vh + 100%);
		//height: calc(100vh);
		//min-height: calc(100vh);
	}

	.extraheight {
		height: calc(200vh) !important;
	}

	.extraheight2 {
		height: calc(140vh) !important;
	}

	table {
    border-collapse: collapse;
  //border-radius: 0.4em;
  overflow: hidden;
}


@media only screen and (max-width: 375px) {
	// iphone 6 och 7		
	.scoreTeamDormy {
			font-size: 0.6em !important; 
		
	}	
	.bottombuttonsModal {
	///skriver över bottombuttons omm visas som modal	
		font-size: 14px;
	}
}
	
@media only screen and (max-width: 352px) {
		/* iphone 5/se */

		.btn.btn-primary {
			
			font-size: 12px;
		}
		
		.material-icons {
			font-size: 15px !important;
		}

		.playerInfo {
			font-size: 0.6em;;
		}
		
	}

	@media only screen and (max-width: 330px) {
		/* iphone 5/se */

		#landscape {
			min-height: calc(100vh);
		}

		.buttons .btn {
			width: 30px;
			height: 30px;
		}

		.btn.btn-secondary {
			font-size: 1.3em;
			margin-left: -7px;
			margin-bottom: 3px;
		}
		
		.material-icons {
			font-size: 14px !important;
		}

		.playerInfo {
			font-size: 0.5em;
		}
		.playerInfoModal {
			//skriver över .playerIndo om scorecard visas i Modal.
			font-size: 6px;
		}

		.bottombuttons {
			font-size: 0.7em;
		}
		.bottombuttonsModal {
			///skriver över bottombuttons omm visas som modal	
			font-size: 9px !important;
		}
		.scoreTeamModal {
		//skriver over scoreTeam ovan om Scorevard öppnad i modal
			font-size: 0.5em;
		}

	

		//sätter höger-pilen lite längre högerut på iphone5
		.rightArrowCol {
			padding: 0 !important; 
		}
	
		#nextHole {
			font-size: 13px;
		}
		table {
			table-layout: fixed;
    		font-size: 8px;
		}

		.holeparModal {
			///skriver över holepar omm visas som modal	
			font-size: 13px;
		}
		
	
	}


</style>

