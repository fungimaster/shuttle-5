<template>
  <div class="about">
    <vue-headful :title="doctitle" />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <h1>About Øredev</h1>
          <p>
            ØREDEV was founded in 2005 by
            <a
              href="https://jayway.com?utm_source=oredev"
              target="_blank"
            >Jayway</a>, a design driven software studio with offices in Malmö, Stockholm, Copenhagen, and Palo Alto. Øredev inherited Jayway's vision and philosophy.
          </p>
          <h2 class="pink">Our Vision</h2>
          <p>Øredev has its origins and focuses on the software development process, from programming to project management. We work to organize an event based on the concept of quality — for learning and networking — Sharing Knowledge.</p>
          <h2 class="pink">Our Philosophy</h2>
          <p>Having fun! Each year is unique with new topics, new speakers, and new challenges. As such, we have to constantly evolve and reinvent ourselves. This is both what makes our work fun and why we believe it's so important that others have fun as a result of our work.</p>

          <h2 class="pink">Our selves</h2>
          <p>
            We try to keep things nice and equal; for each being from the
            <i>sapiens</i> species, there's a much fluffier being from the
            <i>canis</i> genus.
          </p>

          <p>Between the three humans, we boast three nationalities, a huge variety of hair lengths — or lack thereof — and backgrounds. That's what reminds us every single day that diversity and equality are king and queen. Respectively.</p>

          <div class="team">
            <div class="member">
              <img src="/static/team/amelia.jpg" />
              <div class="member-description">
                <h2>Amelia Barklid</h2>
                <p>Amelia is a driven, straightforward, zero-bullshit Swede. Give her a task and she will execute it immaculately. Also, give her a puppy, and she’ll make it (literally) jump through hoops, win competitions, and get thousands of followers on Instagram.</p>
                <p>Who knows, maybe it’s her passion for dogs that has equipped her with abundant patience within the team; the patience so necessary to act as a lightning rod between Ted and Emily who are often overflowing with ideas and conflicting opinions on how things should be done.</p>
                <p>She loves football, and, although we call her The Little One, we gotta admit that she lives the most mature life of all the three of us.</p>
              </div>
            </div>

            <div class="member">
              <img src="/static/team/tadeas.jpg" />
              <div class="member-description">
                <h2>Tadeáš Peták</h2>
                <p>Tadeáš, the most recent addition to the Ø Team who often goes by Ted, was born at the heart of Europe where rivers abound in beer. He loves books and words, especially the mellifluous ones, and if you don’t cut him off, he might never stop throwing them at you.</p>
                <p>He’s rarely on time and although he claims it’s because he had lost ten minutes earlier in life that he never got back, it’s mostly because he gets stuck with people and enjoys it.</p>
                <p>Within the team, he’s sometimes referred to as The Dude and tries to plan his days a bit too much. This is where his passion for yoga and all things mindful gets helpful; slowly, at a glacier speed, it's teaching him to accept whatever comes his way and stay in the moment.</p>
              </div>
            </div>

            <div class="member">
              <img src="/static/team/emily.jpg" />
              <div class="member-description">
                <h2>Emily Holweck</h2>
                <p>
                  Emily has been cultivating and steering Øredev for the last eleven years. Apart from its binary blood, France runs through her veins — the boundless freedom of never-ending emerald vineyards, the appreciation for fantastic food, the disorderly creative vibe of
                  <em>les années folles</em> of the early 20th century Paris, the no-one-tells-me-what-to-do attitude stretching all the way back to Napoleonic times and beyond.
                </p>
                <p>She cares, as in really cares; about you and me, about Øredev, about everyone and everything that is worthy of being cared for. That’s why we call her Grandma. Emily loves Paul and while Amelia and Ted really like him, too, neither of us gets how she can be attracted to men this way. Recently, she’s got a puppy and it makes her the happiest plonker on this blue planet.</p>
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
  name: "about",
  data() {
    return {
      doctitle: "About Øredev - " + this.$store.state.conferencename
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 0 0;
}
.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
}
.member img {
  border-radius: 200px;
  height: auto;
  max-width: 100%;
  margin-bottom: 2rem;
}
.member h2 {
  font-size: 1.4rem !important;
  text-decoration: none;
}

@media screen and (max-width: 991px) {
  .member {
    width: 200px;
  }
}

@media screen and (max-width: 767px) {
  .member {
    width: 160px;
  }
  .member h2 {
    font-size: 0.9em !important;
  }
}

@media screen and (max-width: 576px) {
  .team {
    flex-direction: column;
  }
  .member {
    width: auto;
  }
  .member h2 {
    font-size: 1.3rem !important;
  }
  .member img {
    max-width: 300px;
  }
}
</style>
