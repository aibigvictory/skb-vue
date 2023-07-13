<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-left mb-10">
        <!--begin::Logo-->
        <!-- <h1 class="text-dark mb-3">로고</h1> -->
        <div class="logo">
          <img src="@/assets/img/SK-broadban2d.png" alt="">
        </div>
        <!--end::Logo-->
        <!--begin::Title-->
        <h1 class="text-dark mb-3">로그인</h1>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">이메일</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">비밀번호</label>
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> 로그인 </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        <!--begin::Separator-->
        <div class="text-center text-muted text-uppercase fw-bold mb-5"><hr></div>
        <!--end::Separator-->
        <router-link to="/sign-up" class="text-muted text-decoration-underline fw-bold">
          회원가입
        </router-link>
        <div class="text-left text-muted text-uppercase fw-bold mb-5 mt-5 me-10 ms-10">로그인 시 문의사항은 내선번호 221로 연락을 주시면 지원을 받으실 수 있습니다.</div>
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    default: '사용할수 없는 값입니다.',
    required: (value) => {
      if (value.label == "Email") return '이메일을 입력해주세요.'
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

      // if (value === null) {
      //   msg +=
      //     '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`';
      // }

      return msg;
    },
    defined: '정의되지 않았습니다.',
  },
  string: {
    length: '${length}자로 입력해주세요.',
    min: '${min}자 이상 입력바랍니다.',
    max: '${max}자 까지 입력됩니다.',
    email: '올바른 형식의 이메일을 입력해 주세요.',
  },
});

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.dispatch(Actions.LOGIN, values);
      const [errorName] = Object.keys(store.getters.getErrors);
      const error = store.getters.getErrors[errorName];

      // if (!error) {
      //   Swal.fire({
      //     text: "You have successfully logged in!",
      //     icon: "success",
      //     buttonsStyling: false,
      //     confirmButtonText: "Ok, got it!",
      //     customClass: {
      //       confirmButton: "btn fw-semobold btn-light-primary",
      //     },
      //   }).then(function () {
      //     
      //   });
      // } else
      if (error) {
        Swal.fire({
          text: `이메일 또는 비밀번호를 확인 후 다시 시도해 주세요.`,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "창 닫기",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
      else {
        // Go to page after successfully login
        router.push({ name: "dashboard" });
      }
      // else {
      //   Swal.fire({
      //     text: `관리자 승인 후 사용 가능 가능합니다. 담당자에게 문의 요청 바랍니다.`,
      //     icon: "error",
      //     buttonsStyling: false,
      //     confirmButtonText: "창 닫기",
      //     customClass: {
      //       confirmButton: "btn fw-semobold btn-light-danger",
      //     },
      //   });
      // }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
    };
  },
});
</script>

<style scoped>
.logo{
  width: 50%;
  margin-bottom: 30px;
}
</style>