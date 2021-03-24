<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top" :sticky="true">
      <b-navbar-nav class="w-100">
        <b-nav-text class="col-lg-4 d-none d-lg-block no-padding-between"></b-nav-text>
        <b-nav-text
          class="font-weight-bold text-light h4 col-lg-4 col-10 col-md-11 text-lg-center text-left no-padding-between"
        >
          {{ title }}
        </b-nav-text>
        <b-nav-text class="text-right col-lg-4 col-1 no-padding-between">
          <b-button
            variant="dark"
            class="align-items-center rounded-circle"
            v-b-toggle.main-sidebar
          >
            <b-icon icon="list" scale="1.25" variant="light"></b-icon>
          </b-button>
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
    <b-sidebar
      id="main-sidebar"
      title="選單"
      right
      backdrop
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <template #header="{ hide }">
        <strong>選單</strong>
        <b-button
          variant="dark"
          class="ml-auto align-items-center"
          @click="hide"
        >
          <b-icon-x></b-icon-x>
        </b-button>
      </template>
      <b-list-group>
        <b-list-group-item class="side-menu-list-item">
          <b-button variant="dark" @click="navigateTo('/')" block>
            首頁
          </b-button>
        </b-list-group-item>
        <b-list-group-item class="side-menu-list-item text-light">
          <b-button
            variant="dark"
            @click="navigateTo({ name: 'Employee' })"
            block
          >
            系統開發團隊人員管理作業
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import {
  SidebarPlugin,
  NavbarPlugin,
  ListGroupPlugin,
  IconsPlugin
} from 'bootstrap-vue'

Vue.use(IconsPlugin)
Vue.use(SidebarPlugin)
Vue.use(NavbarPlugin)
Vue.use(ListGroupPlugin)

export default {
  computed: {
    title: function() {
      return this.$store.getters.title
    }
  },
  methods: {
    navigateTo(url) {
      this.$router.push(url)
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

.no-padding-between {
  padding-left: 0;
  padding-right: 0;
}
</style>
