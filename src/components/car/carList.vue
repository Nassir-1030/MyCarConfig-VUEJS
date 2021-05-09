<template>
  <div>
    <div class="header-bar centered">
      <router-link :to="{name: 'new-car'}" class="button-link">
          Ajouter une nouvelle voiture
      </router-link>
      <select name="sort_by_categories" id="car-filter" v-model="selectedCategoryId" aria-placeholder="Filtrer sur une catégorie">
          <option value="null" selected>Toutes catégories confondues</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <div class="car-list centered">
      <car-item v-for="car in carFilteredByCategories" :key="car.id" v-bind="car" class="car-list-item" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import carItem from './carItem'

export default {
    components: {
        carItem
    },
    data(){
        return {
            cars: [],
            categories: [],
            selectedCategoryId: null
        }
    },
    computed: {
        carFilteredByCategories(){
            if(this.selectedCategoryId && this.selectedCategoryId != 'null'){
                return this.cars.filter((car) => car.categoryId === this.selectedCategoryId);
            }
            return this.cars
        }
    },
    created(){
        axios.get('http://localhost:3000/cars', {withCredentials: true}).then((response) => {
            this.cars = response.data;
        });
        axios.get('http://localhost:3000/car-categories', {withCredentials: true}).then((response) => {
            this.categories = response.data;
        });
    }
}
</script>

<style scoped>
.car-list{
    color: white;
    text-align: center;
}

.car-list-item{
    margin: 2.5% 0%;
    padding: 1%;
    background: #2f7592;
}

select#car-filter{
    width: 50%;
}
</style>