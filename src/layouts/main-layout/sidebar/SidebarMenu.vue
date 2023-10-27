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
                <template v-for="(category, k) in categorys_in_manageFiles" :key="k">
                    <!-- v-if="category.name" -->
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
                        translate(category.name)
                      }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div
                      class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item2, k) in category.files" :key="k">
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
                          <span class="menu-link sub-menu-link align-items-start" draggable="true" @dragstart="file_drag(item2)" @click="file_click(item2.path, item2.name, item2.user.name, item2.user.teamName, item2.updatedAt, category.name)"><span class="menu-bullet">
                              <div>
                                <img src="@/assets/img/group32.svg" alt="">
                              </div>
                            </span>
                            <span class="menu-title" style="display: block">
                              <div class="badge-wrap d-flex">
                                <div class="badge badge-primary">{{item2.updatedAt.replace(/-/g, '.').replace('T', ' ').slice(0,16)}}</div>
                                <div class="badge badge-primary" style="background: #622CE1 !important; margin-left: 4px;">{{item2.user.name}}</div>
                              </div>
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
              <div class="non-use-file">
                <div class="menu nav">
                  <div class="form-check">
                    <input @change="check_all_useless_file" class="form-check-input" type="checkbox" value="" id="all-check" />
                  </div>
                  <div class="non-use-file-category active" data-bs-toggle="tab" href="#kt_tab_pane_11" @click="change_lock_state('manage')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <mask id="mask0_552_28805" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                    <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_552_28805)">
                    <path d="M12.4613 13.6666H7.14083C6.99917 13.6666 6.88042 13.6186 6.78458 13.5227C6.68875 13.4269 6.64083 13.3081 6.64083 13.1663C6.64083 13.0246 6.68875 12.9059 6.78458 12.8102C6.88042 12.7144 6.99917 12.6666 7.14083 12.6666H12.4613C12.5126 12.6666 12.5596 12.6452 12.6024 12.6025C12.6451 12.5597 12.6665 12.5127 12.6665 12.4614V3.53839C12.6665 3.4871 12.6451 3.44008 12.6024 3.39734C12.5596 3.3546 12.5126 3.33324 12.4613 3.33324H3.5383C3.48701 3.33324 3.44 3.3546 3.39725 3.39734C3.35452 3.44008 3.33315 3.4871 3.33315 3.53839V5.64095C3.33315 5.78262 3.28521 5.90136 3.18933 5.99719C3.09347 6.09302 2.97467 6.14094 2.83293 6.14094C2.69121 6.14094 2.57249 6.09302 2.47677 5.99719C2.38103 5.90136 2.33317 5.78262 2.33317 5.64095V3.53839C2.33317 3.20163 2.44983 2.91659 2.68317 2.68325C2.9165 2.44992 3.20155 2.33325 3.5383 2.33325H12.4613C12.7981 2.33325 13.0831 2.44992 13.3165 2.68325C13.5498 2.91659 13.6665 3.20163 13.6665 3.53839V12.4614C13.6665 12.7982 13.5498 13.0832 13.3165 13.3166C13.0831 13.5499 12.7981 13.6666 12.4613 13.6666ZM10.6665 8.49989C10.8082 8.49989 10.9269 8.45195 11.0227 8.35609C11.1186 8.26021 11.1665 8.14141 11.1665 7.99969C11.1665 7.85795 11.1186 7.73923 11.0227 7.6435C10.9269 7.54778 10.8082 7.49992 10.6665 7.49992H7.14083C6.99917 7.49992 6.88042 7.54785 6.78458 7.64372C6.68875 7.7396 6.64083 7.8584 6.64083 8.00012C6.64083 8.14185 6.68875 8.26058 6.78458 8.3563C6.88042 8.45203 6.99917 8.49989 7.14083 8.49989H10.6665ZM8.66648 11.1666C8.80815 11.1666 8.9269 11.1186 9.02274 11.0228C9.11856 10.9269 9.16647 10.8081 9.16647 10.6664C9.16647 10.5246 9.11856 10.4059 9.02274 10.3102C8.9269 10.2144 8.80815 10.1666 8.66648 10.1666H7.14083C6.99917 10.1666 6.88042 10.2145 6.78458 10.3104C6.68875 10.4063 6.64083 10.5251 6.64083 10.6668C6.64083 10.8085 6.68875 10.9272 6.78458 11.023C6.88042 11.1187 6.99917 11.1666 7.14083 11.1666H8.66648ZM10.6665 5.83322C10.8082 5.83322 10.9269 5.78529 11.0227 5.68942C11.1186 5.59354 11.1665 5.47474 11.1665 5.33302C11.1665 5.19129 11.1186 5.07256 11.0227 4.97684C10.9269 4.88111 10.8082 4.83325 10.6665 4.83325H5.33315C5.19148 4.83325 5.07274 4.88119 4.97692 4.97705C4.88108 5.07293 4.83317 5.19173 4.83317 5.33345C4.83317 5.47519 4.88108 5.59391 4.97692 5.68964C5.07274 5.78536 5.19148 5.83322 5.33315 5.83322H10.6665ZM4.61522 14.3332C3.78364 14.3332 3.07575 14.0417 2.49153 13.4588C1.90733 12.8758 1.61523 12.1694 1.61523 11.3396C1.61523 10.7212 1.78233 10.1679 2.11652 9.67967C2.45071 9.19145 2.88447 8.83238 3.4178 8.60247H2.1665C2.02483 8.60247 1.90608 8.55453 1.81025 8.45865C1.71442 8.36277 1.6665 8.24398 1.6665 8.10225C1.6665 7.96052 1.71442 7.84179 1.81025 7.74607C1.90608 7.65035 2.02483 7.60249 2.1665 7.60249H4.57673C4.74746 7.60249 4.89056 7.66023 5.00605 7.77572C5.12155 7.89121 5.1793 8.03432 5.1793 8.20505V10.6153C5.1793 10.757 5.13136 10.8757 5.03548 10.9715C4.93961 11.0674 4.82081 11.1153 4.67908 11.1153C4.53735 11.1153 4.41862 11.0674 4.3229 10.9715C4.22718 10.8757 4.17932 10.757 4.17932 10.6153V9.38322C3.72542 9.48038 3.35126 9.71112 3.05683 10.0755C2.76241 10.4398 2.6152 10.8588 2.6152 11.3324C2.6152 11.8911 2.81072 12.3642 3.20175 12.7518C3.59277 13.1394 4.06393 13.3332 4.61522 13.3332C4.75688 13.3332 4.87563 13.3812 4.97145 13.4771C5.06728 13.5729 5.1152 13.6917 5.1152 13.8335C5.1152 13.9752 5.06728 14.0939 4.97145 14.1896C4.87563 14.2854 4.75688 14.3332 4.61522 14.3332Z" fill="white"/>
                    </g>
                    </svg>
                    관리파일
                  </div>
                  <div class="non-use-file-category" data-bs-toggle="tab" href="#kt_tab_pane_22" @click="change_lock_state('etc')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <mask id="mask0_552_28810" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                    <rect width="16" height="16" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_552_28810)">
                    <path d="M2.87164 13C2.53488 13 2.24984 12.8833 2.0165 12.65C1.78317 12.4166 1.6665 12.1316 1.6665 11.7948V4.20513C1.6665 3.86838 1.78317 3.58333 2.0165 3.35C2.24984 3.11667 2.53488 3 2.87164 3H6.03315C6.19383 3 6.34832 3.0312 6.4966 3.0936C6.64489 3.15599 6.77374 3.24188 6.88314 3.35128L7.86519 4.33333H13.128C13.4648 4.33333 13.7498 4.45 13.9831 4.68333C14.2165 4.91667 14.3331 5.20171 14.3331 5.53847V11.7948C14.3331 12.1316 14.2165 12.4166 13.9831 12.65C13.7498 12.8833 13.4648 13 13.128 13H2.87164ZM2.87164 12H13.128C13.1878 12 13.237 11.9808 13.2755 11.9423C13.3139 11.9038 13.3332 11.8547 13.3332 11.7948V5.53847C13.3332 5.47863 13.3139 5.42948 13.2755 5.39102C13.237 5.35255 13.1878 5.33332 13.128 5.33332H7.45624L6.18059 4.05768C6.15922 4.03632 6.13679 4.02136 6.11329 4.0128C6.08978 4.00426 6.0652 3.99998 6.03955 3.99998H2.87164C2.8118 3.99998 2.76265 4.01922 2.72419 4.05768C2.68572 4.09615 2.66649 4.1453 2.66649 4.20513V11.7948C2.66649 11.8547 2.68572 11.9038 2.72419 11.9423C2.76265 11.9808 2.8118 12 2.87164 12ZM8.53062 9.16663L7.7024 9.99487C7.61009 10.0872 7.56287 10.2032 7.56074 10.3429C7.5586 10.4827 7.60583 10.6008 7.7024 10.6974C7.79898 10.794 7.91607 10.8423 8.05367 10.8423C8.19127 10.8423 8.30836 10.794 8.40494 10.6974L10.0139 9.08843C10.1344 8.96792 10.1947 8.82733 10.1947 8.66665C10.1947 8.50597 10.1344 8.36538 10.0139 8.24487L8.40494 6.6359C8.31264 6.54359 8.19661 6.49637 8.05687 6.49423C7.91714 6.4921 7.79898 6.53932 7.7024 6.6359C7.60583 6.73248 7.55754 6.84957 7.55754 6.98717C7.55754 7.12477 7.60583 7.24186 7.7024 7.33843L8.53062 8.16667H6.06392C5.92205 8.16667 5.80325 8.21453 5.70752 8.31025C5.6118 8.40597 5.56394 8.52477 5.56394 8.66665C5.56394 8.80853 5.6118 8.92733 5.70752 9.02305C5.80325 9.11877 5.92205 9.16663 6.06392 9.16663H8.53062Z" fill="#B5B5C3"/>
                    </g>
                    </svg>
                    기타파일
                  </div>
                  <div @click="delete_file" class="non-use-file-category">삭제</div>
                </div>
                <!--begin::Plans-->
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="kt_tab_pane_11" role="tabpanel">
                    <div class="lockfile-wrap" @drop="file_drag_drop_lock()" @dragenter.prevent @dragover.prevent>
                      <div v-for="item2 in files_lock" :key="item2" class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="list_check_useless_file" :value="item2.id" id="flexCheckDefault" />
                          <!-- <input class="form-check-input" type="checkbox" v-model="list_check_useless_file" :value="item2.id" id="flexCheckDefault" /> -->
                        </div>
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
                      <div v-for="item2 in files_etc_lock" :key="item2" class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="list_check_useless_file" value="" id="flexCheckDefault" />
                        </div>
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
import { defineComponent, onMounted, ref, watch } from "vue";
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

    let category_list = []
    let manageFile_list = []
    let etcFile_list = []

    const categorys_in_manageFiles = ref([])
    const categorys_in_etcFiles = ref([])

    // const categorys = ref({})
    const categorys_etc = ref({})

    const files = ref({})
    const files_lock = ref({})

    const files_etc = ref({})
    const files_etc_lock = ref({})

    const deepCopy = (target) => {
      return JSON.parse(JSON.stringify(target))
    }

    // setInterval(() => {
    //   console.log(categorys_in_manageFiles.value);
    //   console.log(manageFile_list);
    // }, 5000)

    const init = async () => {
      console.log('init');
      try{
        const { data } = await axios.post('/folder/list')

        category_list = data
      }
      catch(error) {console.log(error);}


      try{
        const { data } = await axios.post('/file/list', {
          type: 'manage'
        })

        manageFile_list = data
      }
      catch(error) {console.log(error);}

      try{
        const { data } = await axios.post('/file/list', {
          type: 'etc'
        })

        etcFile_list = data
      }
      catch(error) {console.log(error);}


      categorys_in_manageFiles.value = category_in_file(deepCopy(category_list), manageFile_list, 'code', 'folderCd')
      categorys_in_etcFiles.value = category_in_file(deepCopy(category_list), etcFile_list, 'code', 'folderCd')
    }


    const category_in_file = (category_arr, file_arr, category_key, file_key) => {
      console.log('category in file');
      console.log(category_arr);
      console.log(file_arr);
      let result = []

      for (let i = 0; i < category_arr.length; i++) {
        const category = category_arr[i]

        result.push(category)

        category.files = []

        for (let j = 0; j < file_arr.length; j++) {
          const file = file_arr[j]

          if (category[category_key] == file[file_key]) {
            category.files.push(file)
          }
        }
      }

      console.log(result);

      return result
    }

    init()

    watch(() => store.state.upload, async (value) => {
      console.log(value);
      try{
        const { data } = await axios.post('/file/list', {
          type: 'manage'
        })

        for (let i = 0; i < data.length; i++) {
          const { id, lock, folderCd } = data[i]

          // lock 파일 (카테고리 분류 필요없음)
          if (lock) files_lock.value[id] = data[i]
          
          // normal 파일 (카테고리 분류 필요)
          else {
            if (folderCd.includes('/')) files.value[folderCd].files[id] = data[i];
          }
        }
      }
      catch(error) {console.log(error);}

      try{
        const { data } = await axios.post('/file/list', {
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
    })

    // setInterval(() => {
    //   init()
    // }, 1000);

    const file_click = (path, name, user, team, date, cate) => {
      // console.log(path, name);
      localStorage.setItem('path', path)
      localStorage.setItem('name', name)
      localStorage.setItem('user', user)
      localStorage.setItem('team', team)
      localStorage.setItem('date', date)
      localStorage.setItem('cate', cate)


      router.push({ name: "excel" });
    }

    let drag_file = null

    const file_drag = (file) => {
      console.log(file);

      drag_file = file
    }

    const file_drag_drop_lock = () => {
      console.log(drag_file);
      files_lock.value[drag_file.id] = drag_file
      delete files.value[drag_file.folderCd].files[drag_file.id]
      axios.post('/file/lock', {
        id: drag_file.id
      })

      drag_file = null
    }

    const file_drag_drop_unlock = () => {
      console.log(files.value[drag_file.folderCd]);
      files.value[drag_file.folderCd].files[drag_file.id] = drag_file
      delete files_lock.value[drag_file.id]
      axios.post('/file/unlock', { 
        id: drag_file.id
      })

      drag_file = null
    }

    let lock_state = 'manage'
    let list_check_useless_file = ref([])
    const change_lock_state = (state) => {
      document.querySelector('#all-check').checked = false
      lock_state = state
      list_check_useless_file.value = []
    }
    const check_all_useless_file = (e, id) => {
      // console.log(list_check_useless_file.value);
      // console.log(e.target.checked);
      // console.log(id);

      if(e.target.checked) {
        if (lock_state == 'manage') {
          for (const key in files_lock.value) {
            list_check_useless_file.value.push(key)
          }
        }
        if (lock_state == 'etc') {
          for (const key in files_etc_lock.value) {
            list_check_useless_file.value.push(key)
          }
        }
      }
      else{
        list_check_useless_file.value = []
      }
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

    const delete_file = () => {
      list_check_useless_file.value.forEach((file_id) => {
        // console.log(file_id);
        axios.post('/file/delete', {id: file_id})
      })

      init()
    }

    return {
      hasActiveChildren,
      MainMenuConfig,
      sidebarMenuIcons,
      translate,
      files,
      files_lock,
      files_etc,
      files_etc_lock,
      // categorys,
      categorys_etc,
      file_click,
      file_drag,
      file_drag_drop_lock,
      file_drag_drop_unlock,
      list_check_useless_file,
      check_all_useless_file,
      change_lock_state,
      delete_file,
      categorys_in_manageFiles
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
.non-use-file{
  margin: 12px 4px;
  margin-top: 0;
  .lockfile-wrap{
    width: 100%;
    min-height: 200px;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 13px !important;
  }
  .menu.nav {
    display: flex;
    align-items: center;
    margin: 10px 0;
    
    .non-use-file-category{
      margin-left: 6px;
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      color: #fff;
      border-radius: 24px;
      border: 1px solid var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
      font-size: 13px !important;
      cursor: pointer;
      &.active{
        background: #009EF7;
        border-color: transparent;
      }
    }
  }

  .form-check{
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    .form-check-input{
      border-radius: 1px;
      width: 14px;
      height: 14px;
      margin: 0;
    }
  }
}
</style>