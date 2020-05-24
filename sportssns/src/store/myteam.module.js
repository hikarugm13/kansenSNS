import axios from "axios";
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
           
           addTeam(context, user) {
             axios
               .get(
                 "https://kansensns.herokuapp.com/api/auth/findFavoriteTeam",
                 {
                   params: {
                     userId: user.id,
                   },
                   headers: {
                     token: localStorage.getItem("jwt"),
                   },
                 }
               )
               .then((response) => {
                 //  console.log(response)
                 const team = response.data.favoriteTeam;
                 //  console.log(team)
                 context.commit("addTeam", team);
               });
           }
         }
       };
