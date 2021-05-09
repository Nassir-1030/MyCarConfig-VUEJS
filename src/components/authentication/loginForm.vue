<template>
  <div>
    <form action="http://localhost:3000/login" class="centered" @submit.prevent="login">
      <h1>Login</h1>
      <div class="form-field">
        <label for="name">Nom d'utilisateur</label>
        <input type="text" name="name" id="name" ref="name" required>
      </div>
      <div class="form-field">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" ref="password" required>
      </div>
      <div class="errors" v-if="error">
        <p class="error">{{ error }}</p>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      error: null
    }
  },
  methods:{
    login(e){
      const url = e.target.action,
        name = this.$refs.name.value,
        password = this.$refs.password.value;

      axios.post(url, {
        name: name,
        password: password
      }, {withCredentials: true})
      .then((response) => {
        if(response.status === 200 || response.status === 204){
          localStorage.setItem('authenticated', true);
          this.$router.push('/');
        }
      })
      .catch((error) => {
        if(error.request.status === 400){
          this.error = 'Requête incorrecte'
        }else if(error.request.status === 401){
          this.error = "L'utilisateur ou le mot de passe est incorrect.";
        }
      });
    }
  }
}
</script>

<style scoped>
.error{
  color: red;
}
</style>