<template>
  <!--begin::sidebar menu-->
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <!--begin::Menu wrapper-->
    <div
      id="kt_app_sidebar_menu_wrapper"
      class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
      data-kt-scroll="true"
      data-kt-scroll-activate="true"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div
        id="#kt_app_sidebar_menu"
        class="menu menu-column menu-rounded menu-sub-indention px-3"
        data-kt-menu="true"
      >
        <template v-for="(item, i) in MainMenuConfig" :key="i">
          <div v-if="item.heading" class="menu-item pt-5">
            <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ translate(item.heading) }}
              </span>
            </div>
          </div>
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <template v-if="menuItem.heading">
              <div class="menu-item">
                <router-link
                  class="menu-link"
                  active-class="active"
                  :to="menuItem.route"
                >
                  <span
                    v-if="menuItem.svgIcon || menuItem.fontIcon"
                    class="menu-icon"
                  >
                    <i
                      v-if="sidebarMenuIcons === 'font'"
                      :class="menuItem.fontIcon"
                      class="bi fs-3"
                    ></i>
                    <span
                      v-else-if="sidebarMenuIcons === 'svg'"
                      class="svg-icon svg-icon-2"
                    >
                      <inline-svg :src="menuItem.svgIcon" />
                    </span>
                  </span>
                  <span class="menu-title">{{
                    translate(menuItem.heading)
                  }}</span>
                </router-link>
              </div>
            </template>
            <!-- ACCORDION MENU START -->
              <!-- :class="{ show: hasActiveChildren(menuItem.route) }" -->
            <div
              v-if="menuItem.sectionTitle"
              class="menu-item menu-accordion hover show"
              data-kt-menu-sub="accordion"
              data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                  v-if="menuItem.svgIcon || menuItem.fontIcon"
                  class="menu-icon"
                >
                  <i
                    v-if="sidebarMenuIcons === 'font'"
                    :class="menuItem.fontIcon"
                    class="bi fs-3"
                  ></i>
                  <span
                    v-else-if="sidebarMenuIcons === 'svg'"
                    class="svg-icon svg-icon-2"
                  >
                    <div class="svg"></div>
                    <!-- <inline-svg :src="menuItem.svgIcon" /> -->
                    <!-- <inline-svg v-if="!hasActiveChildren(menuItem.route)" :src="menuItem.svgIcon" /> -->
                    <!-- <inline-svg v-if="hasActiveChildren(menuItem.route)" src="media/icons/duotune/art/art005.svg" /> -->
                  </span>
                </span>
                <span class="menu-title">{{
                  translate(menuItem.sectionTitle)
                }}</span>
                <span class="menu-arrow"></span>
              </span>
                <!-- :class="{ show: hasActiveChildren(menuItem.route) }" -->
              <div class="menu-sub menu-sub-accordion">
                <template v-for="(item2, k) in categorys" :key="k">
                    <!-- v-if="item2.name" -->
                  <div
                    class="menu-item menu-accordion"
                    data-kt-menu-sub="accordion"
                    data-kt-menu-trigger="click"
                    style="color: #fff"
                    @drop="file_drag_drop_unlock()" @dragenter.prevent @dragover.prevent
                  >
                    
                    <span class="menu-link sub-menu-link">
                      <span class="menu-bullet">
                        <img src="@/assets/img/art001.svg" alt="">
                      </span>
                      <span class="menu-title">{{
                        translate(item2)
                      }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div
                      class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item2, k) in files" :key="k">
                        <div v-if="item2.heading" class="menu-item">
                          <router-link
                            class="menu-link"
                            active-class="active"
                            :to="item2.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                              translate(item2.heading)
                            }}</span>
                          </router-link>
                        </div>
                        <div
                          v-if="item2.name"
                          class="menu-item menu-accordion show"
                          data-kt-menu-sub="accordion"
                          data-kt-menu-trigger="click"
                        >
                          <span class="menu-link sub-menu-link align-items-start" draggable="true" @dragstart="file_drag(item2)" @click="file_click(item2.path, item2.name)">
                            <span class="menu-bullet">
                              <div>
                                <img src="@/assets/img/group32.svg" alt="">
                              </div>
                            </span>
                            <span class="menu-title" style="display: block">
                              <div class="badge badge-primary">2023.08.22 16:44</div>
                              <div>{{translate(item2.name)}}</div>
                            </span>
                          </span>
                          <div
                            class="menu-sub menu-sub-accordion"
                          >
                            <template v-for="(item3, k) in item2.sub" :key="k">
                              <div v-if="item3.heading" class="menu-item">
                                <router-link
                                  class="menu-link"
                                  active-class="active"
                                  :to="item3.route"
                                >
                                  <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                  </span>
                                  <span class="menu-title">{{
                                    translate(item3.heading)
                                  }}</span>
                                </router-link>
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
                <!-- <template v-for="(item2, k) in files" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link
                      class="menu-link"
                      active-class="active"
                      :to="item2.route"
                    >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{
                        translate(item2.heading)
                      }}</span>
                    </router-link>
                  </div>
                  <div
                    v-if="item2.name"
                    class="menu-item menu-accordion show"
                    data-kt-menu-sub="accordion"
                    data-kt-menu-trigger="click"
                  >
                    <span class="menu-link sub-menu-link" @click="file_click(item2.path, item2.name)">
                      <span class="menu-bullet">
                        <img src="@/assets/img/group32.svg" alt="">
                      </span>
                      <span class="menu-title">{{
                        translate(item2.name)
                      }}</span>
                    </span>
                    <div
                      class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item3, k) in item2.sub" :key="k">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link
                            class="menu-link"
                            active-class="active"
                            :to="item3.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                              translate(item3.heading)
                            }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template> -->
              </div>
            </div>
              <!-- :class="{ show: hasActiveChildren(menuItem.route) }" -->
            <div
              v-if="menuItem.etcFile"
              class="menu-item menu-accordion"
              data-kt-menu-sub="accordion"
              data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                  v-if="menuItem.svgIcon || menuItem.fontIcon"
                  class="menu-icon"
                >
                  <i
                    v-if="sidebarMenuIcons === 'font'"
                    :class="menuItem.fontIcon"
                    class="bi fs-3"
                  ></i>
                  <span
                    v-else-if="sidebarMenuIcons === 'svg'"
                    class="svg-icon svg-icon-2"
                  >
                    <div class="svg"></div>
                    <!-- <inline-svg :src="menuItem.svgIcon" /> -->
                    <!-- <inline-svg v-if="!hasActiveChildren(menuItem.route)" :src="menuItem.svgIcon" /> -->
                    <!-- <inline-svg v-if="hasActiveChildren(menuItem.route)" src="media/icons/duotune/art/art005.svg" /> -->
                  </span>
                </span>
                <span class="menu-title">{{
                  translate(menuItem.etcFile)
                }}</span>
                <span class="menu-arrow"></span>
              </span>
              <!-- :class="{ show: hasActiveChildren(menuItem.route) }" -->
              <div
                class="menu-sub menu-sub-accordion"
              >
                <template v-for="(item2, k) in files_etc" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link
                      class="menu-link"
                      active-class="active"
                      :to="item2.route"
                    >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{
                        translate(item2.heading)
                      }}</span>
                    </router-link>
                  </div>
                    <!-- :class="{ show: hasActiveChildren(item2.route) }" -->
                  <div
                    v-if="item2.name"
                    class="menu-item menu-accordion show"
                    data-kt-menu-sub="accordion"
                    data-kt-menu-trigger="click"
                  >
                    <span class="menu-link sub-menu-link" @click="file_click(item2.path, item2.name)">
                      <span class="menu-bullet">
                        <img src="@/assets/img/group32.svg" alt="">
                      </span>
                      <span class="menu-title">{{
                        translate(item2.name)
                      }}</span>
                      <!-- <span class="menu-arrow"></span> -->
                    </span>
                      <!-- :class="{ show: hasActiveChildren(item2.route) }" -->
                    <div
                      class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item3, k) in item2.sub" :key="k">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link
                            class="menu-link"
                            active-class="active"
                            :to="item3.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                              translate(item3.heading)
                            }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div
              v-if="menuItem.lockFile"
              class="menu-item menu-accordion hover show"
              data-kt-menu-sub="accordion"
              data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                  v-if="menuItem.svgIcon || menuItem.fontIcon"
                  class="menu-icon"
                >
                  <i
                    v-if="sidebarMenuIcons === 'font'"
                    :class="menuItem.fontIcon"
                    class="bi fs-3"
                  ></i>
                  <span
                    v-else-if="sidebarMenuIcons === 'svg'"
                    class="svg-icon svg-icon-2"
                  >
                    <div class="svg"></div>
                  </span>
                </span>
                <span class="menu-title">{{
                  translate(menuItem.lockFile)
                }}</span>
              </span>
              <!--  -->
              <div class="menu nav">
                <div class="badge badge-primary active" data-bs-toggle="tab" href="#kt_tab_pane_11">관리파일</div>
                <div class="badge badge-primary" data-bs-toggle="tab" href="#kt_tab_pane_22">기타파일</div>
                <!-- <div class="badge badge-primary">삭제</div> -->
              </div>
              <!--begin::Plans-->
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="kt_tab_pane_11" role="tabpanel">
                  <div class="lockfile-wrap" @drop="file_drag_drop_lock()" @dragenter.prevent @dragover.prevent>
                    <div v-for="item2 in files_lock" :key="item2">
                      <span class="menu-link sub-menu-link align-items-start" draggable="true" @dragstart="file_drag(item2)">
                        <span class="menu-bullet">
                          <div>
                            <img src="@/assets/img/group32.svg" alt="">
                          </div>
                        </span>
                        <span class="menu-title" style="display: block">
                          <!-- <div>dsadsadsadasd</div> -->
                          <div>{{item2.name}}</div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="kt_tab_pane_22" role="tabpanel">
                  <div class="lockfile-wrap" @drop="file_drag_drop_lock()" @dragenter.prevent @dragover.prevent>
                    <div v-for="item2 in files_etc_lock" :key="item2">
                      <span class="menu-link sub-menu-link align-items-start" draggable="true" @dragstart="file_drag(item2)">
                        <span class="menu-bullet">
                          <div>
                            <img src="@/assets/img/group32.svg" alt="">
                          </div>
                        </span>
                        <span class="menu-title" style="display: block">
                          <!-- <div>dsadsadsadasd</div> -->
                          <div>{{item2.name}}</div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Plans-->
            </div>
          </template>
        </template>

      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { sidebarMenuIcons } from "@/core/helpers/config";
