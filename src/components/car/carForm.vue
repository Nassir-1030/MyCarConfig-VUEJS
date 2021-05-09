<template>
  <form method="post" class="centered" action="http://localhost:3000/cars" @submit.prevent="save">
    <div class="form-field">
        <label for="car">Nom de la voiture*</label>
        <input type="text" name="car" id="car" required v-model="name">
    </div>
    <div class="form-field">
      <label for="config-car">Catégorie*</label>
      <select name="car" id="config-car" v-model="category" required>
        <option v-for="category in categories" :key="category.id" :value="category">{{ category.name }}</option>
      </select>
    </div>
    <button type="submit">{{ submitText }}</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: {
      require: true,
      type: Number
    }
  },
  data(){
    return {
      name: null,
      category: null,
      categories: []
    }
  },
  computed: {
    editMode(){
      return !!this.id;
    },
    submitText(){
      return this.editMode ? 'Modifier' : 'Créer'
    },
  },
  methods: {
    save(e){
      let url = e.target.action;

      if(this.editMode) url += '/' + this.id;

      axios({
        method: this.editMode ? 'put' : 'post',
        url: url,
        data: {
          name: this.name,
          categoryId: this.category.id
        },
        withCredentials: true
      }).then((response) => {
        if(response.status === 200 || response.status === 204){
          if(this.editMode) this.$router.push({name: 'show-car', params: {id: this.id}})
          else this.$router.push({name: 'list-cars'})
        }
      });
      }
  },
  created(){
    axios.get(`http://localhost:3000/car-categories`, {withCredentials: true}).then((response) => {
      if(response.status === 200) this.categories = response.data;
    });
    if(!this.editMode) return;
    axios.get(`http://localhost:3000/cars/${this.id}`, {withCredentials: true}).then((response) => {
      if(response.status === 200){
        this.name = response.data.name;
        this.category = response.data.category;
      }
    });
  }
}
</script>

<style>

</style>