<template>
  <form method="post" class="centered" action="http://localhost:3000/car-categories" @submit.prevent="save">
    <div class="form-field">
        <label for="category">Nom de la catégorie*</label>
        <input type="text" name="category" id="category" required v-model="name">
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
          name: this.name
        },
        withCredentials: true
      }).then((response) => {
        if(response.status === 200 || response.status === 204){
          if(this.editMode) this.$router.push({name: 'show-car-category', params: {id: this.id}})
          else this.$router.push({name: 'list-car-categories'})
        }
      });
      }
  },
  created(){
    if(!this.editMode) return;
    axios.get(`http://localhost:3000/car-categories/${this.id}`, {withCredentials: true}).then((response) => {
      if(response.status === 200) this.name = response.data.name
    });
  }
}
</script>

<style>

</style>