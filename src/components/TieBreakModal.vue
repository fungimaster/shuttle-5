<template>
	<div>
		<b-modal ref="my-modal" id="modal-tie" hide-footer title="Regler för Särspel">
			<b-row class="explanation">
				<b-col cols="12">					
					<p>Vid lika efter 18 hål vinner laget med lägst sammanlagd hcp.</p>
					<ul hidden>
						<li>Omspel hål 18 repetitivt tills skilje finns (alternativt hål 9 om matchen startades på hål 10)</li>
						<li>Start hål 1 (alternativt hål 10 om matchen startades där)</li>
						<li>Laget med lägst HCP inom laget utses till vinnare</li>
					</ul>
					<p>Slutligen glöm inte att skicka in vinnaren med en av knapparna på scorekortet.</p>
					<p>
						Lycka till!
						<span class="material-icons">thumb_up</span>
					</p>
				</b-col>
			</b-row>
		</b-modal>
		<b-container style="background:white;border-radius:0.25em;" class="p-3">
			<b-row align-h="center">
				<b-col class="col-8 small pt-0 pb-0 pr-1">					
					<p class="mb-0"><strong>Om matchen inte avgörs på sista hålet</strong>, måste matchen gå till särspel för att utse en vinnare, se regler på knappen brevid.</p>
				</b-col>
				<b-col class="col-4 text-right pl-0">
					<b-button @click="showModal" class="btn btn-warning btn-sm">Regler</b-button>
				</b-col>
				<b-col hidden class="col-12">
					<hr class="mt-0 mb-2" />
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
