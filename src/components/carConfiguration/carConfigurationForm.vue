<template>
  <form action="http://localhost:3000/car-configurations" class="centered" method="post" @submit.prevent="save">
    <div class="form-field">
      <label for="config-name">Nom de la configuration*</label>
      <input type="text" name="name" id="config-name" v-model="name" required>
    </div>
    <div class="form-field">
      <label for="config-car">Voiture*</label>
      <select name="car" id="config-car" v-model="car" required>
          <option v-for="availableCar in cars" :key="availableCar.id" :value="availableCar">{{ availableCar.name }}</option>
      </select>
    </div>
    <div class="form-field">
      <label for="config-options">Options*</label>
      <textarea name="options" cols="30" rows="10" id="config-options" v-model="options" required></textarea>
    </div>
    <button type="submit">{{ submitText }}</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: {
      type: Number,
      required: false
    }
  },
  data(){
    return {
      cars: [],
      name: null,
      options: null,
      car: null,
    }
  },
  computed: {
    submitText(){
      return this.id ? 'Mettre à jour' : 'Créer'
    }
  },
  methods: {
    save(e){
      let url = e.target.action, userId, carId;

      if(this.id) url += '/' + this.id;

      if(!this.user){
        userId = 1;
      }

      axios({
        method: this.id ? 'put' : 'post',
        url: url,
        data: {id: this.id, name: this.name, carId: this.car.id, userId: userId, options: this.options},
        withCredentials: true
        }).then((response) => {
        if(response.status === 200){
          this.$router.push({name:'list-car-configuration'});
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  created(){
    axios.get('http://localhost:3000/cars', {withCredentials: true}).then((response) => {
      this.cars = response.data;
      if(this.id){
        axios.get(`http://localhost:3000/car-configurations/${this.id}`, {withCredentials: true}).then(
          (response) => { 
            if(response.status === 200){
              const config = response.data;
              this.name = config.name;
              this.options = config.options;
              this.car  = config.car;
            }
          }
        );
      }
    });
  }
}
</script>

<style scoped>
input[type="search"]{
  margin-left: 1%;
  width: 35%;
}
</style>