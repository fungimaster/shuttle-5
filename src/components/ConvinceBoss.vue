<template>
  <div class="privacy">
    <vue-headful
    :title="doctitle"

    />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <h1>Convince your boss</h1>
          <h2 class="mt-xl-5">Get a yes from your boss!</h2>
          <p>Here are some useful arguments in case your manager does not realize the benefits of your participation at Øredev.<br><br>In today’s world where knowledge is power, it should come as no surprise that the most valuable asset for any business is the knowledge of its employees. And within our current knowledge-based economy, competent and confident employees are the foundation for a successful business.</p>
          <ul>
            <li>Meet the greatest minds in the industry at one place, no need to travel!</li>
            <li>Discuss issues from your daily work with experts.</li>
            <li>Discover and learn about the next generation of tools and methods within your line of work.</li>
            <li>Master a brand new framework or technique at one of&nbsp;our workshops.</li>
            <li>Meet colleagues and exchange experiences — Øredev is a great place to mingle and make new contacts.</li>
            <li>Broaden your knowledge since Øredev covers the whole software development cycle.</li>
            <li>Get inspired!</li>
          </ul>
          <p><br>Back at your workplace, you can use the videos to explain the key takeaways to your colleagues. Let your boss know what's in it both for your current and future customers!</p>
          <h2 class="mt-xl-5">Our Best Tip: Put It In Writing!</h2>
          <p>Take the time to analyze Øredev on paper, give it to your boss, then follow up with a verbal request, your boss will know you are serious.<br>&nbsp;<br>Sure, it takes time. But if you're routinely turned down for conference attendance, it is hurting your personal development in addition to missing opportunities to improve your company's operations.</p>
          <p>Here is a model of letter you could be inspired by:</p>
          <p><em>Dear *Approving Manager*,</em><br><br><em>I am writing to request your approval to attend the Øredev Conference, taking place November 6-8, 2019 in Malmö. This valuable event offers a comprehensive educational program, including sessions on topics directly related to our current and future business.</em></p>
          <p><em>By attending this event I expect to learn how to *implement the latest trends* and *emerging technologies*. </em><br><br><em>More than 1300 developers, managers, and executives from around the world are attending this event. Several activities are scheduled where I will be able to network with these attendees to learn about how other companies tackle technical challenges.</em><br><br><em>I will also participate in the following sessions:</em><br><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><em>Session Title __________________________________________</em><br><br><em>The conference fee is 13,800 SEK - It includes breakfast and lunch each day and dinner two evenings, as well as networking activities and special events, and exhibit hall entry. </em><br><br><em>I plan to return with valuable recommendations and best practices for improving our *project* and *team*. I would appreciate your approval as soon as possible in order to maximize both conference and travel discounts.</em><br><br><em>Sincerely,</em><br><em>[Name]</em><br><em>[Title]</em></p>
          <h2 class="mt-xl-5">Good luck!</h2>
        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'convinceboss',
    data () {
      return {
        doctitle: 'Convince you boss - ' + this.$store.state.conferencename
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
