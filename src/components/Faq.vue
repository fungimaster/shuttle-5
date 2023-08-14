<template>
  <div class="info">
    <vue-headful :title="doctitle" />

    <div class="hero">
      <b-container>
        <b-row>
          <b-col md="10">
            <h2>REGLER & ÖVRIG INFO</h2>
            <p class>All nödvändig information kring tävlingen Matchplay Local Series</p>
          </b-col>
          <b-col md="2" class></b-col>
        </b-row>
      </b-container>
    </div>

    <b-container>
      <b-row>
        <b-col hidden class="mt-5 col-12">
          Nedan finner du all information om tävlingen samt ett antal
          snabblänkar till de viktigaste punkterna. Hittar du inte vad du söker
          efter så kontakta oss på
          <a href="mailto:info@matchplay.se">info@matchplay.se</a>.
        </b-col>
        <b-col hidden class="mt-5 col-12">
          <h3 class="red">FAQ</h3>
          <p class="red">
            Vi får ofta frågor om reserver. För att välja en reserv till ditt
            lag går du till din lagsida och där finns en grön knapp man trycker
            på som heter "Välj reservspelare". Skriv in golfid till din reserv
            och denna kan sedan väljas som ersättare av lagkapten eller
            lagspelare <strong>när det är dags för match</strong> och tee mm ska
            väljas. Hemmalaget är ansvariga för att starta det digitala
            scorekortet samt välja in ev. reserv när det är dags för spel.
          </p>
        </b-col>
        <b-col hidden class="mt-5 col-12">
          <div class="mt-3 icons-container text-center">
            <a href="#2" class v-b-toggle="'collapse-' + 1">
              <i hidden class="material-icons">assignment_turned_in</i>
              <i class="fa fa-clipboard-check"></i>
              <p>Anmälan</p>
            </a>
            <a href="#3" v-b-toggle="'collapse-' + 2">
              <i hidden class="material-icons">attach_money</i>
              <i class="fa fa-dollar-sign"></i>
              <p>BETALNING</p>
            </a>
            <a href="#4" v-b-toggle="'collapse-' + 3">
              <i hidden class="material-icons">people_alt</i>
              <i class="fa fa-user-friends"></i>
              <p>LAG</p>
            </a>
            <a href="#5" v-b-toggle="'collapse-' + 4">
              <i hidden class="material-icons">child_care</i>
              <i class="fa fa-baby"></i>
              <p>ÅLDERSGRÄNS</p>
            </a>
            <a href="#6" v-b-toggle="'collapse-' + 17">
              <i hidden class="material-icons">sports_golf</i>
              <i class="fa fa-golf-ball"></i>
              <p>HANDICAP</p>
            </a>
            <a href="#10" v-b-toggle="'collapse-' + 10">
              <i hidden class="material-icons">ballot</i>
              <i class="fa fa-ballot"></i>
              <p>Lottning</p>
            </a>
            <a href="#19" v-b-toggle="'collapse-' + 19">
              <i hidden class="material-icons">accessible</i>
              <i class="fa fa-wheelchair"></i>
              <p>HJÄLPMEDEL</p>
            </a>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <howitworks :headline="'lathund: så fungerar tävlingen'" />

    <b-container v-if="competitionFetched">
      <b-row>
        <b-col class="mt-3 col-12">
          <hr />

          <div class="pt-4 pb-2 first" id="1">
            <h3>LÖPANDE INFO & Kommunikation</h3>
            <p>
             Matchplay är en tävling som enbart marknadsförs främst på sociala medier och därför är det vår största informationskanal mot alla våra deltagare. Följ oss gärna där för snabbast info gällande allt som rör tävlingen. Alla deltagare finns även med sina adresser i vårt nyhetsbrev och kommer där få information inför uppstart och grundomgångar.
            </p>
          </div>
          <hr />

          <app-faq-card
            :headline="'Allmänt'"
            :icon="'fa fa-clipboard-check'"
            :information="category6"
          ></app-faq-card>

          <app-faq-card
            :headline="'Anmälan & deltagare'"
            :icon="'fa fa-user-friends'"
            :information="category1"
          ></app-faq-card>
          <app-faq-card
            :headline="'Spel & spelform'"
            :icon="'fa fa-golf-ball'"
            :information="category2"
          ></app-faq-card>
          <app-faq-card
            :headline="'REGLER & TÄVLINGSBESTÄMMELSER'"
            :icon="'fa fa-balance-scale'"
            :information="category3"
          ></app-faq-card>
          <app-faq-card
            :headline="'Spelschema & lottning'"
            :icon="'fa fa-ballot'"
            :information="category4"
          ></app-faq-card>
          <app-faq-card
            :headline="'Hjälpmedel'"
            :icon="'fa fa-wheelchair'"
            :information="category5"
          ></app-faq-card>

          <div class="section">
            <h3>
              Vi önskar alla deltagande lag lycka till och varmt välkomna till
              tävlingen!
            </h3>
            <p>
              Hittar du inte den information du söker kontakta oss på:
              <a href="mailto:info@matchplay.se">info@matchplay.se</a>
            </p>

          </div>
        </b-col>
      </b-row>
    </b-container>    
  </div>
