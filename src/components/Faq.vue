<template>
	<div class="info">
		<vue-headful :title="doctitle" />

		<div class="hero">
			<b-container>
				<b-row>
					<b-col md="10">
						<h2>REGLER & ÖVRIG INFO</h2>
						<p class>All nödvändig information kring tävlingen Matchplay</p>
					</b-col>
					<b-col md="2" class></b-col>
				</b-row>
			</b-container>
		</div>

		<b-container>
			<b-row>
				<b-col xl="1"></b-col>
				<b-col class="mt-5 col-12">
					Nedan finner du all information om tävlingen samt ett antal snabblänkar till de viktigaste punkterna. Hittar du inte vad du söker efter så kontakta oss på
					<a
						href="mailto:info@matchplay.se"
					>info@matchplay.se</a>.
				</b-col>
				<b-col hidden class="mt-5 col-12">
					<h3 class="red">FAQ</h3>
					<p class="red">Vi får ofta frågor om reserver. För att välja en reserv till ditt lag går du till din lagsida och där finns en grön knapp man trycker på som heter "Välj reservspelare". Skriv in golfid till din reserv och denna kan sedan väljas som ersättare av lagkapten eller lagspelare <strong>när det är dags för match</strong> och tee mm ska väljas. Hemmalaget är ansvariga för att starta det digitala scorekortet samt välja in ev. reserv när det är dags för spel.
					</p>
				</b-col>
				<b-col class="mt-5 col-12">
					<div class="mt-3 icons-container text-center">
						<a href="#2" class>
							<i class="material-icons">assignment_turned_in</i>
							<p>Anmälan</p>
						</a>
						<a href="#3" class>
							<i class="material-icons">attach_money</i>
							<p>BETALNING</p>
						</a>
						<a href="#4" class>
							<i class="material-icons">people_alt</i>
							<p>LAG</p>
						</a>
						<a href="#5" class>
							<i class="material-icons">child_care</i>
							<p>ÅLDERSGRÄNS</p>
						</a>
						<a href="#6" class>
							<i class="material-icons">sports_golf</i>
							<p>HANDICAP</p>
						</a>
						<a href="#10" class>
							<i class="material-icons">ballot</i>
							<p>Lottning</p>
						</a>
						<a href="#19" class>
							<i class="material-icons">accessible</i>
							<p>HJÄLPMEDEL</p>
						</a>
					</div>

<div class="section first" id="1">
						<h3>LÖPANDE INFO</h3>
						<p>Matchplay är en tävling som enbart marknadsförs på sociala medier och därför är det vår största informationskanal mot alla våra deltagare. <a href="https://www.facebook.com/matchplaysweden/">Följ oss gärna</a> där för snabbast info gällande allt som rör tävlingen.
