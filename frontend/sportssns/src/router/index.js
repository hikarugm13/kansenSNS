import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/",
    name: "signIn",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/signIn.vue")
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("../views/signUp.vue")
  },
  {
    path: "/findGame",
    name: "findGame",
    component: () => import("../views/FindGame.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/gameDetail/:id",
    name: "gameDetail",
    props: true,
    component: () => import("../views/GameDetail.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/postReview/:id",
    name: "postReview",
    props: true,
    component: () => import("../views/PostReview.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/reviewDetail/:id",
    name: "reviewDetail",
    props: true,
    component: () => import("../views/ReviewDetail.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/gameChat/:gameId",
    name: "gameChat",
    props: true,
    component: () => import("../views/GameChat.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/myPage/:id",
    name: "myPage",
    props: true,
    component: () => import("../views/MyPage.vue"),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
          next({
            path: "/"
          });
        } else {
          next();
        }
      } else {
        next();
      }
    }
  },
  {
    path: "/myCalendar/:id",
    name: "myCalendar",
    props: true,
    component: () => import("../views/MyCalendar.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/teamInfo/:teamName",
    name: "teamInfo",
    props: true,
    component: () => import("../views/Team.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem("jwt") == null) {
//       next({
//         path: "/"
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
export default router;
