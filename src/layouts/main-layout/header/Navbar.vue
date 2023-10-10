<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Search-->
    <!-- <div class="app-navbar-item align-items-stretch ms-1 ms-lg-3">
      <KTSearch />
    </div> -->
    <!--end::Search-->
    <!--begin::Activities-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Drawer toggle-->
      <!-- <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        id="kt_activities_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/general/gen032.svg" />
        </span>
      </div> -->
      <!--end::Drawer toggle-->
    </div>
    <!--end::Activities-->
    <!--begin::Full screen-->
    <div class="app-navbar-item ms-1 ms-lg-3">
        <div class="member" id="kt_drawer_chat_toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M5.25 10.5C5.25 10.5 4.5 10.5 4.5 9.75C4.5 9 5.25 6.75 8.25 6.75C11.25 6.75 12 9 12 9.75C12 10.5 11.25 10.5 11.25 10.5H5.25Z" fill="#222222"/>
          <path d="M8.25 6C9.49264 6 10.5 4.99264 10.5 3.75C10.5 2.50736 9.49264 1.5 8.25 1.5C7.00736 1.5 6 2.50736 6 3.75C6 4.99264 7.00736 6 8.25 6Z" fill="#222222"/>
          <path d="M3.91227 10.5C3.80667 10.2869 3.75 10.0344 3.75 9.75C3.75 8.73341 4.25929 7.68792 5.20195 6.95997C4.78957 6.82807 4.30882 6.75 3.75 6.75C0.75 6.75 0 9 0 9.75C0 10.5 0.75 10.5 0.75 10.5H3.91227Z" fill="#222222"/>
          <path d="M3.375 6C4.41053 6 5.25 5.16053 5.25 4.125C5.25 3.08947 4.41053 2.25 3.375 2.25C2.33947 2.25 1.5 3.08947 1.5 4.125C1.5 5.16053 2.33947 6 3.375 6Z" fill="#222222"/>
          </svg>
          <span class="bullet bullet-dot bg-danger h-6px w-6px position-absolute translate-middle top-0 end-0">
          </span>
        </div>
        <div class="large" @click="toggleFullScreen">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1.125 0.75C0.917893 0.75 0.75 0.917893 0.75 1.125V4.125C0.75 4.33211 0.582107 4.5 0.375 4.5C0.167893 4.5 0 4.33211 0 4.125V1.125C0 0.50368 0.50368 0 1.125 0H4.125C4.33211 0 4.5 0.167893 4.5 0.375C4.5 0.582107 4.33211 0.75 4.125 0.75H1.125ZM7.5 0.375C7.5 0.167893 7.66789 0 7.875 0H10.875C11.4963 0 12 0.50368 12 1.125V4.125C12 4.33211 11.8321 4.5 11.625 4.5C11.4179 4.5 11.25 4.33211 11.25 4.125V1.125C11.25 0.917893 11.0821 0.75 10.875 0.75H7.875C7.66789 0.75 7.5 0.582107 7.5 0.375ZM0.375 7.5C0.582107 7.5 0.75 7.66789 0.75 7.875V10.875C0.75 11.0821 0.917893 11.25 1.125 11.25H4.125C4.33211 11.25 4.5 11.4179 4.5 11.625C4.5 11.8321 4.33211 12 4.125 12H1.125C0.50368 12 0 11.4963 0 10.875V7.875C0 7.66789 0.167893 7.5 0.375 7.5ZM11.625 7.5C11.8321 7.5 12 7.66789 12 7.875V10.875C12 11.4963 11.4963 12 10.875 12H7.875C7.66789 12 7.5 11.8321 7.5 11.625C7.5 11.4179 7.66789 11.25 7.875 11.25H10.875C11.0821 11.25 11.25 11.0821 11.25 10.875V7.875C11.25 7.66789 11.4179 7.5 11.625 7.5Z" fill="black"/>
          </svg>
        </div>
      <!--end::Menu wrapper-->
    </div>
    <!--end::Full screen-->
    <!--begin::User menu-->
    <div class="app-navbar-item ms-1" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-35px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <!-- <img src="media/avatars/300-1.jpg" alt="user" /> -->
        유저
      </div>
      <KTUserMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User menu-->
    <!--begin::Header menu toggle-->
    <!-- <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
      <div
        class="btn btn-icon btn-active-color-primary w-35px h-35px"
        id="kt_app_header_menu_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div> -->
    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script>
import { defineComponent, computed } from "vue";
import KTSearch from "@/layouts/main-layout/search/Search.vue";
import KTNotificationMenu from "@/layouts/main-layout/menus/NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTSearch,
    KTNotificationMenu,
    KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const store = useStore();

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }

    return {
      themeMode,
      toggleFullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.member, .large{
  position: relative;
  width: 28px;
  height: 28px;
  background: #DBDFE9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}
.large{
  margin: 0 24px;
}
</style>
