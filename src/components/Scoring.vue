6<template>
	<div>
		<!-- Spelare 1 -->
		<b-modal no-fade ref="1" id="modal-1" ok-only>
			<b-container>
				<b-row>
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
									:class="{'activePlayer': index === 0}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(0, 1)" :key="player.index">
				<h1>{{ player.name }}</h1>
				<p>Hål: {{ activehole }} Par: {{ par }}</p>
				<p>Index: {{ indexProp }}</p>

				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null
          "
				>
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 v-else class="strokes">{{ holes.strokes }}</h2>

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

		<b-modal no-fade ref="2" id="modal-2" ok-only>
			<button hidden class="btn btn-success" @click="prevModal()">prev</button>
			<button hidden class="btn btn-success" @click="nextModal()">next</button>

			<b-container>
				<b-row>
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
									:class="{'activePlayer': index === 1}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(1, 2)" :key="player.index">
				<h1>{{ player.name }}</h1>
				<p>Hål: {{ activehole }} Par: {{ par }}</p>
				<p>Index: {{ indexProp }}</p>
				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null
          "
				>
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 v-else class="strokes">{{ holes.strokes }}</h2>

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

		<b-modal no-fade ref="3" id="modal-3" ok-only>
			<button hidden class="btn btn-success" @click="prevModal()">prev</button>
			<button hidden class="btn btn-success" @click="nextModal()">next</button>

			<b-container>
				<b-row>
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
									:class="{'activePlayer': index === 2}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(2, 3)" :key="player.index">
				<h1>{{ player.name }}</h1>
				<p>Hål: {{ activehole }} Par: {{ par }}</p>
				<p>Index: {{ indexProp }}</p>
				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null
          "
				>
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 v-else class="strokes">{{ holes.strokes }}</h2>

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

		<b-modal no-fade ref="4" id="modal-4" ok-only>
			<button hidden class="btn btn-success" @click="prevModal()">prev</button>
			<button hidden class="btn btn-success" @click="nextModal()">next</button>

			<b-container>
				<b-row>
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
									:class="{'activePlayer': index === 3}"
									class="btn btn-info"
									@click="$bvModal.show(`modal-${index+1}`, $bvModal.hide(`modal-${counter}`) , updateCounter(index+1))"
								>
									<span v-initials>{{name}}</span>
									<span class="material-icons">person</span>
								</button>
							</b-col>
							<b-col cols="xs">
								<p class="overviewParagraph">{{hole.strokes}}</p>
							</b-col>
						</div>
					</div>
				</b-row>
			</b-container>

			<div v-for="(player, index) in players.slice(3, 4)" :key="player.index">
				<h1>{{ player.name }}</h1>
				<p>Hål: {{ activehole }} Par: {{ par }}</p>
				<p>Index: {{ indexProp }}</p>
				<div
					v-for="holes in player.holes"
					:key="holes.index"
					class="buttons"
					:class="
            holes.hole != activehole ? { classDisplayNone: active } : null
          "
				>
					<!-- Visar antal slag per spelare i team 1 -->
					<h2 v-if="holes.strokes !== holes.strokes">-</h2>
					<h2 v-else class="strokes">{{ holes.strokes }}</h2>

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
				const intialsArray = array.map(e => e.slice(0, 1));
				el.innerHTML = intialsArray[0] + "." + intialsArray[1];
			}
		},
		methods: {
			buttonActions(player, activehole) {
				setTimeout(() => {
					this.sendScore(player, activehole), this.nextModal();
				}, 400);
			},
			updateCounter(number) {
				this.$emit("updateCounter", number);
			},
			sendScore(player, activehole) {
				this.$emit("sendScore", player, activehole);
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

			nextModal() {
				const currentIndex = this.activehole - 1;
				const modalStaysOpenAfterClick =
					this.nameCount[currentIndex].length === 4;

				this.counter === 4
					? (this.$refs["4"].hide(), this.updateCounter(1))
					: null;

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

<style scoped>
	.activePlayer {
		background-color: #fd9b37 !important;
		border-color: #fd9b37;
	}
	.overviewParagraph {
		border-radius: 7px;
		margin: 1px;
		text-align: center;
		background-color: #19a2b82e;
	}
	.btn-info {
		height: 52px !important;
		max-width: 74px !important;
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
</style>

