<template>
    <div class="wrap">
        <Form
        class="password-change"
        @submit="change_password"
        :validation-schema="password_shape"
        >
            <div class="title">비밀번호 변경</div>
            <div class="lock-img">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="60" viewBox="0 0 49 60" fill="none">
                <path d="M36.5 18C36.5 11.3726 36.1274 1 24.5 1C12.8726 1 12.5 11.3726 12.5 18" stroke="black" stroke-width="2"/>
                <rect x="1.5" y="19" width="46" height="40" rx="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="25" cy="35.5" r="4.5" fill="white" stroke="#BC4B5C" stroke-width="2"/>
                <path d="M25 41V47" stroke="#BC4B5C" stroke-width="2"/>
                </svg>
            </div>
            <div class="info">비밀번호를 변경 해주세요.</div>
            <div class="input-wrap">
                <Field
                type="password"
                name="password"
                placeholder="기존 비밀번호"
                @keypress="next"
                />
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                        <ErrorMessage name="password" />
                    </div>
                </div>
                <!-- <input @keypress="next" type="password" placeholder="새로운 비밀번호"> -->
                <Field
                type="password"
                name="changePassword"
                placeholder="새로운 비밀번호"
                @keypress="next"
                />
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                        <ErrorMessage name="changePassword" />
                    </div>
                </div>
                <Field
                type="password"
                name="changePassword_re"
                placeholder="새로운 비밀번호 확인"
                />
                <!--end::Input-->
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                        <ErrorMessage name="changePassword_re" />
                    </div>
                </div>
            </div>
            <button 
            class="btn-password-change" 
            type="submit"
            >
            비밀번호 변경</button>
        </Form>
    </div>
</template>

<script setup lang="ts">
import JwtService from "@/core/services/JwtService";
import router from "@/router";
import axios from "axios";
import { useForm, ErrorMessage, Field, Form } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    default: '사용할수 없는 값입니다.',
    required: (value) => {
      if (value.label == "Password") return '비밀번호를 입력해주세요.'
    },
    oneOf: '다음 값 중 하나여야 합니다.: ${values}',
    notOneOf: '다음 값 중 하나가 아니어야 합니다.: ${values}',
    notType: function notType(_ref) {
      var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
      var isCast = originalValue != null && originalValue !== value;

      if (type == 'number') {
        var msg = ' 숫자만 입력해주세요.';
      } else if (type == 'date') {
        var msg = ' 날짜 형식으로 입력해주세요.';
      } else {
        var msg = path + ' 항목은 `' + type + '` 형식으로 입력해주세요.';
      }

      return msg;
    },
    defined: '정의되지 않았습니다.',
  },
  string: {
    length: '${length}자로 입력해주세요.',
    min: '${min}자 이상 입력바랍니다.',
    max: '${max}자 까지 입력됩니다.',
  },
});

const password_shape = Yup.object().shape({
    password: Yup.string().required().min(4).label("Password"),
    changePassword: Yup.string().required().min(4).label("ChangePassword"),
    changePassword_re: Yup.string().required().min(4).oneOf([Yup.ref("changePassword"), null], "비밀번호가 일치하지 않습니다.").label("ChangePassword"),
});

const next = (e) => {
    if (e.key == 'Enter') {
        e.target.nextSibling.nextSibling.focus()
    }
}

// const valid = computed(() => {
//     password_shape.validate(values).then(function (value) {
//         return true
//     }).catch(function (err) {
//         return false
//     });
// })

// const enter = (e) => {
//     if (e.key == 'Enter') {
//         // change_password()
//     };
// }
const change_password = (data) => {
    console.log(data);
    

    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    axios.post('/auth/updatePassword', data, axios_config)
    .then(() => {
        alert('비밀번호 변경이 완료되었습니다.')
        router.go(0)
    })
    .catch((error) => {
        alert('비밀번호 변경에 실패했습니다.')
    })
}
</script>

<style lang="scss" scoped>
.wrap{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 48px;
    .password-change{
        padding: 40px;
        background: #fff;
        border-radius: 10px;
        .title{
            padding-bottom: 20px;
            width: 400px;
            border-radius: 8px 8px 0px 0px;
            border-bottom: 1px solid var(----kt-border-color, #EFF2F5);
            background: var(--default-white, #FFF);

            color: var(--primary-text, #222);
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .lock-img{
            margin: 36px 0;
            display: flex;
            justify-content: center;
        }
        .info{
            color: var(--primary-text, #222);
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .input-wrap{
            input{
                width: 100%;
                border-radius: 10px;
                background: var(----kt-input-solid-bg, #F5F8FA);
                height: 44px;
                padding: 10px 16px;
                border: none;
            }
            .fv-plugins-message-container{
                margin-bottom: 24px;

            }
        }
        .btn-password-change{
            width: 100%;
            padding: 12px 26px;
            border-radius: 6px;
            background: var(----el-color-info-light-8, #E9E9EB);
            border: none;

            color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
    }
}
</style>