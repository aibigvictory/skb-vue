/* eslint-disable */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    children: [
      {
        path: "/signup/accept",
        name: "signup-accept",
        component: () => import("@/views/manage/SignUpAccept.vue"),
        meta: {
          pageTitle: "회원가입 승인",
          breadcrumbs: ["회원가입 승인"],
        },
      },
      {
        path: "/manage/file",
        name: "manage-file",
        component: () => import("@/views/manage/ManageFile.vue"),
        meta: {
          pageTitle: "회원가입 승인",
          breadcrumbs: ["회원가입 승인"],
        },
      },
      {
        path: "/password/change",
        name: "password-change",
        component: () => import("@/views/manage/PasswordChange.vue"),
        meta: {
          pageTitle: "비밀번호 변경",
          breadcrumbs: ["비밀번호 변경"],
        },
      },
      {
        path: "/password/config",
        name: "password-change-config",
        component: () => import("@/views/manage/PasswordChangeConfig.vue"),
        meta: {
          pageTitle: "비밀번호 설정 변경",
          breadcrumbs: ["비밀번호 설정 변경"],
        },
      },
      {
        path: "/company/list",
        name: "company-list",
        component: () => import("@/views/manage/CompanyList.vue"),
        meta: {
          pageTitle: "개발사 리스트",
          breadcrumbs: ["개발사 리스트"],
        },
      },
      {
        path: "/user/list",
        name: "user-list",
        component: () => import("@/views/manage/UserList.vue"),
        meta: {
          pageTitle: "사용자 리스트",
          breadcrumbs: ["사용자 리스트"],
        },
      },
      {
        path: "/notice",
        name: "notice",
        component: () => import("@/views/Notice.vue"),
        meta: {
          pageTitle: "공지사항",
          breadcrumbs: ["공지사항"],
        },
      },
      {
        path: "/queton",
        name: "queton",
        component: () => import("@/views/manage/Queton.vue"),
        meta: {
          pageTitle: "큐톤 관리 항목",
          breadcrumbs: ["큐톤 관리 항목"],
        },
      },
      {
        path: "/quetoneView",
        name: "quetoneView",
        component: () => import("@/views/QuetoneView.vue"),
        meta: {
          pageTitle: "큐톤 모니터링",
          breadcrumbs: ["큐톤 모니터링"],
        },
      },
      {
        path: "/excel/:id",
        name: "excel",
        component: () => import("@/views/ExcelView.vue"),
        meta: {
          pageTitle: "Excel",
          breadcrumbs: ["Excel"],
        },
        props: true,
      },
      {
        path: "/header/adjust/:id",
        name: "header-adjust",
        component: () => import("@/views/LuckySheetHeaderAdjust.vue"),
        meta: {
          pageTitle: "Header-adjust",
          breadcrumbs: ["Header-adjust"],
        },
        props: true,
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/SearchResult.vue"),
        meta: {
          pageTitle: "Search",
          breadcrumbs: ["Search"],
        },
      },
      {
        path: "/search/except",
        name: "except",
        component: () => import("@/views/manage/SearchExcept.vue"),
        meta: {
          pageTitle: "Except",
          breadcrumbs: ["Except"],
        },
      },
      {
        path: "/load",
        name: "load",
        component: () => import("@/views/SearchLoad.vue"),
        meta: {
          pageTitle: "Load",
          breadcrumbs: ["Load"],
        },
      },
      {
        path: "/exp",
        name: "ResultBack",
        component: () => import("@/views/SearchResultBack.vue"),
        meta: {
          pageTitle: "ResultBack",
          breadcrumbs: ["ResultBack"],
        },
      },
      {
        path: "/favo",
        name: "favo",
        component: () => import("@/views/Favorites.vue"),
        meta: {
          pageTitle: "Excel",
          breadcrumbs: ["Excel"],
        },
      },
      {
        path: "/revi",
        name: "revi",
        component: () => import("@/views/Revision.vue"),
        meta: {
          pageTitle: "Excel",
          breadcrumbs: ["Excel"],
        },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);

  // call new data
  store.dispatch(Actions.GET_DATA_TO_SERVER, {
    name: "company",
    url: "/company/list",
  });

  store.dispatch(Actions.POST_DATA_TO_SERVER, {
    name: "folder_all",
    url: "/folder/list",
  });

  store.dispatch(Actions.POST_DATA_TO_SERVER, {
    name: "folder_manage",
    url: "/folder/list",
    pay: { type: "manage" },
  });
});

export default router;
