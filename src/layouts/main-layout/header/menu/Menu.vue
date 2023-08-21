<template>
  <!--begin::Menu wrapper-->
  <div
    v-if="headerMenuDisplay"
    class="app-header-menu app-header-mobile-drawer align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="app-header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_app_header_menu_toggle"
    data-kt-swapper="true"
    data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
    data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
  >
    <!--begin::Menu-->
    <div
      class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
      id="kt_app_header_menu"
      data-kt-menu="true"
    >
      <!-- <KTMenuPages></KTMenuPages> -->

      <div
        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
        data-kt-menu-placement="bottom-start"
        class="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
      >
        <div class="d-flex align-items-center position-relative my-1 ps-7">
          <!-- <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <rect xmlns="http://www.w3.org/2000/svg" opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
              <path xmlns="http://www.w3.org/2000/svg" d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
            </svg>
          </span> -->
          <span class="icon-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="white"/>
            </svg>
          </span>
          <input type="text" v-on:input="search_keyword_input" data-kt-subscription-table-filter="search" class="input-search" placeholder="통합검색">
        </div>
        <button class="btn-search" @click="search_function ">
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_274_10051" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="16">
          <rect width="18" height="16" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_274_10051)">
          <path d="M4 1C4 0.447715 4.44772 0 5 0H11V4H4V1Z" fill="#169154"/>
          <path d="M4 4H11V8H4V4Z" fill="#0C8045"/>
          <path d="M4 8H11V12H4V8Z" fill="#17462A"/>
          <path d="M4 12H11V16H5C4.44772 16 4 15.5523 4 15V12Z" fill="#17482A"/>
          <path d="M11 0H17C17.5523 0 18 0.447715 18 1V4H11V0Z" fill="#28C27E"/>
          <path d="M11 4H18V8H11V4Z" fill="#19AC65"/>
          <path d="M11 8H18V12H11V8Z" fill="#129652"/>
          <path d="M11 12H18V15C18 15.5523 17.5523 16 17 16H11V12Z" fill="#27663F"/>
          <rect y="3" width="9" height="9" rx="2" fill="#0C7238"/>
          <path d="M4.47506 6.71961H4.52111L5.65695 5H6.96163L5.26938 7.5L7 10H5.67229L4.52111 8.28039H4.47506L3.32387 10H2L3.74213 7.5L2.0307 5H3.34305L4.47506 6.71961Z" fill="white"/>
          </g>
          </svg>
          Excel 목록 검색
        </button>
      </div>
      <!--end:Menu item-->
    </div>
    <!--end::Menu-->
  </div>
  <div v-else class="align-items-stretch"></div>
  <!--end::Menu wrapper-->
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import KTMenuPages from "@/layouts/main-layout/header/menu/MenuPages.vue";
import { version } from "@/core/helpers/documentation";
import { headerMenuDisplay } from "@/core/helpers/config";
import router from "@/router";
import store from "@/store";


// setInterval(() => {
//   console.log(store.state.search_keyword);
  
// },2000)
let search_keyword = ref('')

const search_keyword_input = (e) => {
  search_keyword.value = e.target.value
  console.log(search_keyword.value);
}

const search_function = (e) => {
  console.log(search_keyword.value);
  
  router.push('/search')
}
</script>

<style lang="scss" scoped>
.btn-search{
  display: flex;
  align-items: center;
  width: 176px;
  padding: 14px 16px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 52px;
  background: var(--data-bs-theme-light-bs-success, #50CD89);
  border: none;
  margin-left: 19px;

  color: #FFF;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
  letter-spacing: 0.5px;
}
.input-search{
  display: flex;
  width: 422px;
  padding: 12px 4px 12px 16px;
  align-items: center;
  gap: 313px;
  border-radius: 52px;
  border: 1px solid #CCC;
  background: #FFF;
}
.icon-search{
  position: absolute;
  right: 4px;
  background: #000;
  cursor: pointer;

  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 32px;
  background: var(--data-bs-theme-light-bs-success, #50CD89);

  svg{
    width: 16px;
    height: 16px;
  }
}
</style>