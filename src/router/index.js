import Vue from 'vue'
import VueRouter from 'vue-router'
import carConfigurationList from '../components/carConfiguration/carConfigurationList'
import carConfigurationForm from '../components/carConfiguration/carConfigurationForm'
import carConfiguration from '../components/carConfiguration/carConfiguration'
import carCategoryList from '../components/carCategory/carCategoryList'
import carCategoryForm from '../components/carCategory/carCategoryForm'
import carCategory from '../components/carCategory/carCategory'
import Car  from '../components/car/car'
import CarForm  from '../components/car/carForm'
import CarList from '../components/car/carList'
import loginForm from '../components/authentication/loginForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: loginForm
  },
  {
    path: '/car-configurations',
    name: 'list-car-configuration',
    component: carConfigurationList,
    alias: '/' // https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect
  },
  {
    path: '/car-configurations/:id',
    name: 'show-car-configuration',
    component: carConfiguration,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id}
    }
  },
  {
    path: '/car-configurations/new',
    name: 'new-car-configuration',
    component: carConfigurationForm
  },
  {
    path: '/car-configurations/:id/edit',
    name: 'edit-car-configuration',
    component: carConfigurationForm,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id}
    }
  },
  {
    path: '/car-categories',
    name: 'list-car-categories',
    component: carCategoryList,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id}
    }
  },
  {
    path: '/car-categories/:id/edit',
    name: 'edit-car-category',
    component: carCategoryForm,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id}
    }
  },
  {
    path: '/car-categories/new',
    name: 'new-car-category',
    component: carCategoryForm
  },
  {
    path: '/car-categories/:id',
    name: 'show-car-category',
    component: carCategory,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id}
    }
  },
  {
    path: '/cars',
    name: 'list-cars',
    component: CarList
  },
  {
    path: '/cars/:id/edit',
    name: 'edit-car',
    component: CarForm,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id};
    }
  },
  {
    path: '/cars/new',
    name: 'new-car',
    component: CarForm
  },
  {
    path: '/cars/:id',
    name: 'show-car',
    component: Car,
    props: (route) => {
      const id = parseInt(route.params.id);
      return {id: id}
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authenticated') === 'true';

  if(to.name !== 'login' && !loggedIn) next({name: 'login'})
  else next()
});

export default router
