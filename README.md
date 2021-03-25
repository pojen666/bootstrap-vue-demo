# bootstrap-vue-demo
project for BootstrapVue

### BootstrapVue

[官方網站](https://bootstrap-vue.org/)

`安裝流程`

1.安裝
> yarn add bootstrap bootstrap-vue
> 
 or
> npm install bootstrap bootstrap-vue
>

2.main.js注入
```js 
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

3.在元件中只需注入需要的plugin就好
```js
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
```

### Vuelidate

[官方網站](https://vuelidate.js.org/)

`簡易流程`

1.安裝
>yarn add vuelidate
>
 or
>npm install vuelidate --save
>

2.在main.js注入
```js 
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
```

3.在元件中只需注入需要的validators就好
```js
import { validationMixin } from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin]
}
```

4.在data建立物件
```js
export default {
  mixins: [validationMixin],
  data: function() {
      return {
          target: {
              id: '',
              name: '',
              mail: '',
              mobile: ''
          }
      }
  }
}
```

5.建立驗證區塊，只要物件名稱跟data一致就會掛載上去

```js
export default {
  mixins: [validationMixin],
  data: function() {
      return {
          target: {
              id: '',
              name: '',
              mail: '',
              mobile: ''
          }
      }
  },
  validations: {
    // 針對data的target掛上監聽事件
    target: {
      id: {
        required,
        minLength: minLength(5),
        // 自定義Validator
        checkIdNotRepeat: function(value) {
          return this.checkIdNotRepeat(value)
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
          // 支援and
        requiredAndMinLength: and(required, minLength(10))
      }
    }
  }
}
```

6.表單驗證(只要驗證不通過就返回)
```js
function handleSubmit() {
    // 標示target內容為dirty
    this.$v.target.$touch()
    // target驗證是否不通過
    if ($v.target.$invalid) {
        return
    }
}
```

7.搭配dirty和error判定前端是否要顯示錯誤內容
```js
// 基本驗證回傳布林
validateState(name) {
  const { $dirty, $error } = this.$v.target[name]
  // 如果dirty則檢查是否有誤，反之則先回傳null(不顯示通過於否)
  return $dirty ? !$error : null
}
```

8.針對驗證結果顯示訊息(針對該物件驗證內容個別判斷是否通過)
```js
invalidIdFeedback() {
  if (!this.$v.target.id.required) {
    return 'ID為必填欄位'
  }
  if (!this.$v.target.id.minLength) {
    return 'ID長度不可小於5碼'
  }
  if (!this.$v.target.id.checkIdNotRepeat) {
    return 'ID不得重複'
  }
  return ''
}
```



## Dependency
node module | version | description
--- | --- | ---
vue-cli | 4.5.11 | cli for vue project management
vue | 2.6.11 | core vue module
bootstrap-vue | 2.21.2 | framwork base by vue and bootstrap
bootstrap | 4.6.0 | bootstrap module for styling
axios | 0.21.1 | axios module for ajax
vuelidate | 0.7.6 | a library for validator