<template>
	<div>
		<b-modal no-fade ref="1" id="modal-1" ok-only>
			<button class="btn btn-success" @click="prevModal()">prev</button>
			<button class="btn btn-success" @click="nextModal()">next</button>

			<div v-for="(player, index) in players.slice(0, 1)" :key="player.index">
				<h1>{{ player.name }}</h1>
				<p>Hål: {{activehole}} Par: {{par}}</p>
				<p>Index: {{indexProp}}</p>
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
                      sendScore(player)
                  "
								>1</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player)
                  "
								>2</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
                  "
								>8</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player)
                  "
								>9</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = NaN) : null,
                      sendScore(player)
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
                      sendScore(player)
                  "
								>1</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player)
                  "
								>2</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
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
                      sendScore(player)
                  "
								>8</button>
								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player)
                  "
								>9</button>

								<button
									class="btn btn-warning"
									@click="
                    holes.hole === activehole ? (holes.strokes = NaN) : null,
                      sendScore(player)
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
		props: ["players", "activehole", "active", "par", "indexProp"],
		data() {
			return {
				counter: 1,
				indexHej: ""
			};
		},
		computed: {},
		methods: {
			sendScore(...args) {
				this.$emit("sendScore", args);
			},
			prevModal() {
				if (this.counter === 1) {
					return;
				}
				this.counter === 2
					? (this.$refs["2"].hide(), this.$refs["1"].show(), this.counter--)
					: null;
			},
			nextModal() {
				this.counter === 1
					? (this.$refs["1"].hide(), this.$refs["2"].show(), this.counter++)
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
