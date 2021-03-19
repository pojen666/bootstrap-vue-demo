<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-button v-b-toggle.main-sidebar>Menu</b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-sidebar
      id="main-sidebar"
      title="Menu"
      backdrop
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <b-list-group>
        <b-list-group-item class="side-menu-list-item">
          <router-link class="text-light" to="/">Home</router-link>
        </b-list-group-item>
        <b-list-group-item class="side-menu-list-item text-light">
          <router-link class="text-light" :to="{ name: 'Member' }"
            >Member
          </router-link>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import { SidebarPlugin, NavbarPlugin, ListGroupPlugin } from 'bootstrap-vue';

Vue.use(SidebarPlugin);
Vue.use(NavbarPlugin);
Vue.use(ListGroupPlugin);

export default {
  setup() {},
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.side-menu-list-item {
  background-color: #343a40 !important;
}

.btn {
  margin-left: 1px!important;
  margin-right: 1px!important;
}
</style>
