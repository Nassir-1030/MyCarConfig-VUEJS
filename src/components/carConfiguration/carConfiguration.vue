<template>
  <div class="car-configuration centered" v-if="carConfiguration">
    <div class="header">
      <h2>{{ carConfiguration.name }}</h2>
    </div>
    <div class="body">
      <div class="car">
        <h4>Voiture</h4>
        <router-link :to="{name: 'show-car', params: {id: carConfiguration.car.id}}">
          {{ carConfiguration.car.name }}
        </router-link>
      </div>
      <div class="user">
        <h4>Auteur</h4>
        <p>{{ carConfiguration.user.name }}</p>
      </div>
      <div class="options">
        <h4>Options</h4>
        <ul>
          <li v-for="(option, index) in optionsArray" :key="index">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
    <div class="actions">
      <router-link :to="{name: 'edit-car-configuration', params: {id: id}}">
        <button>Modifier</button>
      </router-link>
      <button @click="remove">Supprimer</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed:{
    optionsArray(){
      if(!this.carConfiguration.options) return [];
      return this.carConfiguration.options.split(',');
    }
  },
  methods: {
    remove(){
      axios.delete(`http://localhost:3000/car-configurations/${this.id}`, {withCredentials: true}).then((response) => {
        if(response.status === 200 || response.status === 204){
          this.$router.push('/')
        }
      });
    }
  },
  data(){
    return {
      carConfiguration: null
    }
  },
  created(){
    axios.get(`http://localhost:3000/car-configurations/${this.id}`, {withCredentials: true}).then((response) => {
      if(response.status === 200){
        this.carConfiguration = response.data;
      }
    });
  }
}
</script>

<style scoped>

.car-configuration{
  background: #3571a7;
  color: white;
  box-shadow: 0 2px 3px #a7a7a7;
  text-align: start;
  padding: 1.5%;
}

.car-configuration .actions{
  padding-top: 5px;
}

.car-configuration .actions button{
  margin-right: 1%;
  background: #505050;
}

.head{
  display: flex;
  justify-content: space-between;
}

.title{
  margin: 0 0 1% 0;
}

.sub-head{
  font-size: 75%;
  text-transform: uppercase;
  margin: 0;
  font-weight: lighter;
}
</style>