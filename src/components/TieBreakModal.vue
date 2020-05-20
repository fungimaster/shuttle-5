<template>
	<div>
		<b-modal ref="my-modal" id="modal-tie" hide-footer>
			<b-row class="explanation">
				<b-col cols="12">
					<h1>Regler för Särspel</h1>
					<p>Om ni spelat 18 hål men inte har en vinnare, följ då dessa regler:</p>
					<p>Spela hål 1 eller hål 18 igen inom en timme. Om ingen vinnare kan utses vinner det lag med lägst HCP</p>
					<p>Slutligen glöm inte att skicka in vinnaren med en av knapparna på scorekortet</p>
					<p>
						Lycka till!
						<span class="material-icons">thumb_up</span>
					</p>
				</b-col>
			</b-row>
		</b-modal>
		<b-container>
			<b-row align-h="center">
				<b-col cols="8">
					<b-button @click="showModal" class="btn btn-warning">Regler för särspel</b-button>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	export default {
		methods: {
			showModal() {
				this.$refs["my-modal"].show();
			}
		}
	};
</script>

<style scoped>
</style>
