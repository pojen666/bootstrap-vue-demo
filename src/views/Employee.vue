<template>
  <div>
    <h1 class="text-center">This is an Employee page</h1>
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
                  v-model="queryContext.conditions.id"
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
              <b-button variant="success" @click="getEmployees()"
                >查詢</b-button
              >
              <b-button variant="info" @click="openEmployeeModal()">
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
        id="employee-table"
        striped
        bordered
        hover
        responsive
        per-page="10"
        :current-page="queryContext.currentPage"
        :busy="page.isQuering"
        :fields="page.tableFields"
        :items="page.employees"
        head-variant="dark"
      >
        <template #cell(index)="data"> 
          {{data.index + 1}}
        </template>
        <template #cell(id)="data">
          {{ data.item.id | idMask }}
        </template>
        <template #cell(mail)="data">
          {{ data.item.mail | toUpperCase }}
        </template>
        <template #cell(mobile)="data">
          {{ data.item.mobile | mobileMask }}
        </template>
        <template #cell(function)="data">
          <b-button
            @click="openEmployeeModal(data.item.id)"
            variant="secondary"
          >
            編輯
          </b-button>
          <b-button
            @click="openDeleteConfirmModal(data.item.id)"
            variant="danger"
          >
            刪除
          </b-button>
        </template>
        <template #table-busy>
          <div class="text-center text-dark my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
      <b-pagination
        v-model="queryContext.currentPage"
        :total-rows="totoalPages"
        per-page="10"
        aria-controls="employee-table"
      ></b-pagination>
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
    >
      <b-form ref="editForm" @submit="handleSubmit()">
        <div class="row">
          <b-form-group
            class="col-md-6"
            content-cols="8"
            label="ID"
            label-for="edit-id-input"
            label-cols="4"
            :invalid-feedback="invalidIdFeedback"
          >
            <b-form-input
              :readonly="!isNewEditForm"
              type="number"
              id="edit-id-input"
              v-model="$v.target.id.$model"
              :state="validateState('id')"
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
              v-model="$v.target.name.$model"
              :state="validateState('name')"
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
              v-model="$v.target.mail.$model"
              :state="validateState('mail')"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="col-md-6"
            content-cols="8"
            label="行動電話"
            label-for="edit-mobile-input"
            label-cols="4"
            invalid-feedback="行動電話為必填欄位且不得小於10碼"
          >
            <b-form-input
              id="edit-mobile-input"
              type="tel"
              v-model="$v.target.mobile.$model"
              :state="validateState('mobile')"
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
    <confirm-modal
      title="確認刪除"
      message="此操作將無法回復"
      ref="delelteConfirmModal"
      button-bg="danger"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { FormPlugin, CardPlugin, TablePlugin } from 'bootstrap-vue'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import ConfirmModal from '../components/ConfirmModal.vue'

Vue.use(TablePlugin)
Vue.use(CardPlugin)
Vue.use(FormPlugin)

