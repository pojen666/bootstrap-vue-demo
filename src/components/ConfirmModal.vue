<template>
  <b-modal
    v-model="isOpen"
    centered
    hide-footer
    hide-header-close
    :title="title"
    :header-bg-variant="headerBgVariant"
    :header-text-variant="headerTextVariant"
  >
    <p class="my-4">{{ message }}</p>
    <b-button :variant="buttonBg" class="mt-3" block @click="confirm()"
      >確認</b-button
    >
    <b-button variant="secondary" class="mt-3" block @click="close()"
      >取消</b-button
    >
  </b-modal>
</template>

<script>
import { ModalPlugin } from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(ModalPlugin)

export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      default: '系統訊息'
    },
    message: {
      type: String,
      default: '請確認是否執行操作'
    },
    headerBgVariant: {
      type: String,
      default: 'dark'
    },
    headerTextVariant: {
      type: String,
      default: 'light'
    },
    buttonBg: {
      type: String,
      default: 'dark'
    }
  },
  data: function() {
    return {
      isOpen: false,
      value: ''
    }
  },
  methods: {
    open(value) {
      this.value = ''
      this.isOpen = true
      if (value) {
        this.value = value
      }
    },
    close() {
      this.isOpen = false
      this.value = ''
    },
    confirm() {
      this.isOpen = false
      if (this.value) {
        this.$emit('confirm', this.value)
      }
      this.value = ''
    }
  }
}
</script>
