<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NConfigProvider } from "naive-ui";
export default defineComponent({
  name: "App",
  components: {
    NConfigProvider,
  },
  setup() {
    return {
      theme: ref<any>(null),
    };
  },
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
