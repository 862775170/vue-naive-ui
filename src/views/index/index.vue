<template>
  <div style="height: calc(100vh); position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px">
        <div class="logo-ui">
          <n-image
            width="40"
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
        </div>
        <n-menu
          class="menu-ui"
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
        />
        <div class="avatar-ui">
          <n-avatar>{{ userInfo.username }}</n-avatar>
        </div>
      </n-layout-header>
      <n-layout-content
        content-style=""
        has-sider
        position="absolute"
        style="top: 64px"
      >
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { ref, DefineComponent, computed, h, createVNode } from "vue";
import { NIcon } from "naive-ui";

import { useRoute, useRouter, RouteRecordRaw, RouterLink } from "vue-router";
import { getUser } from "../../utils/auth";

function renderIcon(icon: any) {
  if (icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  } else {
    return null;
  }
}

const routerToMenu = (route: RouteRecordRaw) => {
  const label: string | unknown = route.meta?.title || route.name;
  const props = { to: { name: route.name } };
  const menu: Object = {
    label: () => h(RouterLink, props, { default: () => label }),
    key: route.name,
    icon: renderIcon(route.meta?.icon),
  };
  return menu;
};
export default {
  setup() {
    const activeKey = ref();
    const route = useRoute();
    const userInfo = ref({});
    const user = getUser() || {};
    userInfo.value = user;
    const menuOptions = computed(() => {
      return route.matched[0].children.map(routerToMenu);
    });

    return {
      activeKey,
      menuOptions,
      userInfo,
    };
  },
};
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 60px;
}
.logo-ui {
  flex: 0 0 200px;
}
.menu-ui {
  flex: 1 1 auto;
}
.avatar-ui {
  flex: 0 0 100px;
  display: flex;
  justify-content: flex-end;
}
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
