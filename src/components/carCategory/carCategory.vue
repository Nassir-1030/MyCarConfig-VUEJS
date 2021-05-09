<template>
  <div class="car-category centered">
      <div class="content">
        <h1>Catégorie</h1>
        <p>Nom: {{ name }}</p>
        <div class="car-list">
            <h4>Voitures dans cette catégorie</h4>
            <ul v-if="cars.length > 0">
                <li v-for="car in cars" :key="car.id">
                    <router-link :to="{name: 'show-car', params: {id: car.id}}">{{ car.name }}</router-link>
                </li>
            </ul>
            <p v-else>Aucune voiture ne figure dans cette catégorie.</p>
        </div>
      </div>
      <div class="actions">
          <router-link :to="{name: 'edit-car-category', params: {id: id}}">
              <button>Modifier</button>
          </router-link>
          <!-- Allow deletion ONLY if there is no linked car -->
          <button @click="remove" v-if="cars.length === 0">Supprimer</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        id: {
            required: true,
            type: Number
        }
    },
    data(){
        return {
            name: null,
            cars: []
        }
    },
    methods: {
        remove(){
            axios.delete(`http://localhost:3000/car-categories/${this.id}`, {withCredentials: true}).then((response) => {
                if(response.status == 200){
                    this.$router.push({name: 'list-car-categories'})
                }
            });
        }
    },
    created(){
        axios.get(`http://localhost:3000/car-categories/${this.id}`, {withCredentials: true}).then((response) => {
            if(response.status === 200){
                this.name = response.data.name;
                if(response.data.cars) this.cars = response.data.cars;
            }
        })
    }
}
</script>

<style scoped>
.car-category{
    background: #2f7592;
    color: white;
    padding: 1%;
    text-align: left;
}

.car-category h1{
    text-align: start;
    margin-top: 0;
}

.car-list{
    margin-left: 1%;
}

.actions{
    margin-top: 1%;
}

.actions button{
    margin: .5%;
    background: #333333;
}
</style>