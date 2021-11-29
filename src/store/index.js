import Vue from "vue";
import Vuex from "vuex";
import { hcps } from './hcp2021'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    price1 :null, 
    price2: null, 
    price3: null,
    price4: null,
    count: 0,
    clubs: null,
    companies: null,
    maproom: "",
    speaker: {},
    conferencename: "Matchplay 2021",
    docimage:
      "https://res.cloudinary.com/dn3hzwewp/image/upload/v1573118127/matchplay/matchplay-new-logo-2020.png",
    userInfo: "Logga in",
    token: null,
    user: null,
    userId: null,
    games1: [],
    games2: [],
    games3: [],
    clublogosurl: null,
    images: null,
    competitions: [{
      _id: "8dmNL5K5ypaHbTbEM",
      hcps: hcps,
      competitionname: "2021",
      competitionpictureurl:
        "https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:60,co_rgb:000000,e_blur:300/v1631006181/matchplay/vinnare.jpg",
      finalteams: [
        {
          club: "Vadstena GK",
          name: "Johansson/Gustafsson",
        },
        {
          club: "Bollnäs GK",
          name: "Brosten/Sigvardsson",
        },
        {
          club: "Arninge GK",
          name: "Andersson/Hamilton",
        },
        {
          club: "PGA Sweden National",
          name: "Carlsson/Hall",
        },
        {
          club: "Örebro City GCC",
          name: "Sahlin/Jungander",
        },
        {
          club: "Bokskogen GK/Holms GK",
          name: "Wennolf/Ljungberg",
        },
        {
          club: "Lyckorna GK/Onsjö GK",
          name: "Landberg/Bengtsson",
        },
        {
          club: "Mauritzbergs SI/Göteborgs Golf",
          name: "Söderström/Wakeus",
        },
        {
          club: "Skepparslövs GK",
          name: "Kullberg/Johansson",
        },
        {
          club: "Örebro City GCC",
          name: "Andersson/Berggren",
        },
      ],
      presentation:
        "Matchplay Sweden är avgjort för detta året och vi säger stort grattis till vinnarna! Från Huvudtävlingen till Andra Chansen - ett stort tack för ert deltagande och på återseende nästa år.",
      special1: {
        ingress:
          "Plötsligt händer det - och här är ett exempel! Martin Ljunggren spelade sin match på Borås Norra bana och på hål 15, ett par 4 så hände det vi många enbart kommer att drömma om. Martin berättar",
        text: "Under gårdagens match mellan mig och Carl Lejon mot Markus Andersson och Peter Lindeberg hade jag lyckan att göra en HIO på hål nummer 15 på Borås norra banan. Slaget skedde med driver och hålet spelades strax över 300 m med tanke på flaggplacering och teeplacering. När vi inte kunde hitta bollen i närheten av green gick jag och tittade i koppen och chocken var total när bollen låg där",
        url: "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631006701/matchplay/hole_in_one.jpg",
      },
      special2: {
        ingress:
          "Gunnar Sivertsen - STORT GRATTIS till din HIO på Delsjö Golfklubb, hål 17 🏆 Tillsammans med Mike Dahl, Andreas Norrman och Christian Andersson som bevittnade det hela, så sällar sig nu Gunnar till den ärofulla klubben i Matchplays historia.",
        text: null,
        url: "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631283520/matchplay/hio.png",
      },
      stats: {
        age: 43,
        clubs: 232,
        hcp: 12.2,
        teams: 712,
      },
      video1: {
        bgimage:
          "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631006660/matchplay/videoimage2.png",
        headline: "Live från finaldagen 2021",
        text: "Sverigefinalen 2021 spelades på Allerums GK. Matcherna gick att följa live på hemsidan och på Facebook publicerades livesändningar likt denna.",
        url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F2991832374362345%2F&show_text=false&width=560&autoplay=true&t=0",
      },
      video2: {
        bgimage:
          "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631006653/matchplay/videoimage1.png",
        headline: "Dramatik in i det sista!",
        text: "All square in för sista och avgörande hålet! Arvid ligger pin high för en birdieputt och har inga slag på hålet. I andra laget har Jonatan på tre slag en chip på ca 10 meter och inga slag på hålet. Se den dramatiska upplösningen",
        url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F2779410105631927%2F&show_text=false&width=560&&autoplay=true&t=0",
      },
      winnersSF: [
        {
          club: "Kårsta GK",
          name: "Carlsson/Lindström",
        },
        {
          club: "Borås GK",
          name: "Lind/Strömberg",
        },
      ],
      winners: [
        {
          club: "Kårsta GK",
          name: "Carlsson/Lindström",
        }
      ],
      price:
      {
        imageurl: "https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:10,co_rgb:000000/v1631698312/matchplay/price2021text.png",
        destination: " Los Naranjos i Spanien den 7-11 november",
        text: "Boende på femstjärniga Gran Hotel Guadalpin Banus, ca 45 min sydväst om Malaga flygplats. Här väntade lyxiga rum med pool- & havsutsikt. <br/> <br/> Hotellet ligger utmed den långa sandstranden och har 10-15 min gångväg till marinan i Puerto Banus. Till svenskbekantningen Los Naranjos, där de båda finalrundorna spelas, är det mindre än 10 shuttle-minuter."
      },
    },

    {
      _id: "sFAc3dvrn2P9pXHAz",
      competitioninfo:
        "Matchplay är en matchspelstävling för par med officiellt handicap. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.",
      competitionname: "2020",
      competitionpictureurl:
        "https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:60,co_rgb:000000,e_blur:300/v1617895896/matchplay/bg_matchplay.jpg",
      finalteams: null,
      presentation:
        "Matchplay Sweden 2020 avgjordes en solig dag i oktober. Vinnarna fick hänga med på resan Los Naranjos. Som alltid ett stort tack för ert deltagande och återseende nästa år.",
      special1: null,
      stats: null,
      video1: {
        bgimage:
          "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631010958/matchplay/Nileskar.png",
        headline: "Intervju med Christiansson & Nileskär",
        text: "Med rutin från tidigare tävlingar och ett komplementerande spel tog Christiansson och Nileskär hem finalen.",
        url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F353100142577281%2F&show_text=false&width=560&&autoplay=true&t=0",
      },
      video2: {
        bgimage:
          "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631011152/matchplay/carnorwendin.png",
        headline: "Intervju med Carnor & Wedin",
        text: "Joel var i zonen när syskonparet tog hem segern.",
        url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F388256685545899%2F&show_text=false&width=560&autoplay=true&t=0",
      },

      winnersSF: [
        {
          club: "",
          name: "Carnor/Wedin",
        },
        {
          club: "",
          name: "Christiansson/ Nileskär",
        },
      ],
      winners: [
        {
          club: "",
          name: "Christiansson/ Nileskär",
        }
      ],
    }
    ]
  },
  getters: {
    getAllImages(state) {
      return state.images
    },
    isAuthenticated(state) {
      return state.token !== null;
    },
    getClubLogosUrls(state) {
      return state.clublogosurl
    },
    getGames1(state) {
      return state.games1;
    },
    getGames2(state) {
      return state.games2;
    },
    getGames3(state) {
      return state.games3;
    },
    numberOfGames3(state) {
      return state.games3.length;
    },
    userId(state) {
      return state.userId;
    },
    user(state) {
      return state.user;
    },
    clubs(state) {
      return state.clubs;
    },
    companies(state) {
      return state.companies;
    },
    isDefeated(state) {
      if (state.user && state.user.teams) {
        let status = state.user.teams[0].status;
        if (status === "Defeated") {
          return true;
        }
        return false;
      }
      return false;
    },
    getCompetition: (state) => (id) => {
      return state.competitions.filter(competition => competition.competitionname == id)[0]
    },
    price1: (state) => {
      return state.price1
    },
    price2: (state) => {
      return state.price2
    },
    price3: (state) => {
      return state.price3
    },
    price4: (state) => {
      return state.price4
    },
    isEarlyBirdie: (state) => {
      return state.isEarlyBirdie
    },
  },
  mutations: {
    SET_AUTHENTICATION: (state, { token, userId }) => {
      state.token = token;
      state.userId = userId;
    },
    SET_CLUBS: (state, payload) => {
      state.clubs = payload;
    },
    SET_COMPANIES: (state, payload) => {
      state.companies = payload;
    },
    //live
    SET_GAMES1: (state, payload) => {
      state.games1 = payload;
    },
    //upcmoing games
    SET_GAMES2: (state, payload) => {
      state.games2 = payload;
    },
    //played matches
    SET_GAMES3: (state, payload) => {
      state.games3 = payload;
    },
    SET_ALL_IMAGES: (state, payload) => {
      state.images = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    DELETE_USER: (state) => {
      state.user = null;
    },
    DELETE_AUTH_DATA: (state) => {
      state.token = null;
      state.userId = null;
    },
    SET_CLUBLOGOSURL: (state, payload) => {
      state.clublogosurl = payload;
    },
    SET_PRICE: (state, payload) => {
      state.price1 = payload.price1;
     
        if (state.isEarlyBirdie) {
          state.price1 = payload.price4
        } 
    
      state.price2 = payload.price2;
      state.price3 = payload.price3;
      state.price4 = payload.price4;
    },
    SET_EARLY_BIRDIE: (state, payload) => {
      const now = moment()
        const deadline = moment("2022-01-01" + " " + "00:00");
        if (now < deadline) {
          state.isEarlyBirdie = true
        } else {
          state.isEarlyBirdie = false
        }
    }
  },
  actions: {
    setClubsLogourl: ({ commit }, payload) => {
      commit("SET_CLUBLOGOSURL", payload);
    },
    deleteUserInfo: ({ commit }) => {
      commit("DELETE_USER");
    },
    deleteAuthData: ({ commit }) => {
      commit("DELETE_AUTH_DATA");
    },
    setAuthentication: ({ commit }, { token, userId }) => {
      commit("SET_AUTHENTICATION", { token, userId });
    },
    setClubs: ({ commit }, payload) => {
      commit("SET_CLUBS", payload);
    },
    setCompanies: ({ commit }, payload) => {
      commit("SET_COMPANIES", payload);
    },
    //live matches
    setGames1: ({ commit }, payload) => {
      commit("SET_GAMES1", payload);
    },
    setGames2: ({ commit }, payload) => {
      commit("SET_GAMES2", payload);
    },
    //played matches
    setGames3: ({ commit }, payload) => {
      commit("SET_GAMES3", payload);
    },
    setAllImages: ({ commit }, payload) => {
      commit("SET_ALL_IMAGES", payload);
    },
    setUser: ({ commit }, payload) => {
      commit("SET_USER", payload);
    },
    setEarlyBirdie: ({ commit },) => {
      commit("SET_EARLY_BIRDIE");
    },
    tryAutoLogin: ({ commit }) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("SET_AUTHENTICATION", {
        token,
        userId,
      });
    },
    getCompetition: ({ commit }, compid) => {
      return new Promise((resolve, reject) => {
        this.$axios
        axios
        .post("https://admin.matchplay.se/methods/" + "getCompetition", { id: compid })
        .then((response) => {
          commit("SET_PRICE", response.data)
          resolve()
        })
        .catch((error) => {
          console.log(error);
          reject()
        });
      })
      
    },
  },
});
