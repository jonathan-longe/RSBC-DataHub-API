import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from "@/components/Admin";
import TwentyFourHourProhibition from "@/components/forms/TwentyFourHourProhibition/TwentyFourHourProhibition";
import TwelveHourProhibition from "@/components/forms/TwelveHourSuspension/TwelveHourProhibition";
import ImmediateRoadsideProhibition from "@/components/forms/ImmediateRoadsideProhibition";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/24Hour/:id',
      name: '24Hour',
      component: TwentyFourHourProhibition,
      props: true
    },
    {
      path: '/12Hour/:id',
      name: '12Hour',
      component: TwelveHourProhibition,
      props: true
    },
    {
      path: '/IRP/:id',
      name: 'IRP',
      component: ImmediateRoadsideProhibition,
      props: true
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 };
  }
})