</template>

<script>
import { globalState } from "../main.js";
import Howitworks from "./Howitworks";
import AppFaqCard from "./FaqCard";
import { mapGetters } from "vuex";

export default {
  name: "faq",
  components: {
    Howitworks,
    AppFaqCard    
  },
   created() {
    const promise = this.$store.dispatch('getCompetition', globalState.compid)
    promise.then(() => {
      this.competitionFetched = true
    })

  },
  data() {
    return {
      closed: globalState.closed,
      doctitle: "Info - " + this.$store.state.conferencename,
      competitionFetched: false
    };
  },
  computed: {
    ...mapGetters([
        "price1",
        "price2",
        "price3",
        "price4"
        ]),
    information () {
     return  [
          {
            headline: "Regioner Matchplay Local Series 2023",
            text: "Matchplay Local Series spelas Stockholm och Skåne. Målsättningen är att deltagarna ska ha en så kort ressträcka som möjligt till en match, helst max 50km som längst. Tyvärr kan det förekomma att någon kan behöva åka lite längre än så men lottningarna utgår från att optimera restiden.",
            imgurl1: null,
            imgurl2: null,
            category: 6,
          },
          {
            headline: "Anmälan",
            text: "Ni anmäler er enkelt via hemsidan.",
            imgurl1: null,
            imgurl2: null,
            category: 1,
          },
          {
            headline: "Betalning",
            text:
              "Lag betalar via Swish. Priset per lag är " +
              this.price1 +
              " kr.",
            imgurl1: null,
            imgurl2: null,
            category: 1,
          },
          {
            headline: "Deltagare/lag",
            text: "Matchplay spelas i 2-mannalag (herrlag, damlag eller mixade lag) Alla deltagare måste ha officiellt HCP.",
            imgurl1: null,
            imgurl2: null,
            category: 1,
          },
          {
            headline: "ÅLDERSGRÄNS FÖR DELTAGANDE",
            text: "Båda spelarna måste fylla minst 18 år innan tävlingsstart. Undantaget är när en deltagare under 18 registreras tillsammans med målsman, som då är bunden att medverka vid eventuell utlandsfinal.",
            imgurl1: null,
            imgurl2: null,
            category: 1,
          },
          {
            headline: "Handicapgräns",
            text: "Officellt handicap (36.0) krävs för deltagande. Högsta HCP i matchspel är 28.0 och har laget tillsammans högre än 28.0 i hcp kommer spelarna i laget dela på reduceringen.",
            imgurl1: null,
            imgurl2: null,
            category: 1,
          },
         /*  {
            headline: "Tävlingsklasser 2022",
            text: "Matchplay spelas i en klass.",
            imgurl1: null,
            imgurl2: null,
            category: 3,
          }, */
          {
            headline: "Spelform",
            text: "Alla matcher spelas som 4-boll, Match/Bästboll. De 2 spelarna i lagen som har bästa score på respektive hål, mäts mot varandra. Bästa score vinner hålet till laget.  <br/> <br/> Är bästa score samma hos bägge lagen delas hålet. Efter att slopen räknats in reduceras respektive spelares HCP med 10%. De tre spelarna med högst reducerat spelhandicap får i matchen slag motsvarande skillnaden till den spelaren som har lägst spelhandicap. Spelaren med lägst reducerat spelhandicap spelar med 0 i spelhandicap. Till sist sker avrundning till närmaste heltal (uppåt vid 0.5, 1.5, 2.5 osv).<br/><br/> <strong> OBS! Vårt digitala scorekort räknar ut detta till er innan match! </strong> De erhållna slagen för matchen gäller från index 1 och uppåt. Vi hänvisar samtidigt till SGF:s Spel- och Tävlingshandbok. Erhållna slag utdelas på samma hål som ursprungsmatchen.",
            imgurl1:
              "https://res.cloudinary.com/dn3hzwewp/image/upload/v1591952386/matchplay/hcp.png",
            imgurl2: null,
            category: 2,
          },
          {
            headline: "Spelform under finalen",
            text: "Lagen från respektive Local Series spelar en matchspelsserie mot varandra. Vinst ger tre poäng och oavgjord en poäng. Dag 1 – Lag A möter Lag B Dag 2 – Lag B möter Lag C Dag 3 – Lag C möter Lag A. Vid lika poäng efter sista omgången så sker särspel för att urskilja en vinnare.",
            imgurl1: null,
            imgurl2: null,
            category:2
          },
          {
            headline: "Särspel",
            text: "Vid lika efter 18 hål är det inget särspel, utan laget med lägst HCP vinner matchen.",
            imgurl1: null,
            imgurl2: null,
            category: 2,
          },
          {
            headline: "Andra chansen",
            text: "Alla lag i Matchplay garanteras minst två matcher. Vid förlust i första omgången hamnar man i Andra Chansen. Slutvinnaren i andra chansen vinner ett golfweekend-paket i Portugal (boende och greenfee ingår). <br><br>OBS! Om en match vinns eller förloras genom walk over eller lottning, så räknas även detta som spelad match.",
            imgurl1: null,
            imgurl2: null,
            category: 4,
          },
          {
            headline: "Lottning Spelschema",
            text: "Lottning kommer att ske efter att registreringen stängs. Matchplay har prioriteringar i lottningen som gäller geografisk tillhörighet. Detta ger kortast möjliga resor under hela tävlingen fram mot Sverigefinalen. Dock kommer lag från samma klubb i största utsträckning som möjligt att inte ställas mot varandra.",
            imgurl1: null,
            imgurl2: null,
            category: 4,
          },
          {
            headline: "Speldagar",
            text: "Från omgång ett ända fram till finalen finns tidsramar för respektive omgång. Det är av största vikt att Ni som deltagare utgår från att kunna avsätta minst en runda golf inom de veckor som omgången gäller. Ni kommer genom vårt system få all nödvändig info kring kontakten med era motståndare.   <br/> <br/> Oavsett om ni är hemma- eller bortalag så ansvarar bägge lagen för att kontakt skapas och tid bokas. Kan inte lagen komma överens om lämplig tidpunkt eller bana skall lagkaptenen i det lag som har fördel av hemmabana kontakta tävlingsledningen. Ha även med er att ni kan använda er av en reserv för att lösa er match.<br/> <br/> Reserv anmäler ni under LAGFLIKEN på din sida. Klicka på knappen 'välj reserv' och följ instruktionerna. Reserven behöver anmälas INNAN matchen och scorekortet startas. Om reserv finns väljs denna in i samband med att matchen startas (görs av hemmalaget). <br/> <br/> Har man bestämt tid för spel (datum och klockslag) och något lag sedan, oberoende av orsak, vill byta tid (inom deadline för omgången) är det upp till motståndarlaget att gå med på detta. Blir man ej överens om ny tid och matchen ej spelas, vinner det lag som är berett på spel på den ursprungliga tiden - på WO.",
            imgurl1: null,
            imgurl2: null,
            category: 4,
          },
          {
            headline: "Spelplatser",
            text: "Vårt lottningssystem är utformat för att ge en så rättvis fördelning som möjligt sett till spelplats.  <br/> <br/> Hemmalag/bortalag fördelas jämnt mellan omgångarna och lottas fram i första omgången. Detta innebär att man kan välja sin hemmabana men kan också komma överens med motståndarna om annan bana. Lagkaptenerna i respektive lag ansvarar för att föra score för alla spelare. Eventuell greenfee under kvalomgångarna innan semifinal och final betalas av respektive lag. <br/> <br/> Matchen avgörs över 18 hål utan särspel. OBS! Endast klubbar med 18 hål kan och ska användas under spelet. Om ett (eller flera) hål på banan är avstängt hoppar man över detta hål och matchen avgörs då över de hål som är spelbara.  <br/> <br/> Finalen spelas 22-26 oktober på Golf Le Fonti i Bologna, Italien. De tre vinnande lagen från Local Series Stockholm och Local Series Skåne spelar en greensome poängbogey mot varandra och där de två lag med mest poäng efter 18 hål går in i huvudfinalen. Spelformen för huvudfinalen är samma som i grundomgången. Alla deltagare i finalen har redan kvalificerat sig för spel nästkommande år utan kostnad.",
            imgurl1: null,
            imgurl2: null,
            category: 4,
          },
          {
            headline: "Ersättare/reserv",
            text: "I Matchplay är det okej att använda sig av en reserv. <br/> <br/> Reserv anmäler ni under LAGFLIKEN på din sida. Om reserv finns väljs denna in i samband med att matchen startas (görs av hemmalaget). <br/>  <br/> När scorekortet startas inför match av hemmalaget, så kommer alla deltagare upp. Ska deltagare ersättas med reserv så klicka på knappen under deltagaren ”välj reserv”  och fyll i dennes golf id. Då hämtas dagsaktuellt HCP och uträkningen blir rätt. <br/> <br/> Är inte reserv anmäld i systemet och laget spelar med reserv kan laget bli diskvalificerat. Reservinträde skall också meddelas motståndarna innan spel, när reserv deltager i tävlingen. Man får bara använda sig av en reserv (samma person). Denna reserv kan komplettera laget vid behov under hela tävlingen.  <br/> <br/> Observera att reserv inte får spela i annat deltagande lag som fortfarande är med i tävlingen. Har man åkt ur tävlingen kan och får man gå in som reserv i annat lag.",
            imgurl1: null,
            imgurl2: null,
            category: 1,
          },
          {
            headline: "Matchrapportering",
            text: "Det är obligatoriskt att använda vårt digitala scorekort för att rapportera matchresultat. Hemmalag (kapten eller medspelare) väljer klubb/slinga/tee när matchen ska starta, rätt slope räknas ut och matchplays regler för hcp räknas ut automatiskt. Ni rapporterar in hål för hål enkelt och ser vilket lag som vinner/förlorar/delar resp. hål.  <br/> <br/> Resultatet laddas kontinuerligt upp direkt till hemsidan och matchen ligger live (för andra att följa). När matchen är avgjord visas detta i det digitala scorekortet och ni skickar in resultatet. Vinnarna får meddelande när nästa lottning är gjord (ev. förlorarna också i andra chansen). <br/> <br/> Herrar spelar på vald klubbs herrtee och damer spelar på vald klubbs damtee.",
            imgurl1:
              "https://res.cloudinary.com/dn3hzwewp/image/upload/v1612601969/matchplay/scorekort1.png",
            imgurl2:
              "https://res.cloudinary.com/dn3hzwewp/image/upload/v1612601969/matchplay/scorekort2.png",
            category: 2,
          },
         /*  {
            headline: "Tävlingsdomare",
            text: "Tävlingsansvarig Mikael Gräntz finns på plats tillsammans med andra knutna till Matchplay under både Sverige- och utlandsfinal. Under grundspelet ansvarar alla deltagare för regler gällande matchspel. Vi finns alltid tillgängliga på telefon under tävlingstiden, så har ni frågor eller funderingar så kontakta oss direkt.",
            imgurl1: null,
            imgurl2: null,
            category: 3,
          }, */
          /* {
            headline: "Minimiantal",
            text: "Vi utgår från att vi blir fullt tillräckligt med antal företags- och privatlag lag under 2022, men reserverar oss för händelser helt utanför vår kontroll, som kan innebära att deltagarantalet blir alldeles för litet för att genomföra tävlingen.  <br/> <br/> Om detta skulle ske <strong>återbetalas</strong> hela beloppet till respektive lag samma dag beslutet tas. Då vi står helt ovetandes inför alla beslut som tas gällande Corona, så vill vi här betona garantin att om tävlingen av olika anledningar inte skulle gå eller få spelas, så återbetalas alla deltagaravgifter till 100%.",
            imgurl1: null,
            imgurl2: null,
            category: 6,
          }, */
          {
            headline: "Handicap",
            text: "För att spela matcher från 1 juli 2023 krävs att deltagande spelare ska ha minst 3 HCP-ronder korrekt registrerade under innevarande år i GIT innan match i tävlingen spelas. Detta gäller även reserverna.  <br/> <br/> Vårt system är uppkopplat mot GIT och ni kommer att bli påminda om ej registrerade ronder om ni skulle logga in för spel och ej uppfyllt dessa kriterier. Man kan alltså inte starta spelet och logga in om detta inte efterföljs. Laget kan spela med en spelare eller ta in reserv som uppfyller kraven. Deltager spelare trots allt i matchen (använder pappers scorekort) blir laget diskvalificerat. <br/> <br/> För lag som går till finalen i Italien gäller att minst 4 HCP-ronder ska vara korrekt registrerade i GIT. Vi vill påpeka att det är varje spelares skyldighet att se till att spela på det HCP som visar spelarens normala spelstandard. Oavsett om inga handicapgrundande ronder är noterade är man som spelare skyldig att revidera sitt handicap med sin klubbs hcp-kommitté.   <br/> <br/> Klubbarnas HCP-kommittéer är utredande/dömande part i ett eventuellt HCP-ärende. Matchplay följer alltid dom från berörd HCP-kommitté. Spel på ett för högt HCP innebär att laget diskvalificeras från tävlingen.",
            imgurl1: null,
            imgurl2: null,
            category: 3,
          },
          {
            headline: "Protester",
            text: "Om det av någon anledning uppkommer en eller flera situationer som föranleder att ni vill lämna in en protest, så ska detta göras skriftligen via mail till info@matchplay.se. Protesten måste inkomma senast dagen efter spel. Protester inkomna senare än detta kommer inte att behandlas.",
            imgurl1: null,
            imgurl2: null,
            category: 3,
          },
          {
            headline: "Hjälpmedel",
            text: "I Matchplay är det tillåtet med alla på marknaden olika avståndsmätare. Utrustning för att mäta vindförhållanden är dock ej tillåtna. Golfbil är tillåtet för de som kan uppvisa läkarintyg på plats innan spel.  <br/> <br/> Om bägge lagen kommer överens om att använda golfbil, oavsett läkarintyg eller ej, så är det upp till lagen själva. Om golfbil enbart används av en i laget som har läkarintyg, får medspelaren inte på något sätt använda sig av bilen under själva tävlingsspelet. Caddy är tillåten under alla omgångar i tävlingen.",
            imgurl1: null,
            imgurl2: null,
            category: 5,
          },
          {
            headline: "Spelschema",
            text: "Matchplay består av en ”Huvudtävling” och en ”Andra Chansen” vilka skapas efter den första omgången, där förlorarna får en andra chans att nå finalspelet. Lag och vägen från Andra Chansen till finalen kommer att vara aningens svårare, då färre lag går vidare än från Huvudtävlingen. <br/> <br/> När Andra Chansen nått omgång 5-6 (beroende på antal deltagare 2022) så bjuds alla kvarvarande lag till en gemensam tävling som spelas dagen innan och på samma bana som de sex kvalificerade lagen från huvudtävlingen i Sverigefinalen. De två bästa lagen här tar de två sista av de åtta platserna för lördagens semifinal och söndagens final. Allt spel och boende här står Matchplay för.",
            imgurl1: null,
            imgurl2: null,
            category: 4,
          },
          {
            headline:
              "TÄVLINGSLEDNING / TÄVLINGSBESTÄMMELSERNA / TÄVLINGSREGLERNA",
            text: "Alla generella tävlingsregler som gäller för Sverige och går under Svenska Golfförbundet används i Matchplay rörande Bästboll/Matchspel. Oklarheter gällande regelverket – kontakta tävlingsledningen på <a href='mailto:info@matchplay.se'>info@matchplay.se</a>.",
            imgurl1: null,
            imgurl2: null,
            category: 3,
          },
        ]
    },
   
    category1() {
      return this.information.filter((e) => e.category === 1);
    },
    category2() {
      return this.information.filter((e) => e.category === 2);
    },
    category3() {
      return this.information.filter((e) => e.category === 3);
    },
    category4() {
      return this.information.filter((e) => e.category === 4);
    },
    category5() {
      return this.information.filter((e) => e.category === 5);
    },
    category6() {
      return this.information.filter((e) => e.category === 6);
    },
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

.hero {
  background: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_auto,e_colorize:50,co_rgb:000000/v1572963227/matchplay/matchplay_bg.jpg");

  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: cover;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: right 0px top 0px;
  min-height: 500px;
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
  font-family: "Poppins", Arial, sans-serif;
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
    padding: 3rem 0 0 0;
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
.icons-container i.material-icons,
.icons-container i.fa {
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

.bg-orange {
  background-color: $orange;
}
</style>
