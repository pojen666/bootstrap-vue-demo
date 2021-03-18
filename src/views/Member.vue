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
            <div class="col-md-12 form-group row">
              <label class="col-md-2">員工編號</label>
              <div class="col-md-4">
                <input class="form-control" v-model="queryContext.no" />
              </div>
              <label class="col-md-2">員工姓名</label>
              <div class="col-md-4">
                <input class="form-control" v-model="queryContext.name" />
              </div>
            </div>
            <div class="col-md-12 form-group row">
              <label class="col-md-2">電子郵件</label>
              <div class="col-md-4">
                <input class="form-control" v-model="queryContext.email" />
              </div>
              <label class="col-md-2">行動電話</label>
              <div class="col-md-4">
                <input class="form-control" v-model="queryContext.mobile" />
              </div>
            </div>
          </b-card-body>
          <b-card-footer class="text-center">
            <b-button variant="success">查詢</b-button>
            <b-button variant="info">新增</b-button>
          </b-card-footer>
        </b-card>
        <br />
        <div>
          <b-table
            :striped="true"
            :bordered="true"
            :hover="true"
            :fixed="true"
            :fields="tableFields"
            :items="members"
            :head-variant="'dark'"
          >
          <template #cell(function)="data">
              <b-button @click="getMember(data.item.no)" variant="primary">印出編號</b-button>
          </template>
          </b-table>
        </div>
      </div>
    </b-form>
  </div>
</template>


<script>
import Vue from "vue";
import { FormPlugin } from "bootstrap-vue";
import { CardPlugin } from "bootstrap-vue";
import { TablePlugin } from "bootstrap-vue";

Vue.use(TablePlugin);
Vue.use(CardPlugin);
Vue.use(FormPlugin);

export default {
  name: "Member",
  data: function () {
    return {
      members: [
        {
          no: 87,
          name: "777",
          email: "test@test.com.tw",
          mobile: "0987777888",
        },
      ],
      queryContext: {
        no: "",
        name: "",
        email: "",
        mobile: "",
      },
      tableFields: [
        { key: "no", label: "員工編號" },
        { key: "name", label: "姓名" },
        { key: "email", label: "信箱" },
        { key: "mobile", label: "手機" },
        {key: 'function', label: '功能'}
      ],
    };
  },
  methods: {
    getMembers() {
      return this.members;
    },
    getMember(id) {
        alert(id);
    }
  },
};
</script>