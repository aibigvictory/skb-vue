<template>
  <!--begin::Header-->
  <div id="kt_app_header" v-if="headerDisplay" class="app-header">
    <!--begin::Header container-->
    <div
      class="app-container d-flex align-items-stretch justify-content-between"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <div
        v-if="layout === 'light-header' || layout === 'dark-header'"
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15"
      >
        <router-link to="/">
          <img
            v-if="themeMode === 'light' && layout === 'light-header'"
            alt="Logo"
            src="media/logos/default.svg"
            class="h-20px h-lg-30px app-sidebar-logo-default"
          />
          <img
            v-if="
              layout === 'dark-header' ||
              (themeMode === 'dark' && layout === 'light-header')
            "
            alt="Logo"
            src="media/logos/default-dark.svg"
            class="h-20px h-lg-30px app-sidebar-logo-default"
          />
        </router-link>
      </div>
      <!--begin::sidebar mobile toggle-->
      <div
        class="d-flex align-items-center d-lg-none ms-n2 me-2"
        title="Show sidebar menu"
      >
        <div
          class="btn btn-icon btn-active-color-primary w-35px h-35px"
          id="kt_app_sidebar_mobile_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/abstract/abs015.svg" />
          </span>
        </div>
      </div>
      <!--end::sidebar mobile toggle-->
      <!--begin::Mobile logo-->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <router-link to="/" class="d-lg-none">
          <img alt="Logo" src="media/logos/default-small.svg" class="h-30px" />
        </router-link>
      </div>
      <!--end::Mobile logo-->
      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <KTHeaderMenu @display_search_popup="change_popup_state('searchExcel', true)"/>
        <KTHeaderNavbar />
      </div>
      <!--end::Header wrapper-->
    </div>
    <!--end::Header container-->
  </div>
  <!--end::Header-->
  <SearchExcel v-if="searchExcelPopup_state" @exit="change_popup_state('searchExcel', false)" :keyword="search_keyword" :code="folder_code"/>
</template>

<script setup lang="ts">
import SearchExcel from "@/components/search/SearchExcel.vue"
import { defineComponent, ref } from "vue";
import KTHeaderMenu from "@/layouts/main-layout/header/menu/Menu.vue";
import KTHeaderNavbar from "@/layouts/main-layout/header/Navbar.vue";
import {
  layout,
  headerWidthFluid,
  themeMode,
  headerDisplay,
} from "@/core/helpers/config";

// const search_keyword = ref('')

// const change_search_keyword = (keyword) => {
//   search_keyword.value = keyword
// }

// const folder_code = ref('')

// const change_folder_code = (code) => {
//   folder_code.value = code
// }

const searchExcelPopup_state = ref(false)
const change_popup_state = (popup_type, state) => {
    searchExcelPopup_state.value = state
}

// document.addEventListener('keydown', function(event) {
//   if (event.code === 'F2') {
//     document.getElementById('hedaer-input-search').focus();
//   }
// });
</script>