import { useI18n } from "vue-i18n";
import axios from "axios";
import store from "@/store";

export default defineComponent({
  name: "sidebar-menu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const scrollElRef = (ref < null) | (HTMLElement > null);

    const categorys = ref(['HD방송 ', 'CATV_SO'])
    const categorys_etc = ref([])

    const files = ref({})
    const files_lock = ref({})

    const files_etc = ref({})
    const files_etc_lock = ref({})

    const init = async () => {
      try{
        const { data } = await axios.post('http://dev.peerline.net:9494/file/list', {
          type: 'manage'
        })

        for (let i = 0; i < data.length; i++) {
          const { id, lock } = data[i]

          if (lock) files_lock.value[id] = data[i]
          else files.value[id] = data[i]
        }

        console.log('files.value: ', files.value);
        console.log('files_lock.value: ', files_lock.value);

        // files.value = excel_list.data
      }
      catch(error) {console.log(error);}

      try{
        const { data } = await axios.post('http://dev.peerline.net:9494/file/list', {
          type: 'etc'
        })

        for (let i = 0; i < data.length; i++) {
          const { lock } = data[i]

          if (lock) files_etc_lock.value[id] = data[i]
          else files_etc.value[id] = data[i]
        }

        console.log('files_etc.value: ', files_etc.value);
        console.log('files_etc_lock.value: ', files_etc_lock.value);

        // files.value = excel_list.data
      }
      catch(error) {console.log(error);}
    }

    init()

    // setInterval(() => {
    //   init()
    // }, 1000);

    const file_click = (path, name) => {
      // console.log(path, name);
      localStorage.setItem('path', path)
      localStorage.setItem('name', name)

      router.push({ name: "excel" });
    }

    let drag_file = null

    const file_drag = (file) => {
      console.log(1234);
      drag_file = file
    }

    const file_drag_drop_lock = () => {
      console.log(4321);
      files_lock.value[drag_file.id] = drag_file
      delete files.value[drag_file.id]
      axios.post('http://dev.peerline.net:9494/file/lock', {
        id: drag_file.id
      })

      drag_file = null
    }

    const file_drag_drop_unlock = () => {
      console.log(5321);
      files.value[drag_file.id] = drag_file
      delete files_lock.value[drag_file.id]
      axios.post('http://dev.peerline.net:9494/file/unlock', {
        id: drag_file.id
      })

      drag_file = null
    }

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    return {
      hasActiveChildren,
      MainMenuConfig,
      sidebarMenuIcons,
      translate,
      files,
      files_lock,
      files_etc,
      files_etc_lock,
      categorys,
      categorys_etc,
      file_click,
      file_drag,
      file_drag_drop_lock,
      file_drag_drop_unlock,
    };
  },
});
</script>

<style lang="scss" scoped>
.sub-menu-link{
  padding-top: 5px;
  padding-bottom: 5px;
}
.menu-item.menu-accordion{
  .svg{
    width: 16px;height: 16px;
    background: url('@/assets/img/art001.svg');
  }

  &.hover{
    .svg{
      width: 16px;height: 16px;
      background: url('@/assets/img/art005.svg');
    }
  }

  &.show{
    .svg{
      width: 16px;height: 16px;
      background: url('@/assets/img/art005.svg');
    }
  }
}
.menu-sub-accordion{
  span.menu-title{
    word-break: break-all;
    div{
      font-size: 12px !important;
    }
  }
  .menu-item{
    // padding: 0;
  }
  .menu-link{
    // padding-top: 0;
    // padding-bottom: 0;
  }
}
.lockfile-wrap{
  height: 400px;
}
</style>