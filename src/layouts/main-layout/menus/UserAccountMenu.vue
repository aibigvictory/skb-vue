<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-2">
        <!--begin::Avatar-->
        <!-- <div class="symbol symbol-50px me-5">
          <img alt="Logo" src="media/avatars/300-1.jpg" />
        </div> -->
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column px-5">
          <div class="d-flex align-items-center fs-5">
            {{userEmail}}
          </div>
          <div class="fw-semobold fs-5"
            >{{userTeam}}
          </div>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->


    <div v-if="false">
      <!--begin::Menu separator-->
      <div class="separator my-2"></div>
      <!--end::Menu separator-->
      <!--begin::Menu item-->
      <div class="menu-item px-5">
        <router-link to="/pages/profile/overview" class="menu-link px-5">
          My Profile
        </router-link>
      </div>
      <!--end::Menu item-->

      <!--begin::Menu item-->
      <div class="menu-item px-5">
        <router-link to="/pages/profile/overview" class="menu-link px-5">
          <span class="menu-text">My Projects</span>
          <span class="menu-badge">
            <span class="badge badge-light-danger badge-circle fw-bold fs-7"
              >3</span
            >
          </span>
        </router-link>
      </div>
      <!--end::Menu item-->

      <!--begin::Menu item-->
      <div
        class="menu-item px-5"
        data-kt-menu-trigger="hover"
        data-kt-menu-placement="left-start"
        data-kt-menu-flip="center, top"
      >
        <router-link to="/pages/profile/overview" class="menu-link px-5">
          <span class="menu-title">My Subscription</span>
          <span class="menu-arrow"></span>
        </router-link>

        <!--begin::Menu sub-->
        <div class="menu-sub menu-sub-dropdown w-175px py-4">
          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <router-link to="/pages/profile/overview" class="menu-link px-5">
              Referrals
            </router-link>
          </div>
          <!--end::Menu item-->

          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <router-link to="/pages/profile/overview" class="menu-link px-5">
              Billing
            </router-link>
          </div>
          <!--end::Menu item-->

          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <router-link to="/pages/profile/overview" class="menu-link px-5">
              Payments
            </router-link>
          </div>
          <!--end::Menu item-->

          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <router-link
              to="/pages/profile/overview"
              class="menu-link d-flex flex-stack px-5"
            >
              Statements

              <i
                class="fas fa-exclamation-circle ms-2 fs-7"
                data-bs-toggle="tooltip"
                title="View your statements"
              ></i>
            </router-link>
          </div>
          <!--end::Menu item-->

          <!--begin::Menu separator-->
          <div class="separator my-2"></div>
          <!--end::Menu separator-->

          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <div class="menu-content px-3">
              <label
                class="form-check form-switch form-check-custom form-check-solid"
              >
                <input
                  class="form-check-input w-30px h-20px"
                  type="checkbox"
                  value="1"
                  checked="checked"
                  name="notifications"
                />
                <span class="form-check-label text-muted fs-7">
                  Notifications
                </span>
              </label>
            </div>
          </div>
          <!--end::Menu item-->
        </div>
        <!--end::Menu sub-->
      </div>
      <!--end::Menu item-->

      <!--begin::Menu item-->
      <div class="menu-item px-5">
        <router-link to="/pages/profile/overview" class="menu-link px-5">
          My Statements
        </router-link>
      </div>
      <!--end::Menu item-->
    </div>

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5 my-1" v-if="userType == 8 || userType == 9">
      <router-link to="/company/list" class="menu-link px-5">
        업체정보
      </router-link>
    </div>
    <div class="menu-item px-5 my-1" v-if="userType == 8 || userType == 9">
      <router-link to="/user/list" class="menu-link px-5">
        사용자 정보
      </router-link>
    </div>
    <div class="menu-item px-5 my-1" v-if="userType == 8 || userType == 9">
      <router-link to="/manage/file" class="menu-link px-5">
        관리파일 그룹
      </router-link>
    </div>
    <div class="menu-item px-5 my-1" v-if="userType == 9">
      <router-link to="/notice" class="menu-link px-5">
        공지사항
      </router-link>
    </div>
    <div class="menu-item px-5 my-1" v-if="userType == 9">
      <router-link to="/queton" class="menu-link px-5">
        큐톤
      </router-link>
    </div>
    <div class="menu-item px-5 my-1" v-if="userType == 9">
      <router-link to="/signup/accept" class="menu-link px-5">
        회원가입 승인
      </router-link>
    </div>
    <div class="menu-item px-5 my-1" v-if="userType == 9">
      <router-link to="/password/config" class="menu-link px-5">
        비밀번호 변경 설정
      </router-link>
    </div>
    <div class="menu-item px-5 my-1">
      <router-link to="/password/change" class="menu-link px-5">
        비밀번호 변경
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> 로그아웃 </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import axios from "axios";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useStore();

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "media/flags/united-states.svg",
        name: "English",
      },
      es: {
        flag: "media/flags/spain.svg",
        name: "Spanish",
      },
      de: {
        flag: "media/flags/germany.svg",
        name: "German",
      },
      ja: {
        flag: "media/flags/japan.svg",
        name: "Japanese",
      },
      fr: {
        flag: "media/flags/france.svg",
        name: "French",
      },
    };

    const signOut = () => {
      store
        .dispatch(Actions.LOGOUT)
        .then(() => router.push({ name: "sign-in" }));
    };

    const setLang = (lang) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = (lang) => {
      return i18n.locale.value === lang;
    };

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value];
    });

    const userName = ref('Name')
    const userEmail = ref('Email')
    const userTeam = ref('Team')
    const userType = ref('1')

    const callInfo = async () => {
      const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
      }

      const { data } = await axios.post('/auth/info', {}, axios_config)
      const { name, email, teamName, type } = data
      
      userName.value = name
      userEmail.value = email
      userTeam.value = teamName
      userType.value = type
    }

    callInfo()

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      userName,
      userEmail,
      userTeam,
      userType,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu{
  inset: -9px 0px auto auto !important;
}
</style>
