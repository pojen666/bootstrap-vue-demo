<template>
  <div>
    <br />
    <b-container>
      <b-row>
        <b-col>
          <b-card
            border-variant="secondary"
            header="現在執行中的環境變數"
            header-bg-variant="secondary"
            header-border-variant="dark"
            header-text-variant="light"
            body-bg-variant="light"
            align="center"
          >
            <b-card-text class="text-left">
              <b-row v-for="envVariable in envVariables" :key="envVariable.key">
                <b-col md="3">{{ envVariable.key }}</b-col>
                <b-col md="9" class="bg-white">{{ envVariable.value }}</b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import { CardPlugin, LayoutPlugin } from 'bootstrap-vue'

Vue.use(LayoutPlugin)
Vue.use(CardPlugin)
export default {
  name: 'EnvVariable',
  data: function() {
    return { envVariables: this.transforEnvVariableToList() }
  },
  methods: {
    transforEnvVariableToList() {
      const envVariables = []
      Object.keys(process.env).forEach(key => {
        envVariables.push({ key: key, value: process.env[key] })
      })
      return envVariables
    }
  },
  created: function() {
    this.$store.dispatch('setTitle', '環境變數')
    console.log(process.env)
  }
}
</script>
