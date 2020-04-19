
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
           <h1>GAME SEARCH!</h1>
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important;"
          @submit.prevent="findGame"
        >
          <v-col class="d-flex" cols="12" sm="6">
            
            <v-select
              :items="sports"
              label="sports"
              v-model="parameters.sports"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="stadium"
              label="stadium"
              v-model="parameters.stadium"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="level"
              label="level"
              v-model="parameters.level"
              outlined
            ></v-select>
          </v-col>
          <v-row justify="center">
            <v-date-picker
              v-model="picker"
              :landscape="landscape"
              :reactive="reactive"
            ></v-date-picker>
          </v-row>
          <!-- Sign in button -->
          <center>
            <!-- <button @click="findGame">login</button> -->
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Find Games!
            </button>
          </center>
        </form>
      </div>
    </div>
    <div
      class="card col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"
      v-for="game in games"
      v-bind:key="game.gameId"
    >
      <img class="card-img-top" src="" alt="カードの画像" />
      <div class="card-body">
        <h5 class="card-title">
          {{ game.homeTeamId }} VS {{ game.awayTeamId }}
        </h5>
        <p class="card-text">{{ game.gameDate }} at {{ game.stadiumId }}</p>
        <router-link
          v-bind:to="{ name: 'gameDetail', params: { id: game.id } }"
          class="btn btn-primary"
          >詳細</router-link
        >
        <!-- <router-link v-bind:to="{ name : 'gameDetail', params : { id: game.id }}"></router-link> -->
      </div>
    </div>
    <!-- <div v-for="game in games" v-bind:key="game.gameId">
          {{game.homeTeamId}}:
        </div> -->
  </div>