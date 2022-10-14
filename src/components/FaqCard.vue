<template>
  <div>
    <div class="mb-5 p-3 shadow rounded">
      <span>
        <i v-if="icon" :class="icon" class="pb-3 pl-1 text-warning"></i>

        <h5 class="d-inline pb-3">
          {{ headline }}
        </h5>
      </span>
      <div
        class="accordion position-relative"
        role="tablist"
        v-for="(info, index) in information"
        :key="info.index"
      >
        <b-card no-body class="mb-3">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              variant="outline-warning text-dark"
              v-b-toggle="info.category * 99 + index + 'id'"
              class="text-uppercase text-left"
            >
              {{ index + 1 }}. {{ info.headline }}</b-button
            >
          </b-card-header>
          <b-collapse
            accordion="my-accordion"
            role="tabpanel"
            class="first"
            :id="info.category * 99 + index + 'id'"
          >
            <b-card-body>
              <b-card-text>
                <p v-html="info.text"></p>

                <span v-if="index === 0">
                  <router-link to="/register">Klicka här</router-link> för att
                  komma till anmälan direkt.
                </span>
                <div class="d-flex justify-content-center">
                  <b-img
                    v-if="info.imgurl1"
                    fluid
                    :src="info.imgurl1"
                    class="w-50"
                  ></b-img>
                  <b-img
                    v-if="info.imgurl2"
                    class="w-50"
                    fluid
                    :src="info.imgurl2"
                  ></b-img>
                </div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["headline", "information", "icon"],
  computed: {
    iconLower() {
      return this.icon.toLowerCase();
    },
  },
};
</script>