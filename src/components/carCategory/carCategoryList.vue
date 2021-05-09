<template>
  <div>
    <div class="header-bar centered">
      <router-link :to="{name: 'new-car-category'}" class="button-link">
        Ajouter une nouvelle catégorie
      </router-link>
    </div>
    <div class="car-categories-list centered">
      <car-category-item @remove-category="deleteCategory" v-for="category in categories" v-bind="category" :key="category.id" class="car-categories-list-item" /> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import carCategoryItem from './carCategoryItem'

export default {
  components: {
    carCategoryItem
  },
  data(){
    return {
      categories: []
    }
  },
  methods: {
    deleteCategory(id){
      axios.delete(`http://localhost:3000/car-categories/${id}`, {withCredentials: true}).then((response) => {
        const configIndex = this.categories.findIndex((config) => config.id === id);
        this.categories.splice(configIndex, 1);
      });
    }
  },
  created(){
    axios.get('http://localhost:3000/car-categories', {withCredentials: true}).then((response) => {
      const categories = response.data;

      if(categories) this.categories = categories;
    }).catch((response) => {
      console.error(response);
    })
  }
}
</script>

<style>
.car-categories-list{
    color: white;
    text-align: center;
}

.car-categories-list-item{
    margin: 2.5% 0%;
    padding: 1%;
    background: #2f7592;
}
</style>