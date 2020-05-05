// import axios from "axios";
export const myteam = {
         namespaced: true,
         state: { teams: [] },
         mutations: {
           // ミューテーションを定義
           addTeam(state, team) {
            //  console.log(team)
             for (let i = 0; i < team.length; i++) {
               state.teams.push((state.teams.teamName = team[i].teamName));
             }
           }
         },
  actions: {
           
           async addTeam(context, user) {
             let response = await this.$http.get("api/auth/findFavoriteTeam",
              //  .get("http://localhost:8080/api/auth/findFavoriteTeam",
                 {
                 params: {
                   userId: user.id
                 },
                 headers: {
                   token: localStorage.getItem("jwt")
                 }
               })
                //  console.log(response)
                 const team = response.data.favoriteTeam;
                //  console.log(team)
                 context.commit("addTeam", team);
           }
         }
       };
