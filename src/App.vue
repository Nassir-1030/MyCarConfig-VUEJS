<template>
  <div id="app">
    <div id="header">
      <h1>Configurateur de voitures</h1>
    </div>
    <div id="nav" v-if="isLoggedIn()">
      <router-link :to="{name: 'list-car-configuration'}">Configurations</router-link>
      <router-link :to="{name: 'list-cars'}">Voitures</router-link>
      <router-link :to="{name: 'list-car-categories'}">Catégories</router-link>
      <a @click.prevent="logout" style="margin-left: 1%; cursor: pointer;">Se déconnecter</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import CarConfigurationList from './components/carConfiguration/carConfigurationList.vue'

export default {
  components: {
    CarConfigurationList
  },
  methods:{
    isLoggedIn(){
      return localStorage.getItem('authenticated') == 'true'
    },
    logout(){
      axios.post('http://localhost:3000/logout', {}, {withCredentials: true}).finally((response) => {
        this.$router.push('/login');
        localStorage.setItem('authenticated', false);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 1.5%;
  display: block;
  background: rgb(236 236 236);
  margin: 0 auto 2.5%;
  width: 55%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 1%;
  margin: .5% 1%;
  text-decoration: none;
}

#nav a.router-link-exact-active, #nav a.router-link-active {
  color: #2f7592;
}

.header-bar{
  background: #ececec;
  margin: 1% auto;
  padding: .5%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 3px #d0d0d0;
}

.header-bar button{
  background: #354e69;
}

button, .button-link{
    padding: 1%;
    background: #354e69;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
}

button[type='submit']{
  background: #354e69;
}

.header-bar li{
  padding-right: 2%;
}

form{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  background: whitesmoke;
  box-shadow: 0px 1px 3px #b7b7b7;
}

.form-field{
  padding: 1%;
}

.form-field label, input, select, textarea{
  display: block;
}

.form-field label{
  margin: 1% .5%;
}

.form-field input, select, textarea{
  width:100%;
  box-sizing: border-box;
  padding: .5%;
}

.centered{
  width: 60%;
  padding: .5%;
  margin: 0.65% auto;
}

@media only screen and (max-width: 959px) {
  #nav{
    display: flex;
    flex-direction: column;
    width: 95%;
  }
  .centered{
    width: 95%;
  }
  .header-bar{
    flex-direction: column;
    margin-bottom: 1.5%;
    padding: 1.5%;
  }
  .header-bar a, .header-bar input{
    margin: 1.5% 0%;
    padding: 1%;
  }
  .head{
    flex-direction: column;
  }
  .head div{
    padding: 1% 0%;
  }
  select#car-filter{
    width: 100%;
  }
}
</style>
