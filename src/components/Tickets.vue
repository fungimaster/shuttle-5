<template>
  <div>
    <vue-headful
    :title="doctitle"
    />
    <div class="tickets theme pt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="mt-md-5 text-white">ØREDEV DEVELOPER CONFERENCE<br>6-8 NOV 2019 SWEDEN</h1>
          </div>
        </div>
        <div class="row mt-xl-5 mt-1">
          <div class="col-lg-7 pass-container">
            <div class="price-info">
              The prices are in swedish crown (SEK) and exclusive of V.A.T
            </div>
            <a
              href="https://www.trippus.se/web/registration/registration.aspx?view=registration&idcategory=AB0ILBAjGkw59diq3UmYmtf60RX-z923Pjr_F2UIXjncOrqMKHR5LxrVcMx2SpMW-GKqORIhZYa5&ln=eng"
              target="_blank"
              class="pass"
            >
              <div class="desc">
                <h5>2 DAY CONFERENCE PASS</h5>
              </div>
              <div class="price">11.800 SEK</div>
              <div class="arrow">
                <i class="material-icons">keyboard_arrow_right</i>
              </div>
            </a>
            <a href="https://www.trippus.se/web/registration/registration.aspx?view=registration&idcategory=AB0ILBD5asiZMC21BRtoXT8_PPxPjRto9K9riicylr2cEo-4cweklmCLJP3gpDPIuk-gX21BXfaf&ln=eng" target="_blank" class="pass">
              <div class="desc">
                <h5>3 DAY CONFERENCE PASS</h5>
                <p>workshops are on us</p>
              </div>
              <div class="price">
                13.800 SEK
              </div>
              <div class="arrow">
                <i class="material-icons">keyboard_arrow_right</i>
              </div>
            </a>
            <a href="https://www.trippus.se/web/registration/registration.aspx?view=registration&idcategory=AB0ILBBnA9fE0xyTus4upl258vyqhqpcxCJlNzM6Kda1gyGwV1SLQOdc71GRUhfbAHBvXbQAloKx&ln=eng" target="_blank" class="pass">
              <div class="desc">
                <h5>3 DAY CONFERENCE PASS + <br>HOTEL</h5>
                <p>workshops are on us</p>
              </div>
              <div class="price">
                17.325 SEK
              </div>
              <div class="arrow">
                <i class="material-icons">keyboard_arrow_right</i>
              </div>
            </a>
            <div class="pass sold-out">
              <div class="desc">
                <h5>BUDDIES - 3 DAY CONFERENCE PASS + <br>HOTEL</h5>
                <p>workshops are on us</p>
              </div>
              <div class="price">
                SOLD OUT
              </div>
            </div>
          </div>
          <div class="col-lg-1">

          </div>
          <div class="col-lg-4 registration-info">
            <div class="ip-change">
            </div>
            <div class="more">
              <h3>GROUP DEAL</h3>
              <p>Bring your friends and colleagues and get up to 20% discount!</p>
              <a href="mailto:amelia@oredev.org" class="btn green-bg btn-md text-white">Contact us</a>
            </div>
            <div class="more">
              <h3 class="mt-4">Convince your boss</h3>
              <p>Need som help getting to yes?</p>
              <a href="/convince-your-boss" class="btn green-bg btn-md text-white">Here are our tips</a>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>

    <!-- <div class="convince-boss">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <h2>Agile People</h2>

            <p>High performing agile teams is an achievement, but what structures do you need to support the paradigm shift? Sign up for a full-day workshop with Bjarte Bogsnes and Pia-Maria Thorén to get unique insights into practices in HR and finance to support business agility.</p>
            <div class="buttons text-center">
              <a href="https://www.workshopbutler.com/public/event/XGG9dOwz" target="_blank" class="btn green-bg btn-lg text-white mt-4">Learn to make your entire business agile</a>
            </div>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div> -->

    <div class="convince-boss">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <a href="https://www.workshopbutler.com/public/event/XGG9dOwz" target="_blank">
              <img src="/static/agile-people.png" class="agile-people" />
            </a>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>


    <b-container fluid class="test-what">
      <b-row>
        <b-col xl="2" class="left">
        </b-col>
        <b-col>
          <b-container>
            <b-row>
              <b-col>
                <b-container>
                  <b-row class="testimonials">
                    <b-col xl="12">
                      <h2 class="mb-4 pink">Testimonials</h2>
                    </b-col>
                    <b-col md="4" class="speaker-card text-center">
                      <img src="https://res.cloudinary.com/oredev/image/upload/w_750/w_700,h_700,c_crop,g_face,r_max/w_220/2018_web/jonas.jpg" alt="" />
                      <div class="speaker-info">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">

                        <h5 class="speaker-name text-center">Jonas Olsson</h5>
                        <p class="testimonial text-left">This is where I go every year to challenge my status quo, get a power boost from my equals and improve my craft.</p>
                      </div>
                    </b-col>
                    <b-col md="4" class="speaker-card text-center">
                      <img src="https://res.cloudinary.com/oredev/image/upload/w_750/w_700,h_700,c_crop,g_face,r_max/w_220/2018_web/sofia.jpg" alt="" />
                      <div class="speaker-info">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">

                        <h5 class="speaker-name text-center">Sofia Wijkström</h5>
                        <p class="testimonial text-left">Looking forward to next time! It’s a great event, aways inspiring and you get a lot of new ideas.</p>
                      </div>
                    </b-col>
                    <b-col md="4" class="speaker-card text-center">
                      <img src="https://res.cloudinary.com/oredev/image/upload/w_750/w_500,h_500,c_crop,g_face,r_max/w_220/2018_web/frida.jpg" alt="" />
                      <div class="speaker-info">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                        <img class="star" src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">

                        <h5 class="speaker-name text-center">Frida Forsell</h5>
                        <p class="testimonial text-left">Tack så mycket! Bästa konferensen i Skandinavien.</p>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
            </b-row>

            <b-row>
              <b-container class="what-you-get">
                <b-row>
                  <b-col>
                    <h2 class="pink mt-5">What you get</h2>
                    <div class="icons">
                      <i class="material-icons">cake</i>
                      <i class="material-icons">fastfood</i>
                      <i class="material-icons">group_add</i>
                      <i class="material-icons">local_play</i>
                      <i class="material-icons">restaurant_menu</i>
                      <i class="material-icons">email</i>
                      <i class="material-icons">person</i>
                      <i class="material-icons">place</i>
                      <i class="material-icons">room_service</i>
                      <i class="material-icons">school</i>
                    </div>
                    <p class="mt-4">The conference pass includes free access to all sessions and the exhibition area (and/or specified workshops) on the days you specify. The pass also includes lunch and coffee every day, as well as dinner on Thursday the 7th of November (with vegan and vegetarian options).</p>
                    <p>The conference pass + hotel includes 3 nights in a hotel close to the venue or in the city: Check in Tuesday the 5th, check out Friday the 8th of November.</p>
                  </b-col>
                </b-row>
              </b-container>
            </b-row>
          </b-container>
        </b-col>
        <b-col xl="2" class="right">
        </b-col>
      </b-row>
    </b-container>

    <div class="three-reasons">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <h2 class="pink">Top 3 reasons to attend</h2>
            <h5 class="mt-5">Perfect your skills</h5>
            <p>Learn from your developers heroes and from your peers.</p>
            <h5 class="mt-5">Meet your kind</h5>
            <p>Networking is one of the major reasons to attend. See what your peers are doing.</p>
            <h5 class="mt-5">Overindulge on inspiration</h5>
            <p>Explore what is new for developers during the sessions and on the exhibition floor.</p>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>

    <div class="map">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <h2 class="pink">Location</h2>
            <a href="https://www.google.com/maps/d/u/0/embed?mid=1AiWR-YSP88h-yiyBdo3TLXW2lzg" target="_blank">
              <img class="map-region" src="https://res.cloudinary.com/oredev/image/upload/2019/html/map-region.jpg" alt="">
            </a>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>

    <div class="venue">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <b-container>
            <b-row>
              <b-col md="6" class="info left">
                <h3 class="pink">THE VENUE: MALMÖMÄSSAN</h3>
                <p>
                  Mässgatan 6, Hyllie, Malmö, Sweden</p><p>The venue is a modern Exhibition &amp; Conference Centre located in Hyllie, only 8 minutes from the famous Øresund bridge and a 3 minutes train ride to Malmö City. With the latest IT and audio visual technology you are bound to experience Øredev in the best way possible!<br>
                  </p>
                </b-col>
                <b-col md="6" class="info right">
                  <h3 class="pink">JOIN US BY TRAIN OR BUS</h3>
                  <p>
                    It’s easy to get to Øredev by train, the venue is located only a short walking distance away from Hyllie station, the first stop in Sweden after Copenhagen Airport.
                  </p>
                  <p>
                    If you are on a budget and coming from Sweden, Denmark or North Germany, you can check with <a href="https://www.flixbus.se/" target="_blank">Flixbuss</a>.
                  </p>
                </b-col>
              </b-row>
              <b-row class="mt-md-5">
                <b-col md="6" class="info left">
                  <h3 class="pink">JOIN US BY AIR</h3>
                  <p>
                    Copenhagen Airport is connected to Malmö by the Øresund Bridge.
                  </p>
                  <p>
                    Take the train from the airport and 15 minutes later you will find yourself in Hyllie and a 3 minutes walk from the venue.
                  </p>
                </b-col>
                <b-col md="6" class="info right">
                  <h3 class="pink">JOIN US BY CAR</h3>
                  <p>
                    There are plenty of parking places around the venue. You can read more about the parking facilities <a href="http://www.malmomassan.se/Besok-oss/Parkering" target="_blank">here</a>.
                  </p>
                </b-col>
              </b-row>
              </b-container>

          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>

      </div>


    </div>
  </template>

  <script>
    export default {
      name: 'tickets',
      data () {
        return {
          doctitle: 'Tickets - ' + this.$store.state.conferencename,
        }
      },
      methods: {
      },
      mounted:function(){
      },
    }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
    @import "../styles/variables.scss";

    .pass-container {
      float: left;
      margin: 0 0 40px 0;
    }

    .tickets .price-info {
      text-align: right;
      color: #fff;
      font-size: 0.58rem;
      text-transform: uppercase;
      padding: 5px 10px;
    }

    .pass {
      background-color: #fff;
      color: #000;
      display: flex;
      align-items: center;
      margin-top: 2px;
      padding: 0 0 0 20px;
      width: 100%;
      text-transform: uppercase;
      height: 75px;

      .desc {
        flex: 0 0 70%;
        h5 {
          font-size: 1.2rem;
          line-height: 1.2rem;
          color: #000;
          margin: 0 0 2px 0;
          @media (max-width: 567px) {
            font-size: 1rem;
          }
          @media (max-width: 450px) {
            font-size: 0.8rem;
          }
        }
        p {
          color: #58c5da;
          font-size: 10px !important;
          margin: 0;
        }
      }

      .arrow {
          float: right;
          color: $green;
          margin: 0;
          height: 75px;
          padding: 15px 2px 0 2px;
          @media (max-width: 991px) {
            width: 10%;
          }

          i{
            font-size: 45px;
            @media (max-width: 567px) {
              font-size: 1.6rem;
              line-height: 1.6;
            }
          }
        }

      &:hover{
        color: inherit;
        background-color: #ddd;

        .price {
          color: #fff;
        }
      }

      &.sold-out:hover {
        color: #000;
        background-color: #fff;

        .price {
          color: #000;
        }
      }

      .price {
        font-size: 1rem;
        width: 20%;
        padding: 24px 0 0 0;
        margin: 0;
        height: 100%;
        font-weight: bold;
        text-align: right;
        color: #000;
        @media (max-width: 567px) {
          font-size: 0.8rem;
        }
        @media (max-width: 450px) {
          padding-top: 29px;
          font-size: 0.6rem;
        }
      }
    }

    .theme {
      background: url(https://res.cloudinary.com/oredev/image/upload/2019/html/background-footer);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
      padding: 0 0 6rem 0;
    }
    .convince-boss {
      background: url(https://res.cloudinary.com/oredev/image/upload/2019/html/background-people);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      color: #fff;
      padding: 5rem 0;
    }
    h3 {
      color: #fff;
    }
    .test-what {
      margin: 6rem 0;

    }
    .test-what .left {
      background: url(https://res.cloudinary.com/oredev/image/upload/2019/html/icon-star);
      background-repeat: no-repeat;
      background-size: 50%;
      background-position: center;
    }
    .test-what .right {
      background: url(https://res.cloudinary.com/oredev/image/upload/2019/html/icon-star);
      background-repeat: no-repeat;
      background-size: 50%;
      background-position: center;
    }

    .testimonials .star {
      width: 20px;
    }
    .testimonials .speaker-name {
      margin: 10px 0 0 0;
    }
    .testimonials .testimonial {
      font-size: 14px;
      padding: 0 20px;
    }
    .what-you-get {
      padding: 80px 0;
    }
    .what-you-get .icons {
      color: #fda272;
    }

    .three-reasons {
      background: url(https://res.cloudinary.com/oredev/image/upload/2019/html/background-beanbags);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      color: #fff;
      padding: 7rem 0;
      margin: 13rem 0;
      @media (max-width: 767px) {
        margin: 3rem 0 0 0;
      }
    }
    .three-reasons h5{
      text-transform: none;
    }

    .venue .info.left {
      padding: 0 30px 0 0;
      @media (max-width: 767px) {
        padding: 0 0 0 0;
      }
    }
    .venue .info.right {
      padding: 0 0 0 30px;
      @media (max-width: 767px) {
        padding: 0 0 0 0;
      }
    }

    .map {
      padding: 7rem 0;
    }
    .map img{
      width: 100%
    }

    .agile-people {
      max-width: 100%;
    }

  </style>
