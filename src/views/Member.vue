<template>
  <div>
    <h1 class="text-center">This is an Member page</h1>
    <b-form>
      <div class="col-md-12">
        <b-card no-body>
          <template #header>
            <h4 class="mb-0">資料篩選</h4>
          </template>
          <b-card-body>
            <div class="row">
              <b-form-group
                class="col-md-6"
                content-cols="8"
                label="ID"
                label-for="query-id-input"
                label-cols="4"
              >
                <b-form-input
                  id="query-id-input"
                  v-model="queryContext.no"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                class="col-md-6"
                content-cols="8"
                label="姓名"
                label-for="query-name-input"
                label-cols="4"
              >
                <b-form-input
                  id="query-name-input"
                  v-model="queryContext.name"
                  trim
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group
                class="col-md-6"
                content-cols="8"
                label="電子郵件"
                label-for="query-email-input"
                label-cols="4"
              >
                <b-form-input
                  id="query-email-input"
                  v-model="queryContext.email"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                class="col-md-6"
                content-cols="8"
                label="行動電話"
                label-for="query-mobile-input"
                label-cols="4"
              >
                <b-form-input
                  id="query-mobile-input"
                  v-model="queryContext.mobile"
                  trim
                ></b-form-input>
              </b-form-group>
            </div>
          </b-card-body>
          <b-card-footer class="text-center">
            <b-button-group>
              <b-button variant="success">查詢</b-button>
              <b-button variant="info" @click="openMemberModal()">
                新增
              </b-button>
            </b-button-group>
          </b-card-footer>
        </b-card>
      </div>
    </b-form>
    <br />
    <div class="col-md-12">
      <b-table
        striped
        bordered
        hover
        responsive
        :busy="isQuering"
        :fields="tableFields"
        :items="members"
        head-variant="dark"
      >
        <template #cell(function)="data">
          <b-button @click="getMember(data.item.no)" variant="secondary">
            印出編號
          </b-button>
        </template>
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </div>
    <b-modal
      @ok="handleSubmit"
      size="lg"
      v-model="isModalOpen"
      title="系統開發團隊人員資訊"
      header-bg-variant="dark"
      header-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      ok-title="提交"
      ok-variant="light"
      cancel-title="取消"
    >
      <b-form ref="editForm" class="was-validated">
        <div class="row">
          <b-form-group
            class="col-md-6"
            content-cols="8"
            label="ID"
            label-for="edit-id-input"
            label-cols="4"
            invalid-feedback="ID為必填欄位"
          >
            <b-form-input
              id="edit-id-input"
              v-model="target.no"
              trim
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="col-md-6"
            content-cols="8"
            label="姓名"
            label-for="edit-name-input"
            label-cols="4"
            invalid-feedback="姓名為必填欄位"
          >
            <b-form-input
              id="edit-name-input"
              v-model="target.name"
              trim
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group
            class="col-md-6"
            content-cols="8"
            label="電子郵件"
            label-for="edit-email-input"
            label-cols="4"
            invalid-feedback="電子郵件為必填欄位"
          >
            <b-form-input
              id="edit-email-input"
              v-model="target.email"
              trim
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="col-md-6"
            content-cols="8"
            label="行動電話"
            label-for="edit-mobile-input"
            label-cols="4"
            invalid-feedback="行動電話為必填欄位"
          >
            <b-form-input
              id="edit-mobile-input"
              v-model="target.mobile"
              trim
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import { FormPlugin } from 'bootstrap-vue';
import { CardPlugin } from 'bootstrap-vue';
import { TablePlugin } from 'bootstrap-vue';

Vue.use(TablePlugin);
Vue.use(CardPlugin);
Vue.use(FormPlugin);

export default {
  name: 'Member',
  data: function() {
    return {
      // 查詢出來的成員
      members: [],
      // 要新修的成員
      target: {
        no: '',
        name: '',
        email: '',
        mobile: ''
      },
      queryContext: {
        no: '',
        name: '',
        email: '',
        mobile: ''
      },
      tableFields: [
        { key: 'no', label: 'ID' },
        { key: 'name', label: '姓名' },
        { key: 'email', label: '信箱' },
        { key: 'mobile', label: '手機' },
        { key: 'function', label: '功能' }
      ],
      isQuering: false,
      isModalOpen: false
    };
  },
  methods: {
    getMembers() {
      return this.members;
    },
    getMember(id) {
      alert(id);
    },
    openMemberModal(id) {
      if (!id) {
        this.target = {
          no: '',
          name: '',
          email: '',
          mobile: ''
        };
        this.isModalOpen = true;
      }
    },
    checkFormValidity(form) {
      return form.checkValidity();
    },
    handleSubmit(okEvent) {
      okEvent.preventDefault();
      if (!this.checkFormValidity(this.$refs.editForm)) {
        return;
      } else {
        this.isModalOpen = false;
      }
    }
  }
};
</script>
