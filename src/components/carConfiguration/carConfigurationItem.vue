<template>
  <div class="car-configuration centered">
    <div class="head">
      <h3 class="title">
        {{ name | capitalize }}
      </h3>
      <div class="sub-head">Configuration <strong class="">{{ car.name }}</strong> crée par <strong class="">{{ user.name }}</strong></div>
    </div>
    <div class="options">
      <ul>
        <li style="padding: 10px;" v-for="(option, index) in optionArray" :key="index">
          {{ option }}
        </li>
      </ul>
    </div>
    <div class="actions">
      <router-link :to="{name: 'show-car-configuration', params: {id: id}}"><button>Voir</button></router-link>
      <router-link :to="{name: 'edit-car-configuration', params: {id: id}}"><button>Modifier</button></router-link>
      <button @click="remove">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: String,
      required: false
    },
    user: {
      type: Object,
      required: true
    },
    car: {
      type: Object,
      require: true
    }
  },
  computed: {
    optionArray(){
      return this.options.split(',');
    }
  },
  methods: {
    remove(){
      this.$emit('remove-config', this.id);
    }
  },
  filters: {
    capitalize(value){
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
}
</script>

<style scoped>
.car-configuration{
  background: #3571a7;
  color: white;
  box-shadow: 0 2px 3px #a7a7a7;
  text-align: start;
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