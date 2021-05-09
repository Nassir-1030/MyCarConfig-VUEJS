<template>
  <div @click="show">
      <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
    props: {
        id: {
            required: true,
            type: Number
        },
        name: {
            required: true,
            type: String
        }
    },
    methods: {
        show(){
            this.$router.push({name: 'show-car', params: {id: this.id}})
        }
    }
}
</script>

<style scoped>
div{
    cursor: pointer;
}
</style>