<template>
  <div>
    <div class="header-bar centered">
      <router-link :to="{name: 'new-car-configuration'}" class="button-link">
        Ajouter une nouvelle configuration
      </router-link>
      <input type="search" placeholder="Rechercher une configuration" v-model="search">
    </div>
    <div class="car-configuration-list">
      <car-configuration-item @remove-config="deleteConfig" v-for="configuration in filteredConfigurations" v-bind="configuration" :key="configuration.id" /> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import carConfigurationItem from './carConfigurationItem.vue';

export default {
  components: { carConfigurationItem },
  data(){
    return {
      search: null,
      configurations: []
    }
  },
  methods: {
    deleteConfig(id){
      axios.delete(`http://localhost:3000/car-configurations/${id}`, {withCredentials: true})
        .then((response) => {
          const configIndex = this.configurations.findIndex((config) => config.id === id);
          this.configurations.splice(configIndex, 1);
        })
    }
  },
  computed: {
    filteredConfigurations(){
      if(!this.search) return this.configurations;

      const configurations = this.configurations.filter((config) => config.name.toUpperCase().indexOf(this.search.toUpperCase()) >= 0);
      return configurations;
    }
  },
  created(){
    axios.get('http://localhost:3000/car-configurations', {withCredentials: true}).then((response) => {
      const configurations = response.data;

      if(configurations) this.configurations = configurations;
    }).catch((response) => {
      console.error(response);
    })
  }
}
</script>

<style scoped>

</style>