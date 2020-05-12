<template>
	<div>
		<b-container>
			<b-row>
				<b-col cols="12">
					<!-- 1 -->
					<button
						id="btn1"
						:class="{'pressedButton':display && activeButton === 'btn1'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 1) : null, buttonActions(player, activehole, 'btn1')"
					>1</button>

					<!-- 2 -->
					<button
						id="btn2"
						:class="{'pressedButton':display&& activeButton === 'btn2'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 2) : null, buttonActions(player, activehole, 'btn2')"
					>
						{{ par - 1 === 2 ? "Birdie" : null }}
						2
					</button>

					<!--3  -->
					<button
						id="btn3"
						:class="[{'pressedButton':display && activeButton === 'btn3'}, {'par': par === 3}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 3) : null, buttonActions(player, activehole, 'btn3')"
					>
						{{ par === 3 ? "Par" : null }}
						{{ par - 1 === 3 ? "Birdie" : null }}
						{{ par + 1 === 3 ? "Bogey" : null }}
						3
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
						@click="holes.hole === activehole ? (holes.strokes = 4) : null, buttonActions(player, activehole, 'btn4')"
					>
						{{ par === 4 ? "par" : null }}
						{{ par - 1 === 4 ? "Birdie" : null }}
						{{ par + 1 === 4 ? "Bogey" : null }}
						{{ par + 2 === 4 ? "Double Bogey" : null }}
						4
					</button>
					<!-- 5 -->
					<button
						id="btn5"
						:class="[{'pressedButton':display&& activeButton === 'btn5'}, {'par': par === 5}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 5) : null, buttonActions(player, activehole, 'btn5')"
					>
						{{ par === 5 ? "par" : null }}
						{{ par - 1 === 5 ? "Birdie" : null }}
						{{ par + 1 === 5 ? "Bogey" : null }}
						{{ par + 2 === 5 ? "Double Bogey" : null }}
						5
					</button>

					<!-- 6 -->
					<button
						id="btn6"
						:class="[{'pressedButton':display&& activeButton === 'btn6'}, , {'par': par === 6}]"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 6) : null, buttonActions(player, activehole, 'btn6')"
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
				<b-col cols="12">
					<!-- 7 -->
					<button
						id="btn7"
						:class="{'pressedButton':display&& activeButton === 'btn7'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 7) : null, buttonActions(player, activehole, 'btn7')"
					>
						{{ par === 7 ? "par" : null }}
						{{ par - 1 === 7 ? "Birdie" : null }}
						{{ par + 1 === 7 ? "Bogey" : null }}
						{{ par + 2 === 7 ? "Double Bogey" : null }}
						7
					</button>

					<!-- 8 -->
					<button
						id="btn8"
						:class="{'pressedButton':display&& activeButton === 'btn8'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 8) : null, buttonActions(player, activehole, 'btn8')"
					>8</button>

					<!-- 9 -->
					<button
						id="btn9"
						:class="{'pressedButton':display&& activeButton === 'btn9'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = 9) : null, buttonActions(player, activehole, 'btn9')"
					>9</button>
				</b-col>
			</b-row>
			<b-row align-self="center">
				<b-col cols="4">
					<!-- 0 -->
					<button
						id="btn0"
						:class="{'pressedButton':display&& activeButton === 'btn0'}"
						class="pb-2 btn btn-warning"
						@click="holes.hole === activehole ? (holes.strokes = NaN) : null, buttonActions(player, activehole, 'btn0')"
					>-/0</button>
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
			buttonActions(player, activehole, buttonId) {
				this.activeButton = buttonId;
				this.display = true;
				setTimeout(() => {
					this.display = false;
				}, 200);
				this.$emit("sendButtonAction", player, activehole);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../styles/variables.scss";

	.btn-warning {
		background: $masters-green;
		border-color: $masters-green;
		color: #fff;
	}

	button {
		width: 90px;
		height: 60px;
		margin: 2px;
		font-size: 14px;
	}
	.par {
		border-bottom: 8px solid $pink;
	}

	.pressedButton {
		transition-property: all;
		transition-property: transform;
		transform: scale(0.8) !important;
		border: 0 !important;
		background-color: #fff !important;
	}

	@media screen and (max-width: 320px) {
		button {
			width: 70px !important;
			font-size: 10px !important;
			height: 50px !important;
		}
	}
</style>