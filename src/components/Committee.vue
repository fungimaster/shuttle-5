<template>

  <div class="about">
    <vue-headful
      :title="doctitle"

      />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <h1>Program Committee</h1>
          <p>These are the people that have poured days of their headspace into crafting the program for this year's Øredev. Once the tracks were sculpted, they spent countless hours getting the right person to take the stage and speak on the topic.</p>
          <p>Without them, there would be no program, or its quality would be vastly inferior. Without them, in other words, there would be no Øredev. Boundless thanks for being some of the most driven, competent, and fun people we know.</p>
          <h2>Feel like shaping Øredev?</h2>
          <p class="recruit">Do you want to help build one of the largest conferences in the Nordics? We are on the lookout for new committee members. Please, don't hesitate a second to get in touch at <a href="mailto:info@oredev.org">info@oredev.org</a>.</p>
          <div class="team">
            <div class="member" v-for="member in committee" v-bind:key="member.name">
              <img :src="member.image" />
              <div class="member-description">
                <h2>{{member.name}}</h2>
                <h3>{{member.track}}</h3>
                <p>{{member.description}}</p>
              </div>
            </div>
          </div>
        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>

  export default {
    name: 'committee',
    data () {
      return {
        doctitle: 'Program Committee - ' + this.$store.state.conferencename,
        committee: [
          {
            image: '/static/team/amelia.jpg',
            name: 'Amelia Barklid',
            track: `Queen of dough`
          },
          {
            image: '/static/committee/andreas.jpg',
            name: 'Andreas Back',
            track: `Architecture, Cloud`
          },
          {
            image: '/static/committee/carl-emil.jpg',
            name: 'Carl-Emil Kjellstrand',
            track: `Android`
          },
          {
            image: '/static/committee/einar.jpg',
            name: 'Einar Valgeirsson',
            track: `Android`
          },
          {
            image: '/static/team/emily.jpg',
            name: 'Emily Holweck',
            track: `Keynotes, theme`
          },
          {
            image: `/static/committee/jakob.jpg`,
            name: `Jakob Wolman`,
            track: `People & Teams`
          },
          {
            image: `/static/committee/jannik.jpg`,
            name: `Jannik Sundø`,
            track: `JVM`
          },
          {
            image: `/static/committee/johnny.jpg`,
            name: `Johnny Dang`,
            track: `Data`
          },
          {
            image: `/static/committee/louis.jpg`,
            name: `Louis Hansen`,
            track: `.NET`
          },
          {
            image: `/static/committee/marium.jpg`,
            name: `Marium Zulfiqar`,
            track: `Quality Assurance`
          },
          {
            image: `/static/committee/martin.jpg`,
            name: `Martin Rosén-Lidholm`,
            track: `People & Teams`
          },
          {
            image: `/static/committee/maryam.jpg`,
            name: `Maryam Sarrafkia`,
            track: `.NET`
          },
          {
            image: `/static/committee/peter.jpg`,
            name: `Peter Juhl Christiansen`,
            track: `JVM`
          },
          {
            image: `/static/committee/sigge.jpg`,
            name: `Sigurdur Birgisson`,
            track: `Quality Assurance`
          },
          {
            image: `/static/committee/stina.jpg`,
            name: `Stina Qvarnström`,
            track: `Web & Edge`
          },
          {
            image: `/static/team/tadeas.jpg`,
            name: `Tadeáš Peták`,
            track: `Holisticism, web, security`
          },
          {
            image: `/static/committee/tomas.jpg`,
            name: `Tomas Lycken`,
            track: `Architecture`
          },
        ]
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .team {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-column-gap: 5%;
    margin: 4rem 0 0;
    text-align:center;
  }
  .member {
    height: 400px;
  }
  .member img {
    border-radius: 200px;
    height: auto;
    max-width: 100%;
    margin-bottom: 1rem;
  }
  .member h2 {
    font-size: 1.4rem !important;
    margin-bottom: 0;
  }
  .member h3 {
    font-size: 1rem !important;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 991px) {
    .member {
      height: 340px;
    }
  }

  @media screen and (max-width: 767px) {
    .member {
      height: 260px;
    }
    .member h2 {
      font-size: .9rem !important;
    }
    .member h3 {
    font-size: .8rem !important;
  }
  }

  @media screen and (max-width: 420px) {
    .team {
      display: flex;
      flex-direction: column;
    }
    .member {
      height: auto;
      margin-bottom: 1rem;
    }
    .member h2 {
      font-size: 1.3rem !important;
    }
    .member h3 {
      font-size: 1.1rem !important;
    }
    .member img {
      max-width: 300px;
    }
  }
</style>