</p>
					</div>
					

					<div class="section first" id="1">
						<h3>1. REGIONER MATCHPLAY 2021</h3>
						<p>Matchplay spelas i hela Sverige. Längre resväg kan förekomma vid få registrerade lag i vissa regioner av Sverige. Värt att poängtera är att lottningen alltid sker med geografiskt utgångsläge som prioritering för minimera reslängd.</p>
					</div>

					<div class="section" id="2">
						<h3 class="pt-5">2. ANMÄLAN</h3>
						<p v-if="closed">Anmälan till årets tävling är stängd!</p>
						<p v-if="!closed">
							Ni anmäler er enkelt via hemsidan.
							<a href="/#register">Klicka här</a> för att komma dit direkt.
						</p>
					</div>

					<div class="section" id="3">
						<h3 class="pt-5">3. BETALNING</h3>
						<p>Privatlag betalar via Swish medans företagslag betalar via faktura som skickas till angiven mailadress. Priset per lag är {{price1}}:- för privatpersoner och {{price2}}:- (exkl. moms) för företag.</p>
					</div>

					<div class="section" id="4">
						<h3 class="pt-5">4. DELTAGARE/LAG</h3>
						<p>Matchplay spelas i 2-mannalag (herrlag, damlag eller mixade lag) Alla deltagare måste ha officiellt HCP. Man behöver inte vara anställd av ett företag man representerar i ett företagslag.</p>
					</div>

					<div class="section" id="5">
						<h3 class="pt-5">5. ÅLDERSGRÄNS FÖR DELTAGANDE</h3>
						<p>Båda spelarna måste fylla minst 18 år innan tävlingsstart.</p>
					</div>

					<div class="section" id="6">
						<h3 class="pt-5">6. HANDICAPGRÄNS</h3>
						<p>Officellt handicap (36.0) krävs för deltagande. Högsta HCP i matchspel är 28.0 och har laget tillsammans högre än 28.0 i hcp kommer spelarna i laget dela på reduceringen. Tex: Om spelare A har 16 i hcp och spelare B har 19 i hcp blir detta 35 sammanlagt, vilket innebär att spelare A och B får 3.5 slag färre och kommer få nytt exakt hcp på 12.5 och 15.5 som sedan slope och matchspeluträkningar baseras på. När en match påbörjas räknas allt ut automatiskt och information om uträkningen finns tillgänglig i scorekortet.</p>
					</div>

					<div class="section" id="7">
						<h3 class="pt-5">7. TÄVLINGSKLASSER 2021</h3>
						<p>Matchplay spelas i en klass.</p>
					</div>

					<div class="section" id="8">
						<h3 class="pt-5">8. SPELFORM</h3>
						<p>
							Alla matcher spelas som 4-boll, Match/Bästboll. De 2 spelarna i lagen som har bästa score på respektive hål, mäts mot varandra. Bästa score vinner hålet till laget. Är bästa score samma hos bägge lagen delas hålet.
							Efter att slopen räknats in reduceras respektive spelares HCP med 10%. De tre spelarna med högst reducerat spelhandicap får i matchen slag motsvarande skillnaden till den spelaren som har lägst spelhandicap. Spelaren med lägst reducerat spelhandicap spelar med 0 i spelhandicap. Till sist sker avrundning till närmaste heltal (uppåt vid 0.5, 1.5, 2.5 osv).
							<strong>OBS! Vårt digitala scorekort räknar ut detta till er innan match!</strong><br>
							<p class="text-center"><b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1591952386/matchplay/hcp.png"></b-img>
							</p>
						
						<p>
							De erhållna slagen för matchen gäller från index 1 och uppåt. Vi hänvisar samtidigt till SGF:s Spel- och Tävlingshandbok. Erhållna slag utdelas på samma hål som ursprungsmatchen. 
						</p>
						<br>
						<h4>Särspel</h4>
						<p>
							Vid lika efter 18 hål är det särspel enligt följande prioritering:<br><br>
							<ol>
								<li>
Omspel hål 18 repetitivt tills skilje finns (alternativt hål 9 om matchen startades på hål 10)
								</li>
								<li>
Start hål 1 (alternativt hål 10 om matchen startades där)
								</li>
								<li>
Laget med lägst HCP inom laget utses till vinnare
								</li>
							</ol>
						</p>
						<p>
							Vid omstart hål 18 (alt hål 9) så är detta om bakomvarande spel tillåter detta. Lagen ska vänta i maximalt 30 minuter efter avslutat spel för att sedan sikta på punkt 2.
