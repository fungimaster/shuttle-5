<template>
  <div class="info">
    <vue-headful
      :title="doctitle"

      />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <h1>CONFERENCE INFORMATION</h1>
          <h4>DETAILS YOU MIGHT BE WONDERING ABOUT</h4>
          <div class="icons-container text-center">
            <a href="#flight" class="">
              <i class="material-icons mt-5">airplanemode_active</i>
              <p>Flight</p>
            </a>
            <a href="#price" class="">
              <i class="material-icons">attach_money</i>
              <p>Prices</p>
            </a>
            <a href="#travel" class="">
              <i class="material-icons">train</i>
              <p>TRAVEL</p>
            </a>
            <a href="#food" class="">
              <i class="material-icons">fastfood</i>
              <p>FOOD</p>
            </a>
            <a href="#language" class="">
              <i class="material-icons">language</i>
              <p>LANGUAGE</p>
            </a>
            <a href="#parking" class="">
              <i class="material-icons">local_parking</i>
              <p>PARKING</p>
            </a>
            <a href="#luggage" class="">
              <i class="material-icons">loyalty</i>
              <p>LUGGAGE</p>
            </a>
            <a href="#wifi" class="">
              <i class="material-icons">wifi</i>
              <p>WIFI</p>
            </a>
          </div>

          <div class="section first">

            <h3>WHERE & WHEN</h3>
            <p>The Øredev conference and workshops will be held at Malmö Mässan, Exhibition & Conference Center, located in Malmö Sweden, one station away (Hyllie station) from the Copenhagen airport.</p>
            <p><span class="pink">Conference days:</span> Wednesday 6th to Friday 8th</p>
            <p><span class="pink">Workshop day:</span>  Tuesday 5th of November</p>
            <img class="mt-5 mb-5" src="https://res.cloudinary.com/oredev/image/upload/2019/html/map.png" alt="">

            <h3 id="price" class="pt-5">Prices</h3>
            <p>Choose a 1, 2, or 3 Conference Pass or 1 day workshop and choose which day(s) you will attend when you register.&nbsp; The workshop seats are limited so you have to choose them when you register.&nbsp;&nbsp;</p>
            <p><span class="price-info">The prices are in Swedish crown (SEK) and exclusive of V.A.T..</span></p>
            <table class="register mt-4 mb-3">
              <tbody>
                <tr>
                  <th><br></th><th class="pink">1 day-<br></th><th class="pink">2 days-<br></th><th class="pink">3 days-<br></th><th class="pink">3 days + Hotel<br></th>
                </tr>
                <tr class="green-light-bg">
                  <td>Early Bird <br></td>
                  <td>/<br></td>
                  <td>/<br></td>
                  <td>11 040<br></td>
                  <td>14 565</td>
                </tr>
                <tr class="green-light-bg">
                  <td>Regular <br></td>
                  <td>9 800<br></td>
                  <td>11 800<br></td>
                  <td>13 800</td>
                  <td>17 325<br></td>
                </tr>
                <tr class="green-light-bg">
                  <td>Late registration <br></td>
                  <td>10 800<br></td>
                  <td>12 800<br></td>
                  <td>14 800</td>
                  <td>18 325<br></td>
                </tr>
              </tbody>
            </table>
            <p>The Buddies-offer is the best deal -&nbsp; Book your ticket with a friend or colleague, share hotel room with separated beds and split the cost of the hotel!</p>

            <h3 class="mt-5">Payment Options</h3>
            <p>
              All prices are in Swedish Crown (SEK) and excl. VAT. If you don't choose to pay by credit card, we will invoice your company/organization after your registration.  Our payment terms are 15 days from the invoice date.
            </p>

            <h3 class="mt-5">Cancellation policy</h3>
            <p>
              Please note that once the registration has been made and the confirmation email has been sent out, the registration fee is non-refundable. In case of illness or unforeseen circumstances, ticket(s) can be transferred to a colleague without any charge, just contact us at info@oredev.org. In case there is not a sufficient number of registrations for a particular workshop, we reserve the right to cancel it one week prior to the conference. If a workshop is cancelled registered attendees will be contacted directly and they can register for another training or get a refund.
            </p>
          </div>

          <div class="section">
            <h3>VAT</h3>
            <p>
              According to Swedish regulations from Skatteverket, we must charge Swedish VAT on the ticket price (25%) and the hotel price (12%) to all attendees, both Swedish and International companies.
            </p>
            <p>
              Please <a href="mailto:amelia@oredev.org">contact us</a> or Skatteverket directly if you have any concerns about this regulation.
            </p>
            <p class="small">
              The regulations from the EU Commission states that <a href="https://www4.skatteverket.se/rattsligvagledning/edition/2019.4/329381.html#update_20190502080059" target="_blank">Article 53</a> in the VAT directive should be interpreted so that the term ”Access to events” includes a service of a five days course in accounting, which is only provided to taxable persons and which requires registration and payment to be made in advance. Taxation country is the country where the course takes place and this applies regardless of who the buyer is.
            </p>
          </div>

          <div class="section">

            <h3 class="mt-5">What are the days and opening hours?</h3>
            <img class="mt-5 mb-5" src="https://res.cloudinary.com/oredev/image/upload/2019/html/clocks.png" alt="">
            <p class="opening-info">Tuesday 5th of November, Workshops: 08.00-18.00 - starts at 08.30</p>
            <p class="opening-info">Wednesday 6th of November, Conference: 08.00-20.00 - starts at 09.00</p>
            <p class="opening-info">Thursday 7th of November, Conference: 08.00-22.00 - starts at 09.00</p>
            <p class="">Friday 8th of November, Conference: 08.00-18.00 - starts at 09.00</p>
          </div>

          <div class="section">
            <h3 class="mt-5">Group discount</h3>
            <div class="groups mt-3">

              <div class="group-one">
                <i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i>
              </div>
              <div class="group-two">
                <i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i><i class="material-icons">sentiment_satisfied</i>
                <p class="orange">
                  5 - 9 Participants
                </p>
                <h5>15% Discount</h5>
              </div>
              <div class="group-three">
                <i class="material-icons">sentiment_very_satisfied</i><i class="material-icons">sentiment_very_satisfied</i><i class="material-icons">sentiment_very_satisfied</i><i class="material-icons">sentiment_very_satisfied</i><i class="material-icons">sentiment_very_satisfied</i><i class="material-icons">sentiment_very_satisfied</i>
                <p class="red">
                  10+ Participants
                </p>
                <h5>20% Discount</h5>
              </div>
            </div>

            <p class="mt-5">
              Register 5 to 9 participants and get 15% discount.
            </p>
            <p>
              Register 10 or more and get 20% discount and the opportunity to have a small booth on the exhibition floor + your logo on our website, listed as “Best Company”. It is our way to recognise the companies taking seriously care of their employees’ competence development.
            </p>
            <p class="mb-5">
              (The group discount is only valid on regular prices and only on the ticket price.)
            </p>

          </div>
          <div id="flight" class="section">

            <h3 class="mt-5">Can I fly to Malmö?</h3>
            <p>We recommend you use the Copenhagen Airport which is served by more than 60 carriers, operating services to and from 125 cities world-wide. The airport is connected to Malmö by the Øresund Bridge and trains run around the clock between the airport and the city center. Take the train at the airport and 11 minutes later you will find yourself in the heart of Malmö-Hyllie, and a 3 minutes walk from the venue.</p>

            <a href="https://www.google.com/maps/d/u/0/embed?mid=1AiWR-YSP88h-yiyBdo3TLXW2lzg" target="_blank">
              <img class="map-region mt-4" src="https://res.cloudinary.com/oredev/image/upload/2019/html/map-region.jpg" alt="">
            </a>

            <h3 class="mt-5">Coming from Denmark?</h3>
            <p>
              The conference venue is located in Hyllie, which is the first stop after Copenhagen Airport. It has never been as easy to reach us!
            </p>

          </div>

          <div class="section">

            <h3 class="mt-5">Cancellation policy</h3>
            <p>Please note that once the registration has been made and the confirmation email has been sent out, the registration fee is non-refundable.
            </p>
            <p>
              In case of illness or unforeseen circumstances, ticket(s) can be transferred to a colleague without any charge, just contact us at info@oredev.org.
            </p>
            <p>
              In case there is not a sufficient number of registrations for a particular workshop, we reserve the right to cancel it one week prior to the conference. If a workshop is cancelled registered attendees will be contacted directly and they can register for another training or get a refund.
            </p>

          </div>
          <div id="parking" class="section">

            <h3 class="mt-5">Parking</h3>
            <p>Close to Malmömässan there are a lot of parking spaces and further more in the neighbourhood.</p>
            <h5>Parking fee</h5>
            <p>There is a fee every day, all day and the prices are about...&nbsp;</p>
            <p>15 SEK/hour<br> 50 SEK for 5 hours<br>120 SEK for 24 hours</p>
            <p>The parking ATMs accept only credit card. There are also a lot of Parking apps that you can use, <a href="https://easypark.se">EasyPark</a> and <a href="https://www.parkster.com/se/">Parkster</a>. The parking is run by Parkering Malmö or Q-park.</p>

          </div>

          <div id="food" class="section">
            <h3 id="food" class="mt-5">You will be served good food!</h3>
            <p>
              You will be served a light breakfast in the mornings, lunch every day, and dinner on Thursday 7th of November (with vegan and vegetarian options). Our food is mostly dairy and gluten free. And if not, you will find a suitable alternative. Coffee, tea, soft drinks and fruits are available all day and sweets in the afternoon. Do not hesitate to contact us if you have questions.
            </p>
          </div>

          <div id="luggage" class="section">
            <h3 class="mt-5">Free luggage storage</h3>
            <p>
              You will find free and secure storage facilities at the entrance of the conference hall. Here you can store common items, such as overcoats, backpacks or suitcases. The luggage storage facility does not store money and cannot be held responsible for more valuable items.
            </p>
          </div>

          <div class="section">
            <h3 class="mt-5">For the ones of us who need it, the conference hall is fully accessible to disabled persons and equiped with a hearing loop system</h3>
            <p>
              In addition, arrangements include the possibility of bringing helpers to the conference, please <a href="mailto:info@oredev.org">contact us</a> us. If you need to use the hearing loop system. Just <a href="mailto:emily.holweck@oredev.org">let us know</a> if you need to use it and we will let you know how to use it!
            </p>
          </div>

          <div class="section">

            <h3 class="mt-5">What should I bring to the conference?</h3>
            <p>
              Some workshops require the use of a laptop, we will inform you about what you should bring. During the conference, we will provide 			you with paper and pen to take notes and enough food and coffee to survive.
            </p>

          </div>

          <div id="language" class="section">
            <h3 class="mt-5">Language</h3>
            <p>
              The official language of the conference is English.
            </p>
          </div>

          <div class="section">

            <h3 class="mt-5">Charge your mobile</h3>
            <p>
              The luggage storage and info booth facility offers the possibility to recharge your mobile phone. Bring your charger!
            </p>
            <p class="charger green">
              <i class="material-icons rotate-90">battery_charging_full</i> Bring your charger! <i class="material-icons rotate-90">battery_charging_full</i>
            </p>

          </div>
          <div id="wifi" class="section">

            <h3>Wi-Fi</h3>
            <p>There   is Wi-Fi available throughout the venue, although speed is dependent   according to the number of users. If your carrier is local to the   region, it will result in faster connection for everyone if you access   the www via 4G.</p>
            <img class="mt-5 mb-5 strange-o" src="https://res.cloudinary.com/oredev/image/upload/2019/html/strange-o.png" alt="">
            <h3 class="mt-5">THE STRANGE LETTER Ø</h3>
            <p>
              If you don’t have the character Ø on your keyboard it’s a little bit tricky to type Øredev. But if you know that the Unicode is 00D8 - then it will be much easier. On Windows XP you just hold the Alt-key down and type 0216 and release the Alt-key. If you want to know more about Unicode 00D8; <a href="https://en.wikipedia.org/wiki/%C3%98" target="_blank">click here</a>.
            </p>

          </div>

          <div id="travel" class="section">

            <h3>Malmö</h3>
            <p>
              Malmö is the hub of the Skåne region, Sweden’s third largest city and the commercial centre of southern Sweden. Approximately 318.107 people live in Malmö at the centre of the new Øresund Region with around 3.5 million inhabitants. The Danish capital Copenhagen is less than half an hour away and connected to Malmö by a convenient bridge which opened in 2000.
            </p>
            <p>
              Malmö City tourist website: <a href="http://www.malmo.se/tourist" target="_blank">www.malmo.se/tourist</a>
            </p>
            <p>
              The center of Malmö is situated only 20 minutes by train from Copenhagen Airport in Denmark.
            </p>
            <p>
              The airport is connected to Malmö by the Øresund Bridge and trains run around the clock between Hyllie/Triangeln/Malmö C and the airport.
            </p>

            <h3 class="mt-5">Electricity</h3>
            <p>
              The electrical current in Sweden is 220V/50 Hz. Round, european style two-pin plugs are used. Appliances designed to operate in 110/120 V need a voltage converter and a plug adapter.
            </p>

            <h3 class="mt-5">Shopping</h3>
            <p>
              The conference hall is located across the street from one of Scandinavia's biggest shopping mall <a href="https://emporia.steenstrom.se">Emporia</a>. Ther is even an Apple Store there!
            </p>
            <p>
              In Malmö city the stores are generally open between 9.00 am and 6.00 pm on weekdays and between 10.00 am and 5.00 pm on weekends. Some department stores stay open until 8.00 pm daily.
            </p>

          </div>

          <div class="section">

            <h3>Disclaimer and insurance</h3>
            <p>
              Øredev accepts no liability for any injuries/losses incurred by participants and/or accompanying persons, nor loss or damage to any luggage and/or personal belongings. Participants are advised to take out their own personal insurance.
            </p>

            <h3 class="mt-5">Passports and visas</h3>
            <p>
              Participants are advised to make their own arrangements with respect to entering Sweden. Participants who require an invitation -in order to get a visa- will receive it after payment of the conference fee.
            </p>

          </div>

          <div class="section">
            <h3>We wish you an excellent stay in Malmö</h3>
            <p>
              If you didn’t find an answer to your question here, please send your request to: <a href="mailto:info@oredev.org">info@oredev.org</a>
            </p>
            <div class="mt-5 video-container">
              <iframe src="https://player.vimeo.com/video/191121225?autoplay=0&amp;loop=1&amp;color=ffffff" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
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

  export default {
    name: 'faq',
    data () {
      return {
      doctitle: 'Info - ' + this.$store.state.conferencename
      }
    },
    //mixins: [tagsMixin]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../styles/variables.scss";
  img {
    max-width: 100%;
  }
  h3 {
    color: $pink;
  }
  .section {
    padding: 13rem 0 0 0;
    @media (max-width: 991px) {
      padding: 6rem 0 0 0;
    }
    @media (max-width: 576px) {
      padding: 1rem 0 0 0;
    }
  }
  .section.first {
    margin-top: 80px;
  }
  .icons-container div, .icons-container a {
    display: inline-block;
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
    font-size: 1rem;
  }
  .icons-container i.material-icons {
    font-size: 35px;
    color: white;
    position: relative;
    border-radius: 50%;
    padding: 20px;
    margin: 3px;
    background-color: $green;
    vertical-align: middle;
    width: 75px;
    height: 75px;
    @media (max-width: 576px) {
      font-size: 2rem;
      width: 4rem;
      height: 4rem;
      padding: 1rem
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
  table.register th{
    text-align: center;
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
  table.register td{
    border: 1px solid #fff;
    padding: 20px;
    width: 20%;
    text-align: center;
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
  .group-one, .group-two, .group-three {
    vertical-align: top;
    display: inline-block;
    @media (max-width: 991px) {
      display: block !important;
    }
  }
  .group-one h5, .group-two h5 , .group-three h5 {
    padding: 0 0 0 10px;
  }
  .group-one p, .group-two p , .group-three p {
    padding: 0 0 0 10px;
    margin: 0;
  }
  .group-one i , .group-two i , .group-three i {
    display: inline-block;
    font-size: 55px;
  }
  .group-two i{
    color: $orange;
  }
  .group-three i{
    color: $red;
  }
  .map-region, .strange-o {
    max-width: 100%;
  }
  .charger i{
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
    position:relative;
    width:100%;
    height:0px;
    padding-bottom:56.25%;
  }

  .video-container iframe {
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%
  }
</style>
