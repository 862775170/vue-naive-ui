<template>
  <n-form :model="model" ref="formRef">
    <n-form-item path="username" label="用户名">
      <n-input v-model:value="model.username" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="密  码">
      <n-input
        type="password"
        v-model:value="model.password"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-button round type="primary" @click="onClickSubmit"> 登录 </n-button>
  </n-form>
</template>

<script lang="ts">
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import request from "../../plugns/request";
import { setToken, setUser } from "../../utils/auth";
const postLogin = (data: Object) => {
  return request({
    url: "login",
    method: "post",
    data,
  });
};
export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const router = useRouter();
    const modelRef = ref({
      username: null,
      password: null,
    });
    return {
      model: modelRef,
      formRef,
      onClickSubmit: () => {
        postLogin(modelRef.value)
          .then(({ data: { header, payload } }) => {
            const { token } = header;
            setToken(token);
            setUser(payload);
            router.push({ name: "Index" });
            message.success("登录成功");
          })
          .catch((resp) => {
            message.error("用户名或者密码错误");
          });
      },
    };
  },
});
</script>

<style scoped></style>
