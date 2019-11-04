<template>
  <div class="about">
  <vue-headful
    :title="doctitle"

    />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <h1>Partnership</h1>
          <h2 class="pink">Want to team up with us?</h2>
          <p>The Partnership guidelines prospectus is available <a target="_blank" href="https://res.cloudinary.com/oredev/image/upload/v1564469020/Files/PartnershipOredev_2019.pdf">here</a>. Please, reach out so we can discuss about all the opportunities.</p>
          <p><a href="mailto:emily.holweck@oredev.org">emily.holweck@oredev.org</a>, Creative Conference Manager, +46 (0)70 245 62 94.</p>
          <p><a href="mailto:amelia@oredev.org">amelia@oredev.org</a>, Conference Coordinator, +46 (0)70 977 40 80</p>
          <div class="mt-5 mb-5 row">
            <div class="col-sm-4 col-12">
              <img src="https://res.cloudinary.com/oredev/image/upload/2018_web/partnership-1.jpg">
              <div class="text">
                <p class="header">Connect with a highly qualified audience of 1300 developers and decision makers.</p>
              </div>
            </div>
            <div class="col-sm-4 col-12">
              <img src="https://res.cloudinary.com/oredev/image/upload/2018_web/partnership-2.jpg">
              <div class="text">
                <p class="header">Increase your exposure and brand recognition in the market place. Be where things happen and align yourself with Øredev and its distinguished speakers and industry leaders. </p>

              </div>
            </div>
            <div class="col-sm-4 col-12">
              <img src="https://res.cloudinary.com/oredev/image/upload/2018_web/partnership-3.jpg">
              <div class="text">
                <p class="header">Reach your audience and position your company as an industry resource. </p>
              </div>
            </div>
          </div>

          <div class="mt-5 mb-5 row">
            <div class="col-sm-4 col-12">
              <img src="https://res.cloudinary.com/oredev/image/upload/2018_web/partnership-4.jpg">
              <div class="text">
                <p class="header">Øredev provides you and your staff with the tools, inspiration and education you need to succeed. Stay current and get ahead of the business.</p>
              </div>
            </div>
            <div class="col-sm-4 col-12">
              <img src="https://res.cloudinary.com/oredev/image/upload/2018_web/partnership-5.jpg">
              <div class="text">
                <p class="header">Get maximum benefits with minimum downtime.</p>

              </div>
            </div>
            <div class="col-sm-4 col-12">
              <img src="https://res.cloudinary.com/oredev/image/upload/2018_web/partnership-6.jpg">
              <div class="text">
                <p class="header">Your employees will bring back new ideas to use in your company. Be the Best place to work at. With Øredev, take care of your employees need for personal development and recognition.</p>

              </div>
            </div>
          </div>
          <h2 class="pink">Previous partners include</h2>
          <p>Grafana, Riad, Atlassian,Oracle, Microsoft, Jayway, Sony Ericsson, Enea, SyBase, JavaBLACKbelt, Epsilon, Sigma, Alladin, Qi4j, Omicron, Test Automation FX, Prevas, Azul Systems, Det Norske Veritas, DevelopMentor, Informator, Endevo, Intel, SAS, Spring Source, Kaazing, Øresund IT, ÅF Engineering, IT Mill, Hewlet Packard, SUN Microsystems, Beijer Electronics, Aepona, Escenic, Infragistics, EDP Consult, Netviewer, Cornerstone, Projektplatsen, PMI, Gigaspaces, Quest Software, PC-Ware, Nohau, Ilog, BlackBerry, QlikView, Spree, JetBRAINS, AccuRev, Mobile Heights, K3, Nokia, Accenture, Tretton37, Avega Group, DevExpress, ContinuousTests, DatorMagazin, SwCG, InterSystems, Embarcadero, Telerik, Informator, Alfasoft, Aptitude, Symbio, Pluralsight, Tobii, XDIN, Hansoft, dexplora, InterSystems, ATIVE, King, Betsson, Neo4j, splunk, SafeNet, RavenDB, IBM, Webstep, TrueSec, Amazon Web Services, ipeer, Red Hat, Mozilla, Capgemini, FalconSocial, Mobenga, Avensia, ECRU Consulting, Data Ductus, Apptus, Lundalogik, Telavox, infomaker, SONY, Apptimate, presis, O'Reilly, 46 Elks, Softhouse, Bouvet, JustType, 4C Strategies, Signicat, Infomaker, Tactel, GitHub, StackOverflow, Edument, LivingIT.
          </p>

        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>
  </div>

  </template>

  <script>

    export default {
      name: 'partnership',
      data () {
        return {
        doctitle: 'Partnership - ' + this.$store.state.conferencename
        }
      }
    }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    img {
      max-width: 100%;
    }
  </style>
