<template>
	<div>
		<b-container class="numpad">
			<b-row>
				<b-col cols="12">
					<!-- 1 -->
					<button
						id="btn1"
						:class="{'pressedButton':display && activeButton === 'btn1'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 1) : null, buttonActions(activehole, player, 'btn1')"
					>
					<span class="number">1</span>
					<div class="string">&nbsp;</div>
					</button>

					<!-- 2 -->
					<button
						id="btn2"
						:class="{'pressedButton':display&& activeButton === 'btn2'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 2) : null, buttonActions(activehole, player, 'btn2')"
					>
						<span class="number">2</span>
						<div class="string">
						{{ par - par === 0 ? "&nbsp;" : null }}
						{{ par - 1 === 2 ? "Birdie" : null }}
						{{ par - 2 === 2 ? "Eagle" : null }}
						</div>
					</button>

					<!--3  -->
					<button
						id="btn3"
						:class="[{'pressedButton':display && activeButton === 'btn3'}, {'par': par === 3}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 3) : null, buttonActions(activehole, player, 'btn3')"
					>
						<span class="number">3</span>
						<div class="string">
						{{ par === 3 ? "Par" : null }}
						{{ par - 2 === 3 ? "Eagle" : null }}
						{{ par - 1 === 3 ? "Birdie" : null }}
						{{ par + 1 === 3 ? "Bogey" : null }}
						</div>
						
					</button>
				</b-col>
			</b-row>

			<b-row>
				<b-col cols="12">
					<!-- 4 -->
					<button
						id="btn4"
						:class="[{'pressedButton':display&& activeButton === 'btn4'}, {'par': par === 4}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 4) : null, buttonActions(activehole, player, 'btn4')"
					>
						<span class="number">4</span>
						<div class="string">
						{{ par === 4 ? "par" : null }}
						{{ par - 1 === 4 ? "Birdie" : null }}
						{{ par + 1 === 4 ? "Bogey" : null }}
						{{ par + 2 === 4 ? "Dubbelbogey" : null }}
						</div>
						
					</button>
					<!-- 5 -->
					<button
						id="btn5"
						:class="[{'pressedButton':display&& activeButton === 'btn5'}, {'par': par === 5}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 5) : null, buttonActions(activehole, player, 'btn5')"
					>
						<span class="number">5</span>
						<div class="string">
						{{ par === 5 ? "par" : null }}
						{{ par - 1 === 5 ? "Birdie" : null }}
						{{ par + 1 === 5 ? "Bogey" : null }}
						{{ par + 2 === 5 ? "Dubbelbogey" : null }}
						</div>
						
					</button>

					<!-- 6 -->
					<button
						id="btn6"
						:class="[{'pressedButton':display&& activeButton === 'btn6'}, , {'par': par === 6}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 6) : null, buttonActions(activehole, player, 'btn6')"
					>
						<span class="number">6</span>
						<div class="string">
						{{ par === 6 ? "par" : null }}
						{{ par - 1 === 6 ? "Birdie" : null }}
						{{ par + 1 === 6 ? "Bogey" : null }}
						{{ par + 2 === 6 ? "Dubbelbogey" : null }}
						</div>
						
					</button>
				</b-col>
			</b-row>

			<b-row>
				<b-col cols="12">
					<!-- 7 -->
					<button
						id="btn7"
						:class="{'pressedButton':display&& activeButton === 'btn7'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 7) : null, buttonActions(activehole, player, 'btn7')"
					>
						<span class="number">7</span>
						<div class="string">
						{{ par === 7 ? "par" : null }}
						{{ par - 1 === 7 ? "Birdie" : null }}
						{{ par + 1 === 7 ? "Bogey" : null }}
						{{ par + 2 === 7 ? "Dubbelbogey" : null }}
						</div>
						
					</button>

					<!-- 8 -->
					<button
						id="btn8"
						:class="{'pressedButton':display&& activeButton === 'btn8'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 8) : null, buttonActions(activehole, player, 'btn8')"
					>
					<span class="number">8</span>
					<div class="string">
						&nbsp;
					</div>
					</button>

					<!-- 9 -->
					<button
						id="btn9"
						:class="{'pressedButton':display&& activeButton === 'btn9'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 9) : null, buttonActions(activehole, player, 'btn9')"
					>
					<span class="number">9</span>
					<div class="string">
						&nbsp;
					</div>
					</button>
				</b-col>
			</b-row>
			<b-row align-h="center">
				<b-col cols="12">
					<!-- 0 -->
					<button
						id="btn0"
						:class="{'pressedButton':display&& activeButton === 'btn0'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = NaN) : null, buttonActions(activehole, player, 'btn0')"
					>	<span class="number">-</span>
						<div class="string">
							Strecka hålet
						</div>
					</button>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	export default {
		props: [
			"holes",
			"player",
			"activehole",
			"active",
			"par",
			"indexProp",
			"counter",
			"nameCount"
		],
		data() {
			return {
				display: false,
				activeButton: ""
			};
		},
		methods: {
			buttonActions(activehole, player, buttonId) {
				this.activeButton = buttonId;

				this.display = true;
				setTimeout(() => {
					this.$emit("sendButtonAction", player, activehole);
					this.display = false;
				}, 100);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../styles/variables.scss";

	.numpad .col-12 {
		padding-bottom:0.4em;
	}

	.btn {
		touch-action: manipulation;
	}

	.btn-warning {
		background: $masters-green;
		border-color: $masters-green;
		color: #fff;
	}

	button {
		width: 90px;
		height: 70px;
		margin: 2px;
		font-size: 14px;
	}

	span.number {
		display:block;
		font-size:1.5em;
	}
	div.string {
		margin-top:0em;
		font-size:0.6em;
		line-height: 1.2em;
	}

	/* .par {
		border-bottom: 8px solid $pink;
	} */

	.par {
		//background: $pink;
		background: #3f9b6d;
		border:none;
	}

	.pressedButton {
		transition-property: all;
		transform: scale(0.8) 0.1s !important;

		border: 0 !important;
		background-color: #fff !important;
	}

	@media screen and (max-width: 374px) {
		.btn-warning {
			width: 85px !important;
			font-size: 13px !important;
			height: 70px !important;
		}
	}
	@media screen and (max-width: 360px) {
		.btn-warning {
			width: 80px !important;
			font-size: 13px !important;
			height: 70px !important;
		}
	}
	@media screen and (max-width: 344px) {
		.btn-warning {
			width: 72px !important;
			font-size: 12px !important;
			height: 62px !important;
		}
	}
	@media screen and (max-width: 320px) {
		.btn-warning {
			width: 70px !important;
			font-size: 11px !important;
			height: 60px !important;
		}
	}
</style>