Vid omstart hål 1 (alt. Hål 10) så gäller det att det finns plats såklart. Lagen ska vänta i maximalt 30 minuter för spel annars infaller punkt 3.
						</p>
					</div>

					<div class="section" id="9">
						<h3 class="pt-5">9. ANDRA CHANSEN</h3>
						<p>Alla lag i Matchplay garanteras minst två matcher. Vid förlust i första omgången hamnar man i Andra Chansen. Här har man fortfarande chansen att nå både final i Sverige och utomlands, men vägen är lite svårare. Vid omgång 5-6 (beroende på antalet anmälda lag totalt) kommer en gemensam tävling anordnas för kvarvarande lag i Andra Chansen, där de två bästa lagen tar sig till Sverigefinalen och in i huvudtävlingen igen. Tävlingsformen under denna dag kommer att vara poängbaserad.</p>
						<p>OBS! Om en match vinns eller förloras genom walk over eller lottning, så räknas även detta som spelad match.</p>

						<div class="section" id="10">
							<h3 class="pt-5">10. LOTTNING SPELSCHEMA</h3>
							<p>Lottning kommer att ske efter att registreringen stängs. Matchplay har prioriteringar i lottningen som gäller geografisk tillhörighet. Detta ger kortast möjliga resor under hela tävlingen fram mot Sverigefinalen. Dock kommer lag från samma klubb i största utsträckning som möjligt att inte ställas mot varandra.</p>
							<p class="hidden">För spelschema 2021 - klicka här.</p>
						</div>

						<div class="section" id="11">
							<h3 class="pt-5">11. SPELDAGAR</h3>
							<p>
								Från omgång ett ända fram till finalen finns tidsramar för respektive omgång. Det är av största vikt att Ni som deltagare utgår från att kunna avsätta minst en runda golf inom de veckor som omgången gäller. Ni kommer genom vårt system få all nödvändig info kring kontakten med era motståndare. Oavsett om ni är hemma- eller bortalag så ansvarar bägge lagen för att kontakt skapas och tid bokas. Kan inte lagen komma överens om lämplig tidpunkt eller bana skall lagkaptenen i det lag som har fördel av hemmabana kontakta tävlingsledningen. Ha även med er att ni kan använda er av en reserv för att lösa er match.</p><p>Reserv anmäler ni under LAGFLIKEN på din sida. Klicka på knappen "välj reserv" och följ instruktionerna. Reserven behöver anmälas INNAN matchen och scorekortet startas. Om reserv finns väljs denna in i samband med att matchen startas (görs av hemmalaget).</p>
								<p>Har man bestämt tid för spel (datum och klockslag) och något lag sedan, oberoende av orsak, vill byta tid (inom deadline för omgången) är det upp till motståndarlaget att gå med på detta. Blir man ej överens om ny tid och matchen ej spelas, vinner det lag som är berett på spel på den ursprungliga tiden - på WO.
							</p>
						</div>

						<div class="section" id="12">
							<h3 class="pt-5">12. SPELPLATSER</h3>
							<p>Vårt lottningssystem är utformat för att ge en så rättvis fördelning som möjligt sett till spelplats. De lag som hamnar överst i spelarträdet har fördel av hemmabana. Detta innebär att man kan välja sin hemmabana men kan också komma överens med motståndarna om annan bana. Lagkaptenerna i respektive lag ansvarar för att föra score för alla spelare. Eventuell greenfee under kvalomgångarna innan semifinal och final betalas av respektive lag.</p>
							<p>
								Matchen avgörs över 18 hål med ev. särspel. OBS! Endast klubbar med 18 hål kan och ska användas under spelet. Om ett (eller flera) hål på banan är avstängt hoppar man över detta hål och matchen avgörs då över de hål som är spelbara.
								Sverigefinalen spelas runt september 2021 på Allerum Golfklubb strax utanför Helsingborg. Spelformen är samma under Sverigefinalen som i grundomgången. Alla deltagare i Sverigefinalen har redan kvalificerat sig för spel nästkommande år utan kostnad. Vinnarna går vidare till finalspelet som sker utomlands (oktober 2021), på plats som meddelas januari 2021.
							</p>
						</div>

						<div class="section" id="13">
							<h3 class="pt-5">13. ERSÄTTARE/RESERV</h3>
							<p>
								I Matchplay är det okej att använda sig av en reserv.
								<p>Reserv anmäler ni under LAGFLIKEN på din sida. Klicka på knappen "välj reserv" och följ instruktionerna. Reserven behöver anmälas INNAN matchen och scorekortet startas. Om reserv finns väljs denna in i samband med att matchen startas (görs av hemmalaget).</p>
							    Är inte reserv anmäld i systemet och laget spelar med reserv kan laget bli diskvalificerat. Reservinträde skall också meddelas motståndarna innan spel, när reserv deltager i tävlingen. Man får bara använda sig av en reserv (samma person). Denna reserv kan komplettera laget vid behov under hela tävlingen. Observera att reserv inte får spela i annat deltagande lag som fortfarande är med i tävlingen. Har man åkt ur tävlingen kan och får man gå in som reserv i annat lag.
							</p>
						</div>

						<div class="section" id="14">
							<h3 class="pt-5">14. MATCHRAPPORTERING</h3>
							<p>Det är obligatoriskt att använda vårt digitala scorekort för att rapportera matchresultat. Hemmalag (kapten eller medspelare) väljer klubb/slinga/tee när matchen ska starta, rätt slope räknas ut och matchplays regler för hcp räknas ut automatiskt. Ni rapporterar in hål för hål enkelt och ser vilket lag som vinner/förlorar/delar resp. hål. Resultatet laddas kontinuerligt upp direkt till hemsidan och matchen ligger live (för andra att följa). När matchen är avgjord visas detta i det digitala scorekortet och ni skickar in resultatet. Vinnarna får meddelande när nästa lottning är gjord (ev. förlorarna också i andra chansen).</p>
							<p>Herrar spelar på vald klubbs herr tee och damer spelar på vald klubbs dam tee.</p>
						</div>

						<div class="section" id="15">
							<h3 class="pt-5">15. TÄVLINGSDOMARE</h3>
							<p>Tävlingsansvarig Mikael Gräntz finns på plats tillsammans med andra knutna till Matchplay Business under både Sverige- och utlandsfinal. Under grundspelet ansvarar alla deltagare för regler gällande matchspel. Vi finns alltid tillgängliga på telefon under tävlingstiden, så har ni frågor eller funderingar så kontakta oss direkt.</p>
						</div>

						<div class="section" id="16">
							<h3 class="pt-5">16. MINIMIANTAL</h3>
							<p>Vi utgår från att vi blir fullt tillräckligt med antal företags- och privatlag lag under 2021, men reserverar oss för händelser helt utanför vår kontroll, som kan innebära att deltagarantalet blir alldeles för litet för att genomföra tävlingen. Om detta skulle ske <strong>återbetalas</strong> hela beloppet till respektive lag samma dag beslutet tas.</p>
							<p>Då vi står helt ovetandes inför alla beslut som tas gällande <strong>Corona</strong>, så vill vi här betona garantin att om tävlingen av olika anledningar inte skulle gå eller få spelas, så <strong>återbetalas</strong> alla deltagaravgifter till 100%.</p>
						</div>

						<div class="section" id="17">
							<h3 class="pt-5">17. HANDICAP</h3>
							<p>För att spela matcher från 1 juli 2021 krävs att deltagande spelare ska ha minst 3 HCP-ronder korrekt registrerade under innevarande år i GIT innan match i tävlingen spelas. Detta gäller även reserverna. Vårt system är uppkopplat mot GIT och ni kommer att bli påminda om ej registrerade ronder om ni skulle logga in för spel och ej uppfyllt dessa kriterier. Man kan alltså inte starta spelet och logga in om detta inte efterföljs. Laget kan spela med en spelare eller ta in reserv som uppfyller kraven. Deltager spelare trots allt i matchen (använder pappers scorekort) blir laget diskvalificerat. För lag som går till Sverigefinal gäller att minst 4 HCP-ronder ska vara korrekt registrerade i GIT. Vi vill påpeka att det är varje spelares skyldighet att se till att spela på det HCP som visar spelarens normala spelstandard. Oavsett om inga handicapgrundande ronder är noterade är man som spelare skyldig att revidera sitt handicap med sin klubbs hcp-kommitté. Klubbarnas HCP-kommittéer är utredande/dömande part i ett eventuellt HCP-ärende. Matchplay följer alltid dom från berörd HCP-kommitté. Spel på ett för högt HCP innebär att laget diskvalificeras från tävlingen.</p>
						</div>

						<div class="section" id="18">
							<h3 class="pt-5">18. PROTESTER</h3>
							<p>
								Om det av någon anledning uppkommer en eller flera situationer som föranleder att ni vill lämna in en protest, så ska detta göras skriftligen via mail till
								<a
									href="mailto:info@matchplay.se"
								>info@matchplay.se</a>. Protesten måste inkomma senast dagen efter spel. Protester inkomna senare än detta kommer inte att behandlas.
							</p>
						</div>

						<div class="section" id="19">
							<h3 class="pt-5">19. HJÄLPMEDEL</h3>
							<p>I Matchplay är det tillåtet med alla på marknaden olika avståndsmätare. Utrustning för att mäta vindförhållanden är dock ej tillåtna. Golfbil är tillåtet för de som kan uppvisa läkarintyg på plats innan spel. Om bägge lagen kommer överens om att använda golfbil, oavsett läkarintyg eller ej, så är det upp till lagen själva. Om golfbil enbart används av en i laget som har läkarintyg, får medspelaren inte på något sätt använda sig av bilen under själva tävlingsspelet. Caddy är tillåten under alla omgångar i tävlingen.</p>
						</div>

						<div class="section" id="20">
							<h3 class="pt-5">20. SPELSCHEMA</h3>
							<p>Matchplay består av en ”Huvudtävling” och en ”Andra Chansen” vilka skapas efter den första omgången, där förlorarna får en andra chans att nå finalspelet. Lag och vägen från Andra Chansen till finalen kommer att vara aningens svårare, då färre lag går vidare än från Huvudtävlingen.</p>
						</div>
						<div class="section">
							<h3 class="pt-5">TÄVLINGSLEDNING / TÄVLINGSBESTÄMMELSERNA / TÄVLINGSREGLERNA</h3>
							<p>
								Alla generella tävlingsregler som gäller för Sverige och går under Svenska Golfförbundet används i Matchplay rörande Bästboll/Matchspel. Oklarheter gällande regelverket – kontakta tävlingsledningen på
								<a
									href="mailto:info@matchplay.se"
								>info@matchplay.se</a>.
							</p>
						</div>
					</div>

					<div class="section">
						<h3>Vi önskar alla deltagande lag lycka till och varmt välkomna till tävlingen!</h3>
						<p>
							Hittar du inte den information du söker kontakta oss på:
							<a
								href="mailto:info@matchplay.se"
							>info@matchplay.se</a>
						</p>
						<div class="mt-5 video-container">
							<iframe
								src="https://www.youtube.com/embed/SLk3r_sbdg0"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						</div>
					</div>
				</b-col>
				<b-col xl="1"></b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
  import { globalState } from "../main.js";

  export default {
    name: 'faq',
    data () {
      return {
	  closed:false,
	  price1: globalState.price1,
	  price2: globalState.price2,
	  price3: globalState.price3,
      doctitle: 'Info - ' + this.$store.state.conferencename
      }
    },
 
    //mixins: [tagsMixin]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "../styles/variables.scss";

	.hero {
		background: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_2390/v1572963227/matchplay/matchplay_bg.jpg");

		background-repeat: no-repeat;
		/*background-position: bottom 30% right 0;*/
		background-size: cover;
		color: #fff;
		padding: 180px 0 180px 0;
		background-position: right 0px top 0px;
		@media (min-width: 320px) {
			padding: 12rem 0 5rem 0;
			/*background-position: bottom 10% right 0;*/
		}
		@media (min-width: 480px) {
			padding: 8rem 0 8rem 0;
			/*background-position: bottom 0% right 0;*/
		}
		@media (min-width: 768px) {
			/*background-position: bottom 32% right 0;*/
		}

		@media (min-width: 992px) {
			/*background-position: bottom 51% right 0;*/
		}

		@media (min-width: 1200px) {
			/*background-position: bottom 55% right 0;*/
		}
	}

	.hero h2 {
		color: #fff;
		font-family: "Eurostile LT Std Demi", Arial, sans-serif;
		font-weight: normal;
		font-style: normal;
	}

	img {
		max-width: 100%;
	}
	h3 {
		color: $orange;
	}
	.section {
		padding: 10rem 0 0 0;
		@media (max-width: 991px) {
			padding: 6rem 0 0 0;
		}
		@media (max-width: 576px) {
			padding: 1rem 0 0 0;
		}
	}
	.section.first {
		margin-top: 10px;
	}
	.icons-container div,
	.icons-container a {
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
		width: 12%;
		padding-right: 0px;
		@media (max-width: 991px) {
			width: 22%;
		}
		@media (max-width: 576px) {
			font-size: 0.8rem;
		}
	}
	.icons-container p {
		text-transform: uppercase;
		font-size: 0.7rem !important;
		padding-top: 10px;
	}
	.icons-container i.material-icons {
		font-size: 35px;
		color: white;
		position: relative;
		border-radius: 50%;
		padding: 20px;
		margin: 3px;
		background-color: $blue;
		vertical-align: middle;
		width: 75px;
		height: 75px;
		@media (max-width: 576px) {
			font-size: 2rem;
			width: 4rem;
			height: 4rem;
			padding: 1rem;
		}
	}
	.info .price-info {
		border-bottom: 1px dotted #000;
		width: auto;
	}
	table.register {
		width: 100%;
		border-collapse: collapse;
	}
	table.register th {
		text-align: center;
		@media (max-width: 576px) {
			font-size: 0.8rem;
		}
	}
	table.register td {
		border: 1px solid #fff;
		padding: 20px;
		width: 20%;
		text-align: center;
		@media (max-width: 576px) {
			font-size: 0.8rem;
			padding: 5px;
		}
		@media (max-width: 576px) {
			font-size: 0.8rem;
			padding: 5px;
		}
	}

	.small {
		font-size: 0.8rem;
	}
	.info .opening-info {
		max-width: 70%;
		padding-bottom: 7px;
		border-bottom: 1px dotted $grey;
		width: auto;
	}
	.group-one,
	.group-two,
	.group-three {
		vertical-align: top;
		display: inline-block;
		@media (max-width: 991px) {
			display: block !important;
		}
	}
	.group-one h5,
	.group-two h5,
	.group-three h5 {
		padding: 0 0 0 10px;
	}
	.group-one p,
	.group-two p,
	.group-three p {
		padding: 0 0 0 10px;
		margin: 0;
	}
	.group-one i,
	.group-two i,
	.group-three i {
		display: inline-block;
		font-size: 55px;
	}
	.group-two i {
		color: $orange;
	}
	.group-three i {
		color: $red;
	}
	.map-region,
	.strange-o {
		max-width: 100%;
	}
	.charger i {
		font-size: 70px;
		vertical-align: middle;
	}
	.rotate-90 {
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	.video-container {
		position: relative;
		width: 100%;
		height: 0px;
		padding-bottom: 56.25%;
	}

	.video-container iframe {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
