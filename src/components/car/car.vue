<template>
  <div class="car centered">
      <div class="content">
        <h1>Voiture</h1>
        <p>Nom: {{ name }}</p>
        <p v-if="category">Catégorie: <router-link :to="{name: 'show-car-category', params: {id: category.id}}">{{ category.name }}</router-link></p>
      </div>
      <div class="actions">
          <router-link :to="{name: 'edit-car', params: {id: id}}">
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
            required: true,
            type: Number
        }
    },
    data(){
        return {
            name: null,
            category: null
        }
    },
    methods: {
        remove(){
            axios.delete(`http://localhost:3000/cars/${this.id}`, {withCredentials: true}).then((response) => {
                if(response.status == 200){
                    this.$router.push({name: 'list-cars'})
                }
            });
        }
    },
    created(){
        axios.get(`http://localhost:3000/cars/${this.id}`, {withCredentials: true}).then((response) => {
            if(response.status === 200){
                this.name = response.data.name;
                this.category = response.data.category;
            }
        });
    }
}
</script>

<style scoped>
.car{
    background: #2f7592;
    color: white;
    padding: 1%;
    text-align: left;
}

.car h1{
    text-align: start;
    margin-top: 0;
}

.actions{
    margin-top: 1%;
}

.actions button{
    margin: .5%;
    background: #333333;
}
</style>