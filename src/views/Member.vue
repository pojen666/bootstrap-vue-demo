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
                  v-model="queryContext.conditions.no"
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
                  v-model="queryContext.conditions.name"
                  trim
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group
                class="col-md-6"
                content-cols="8"
                label="電子郵件"
                label-for="query-mail-input"
                label-cols="4"
              >
                <b-form-input
                  id="query-mail-input"
                  v-model="queryContext.conditions.mail"
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
                  v-model="queryContext.conditions.mobile"
                  trim
                ></b-form-input>
              </b-form-group>
            </div>
          </b-card-body>
          <b-card-footer class="text-center">
            <b-button-group>
              <b-button variant="success" @click="getMembers()">查詢</b-button>
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
        :busy="page.isQuering"
        :fields="page.tableFields"
        :items="page.members"
        head-variant="dark"
      >
        <template #cell(function)="data">
          <b-button @click="openMemberModal(data.item.no)" variant="secondary">
            編輯
          </b-button>
          <b-button
            @click="openDeleteConfirmModal(data.item.no)"
            variant="danger"
          >
            刪除
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
      centered
      size="lg"
      id="edit-modal"
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
            label-for="edit-mail-input"
            label-cols="4"
            invalid-feedback="電子郵件格式錯誤"
          >
            <b-form-input
              id="edit-mail-input"
              type="email"
              v-model="target.mail"
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
              type="tel"
              v-model="target.mobile"
              trim
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </b-form>
      <template #modal-footer>
        <div class="w-100 text-center">
          <b-button type="button" variant="secondary" @click="handleSubmit()">
            提交
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="confirm-delete-modal"
      centered
      hide-footer
      title="確認刪除"
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p class="my-4">此操作將無法回復</p>
      <b-button variant="danger" class="mt-3" block @click="confirmDelete()"
        >確認</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormPlugin } from 'bootstrap-vue'
import { CardPlugin } from 'bootstrap-vue'
import { TablePlugin } from 'bootstrap-vue'

Vue.use(TablePlugin)
Vue.use(CardPlugin)
Vue.use(FormPlugin)

export default {
  name: 'Member',
  data: function() {
    return {
      // 要新修的成員
      target: this.createMemberObject(),
      page: {
        // 查詢出來的成員
        members: [],
        newMembers: [],
        deletedMemberNos: [],
        tableFields: [
          { key: 'no', label: 'ID' },
          { key: 'name', label: '姓名' },
          { key: 'mail', label: '信箱' },
          { key: 'mobile', label: '手機' },
          { key: 'function', label: '功能' }
        ],
        isQuering: false
      },
      queryContext: {
        conditions: {
          no: '',
          name: '',
          mail: '',
          mobile: ''
        }
      },
      deleteConfirmNo: ''
    }
  },
  methods: {
    createMemberObject() {
      return {
        no: '',
        name: '',
        mail: '',
        mobile: ''
      }
    },
    getMembers() {
      this.page.isQuering = true
      Vue.axios('members')
        .then(response => {
          if (response.status === 200) {
            this.page.members = response.data
            // 遍歷key值過濾查詢條件
            Object.keys(this.queryContext.conditions).forEach(key => {
              if (this.queryContext.conditions[key] !== '') {
                this.page.members = this.page.members.filter(member =>
                  member[key].includes(this.queryContext.conditions[key])
                )
              }
            })
            // 若在此次操作已經刪除則需移除
            this.page.deletedMemberNos.forEach(deletedNo =>
              this.deleteFromMembers(deletedNo)
            )
          } else {
            console.log(response)
          }
        })
        .finally(() => (this.page.isQuering = false))
    },
    getMember(no) {
      this.target = this.page.members.find(member => (member.no = no))
    },
    openMemberModal(no) {
      if (no) {
        this.target = this.getMember(no)
      } else {
        this.target = this.createMemberObject()
      }
      this.$bvModal.show('edit-modal')
    },
    openDeleteConfirmModal(no) {
      this.$bvModal.show('confirm-delete-modal')
      this.deleteConfirmNo = no
    },
    confirmDelete() {
      this.$bvModal.hide('confirm-delete-modal')
      this.page.deletedMemberNos.push(this.deleteConfirmNo)
      this.deleteFromMembers(this.deleteConfirmNo)
    },
    deleteFromMembers(no) {
      this.page.members.splice(
        this.page.members.findIndex(member => member.no === no),
        1
      )
    },
    checkFormValidity(form) {
      return form.checkValidity()
    },
    isDeleted(member) {
      return this.page.deletedMemberNos.findIndex(member.no) > -1
    },
    handleSubmit() {
      if (!this.checkFormValidity(this.$refs.editForm)) {
        return
      } else {
        this.page.newMembers.push(this.target)
        this.page.members.push(this.target)
        this.$bvModal.hide('edit-modal')
      }
    }
  }
}
</script>