export default {
  name: 'Employee',
  components: {
    confirmModal: ConfirmModal
  },
  mixins: {
    validationMixin
  },
  data: function() {
    return {
      // 要新修的成員
      target: this.createEmployeeObject(),
      page: {
        // 查詢出來的成員
        employees: [],
        newEmployees: [],
        deletedEmployeeIds: [],
        tableFields: [
          { key: 'index', label: '#' },
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: '姓名', sortable: true },
          { key: 'mail', label: '信箱', sortable: true },
          { key: 'mobile', label: '手機', sortable: true },
          { key: 'function', label: '功能' }
        ],
        isQuering: false
      },
      queryContext: {
        conditions: {
          id: '',
          name: '',
          mail: '',
          mobile: ''
        },
        currentPage: 1
      },
      isNewEditForm: true
    }
  },
  computed: {
    totoalPages() {
      return this.page.employees.length
    },
    invalidIdFeedback() {
      if (this.target.id && this.target.id.length >= 5) {
        return 'ID不得重複'
      } else {
        return 'ID為必填欄位且不得小於5碼'
      }
    }
  },
  filters: {
    idMask(value) {
      return value.toString().replace(/^(.{2})(.{3})(.*)$/, '$1***')
    },
    toUpperCase(value) {
      return value.toUpperCase()
    },
    mobileMask(value) {
      return value.replace(
        /(.{4})(.{1})(.{1})(.{1})(.{1})(.{1})(.{1})(.*)/,
        '$1*$3*$5*$7$8'
      )
    }
  },
  // 掛載驗證
  validations: {
    // 針對data的target掛上監聽事件
    target: {
      id: {
        required,
        minLength: minLength(5),
        checkFormIdValidity: function(value) {
          return this.checkFormIdValidity(value)
        }
      },
      name: {
        required
      },
      mail: {
        email,
        required
      },
      mobile: {
        required,
        minLength: minLength(10)
      }
    }
  },
  methods: {
    createEmployeeObject(source) {
      if (source) {
        return JSON.parse(JSON.stringify(source))
      } else {
        return {
          id: '',
          name: '',
          mail: '',
          mobile: ''
        }
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.target[name]
      return $dirty ? !$error : null
    },
    checkRequired(value) {
      return value.length > 0
    },
    checkFormIdValidity(value) {
      if (value) {
        if (this.isNewEditForm) {
          return (
            this.page.employees.find(
              employee => employee.id.toString() === value
            ) === undefined
          )
        } else {
          return true
        }
      } else {
        return false
      }
    },
    getEmployees() {
      this.page.isQuering = true
      Vue.axios('employees')
        .then(response => {
          if (response.status === 200) {
            this.page.employees = response.data
            this.page.employees = this.page.employees.concat(
              this.page.newEmployees
            )
            // 遍歷key值過濾查詢條件
            Object.keys(this.queryContext.conditions).forEach(key => {
              if (this.queryContext.conditions[key] !== '') {
                this.page.employees = this.page.employees.filter(employee =>
                  employee[key]
                    .toString()
                    .includes(this.queryContext.conditions[key])
                )
              }
            })
            // 若在此次操作已經刪除則需移除
            this.page.deletedEmployeeIds.forEach(deletedId =>
              this.deleteFromEmployees(deletedId)
            )
          } else {
            console.log(response)
          }
        })
        .catch(error => console.log(error))
        .finally(() => (this.page.isQuering = false))
    },
    getEmployee(id) {
      return this.page.employees.find(employee => employee.id === id)
    },
    openEmployeeModal(id) {
      if (id) {
        this.target = this.createEmployeeObject(this.getEmployee(id))
        this.isNewEditForm = false
      } else {
        this.target = this.createEmployeeObject()
        this.isNewEditForm = true
      }
      this.$bvModal.show('edit-modal')
    },
    openDeleteConfirmModal(id) {
      this.$refs.delelteConfirmModal.open(id)
    },
    confirmDelete(id) {
      this.page.deletedEmployeeIds.push(id)
      this.deleteFromEmployees(id)
    },
    deleteFromEmployees(id) {
      this.page.employees.splice(
        this.page.employees.findIndex(employee => employee.id === id),
        1
      )
    },
    checkFormValidity(form) {
      return form.checkValidity()
    },
    isDeleted(employee) {
      return this.page.deletedEmployeeIds.findIndex(employee.id) > -1
    },
    handleSubmit() {
      this.$v.target.$touch()
      if (this.$v.target.$anyError) {
        return
      } else {
        let oldEmployee = this.getEmployee(this.target.id)
        if (oldEmployee !== undefined) {
          oldEmployee = Object.assign(oldEmployee, this.target)
        } else {
          const newEmployee = this.createEmployeeObject(this.target)
          this.page.newEmployees.push(newEmployee)
          this.page.employees.push(newEmployee)
        }
        this.target = {}
        this.$bvModal.hide('edit-modal')
      }
    }
  }
}
</script>
