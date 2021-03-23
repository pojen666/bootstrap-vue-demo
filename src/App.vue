<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top" :sticky="true">
      <b-navbar-nav class="w-100">
        <li class="col-4 no-padding-left d-flex align-items-center">
          <b-button variant="dark" class="align-items-center rounded-circle" v-b-toggle.main-sidebar>
            <b-icon icon="list" scale="1.25" variant="light"></b-icon>
          </b-button>
        </li>
        <b-nav-item class="col-4 d-flex justify-content-center align-items-center" disabled>
          <h4 class="font-weight-bold text-white">
            {{ title }}
          </h4>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-sidebar
      id="main-sidebar"
      title="選單"
      backdrop
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <b-list-group>
        <b-list-group-item class="side-menu-list-item">
          <router-link class="text-light" to="/">首頁</router-link>
        </b-list-group-item>
        <b-list-group-item class="side-menu-list-item text-light">
          <router-link class="text-light" :to="{ name: 'Employee' }"
            >系統開發團隊人員管理作業
          </router-link>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { SidebarPlugin, NavbarPlugin, ListGroupPlugin, IconsPlugin } from 'bootstrap-vue'

Vue.use(IconsPlugin)
Vue.use(SidebarPlugin)
Vue.use(NavbarPlugin)
Vue.use(ListGroupPlugin)

export default {
  computed: {
    title: function() {
      return this.$store.getters.title
    }
  }
}
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
  margin-left: 1px !important;
  margin-right: 1px !important;
}

.no-padding-left {
  padding-left: 0;
}
</style>
