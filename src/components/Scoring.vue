<template>
	<div>
		<!-- Spelare 1 -->
		<b-modal no-fade ref="1" id="modal-1" hide-footer hide-backdrop @hide="handleClose">
			<b-container>
				<b-row align-v="center" align-h="center">
					<p class>
						Hål:
						<strong>{{ activehole }}</strong>
						<i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i> Par:
						<strong>{{ par }}</strong> <i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i>
						Index:
						<strong>{{ indexProp }}</strong>
					</p>
				</b-row>
				<b-row align-v="center" align-h="center">
					<div v-for="{holes, name}, index in players">
						<div class="scoresOverview"
							v-for="hole in holes"
							:class="hole.hole != activehole ? { classDisplayNone: active } : null">
							<b-col cols="xs">
								<button
									:class="{'activePlayer': index === 0, 'btn-team1': index < 2, 'btn-team2': index > 1}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span hidden class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p v-changeNan:arguments="{score: hole.strokes}" class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(0, 1)" :key="player.index" class="text-center mt-3">
				<h2>{{ player.name }}</h2>

				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null">
					<!-- Visar antal slag per spelare i team 1 -->									
					<h2 hidden v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 hidden v-else class="strokes">{{ holes.strokes }}</h2>

					<app-numpad
						@sendButtonAction="buttonActions"
						:display="display"
						:holes="holes"
						:player="player"
						:par="par"
						:activehole="activehole"
					></app-numpad>
				</div>
			</div>
		</b-modal>

		<!-- SPELARE 2 -->

		<b-modal no-fade ref="2" id="modal-2" hide-footer hide-backdrop>
			<button hidden class="btn btn-success" @click="prevModal()">prev</button>
			<button hidden class="btn btn-success" @click="nextModal()">next</button>

			<b-container>
				<b-row align-v="center" align-h="center">
					<p class>
						Hål:
						<strong>{{ activehole }}</strong>
						<i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i> Par:
						<strong>{{ par }}</strong> <i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i>
						Index:
						<strong>{{ indexProp }}</strong>
					</p>
				</b-row>
				<b-row align-v="center" align-h="center">
					<div v-for="{holes, name}, index in players">
						<div
							class="scoresOverview"
							v-for="hole in holes"
							:class="
            hole.hole != activehole ? { classDisplayNone: active } : null
          "
						>
							<b-col cols="xs">
								<button
									:class="{'activePlayer': index === 1, 'btn-team1': index < 2, 'btn-team2': index > 1}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span hidden class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p v-changeNan:arguments="{score: hole.strokes}" class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(1, 2)" :key="player.index" class="text-center mt-3">
				<h2>{{ player.name }}</h2>

				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null">
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 hidden v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 hidden v-else class="strokes">{{ holes.strokes }}</h2>

					<app-numpad
						@sendButtonAction="buttonActions"
						:display="display"
						:holes="holes"
						:player="player"
						:par="par"
						:activehole="activehole"
					></app-numpad>
				</div>
			</div>
		</b-modal>

		<!--  SPELARE 3 -->

		<b-modal no-fade ref="3" id="modal-3" hide-footer hide-backdrop>
			<button hidden class="btn btn-success" @click="prevModal()">prev</button>
			<button hidden class="btn btn-success" @click="nextModal()">next</button>

			<b-container>
				<b-row align-v="center" align-h="center">
					<p class>
						Hål:
						<strong>{{ activehole }}</strong>
						<i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i> Par:
						<strong>{{ par }}</strong> <i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i>
						Index:
						<strong>{{ indexProp }}</strong>
					</p>
				</b-row>
				<b-row align-v="center" align-h="center">
					<div v-for="{holes, name}, index in players">
						<div
							class="scoresOverview"
							v-for="hole in holes"
							:class="
            hole.hole != activehole ? { classDisplayNone: active } : null
          "
						>
							<b-col cols="xs">
								<button
									:class="{'activePlayer': index === 2, 'btn-team1': index < 2, 'btn-team2': index > 1}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span hidden class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p v-changeNan:arguments="{score: hole.strokes}" class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(2, 3)" :key="player.index" class="text-center mt-3">
				<h2>{{ player.name }}</h2>

				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null">
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 hidden v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 hidden v-else class="strokes">{{ holes.strokes }}</h2>

					<app-numpad
						@sendButtonAction="buttonActions"
						:display="display"
						:holes="holes"
						:player="player"
						:par="par"
						:activehole="activehole"
					></app-numpad>
				</div>
			</div>
		</b-modal>

		<!--  SPELARE 4 -->

		<b-modal no-fade ref="4" id="modal-4" hide-footer hide-backdrop>
			<button hidden class="btn btn-success" @click="prevModal()">prev</button>
			<button hidden class="btn btn-success" @click="nextModal()">next</button>

			<b-container>
				<b-row align-v="center" align-h="center">
					<p class>
						Hål:
						<strong>{{ activehole }}</strong>
						<i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i> Par:
						<strong>{{ par }}</strong> <i class="fa fa-circle mb-1" style="font-size:0.3em;vertical-align:middle;"></i>
						Index:
						<strong>{{ indexProp }}</strong>
					</p>
				</b-row>
				<b-row align-v="center" align-h="center">
					<div v-for="{holes, name}, index in players">
						<div
							class="scoresOverview"
							v-for="hole in holes"
							:class="
            hole.hole != activehole ? { classDisplayNone: active } : null
          "
						>
							<b-col cols="xs">
								<button
									:class="{'activePlayer': index === 3, 'btn-team1': index < 2, 'btn-team2': index > 1}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span hidden class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p v-changeNan:arguments="{score: hole.strokes}" class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(3, 4)" :key="player.index" class="text-center mt-3">
				<h2>{{ player.name }}</h2>

				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null">
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 hidden v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 hidden v-else class="strokes">{{ holes.strokes }}</h2>

					<app-numpad
						@sendButtonAction="buttonActions"
						:display="display"
						:holes="holes"
						:player="player"
						:par="par"
						:activehole="activehole"
					></app-numpad>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
	import NumpadVue from "./Numpad.vue";

	export default {
		components: {
			appNumpad: NumpadVue
		},
		props: [
			"players",
			"activehole",
			"active",
			"par",
			"indexProp",
			"counter",
			"nameCount"
		],
		data() {
			return {
				display: false
			};
		},
		computed: {},
		directives: {
			initials(el) {
				if (el.innerText.length === 3) {
					return;
				}

				let array = el.innerText.split(" ");
				if (array.length === 3) { //if extra space in name from GIT
					array = el.innerText.split("  ");					
				}
				const intialsArray = array.map(e => e.slice(0, 1));

				el.innerHTML = intialsArray[0] + "." + intialsArray[1];
			},
			changeNan(el, bind) {
				if (bind.value.score !== bind.value.score) {
					el.innerHTML = "-";
				}
			}
		},
		methods: {
			handleClose() {
				this.$emit("close");
			},
			buttonActions(activehole, player) {
				setTimeout(() => {
					this.sendScore(activehole, player), this.nextModal();
				}, 50);
			},
			updateCounter(number) {
				this.$emit("updateCounter", number);
			},
			sendScore(player, activehole) {
				this.$emit("sendScore", activehole, player);
			},
			prevModal() {
				this.counter === 1
					? (this.$refs["1"].hide(), this.updateCounter(1))
					: null;
				this.counter === 2
					? (this.$refs["2"].hide(),
					  this.$refs["1"].show(),
					  this.updateCounter(1))
					: null;
				this.counter === 3
					? (this.$refs["3"].hide(),
					  this.$refs["2"].show(),
					  this.updateCounter(2))
					: null;
				this.counter === 4
					? (this.$refs["4"].hide(),
					  this.$refs["3"].show(),
					  this.updateCounter(3))
					: null;
			},

			//BEHÖVS EN SEPARAT MEN LIKADAN METOD FÖR BYTA MODAL MED NEXT/FÖRRA KNAPP
			nextModal() {
				const currentIndex = this.activehole - 1;
				const modalStaysOpenAfterClick =
					this.nameCount[currentIndex].length === 5;

				if (this.counter === 4) {
						this.$refs["4"].hide();
						this.updateCounter(1);
						this.handleClose();
					} else {
						null;
					}

				if (modalStaysOpenAfterClick) {
					this.counter === 1 ? this.$refs["1"].hide() : null;
					this.counter === 2 ? this.$refs["2"].hide() : null;
					this.counter === 3 ? this.$refs["3"].hide() : null;
					return;
				}

				this.counter === 1
					? (this.$refs["1"].hide(),
					  this.$refs["2"].show(),
					  this.updateCounter(2))
					: null;
				this.counter === 2
					? (this.$refs["2"].hide(),
					  this.$refs["3"].show(),
					  this.updateCounter(3))
					: null;
				this.counter === 3
					? (this.$refs["3"].hide(),
					  this.$refs["4"].show(),
					  this.updateCounter(4))
					: null;
			},
			changeModal(arg) {
				console.log(arg);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../styles/variables.scss";

	//deep-selector av bootstrap-modal inom scoped styled component
	>>> .modal-content {
		//min-height: 590px;
		border-radius: 0;
	}

	>>> .modal-dialog {
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
}


	h2 {
		font-weight: bold;
		margin-top: 1em;
	}

	.activePlayer {
		border-color: #555 !important;
		border-width:3px;
		border-style: dashed;
	}
	.overviewParagraph {
		border-radius: 7px;
		margin: 1px;
		text-align: center;
		background-color: #19a2b82e;
		padding-top: 6px;
	}
	.btn-info {
		height: 52px !important;
		max-width: 70px !important;
	}

	.classDisplayNone {
		display: none;
	}

	h1 {
		margin-top: 10px;
		text-align: left;
	}
	h2 {
		text-align: center;
	}

	button {
		width: 90px;
		height: 60px;
		margin: 2px;
		font-size: 14px;
	}

	.btn-team1 {
		background: $team1;
		border-color: $team1;	
	}

	.btn-team2 {
		background: $team2;
		border-color: $team2;
	}

	.btn-team1 .material-icons {
		color: $team1;
	}

	.btn-team2 .material-icons {
		color: $team2;
	}

	.activePlayer .material-icons {
		color: #000;
	}

	@media screen and (max-width: 374px) {
		.btn-info {
			width: 67px !important;
		}
	}

	@media screen and (max-width: 360px) {
		>>> .modal-content {
			min-height: 0;
		}
	}
	@media screen and (max-width: 334px) {
		.btn-info {
			width: 55px !important;
		}
	}
	@media screen and (max-width: 320px) {
		.btn-info {
			width: 55px !important;
		}
		>>> .modal-content {
			min-height: 0;
		}
		//krymper h2 för att knapparna sla få bli stora
		// men numpad-modalen inte blir större än fönstret
		//för att undvika "hoppighet"
		h2 {
			font-size: 15px !important;
		}
	}
</style>

