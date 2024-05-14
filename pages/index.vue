<script lang="ts" setup>
import {NButton} from "naive-ui"
</script>
<template>
  <div class="home-page">
    <div class="hero">
      <h1>快速小工具</h1>
      <p>have fun!!!</p>
    </div>
  </div>
</template>
<style scoped>
.home-page {
  .hero {
    text-align: center;
    color: #fff;
    padding: 4rem 0;
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
    }
    p {
      font-size: 1.2rem;
      color: #526488;
      word-spacing: 0.5rem;
      margin-top: 2rem;
    }
  }
  .features {
    padding: 1.5rem 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: space-around;
    .feature {
      flex-grow: 1;
      flex-basis: 200px;
      margin: 1.5rem;
      h2 {
        font-size: 1.25rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      p {
        color: #526488;
        word-spacing: 0.5rem;
      }
    }
  }
}
</style>
