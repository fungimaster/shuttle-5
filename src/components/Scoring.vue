<template>
	<div>
		<b-modal no-fade ref="1" id="modal-1" ok-only>
			<button class="btn btn-success" @click="prevModal">prev</button>
			<button class="btn btn-success" @click="nextModal">next</button>

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

					<b-container>
						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 1) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>1</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player, activehole);
                    nextModal();
                  "
								>2</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 3 ? "Par" : null }}
									{{ par - 1 === 3 ? "Birdie" : null }}
									{{ par + 1 === 3 ? "Bogey" : null }}
									3
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 4) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 4 ? "par" : null }}
									{{ par - 1 === 4 ? "Birdie" : null }}
									{{ par + 1 === 4 ? "Bogey" : null }}
									{{ par + 2 === 4 ? "Double Bogey" : null }}
									4
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 5) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 5 ? "par" : null }}
									{{ par - 1 === 5 ? "Birdie" : null }}
									{{ par + 1 === 5 ? "Bogey" : null }}
									{{ par + 2 === 5 ? "Double Bogey" : null }}
									5
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 6) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 6 ? "par" : null }}
									{{ par - 1 === 6 ? "Birdie" : null }}
									{{ par + 1 === 6 ? "Bogey" : null }}
									{{ par + 2 === 6 ? "Double Bogey" : null }}
									6
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 7) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 7 ? "par" : null }}
									{{ par - 1 === 7 ? "Birdie" : null }}
									{{ par + 1 === 7 ? "Bogey" : null }}
									{{ par + 2 === 7 ? "Double Bogey" : null }}
									7
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 8) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>8</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>9</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = NaN) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>-/0</button>
							</b-col>
						</b-row>
					</b-container>
				</div>
			</div>
		</b-modal>

		<!-- SPELARE 2 -->

		<b-modal no-fade ref="2" id="modal-2" ok-only>
			<button class="btn btn-success" @click="prevModal()">prev</button>
			<button class="btn btn-success" @click="nextModal()">next</button>
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

					<b-container>
						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 1) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>1</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>2</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 3 ? "Par" : null }}
									{{ par - 1 === 3 ? "Birdie" : null }}
									{{ par + 1 === 3 ? "Bogey" : null }}
									3
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 4) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 4 ? "par" : null }}
									{{ par - 1 === 4 ? "Birdie" : null }}
									{{ par + 1 === 4 ? "Bogey" : null }}
									{{ par + 2 === 4 ? "Double Bogey" : null }}
									4
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 5) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 5 ? "par" : null }}
									{{ par - 1 === 5 ? "Birdie" : null }}
									{{ par + 1 === 5 ? "Bogey" : null }}
									{{ par + 2 === 5 ? "Double Bogey" : null }}
									5
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 6) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 6 ? "par" : null }}
									{{ par - 1 === 6 ? "Birdie" : null }}
									{{ par + 1 === 6 ? "Bogey" : null }}
									{{ par + 2 === 6 ? "Double Bogey" : null }}
									6
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 7) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 7 ? "par" : null }}
									{{ par - 1 === 7 ? "Birdie" : null }}
									{{ par + 1 === 7 ? "Bogey" : null }}
									{{ par + 2 === 7 ? "Double Bogey" : null }}
									7
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 8) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>8</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>9</button>

								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = NaN) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>-/0</button>
							</b-col>
						</b-row>
					</b-container>
				</div>
			</div>
		</b-modal>

		<!--  SPELARE 3 -->

		<b-modal no-fade ref="3" id="modal-3" ok-only>
			<button class="btn btn-success" @click="prevModal()">prev</button>
			<button class="btn btn-success" @click="nextModal()">next</button>

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

					<b-container>
						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 1) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>1</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>2</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 3 ? "Par" : null }}
									{{ par - 1 === 3 ? "Birdie" : null }}
									{{ par + 1 === 3 ? "Bogey" : null }}
									3
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 4) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 4 ? "par" : null }}
									{{ par - 1 === 4 ? "Birdie" : null }}
									{{ par + 1 === 4 ? "Bogey" : null }}
									{{ par + 2 === 4 ? "Double Bogey" : null }}
									4
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 5) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 5 ? "par" : null }}
									{{ par - 1 === 5 ? "Birdie" : null }}
									{{ par + 1 === 5 ? "Bogey" : null }}
									{{ par + 2 === 5 ? "Double Bogey" : null }}
									5
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 6) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 6 ? "par" : null }}
									{{ par - 1 === 6 ? "Birdie" : null }}
									{{ par + 1 === 6 ? "Bogey" : null }}
									{{ par + 2 === 6 ? "Double Bogey" : null }}
									6
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 7) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 7 ? "par" : null }}
									{{ par - 1 === 7 ? "Birdie" : null }}
									{{ par + 1 === 7 ? "Bogey" : null }}
									{{ par + 2 === 7 ? "Double Bogey" : null }}
									7
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 8) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>8</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>9</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = NaN) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>-/0</button>
							</b-col>
						</b-row>
					</b-container>
				</div>
			</div>
		</b-modal>

		<!--  SPELARE 4 -->

		<b-modal no-fade ref="4" id="modal-4" ok-only>
			<button class="btn btn-success" @click="prevModal()">prev</button>
			<button class="btn btn-success" @click="nextModal()">next</button>

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

					<b-container>
						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 1) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>1</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>2</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 3 ? "Par" : null }}
									{{ par - 1 === 3 ? "Birdie" : null }}
									{{ par + 1 === 3 ? "Bogey" : null }}
									3
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 4) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 4 ? "par" : null }}
									{{ par - 1 === 4 ? "Birdie" : null }}
									{{ par + 1 === 4 ? "Bogey" : null }}
									{{ par + 2 === 4 ? "Double Bogey" : null }}
									4
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 5) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 5 ? "par" : null }}
									{{ par - 1 === 5 ? "Birdie" : null }}
									{{ par + 1 === 5 ? "Bogey" : null }}
									{{ par + 2 === 5 ? "Double Bogey" : null }}
									5
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 6) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 6 ? "par" : null }}
									{{ par - 1 === 6 ? "Birdie" : null }}
									{{ par + 1 === 6 ? "Bogey" : null }}
									{{ par + 2 === 6 ? "Double Bogey" : null }}
									6
								</button>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 7) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>
									{{ par === 7 ? "par" : null }}
									{{ par - 1 === 7 ? "Birdie" : null }}
									{{ par + 1 === 7 ? "Bogey" : null }}
									{{ par + 2 === 7 ? "Double Bogey" : null }}
									7
								</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 8) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>8</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>9</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = NaN) : null,
                      sendScore(player, activehole),
                      nextModal()
                  "
								>-/0</button>
							</b-col>
						</b-row>
					</b-container>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
	export default {
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
			return {};
		},
		computed: {},
		methods: {
			test() {
				console.log("hej");
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

			//BEHÖVS EN SEPARAT MEN LIKADAN METOD FÖR BYTA MODAL MED NEXT/FÖRRA KNAPP
			nextModal() {
				const currentIndex = this.activehole - 1;
				const modalStaysOpenAfterClick =
					this.nameCount[currentIndex].length === 5;

				this.counter === 4
					? (this.$refs["4"].hide(), this.updateCounter(1))
					: null;

				if (modalStaysOpenAfterClick) {
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
			}
		}
	};
</script>

<style scoped>
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
