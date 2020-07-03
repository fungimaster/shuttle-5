<template>
	<div>
		<div v-if="loadingSpinner"  class="text-center min-vh-100">
	 		<b-spinner big type="grow" class="align-items-center m-5" style="width: 5rem; height: 5rem;"></b-spinner>
		</div>

		<b-container class  v-if="!loadingSpinner">
			<b-row class="justify-content-center" align-h="center">
				<b-col md="6" class="p-0">
					<b-container class v-if="!overview" id="landscape">
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
						<app-tie-break-modal v-if="setTieBreak && !gameClosed"></app-tie-break-modal>

						<b-row align-v="center" align-h="center">
							<b-col cols="6">
								<button
									@click="sendTiebreakWinner(homeTeamId)"
									v-if="setTieBreak && !gameClosed"
									class="btn btn-danger disable-dbl-tap-zoom"
								>
									VINNARE:
									<br />
									{{this.players[0].name}} &
									{{this.players[1].name}}
									<br />
									<br />Skicka
									<i class="material-icons pb-1 pr-1">send</i>
								</button>
							</b-col>

							<b-col cols="6">
								<button
									@click="sendTiebreakWinner(awayTeamId)"
									v-if="setTieBreak && !gameClosed"
									class="btn btn-danger disable-dbl-tap-zoom"
								>
									VINNARE:
									<br />
									{{this.players[2].name}} & {{this.players[3].name}}
									<br />
									<br />Skicka
									<i class="material-icons pb-1 pr-1">send</i>
								</button>
							</b-col>

							<!-- TIE_BREAK: Avslutad ej stängd -->
						</b-row>

						<b-row align-h="center">
							<b-col cols="11 text-center p-2" v-if="winnerSent && !gameClosed" class="winnerJumbotron">
								<p>
									Resultat inskickat
									<i class="material-icons pb-1 pr-1">send</i>
								</p>
								<p>
									{{winningTeam}}
									<i class="material-icons pb-1 pr-1">emoji_events</i>
								</p>

								<h5 >Avsluta matchen för att låsa för redigering</h5>
							</b-col>
						</b-row>

						<!-- TIE_BREAK: Avslutad och stängd -->
						<b-row align-h="center">
							<b-col cols="11 text-center p-2" v-if="winnerSent && gameClosed" class="winnerJumbotron">
								<p>
									Resultat inskickat
									<i class="material-icons pb-1 pr-1">send</i>
								</br>
									Match avslutad
									<i class="material-icons pb-1 pr-1">done</i>
								</br>
									<span class="nameOfWinner">Vinnare: {{winningTeam}}
									<i class="material-icons pb-1 pr-1">emoji_events</i> </span>
								</p>
							</b-col>
							<b-col cols="6 p-2">
						 		<router-link to="/mymatchplay" v-if="winnerSent && gameClosed">
									<button class="btn btn-warning disable-dbl-tap-zoom ">
										MATCHER <i class="far fa-golf-club mr-2"></i> 
									</button>
								 </router-link> 
							</b-col>
						</b-row>

					

						<b-row align-v="center" align-h="center">
							<button
								:disabled="winnerSent === false"
								v-if="setTieBreak && !gameClosed"
								@click="sendWinner('Finished'), closeGame()"
								class="btn btn-danger disable-dbl-tap-zoom"
							>Avsluta matchen</button>

							<!--  STÄNGA MATCH EJ SÄRSPEL  -->

							<button
								v-if="winnerDeclared && !gameClosed"
								@click="winnerDeclared = true,  sendWinner('Finished'), closeGame()"
								class="btn btn-danger disable-dbl-tap-zoom"
							>Avsluta matchen</button>
						</b-row>

						<!-- SÄRSPEL SLUT -->

						<!-- TEAM 1 CONTAINER -->
						<div
							class="team1ScoreCard"
							:class="[
            singleHoleWinner < 0 && displayToast === false ? 'holeWinner' : '',
            singleHoleWinner > 0 && displayToast === false ? 'holeLoser' : ''
          ]"
						>
							<div v-for="(player, index) in players.slice(0, 2)" :key="player.index">
								<!--  SLAG OCH HCP TEAM 1 -->

								<b-row class="playerRow">
									<div class="teamColor1"></div>
									<b-col xs="6" class="playerNameContainer">
										<p class="playerName">{{ player.name }}</p>

										<div class="playerInfo" :class="{playerInfoModal: viewedInModal}">
											<span>SHCP {{ slopedHcpPlayers[index] }}</span>
											<span
												:class="{ hideSlag: slag(index) === 0 ? true : false }"
											>&#9642; SLAG {{ slag(index) }}</span>
										</div>
									</b-col>

									<!-- SCOREBUTTON -->
									<!-- SPELARE 1 -->
									<b-col class="text-right pr-4">
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
							class="team2ScoreCard"
							:class="[
            singleHoleWinner > 0 && displayToast === false ? 'holeWinner' : '',
            singleHoleWinner < 0 && displayToast === false ? 'holeLoser' : ''
          ]"
						>
							<div v-for="(player, index) in players.slice(2, 4)" :key="player.index">
								<!--  SLAG OCH HCP TEAM 2 -->
								<b-row class="playerRow">
									<div class="teamColor2"></div>
									<b-col xs="6" class="playerNameContainer">
										<p class="playerName">{{ player.name }}</p>

										<div class="playerInfo" :class="{playerInfoModal: viewedInModal}">
											<span>SHCP {{ slopedHcpPlayers[index + 2] }}</span>
											<span
												:class="{ hideSlag: slag(index + 2) === 0 ? true : false }"
											>&#9642; SLAG {{ slag(index + 2) }}</span>
										</div>
									</b-col>
									<!-- SCOREBUTTON -->
									<!-- SPELAR 3 -->
									<b-col b-col class="text-right pr-4">
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
						></app-scoring>

						<!-- NÄSTA HÅL & ÖVERSIKT BUTTONS -->

						<b-row class="mt-4">
							<b-col class="col-6">
								<b-button
									class="btn-md pl-3 pr-3 bottombuttons"
									:class="{bottombuttonsModal: viewedInModal}"
									variant="primary"
									@click="overview = !overview, overviewButtonClicked = true"
								>
									<span class="material-icons" v-if="!viewedInModal">reorder</span> Översikt
								</b-button>
							</b-col>
							<b-col class="col-6 text-right">
								<b-button
									v-if="activeHole < 18"
									id="nextHole"
									class="btn-md pl-3 pr-3 bottombuttons"
									:class="{bottombuttonsModal: viewedInModal}"
									variant="primary"
									@click="activeHole++, saveData(), makeToast('success'), currentStrokes(activeHole), sendInProgress()"
								>
									Nästa hål
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
								<b-col class="col-4 scoreTeam text-left pl-3" :class="[{ scoreTeam1: leader && !tie }, {scoreTeamDormy: setDormyClass(dormy2) }]">
									<span
										style="float:left;"
									>{{getInitials(players[0].name)}} & {{getInitials(players[1].name)}}</span>
									<i v-if="!tie && winnerDeclared && leader" class="material-icons pb-1 pl-1">emoji_events</i>
									<span v-if="!tie && !winnerDeclared" class="dormy">{{dormy2}}</span>
								</b-col>
								<!-- score -->
								<b-col
									class="col-4 text-center score"
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
								<b-col class="col-4 scoreTeam text-right pr-3" :class="[{ scoreTeam2: !leader && !tie }, {scoreTeamDormy: setDormyClass(dormy1)}]">
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
			
				<b-row class="pt-3" align-v="center" align-h="center">
					<!-- HOME TEAM -->
					<b-col class="col-4 scoreTeam text-left pl-3" :class="[{ scoreTeam1: leader && !tie }, {scoreTeamDormy: setDormyClass(dormy2)},  {scoreTeamModal: viewedInModal}]">
						<span
							style="float:left;"
						
						>{{ players.length !== 0 ? getInitials(players[0].name): ''}} & {{players.length !== 0 ? getInitials(players[1].name) : ''}}</span>
						<i v-if="!tie && winnerDeclared && leader" class="material-icons pb-1 pl-1">emoji_events</i>
						<span v-if="!tie && !winnerDeclared" class="dormy">{{dormy2}}</span>
					</b-col>

					<!-- score -->
					<b-col
						class="col-4 text-center score"
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
					<b-col class="col-4 scoreTeam text-right pr-3" :class="[{ scoreTeam2: !leader && !tie }, {scoreTeamDormy: setDormyClass(dormy1)}, {scoreTeamModal: viewedInModal}]">
						<i v-if="!tie && winnerDeclared && !leader" class="material-icons pb-1 pr-1">emoji_events</i>
						<span
							:style="(dormy1 === '') || (setTieBreak === true) ? 'float:right' : 'float:left'"
						>{{players.length !== 0 ? getInitials(players[2].name) : ''}} & {{players.length !== 0 ? getInitials(players[3].name) : ''}}</span>
						<span style="clear:right;" v-if="!tie && !winnerDeclared" class="dormy">{{dormy1}}</span>
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
				<table class="tableClubAndLoop">
					<tr >	
						<td colspan="2" class="tableClubAndLoopTd"> {{ clubname }}: {{ loop }}</td>
					</tr>
				</table>

				<!--  TABELL HÅL 1-9 --> 
				<table class="table9">
					
					<tr>
						<th>Hål:</th>
						<td v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.hole }}</td>
					</tr>
					<tr>
						<th>Par:</th>
						<td v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.par }}</td>
					</tr>
					<tr>
						<th>Index:</th>
						<td v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.index }}</td>
					</tr>

					<!--  SPELARE 1 -->
					<tr v-for="player in players.slice(0, 1)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(0)[index]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
					>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(0, index) === 0 ? true : false }, 'slagInTable']" >{{slagTable(0, index)}}</span></td>						
					</tr>

					<!-- SPELARE 2 -->
					<tr v-for="player in players.slice(1, 2)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(1)[index]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(1, index) === 0 ? true : false }, 'slagInTable']" >{{slagTable(1, index)}}</span></td>
						
					</tr>

					<tr class="emptyRow">
						<td>
							<p></p>
						</td>
					</tr>

					<!-- SPELARE 3 -->
					<tr v-for="player in players.slice(2, 3)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(2)[index]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(2, index) === 0 ? true : false }, 'slagInTable']" >{{slagTable(2, index)}}</span></td>
					
					</tr>

					<!-- SPELARE 4 -->
					<tr v-for="player in players.slice(3, 4)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(3)[index]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(0, 9)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(3, index ) === 0 ? true : false }, 'slagInTable']" >{{slagTable(3, index)}}</span></td>
						
					</tr>
				</table>

				<!--  TABELL HÅL 10-18 -->
				<table class="table18">
					<tr>
						<th>Hål:</th>
						<td v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.hole }}</td>
						
					</tr>
					<tr>
						<th>Par:</th>
						<td v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.par }}</td>
						
					</tr>
					<tr>
						<th>Index:</th>
						<td v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.index }}</td>
					</tr>

					<!-- SPELARE 1 -->
					<tr v-for="player in players.slice(0, 1)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(0)[index + 9]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(0, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(0, index +9)}}</span></td>
					</tr>

					<!-- SPELARE 2 -->
					<tr v-for="player in players.slice(1, 2)" :key="player.index">
						<th v-initials class="initialsTeam1">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam1' : isInWinningHoleTeam(1)[index + 9]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(1, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(1, index +9)}}</span></td>		
					</tr>

					<tr class="emptyRow">
						<td>
							<p></p>
						</td>
					</tr>
					<!-- SPELARE 3 -->
					<tr v-for="player in players.slice(2, 3)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(2)[index + 9]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(2, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(2, index +9)}}</span></td>	
					</tr>

					<!-- SPELARE 4 -->
					<tr v-for="player in players.slice(3, 4)" :key="player.index">
						<th v-initials class="initialsTeam2">{{ player.name }}</th>
						<td
							:class="[{'showWinnerOverviewTeam2' : isInWinningHoleTeam(3)[index + 9]}, holes.strokes === valueOfLowestScoreOnHole(index) ? 'showLowestScore' : null]"
							v-for="(holes, index) in player.holes.slice(9, 18)"
							:key="holes.index"
							v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
						>{{ holes.strokes === 0 ? null : holes.strokes }}  <span :class="[{ hideSlag: slagTable(3, index + 9) === 0 ? true : false }, 'slagInTable']" >{{slagTable(3, index +9)}}</span></td>
					</tr>
				</table>

				<!-- BUTTON FÖR MATCH VY -->
				<b-row class="mt-4">
					<b-col class="col-5">
						<button class="btn btn-primary" @click="overview = !overview" v-if="authorized">
							<span class="material-icons">create</span>
							Match
						</button>
					</b-col>
					<b-col class="col-7 text-right" >
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
					
					<b-row class="mt-2">
						<b-col class="col-5">
						
						</b-col>
						<b-col class="col-7 text-right">
							<button v-if="authorized && (status !== 'Finished')" class="btn btn-primary" @click="resetGame">
								<span class="material-icons">warning</span>
								Börja om
							</button>
						</b-col>
					</b-row>
					<b-row align-v="center" no-gutters>
						<b-col v-if="!authorized && status !== 'Finished'" cols="12">
							 <h5>QUIET <span class="lowerCase">Please! Match pågår (startade {{gametime}}) </span></h5>
							 <h5> <span class="lowerCase timeUpdated">Uppdaterad: {{updatedAt}}</span> <span v-if="updating"><b-spinner small type="grow" class="hidden ml-2 mr-1 mb-1 red"> </b-spinner></span></h5>
						</b-col>						

						<b-col cols="3" v-if="!authorized" v-for="{name}, index in players">
							<div class="displayNamesNoAuth">
								<p>{{name}} </p>	
								<p>SHCP: {{slopedHcpPlayers[index]}} </p>	
							</div>
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
		created() {
			this.$route.name === "viewer" ? this.viewedInModal = true : null 
            this.gameID = this.$route.query.id;
			let userinfo = localStorage.getItem("userinfo");

			//ej Inloggad
			if (!userinfo) {
				this.authorized = false
				this.refreshGame();
				return
			}

            userinfo = JSON.parse(userinfo)
            let teams = [...userinfo.teams]

            const url = "https://admin.matchplay.se/methods/getGameData";
            const gameID = {
                id: this.gameID
            };

			//hanterar om ej inloggad men någon annans scorecard
            let awayteam = ""
			let hometeam = ""
            axios.post(url, gameID)
                .then(response =>  {
                     awayteam = response.data.awayteam
                     hometeam = response.data.hometeam
                        for (const team of teams) {							
                                if(team._id === awayteam || team._id === hometeam || userinfo.golfid === '780110-015') {
									this.authorized = true
                            }
                        }

				})
				.then( () => {
					this.refreshGame() 
				})
                .catch(error => {
                    console.log(error)
				})

		},
		components: {
			appScoring: ScoringVue,
			appHcpModal: HcpModalVue,
			appTieBreakModal: TieBreakModalVue
		},
		directives: {
			changeNanAndZero(el, bind) {
				if (bind.value.score !== bind.value.score) {
					el.innerHTML = "-";
				}
				if (bind.value.score === 0) {
					el.innerHTML = null;
				}
			},
			initials(el) {
				
				if (el.innerText.length === 3) {
					return;
				}

				let array = el.innerText.split(" ");
				const intialsArray = array.map(e => e.slice(0, 1));
				el.innerHTML = intialsArray[0] + "." + intialsArray[1];
			},
			bold(el) {
				el.style.fontWeight = "900";
			},	
		},
		data() {
			return {
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
				loop: "Slinga",
				modalMounted: false, 
				overviewButtonClicked: false, 
				authorized: false, 
				status: "", 
				viewedInModal: false, 
				loadingSpinner: true, 
				updating: true, 
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
			setTieBreak() {
				let tieBreak = false;
				if (this.tie === true && this.holesLeft <= 1) {
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

			this.$store.dispatch('updateUserInfo')
			this.gameID = this.$route.query.id;
		
		
			//fixar team-namn
			this.team1 = "lag 1"; //data.gameData[0].team;
			this.team2 = "lag 2";																																																																																																																											
			

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
				//kallar på CurrentStrokes för att makeToas ska uppdatera så att vinnar-klass sätts korrekt på teamrutorna. 
				this.currentStrokes(1)	

					//lägger till par på this.player.holes för att komma åt par under översikten
				this.players.forEach(player => {
					player.holes.forEach((hole, index) => {
						hole.par = this.course[index].par;
					});
				});
				this.loadingSpinner = false
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
					this.sendWinner(); 
				}
			},
			
		},
		methods: {
			refreshGame2() {
				this.getGameData();				
			},
			refreshGame() {
								
				this.updatedAt = moment().format('LTS');

/* 				setTimeout(() => {
					if (this.status === "Finished") {
					return
					}
					if(this.authorized) {
						return
					}
					location.reload();
				}, 120000); */
				
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
				const url = "https://admin.matchplay.se/methods/getGameData";
				const gameID = {
					id: this.gameID
				};

				try {
					let response = await axios.post(url, gameID);
					this.clubname = response.data.clubname
					this.loop = response.data.loopname
					this.status = response.data.status
					this.course = response.data.holes;
					this.players  = response.data.scorecard
					this.homeTeamId = response.data.hometeam
					this.awayTeamId = response.data.awayteam
					this.gametime = response.data.gametime
                 
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
					data.winner = this.homeTeamId
					this.winningTeam = `${this.players[0].name} och  ${this.players[1].name}`

				} else {
					//awayteam winner
					data.result = `${this.matchScore *-1}&${this.holesLeft}`
					data.winner = this.awayTeamId
					this.winningTeam = `${this.players[2].name} och  ${this.players[3].name}`

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
									location.href = "creategame?id=" + this.gameID;
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
				
				return (
					name.split(" ")[0].substring(0, 1) + name.split(" ")[1].substring(0, 1)
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
			},
	
			async saveData() {
				//hindrar att status byts om man öppnar sin egna avslutade match och bröjar byta hål. 
				if (this.status === "Finished") {
					return;
				}
				
				const data = {
					_id: this.gameID,
					scorecard: this.players,
					result: this.matchScore,
					holesleft: this.holesLeft
				};

				const url = "https://admin.matchplay.se/methods/updateGame";
			
				try {
					let response = await axios.post(url, data);
					
				} catch (e) {
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
<style lang="scss"  scoped>

	@import "../styles/variables.scss";

	/*  Särspel och vinnargrejor */
	.winnerJumbotron {
		border-radius: 10px;
		background-color: #195a3a;
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
		background-color: $masters-green;
		color: white; 
		padding: 5px; 
		padding-bottom: 0;
		margin-left: 1px; 
		margin-right: 1px; 
		border-radius: 5px;
		font-size: 14px;
		min-height: 48px;
		font-size: clamp(
			14px,      /*min */
			2vw,      /*value */
			20px   /*max */
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
		background: #195a3a;
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
		font-size: 12px;
	}
	.btn-danger {
		font-size: 12px;
	}

	/* leader board      ---> table */

	.table9 {
		margin-top: 0
	}	

	.tableClubAndLoop{
		margin-bottom: 0;
		text-align: left;
		table-layout: fixed;
		font-size: 12px;
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
		margin: 25px auto;
		/* border-collapse: inherit; */
		font-size: 12px;
	}

	th,
	td {
		border: 1px solid #999;
	}

	.emptyRow {
		border: none;
	}

	tr:nth-child(1) {
		background: #195a3a;
		color: white;
	}
	tr:nth-child(2) {
		background: #195a3a;
		color: white;
	}
	tr:nth-child(3) {
		background: #195a3a;
		color: white;
	}
	td {
		padding: 3px;
		text-align: center;
	}

	.showWinnerOverviewTeam1 {
		background-color: #fd9b37;
		color: white;
	}

	.showWinnerOverviewTeam2 {
		background-color: #69b3fe;
		color: white;
	}
	.slagInTable {
		vertical-align: text-top;
		font-size: 6px;
		line-height: 6px;
		margin-left: -2px;
	}


	/* HEADER ROW */
	.holeRow {
		margin-bottom: 20px;
		height: 70px;
		padding-top: 20px;
		background-color: #195a3a;
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
		);
	}
	.holeLoser {
		background: repeating-linear-gradient(
			45deg,
			#fceded,
			#fceded 10px,
			#fff 10px,
			#fff 20px
		);
	}

	.hideSlag {
		visibility: hidden;
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
	}
	.team2ScoreCard {
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
		background-color: #195a3a;
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
		background-color: #195a3a !important;
		transform: scale(0.95) !important;
		border: 0 !important;
		border-color: #195a3a !important;
	}
	.btn-secondary,
	.btn-secondary:hover,
	.btn-secondary:active,
	.btn-secondary:visited,
	.btn-secondary:focus,
	.btn-secondary:disabled {
		background-color: #195a3a !important;
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
		background-color: #195a3a !important;
		border-radius: 50px !important;
		box-shadow: 0 !important;
		border-color: #195a3a !important;
	}
	/* LEADER SECTION  */
	.dormy {
		font-size: 7px;
		overflow: hidden;
	}

	.leaderSection {
		/* border-top: 1px solid #333; */
		position: fixed;
		bottom: 0;
		height: 80px;
		width: 100%;
		margin: 0;
		background-color: #fff;
	}
	.scoreTeam {
		font-size: 0.7em;
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
	}

	.scoreTeam2 {
		background: #69b3fe;
		position: relative;
		color: #fff;
		font-weight: 900;
		line-height: 44px;
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
	}
	.leaderRight {
		text-align: left;
		background: #fd9b37;
		position: relative;
		color: #fff;
		font-weight: 900;
		color: #fff;
		font-size: 1.1em;
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
		right: 100%;
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
	}
	.tie {
		background: #fff;
	}

	.tie::before,
	.tie::after {
		content: "" !important;
	}

	#landscape {
		height: calc(100vh + 100%);
		min-height: calc(100vh);
	}


@media only screen and (max-width: 375px) {
	// iphone 6 och 7		
	.scoreTeamDormy {
			font-size: 0.4em !important; 
		
	}	
	.bottombuttonsModal {
	///skriver över bottombuttons omm visas som modal	
		font-size: 14px;
	}
}
	
@media only screen and (max-width: 352px) {
		/* iphone 5/se */

		.btn.btn-primary {
			
			font-size: 14px;
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

