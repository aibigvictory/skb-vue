<template>
  <div class="dashboard-favorites">
    <div class="header">
      <div class="title">즐겨찾기</div>
      <router-link to="favo" class="more">
        더보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_584_55819"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#58595D" />
          </mask>
          <g mask="url(#mask0_584_55819)">
            <path
              d="M12.9467 12.0005L8.87358 7.92737C8.73511 7.78892 8.66428 7.61489 8.66108 7.40527C8.65786 7.19568 8.72869 7.01844 8.87358 6.87357C9.01844 6.72869 9.19408 6.65625 9.40048 6.65625C9.60688 6.65625 9.78251 6.72869 9.92738 6.87357L14.4216 11.3678C14.5152 11.4614 14.5812 11.5601 14.6197 11.6639C14.6581 11.7678 14.6774 11.88 14.6774 12.0005C14.6774 12.121 14.6581 12.2332 14.6197 12.337C14.5812 12.4408 14.5152 12.5396 14.4216 12.6331L9.92738 17.1274C9.78893 17.2658 9.61489 17.3367 9.40527 17.3399C9.19568 17.3431 9.01844 17.2723 8.87358 17.1274C8.72869 16.9825 8.65625 16.8069 8.65625 16.6005C8.65625 16.3941 8.72869 16.2184 8.87358 16.0736L12.9467 12.0005Z"
              fill="#58595D"
            />
          </g>
        </svg>
      </router-link>
    </div>
    <div class="content">
      <div class="table-header">
        <ul>
          <li>그룹</li>
          <li>파일명</li>
          <li>최초등록</li>
          <li>등록일시</li>
          <li>수정자</li>
          <li>수정일시</li>
          <li>파일수정</li>
        </ul>
      </div>
      <div class="table-body" v-if="favorite_data.length">
        <ul v-for="ul in favorite_data" :key="ul">
          <li>
            {{
              group_name(store.getters.getData("folder_all"), ul.file.folderCd)
            }}
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M3.61224 15.4427C3.2258 15.6413 2.78823 15.2942 2.86603 14.8508L3.69576 10.1213L0.173428 6.76462C-0.155753 6.45092 0.0146475 5.87737 0.455637 5.81472L5.35411 5.11885L7.53823 0.792305C7.73498 0.402565 8.26795 0.402565 8.4647 0.792305L10.6488 5.11885L15.5473 5.81472C15.9883 5.87737 16.1587 6.45092 15.8295 6.76462L12.3072 10.1213L13.1369 14.8508C13.2147 15.2942 12.7771 15.6413 12.3907 15.4427L8.00146 13.1868L3.61224 15.4427Z"
                fill="#FFC700"
              />
            </svg>
            {{
              `${ul.file.name}${ul.file.version ? `_${ul.file.version}` : ""}.${
                ul.file.extension
              }`
            }}
          </li>
          <li>
            <div>{{ ul.file && ul.file.user ? ul.file.user.name : "" }}</div>
            <div>
              <span class="company">{{
                company_name(
                  store.getters.getData("company"),
                  ul.file.user.companyId
                )
              }}</span>
            </div>
          </li>
          <li>
            {{ ul.file.createdAt ? ul.file.createdAt.slice(0, 10) : "" }}
            {{ ul.file.createdAt ? ul.file.createdAt.slice(11, 19) : "" }}
          </li>
          <li>
            <div>
              {{ ul.file.history[0].user ? ul.file.history[0].user.name : "" }}
              <svg
                @click="change_popup_state('open', true, ul.file.history)"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <mask
                  id="mask0_1352_6164"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="17"
                >
                  <rect y="0.5" width="16" height="16" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_1352_6164)">
                  <path
                    d="M12.295 12.4176V10.8715C12.295 10.7911 12.266 10.7219 12.2078 10.6638C12.1497 10.6056 12.0805 10.5766 12.0001 10.5766C11.9198 10.5766 11.8506 10.6056 11.7925 10.6638C11.7343 10.7219 11.7053 10.7911 11.7053 10.8715V12.4112C11.7053 12.4915 11.7198 12.5674 11.7489 12.6388C11.7779 12.7101 11.8237 12.777 11.886 12.8394L12.9091 13.8625C12.9672 13.9206 13.0354 13.9507 13.1136 13.9529C13.1918 13.955 13.2621 13.9249 13.3245 13.8625C13.3826 13.8044 13.4117 13.7351 13.4117 13.6548C13.4117 13.5744 13.3826 13.5052 13.3245 13.4471L12.295 12.4176ZM3.53863 14.1663C3.20615 14.1663 2.92218 14.0486 2.68671 13.8131C2.45123 13.5776 2.3335 13.2937 2.3335 12.9612V4.03814C2.3335 3.70566 2.45123 3.42169 2.68671 3.18622C2.92218 2.95075 3.20615 2.83301 3.53863 2.83301H12.4617C12.7941 2.83301 13.0781 2.95075 13.3136 3.18622C13.5491 3.42169 13.6668 3.70566 13.6668 4.03814V8.25478C13.5027 8.1847 13.3384 8.1253 13.1738 8.07659C13.0093 8.02787 12.8403 7.98898 12.6668 7.95993V4.03814C12.6668 3.98685 12.6454 3.93984 12.6027 3.89709C12.56 3.85436 12.513 3.83299 12.4617 3.83299H3.53863C3.48734 3.83299 3.44032 3.85436 3.39758 3.89709C3.35485 3.93984 3.33348 3.98685 3.33348 4.03814V12.9612C3.33348 13.0125 3.35485 13.0595 3.39758 13.1022C3.44032 13.145 3.48734 13.1663 3.53863 13.1663H7.44375C7.46852 13.3509 7.50527 13.5255 7.554 13.69C7.60271 13.8546 7.66211 14.0133 7.7322 14.1663H3.53863ZM3.33348 13.1663V3.83299V7.95993V7.90993V13.1663ZM4.8335 11.0894C4.8335 11.2313 4.88136 11.3501 4.97708 11.4458C5.0728 11.5415 5.1916 11.5894 5.33348 11.5894H7.5117C7.54075 11.4159 7.58391 11.2469 7.64118 11.0823C7.69845 10.9178 7.76084 10.7535 7.82836 10.5894H5.33348C5.1916 10.5894 5.0728 10.6373 4.97708 10.733C4.88136 10.8287 4.8335 10.9475 4.8335 11.0894ZM4.8335 8.49966C4.8335 8.64154 4.88136 8.76034 4.97708 8.85606C5.0728 8.95178 5.1916 8.99964 5.33348 8.99964H9.06043C9.34761 8.75606 9.65401 8.55201 9.97963 8.38748C10.3053 8.22295 10.654 8.10607 11.0258 8.03684C10.9514 8.0189 10.8681 8.00821 10.7758 8.00479C10.6835 8.00138 10.6001 7.99968 10.5258 7.99968H5.33348C5.1916 7.99968 5.0728 8.04754 4.97708 8.14326C4.88136 8.23898 4.8335 8.35778 4.8335 8.49966ZM4.8335 5.90993C4.8335 6.0518 4.88136 6.1706 4.97708 6.26632C5.0728 6.36205 5.1916 6.40991 5.33348 6.40991H10.6668C10.8087 6.40991 10.9275 6.36205 11.0232 6.26632C11.1189 6.1706 11.1668 6.0518 11.1668 5.90993C11.1668 5.76805 11.1189 5.64925 11.0232 5.55352C10.9275 5.45779 10.8087 5.40993 10.6668 5.40993H5.33348C5.1916 5.40993 5.0728 5.45779 4.97708 5.55352C4.88136 5.64925 4.8335 5.76805 4.8335 5.90993ZM12.0001 15.5381C11.1677 15.5381 10.4596 15.2462 9.8758 14.6625C9.29204 14.0787 9.00016 13.3706 9.00016 12.5381C9.00016 11.7056 9.29204 10.9975 9.8758 10.4138C10.4596 9.83002 11.1677 9.53814 12.0001 9.53814C12.8326 9.53814 13.5407 9.83002 14.1245 10.4138C14.7083 10.9975 15.0001 11.7056 15.0001 12.5381C15.0001 13.3706 14.7083 14.0787 14.1245 14.6625C13.5407 15.2462 12.8326 15.5381 12.0001 15.5381Z"
                    fill="#B5B5C3"
                  />
                </g>
              </svg>
            </div>
            <div>
              <span class="company">{{
                company_name(
                  store.getters.getData("company"),
                  ul.file.history[0].user.companyId
                )
              }}</span>
            </div>
          </li>
          <li>
            {{
              ul.file.history[0].updatedAt
                ? ul.file.history[0].updatedAt.slice(0, 10)
                : ""
            }}
            {{
              ul.file.history[0].updatedAt
                ? ul.file.history[0].updatedAt.slice(11, 19)
                : ""
            }}
          </li>
          <li>
            <span class="adjust" @click="file_click(ul.fileId)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M13.5668 5.06844L12.1274 6.50709L8.29011 2.66975L9.72878 1.23039C9.98331 0.975908 10.3285 0.833008 10.6884 0.833008C11.0484 0.833008 11.3936 0.975908 11.6481 1.23039L13.5668 3.14909C13.8212 3.40363 13.9642 3.74879 13.9642 4.10872C13.9642 4.46865 13.8212 4.8139 13.5668 5.06844ZM1.7581 14.1211L5.89144 12.7431L2.0541 8.90576L0.676104 13.0391C0.625544 13.19 0.61813 13.3522 0.654704 13.5072C0.69127 13.6622 0.770377 13.8038 0.883104 13.9163C0.995837 14.0287 1.13772 14.1074 1.29278 14.1436C1.44783 14.1798 1.60991 14.172 1.76077 14.1211H1.7581Z"
                  fill="#009EF7"
                />
                <path
                  d="M3.01573 13.6997L1.76107 14.1183C1.61034 14.1685 1.44863 14.1757 1.29403 14.1393C1.13943 14.1027 0.998025 14.0239 0.885665 13.9116C0.773305 13.7993 0.694412 13.658 0.657805 13.5034C0.621198 13.3488 0.628325 13.1871 0.678392 13.0364L1.09707 11.781L3.01573 13.6997ZM2.05639 8.90301L5.89373 12.7403L12.1297 6.50434L8.2924 2.66699L2.05639 8.90301Z"
                  fill="#009EF7"
                />
              </svg>
            </span>
          </li>
        </ul>
        <!-- <ul>
            <li>HD방송</li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M3.61224 15.4427C3.2258 15.6413 2.78823 15.2942 2.86603 14.8508L3.69576 10.1213L0.173428 6.76462C-0.155753 6.45092 0.0146475 5.87737 0.455637 5.81472L5.35411 5.11885L7.53823 0.792305C7.73498 0.402565 8.26795 0.402565 8.4647 0.792305L10.6488 5.11885L15.5473 5.81472C15.9883 5.87737 16.1587 6.45092 15.8295 6.76462L12.3072 10.1213L13.1369 14.8508C13.2147 15.2942 12.7771 15.6413 12.3907 15.4427L8.00146 13.1868L3.61224 15.4427Z" fill="#FFC700"/>
                </svg>
                2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP
            </li>
            <li>
                <div>홍길동</div>
                <div><span class="company">SKB</span></div>
            </li>
            <li>2023.06.26 12:23:35</li>
            <li>
                <div>홍길동</div>
                <div><span class="company">SKB</span></div>
            </li>
            <li>2023.06.26 12:23:35</li>
            <li>
                <span class="adjust">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path opacity="0.3" d="M13.5668 5.06844L12.1274 6.50709L8.29011 2.66975L9.72878 1.23039C9.98331 0.975908 10.3285 0.833008 10.6884 0.833008C11.0484 0.833008 11.3936 0.975908 11.6481 1.23039L13.5668 3.14909C13.8212 3.40363 13.9642 3.74879 13.9642 4.10872C13.9642 4.46865 13.8212 4.8139 13.5668 5.06844ZM1.7581 14.1211L5.89144 12.7431L2.0541 8.90576L0.676104 13.0391C0.625544 13.19 0.61813 13.3522 0.654704 13.5072C0.69127 13.6622 0.770377 13.8038 0.883104 13.9163C0.995837 14.0287 1.13772 14.1074 1.29278 14.1436C1.44783 14.1798 1.60991 14.172 1.76077 14.1211H1.7581Z" fill="#009EF7"/>
                <path d="M3.01573 13.6997L1.76107 14.1183C1.61034 14.1685 1.44863 14.1757 1.29403 14.1393C1.13943 14.1027 0.998025 14.0239 0.885665 13.9116C0.773305 13.7993 0.694412 13.658 0.657805 13.5034C0.621198 13.3488 0.628325 13.1871 0.678392 13.0364L1.09707 11.781L3.01573 13.6997ZM2.05639 8.90301L5.89373 12.7403L12.1297 6.50434L8.2924 2.66699L2.05639 8.90301Z" fill="#009EF7"/>
                </svg>
                </span>
            </li>
            </ul>
            <ul>
            <li>HD방송</li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M3.61224 15.4427C3.2258 15.6413 2.78823 15.2942 2.86603 14.8508L3.69576 10.1213L0.173428 6.76462C-0.155753 6.45092 0.0146475 5.87737 0.455637 5.81472L5.35411 5.11885L7.53823 0.792305C7.73498 0.402565 8.26795 0.402565 8.4647 0.792305L10.6488 5.11885L15.5473 5.81472C15.9883 5.87737 16.1587 6.45092 15.8295 6.76462L12.3072 10.1213L13.1369 14.8508C13.2147 15.2942 12.7771 15.6413 12.3907 15.4427L8.00146 13.1868L3.61224 15.4427Z" fill="#FFC700"/>
                </svg>
                2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP
            </li>
            <li>
                <div>홍길동</div>
                <div><span class="company">SKB</span></div>
            </li>
            <li>2023.06.26 12:23:35</li>
            <li>
                <div>홍길동</div>
                <div><span class="company">SKB</span></div>
            </li>
            <li>2023.06.26 12:23:35</li>
            <li>
                <span class="only-read">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M16.2998 8C16.2998 8 13.2998 2.5 8.2998 2.5C3.2998 2.5 0.299805 8 0.299805 8C0.299805 8 3.2998 13.5 8.2998 13.5C13.2998 13.5 16.2998 8 16.2998 8ZM1.4725 8C1.52943 7.91321 1.59435 7.81677 1.66708 7.71242C2.00196 7.23193 2.49611 6.5929 3.13191 5.95711C4.42084 4.66818 6.18042 3.5 8.2998 3.5C10.4192 3.5 12.1788 4.66818 13.4677 5.95711C14.1035 6.5929 14.5976 7.23193 14.9325 7.71242C15.0053 7.81677 15.0702 7.91321 15.1271 8C15.0702 8.08679 15.0053 8.18323 14.9325 8.28758C14.5976 8.76807 14.1035 9.4071 13.4677 10.0429C12.1788 11.3318 10.4192 12.5 8.2998 12.5C6.18042 12.5 4.42084 11.3318 3.13191 10.0429C2.49611 9.4071 2.00196 8.76807 1.66708 8.28758C1.59435 8.18323 1.52943 8.08679 1.4725 8Z" fill="#B5B5C3"/>
                <path d="M8.2998 5.5C6.91909 5.5 5.7998 6.61929 5.7998 8C5.7998 9.38071 6.91909 10.5 8.2998 10.5C9.68052 10.5 10.7998 9.38071 10.7998 8C10.7998 6.61929 9.68052 5.5 8.2998 5.5Z" fill="#B5B5C3"/>
                </svg>
                읽기전용
                </span>
            </li>
            </ul> -->
      </div>
      <div
        class="table-body d-flex justify-content-center"
        v-if="!favorite_data.length"
      >
        <ul>
          즐겨찾기가 없습니다.
        </ul>
      </div>
    </div>
  </div>
  <DashboardFavoritesPopup
    v-if="popup_state"
    @exit="change_popup_state('delete', false)"
    :history="history"
  />
</template>

<script setup lang="ts">
import DashboardFavoritesPopup from "@/components/dashboard/DashboardFavoritesPopup.vue";
import JwtService from "@/core/services/JwtService";
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import store from "@/store";

const popup_state = ref(false);

const change_popup_state = (popup_type, state, history_data) => {
  history.value = history_data;

  popup_state.value = state;
};

const favorite_data = ref([]);
const history = ref([]);

const company_name = (company_list, companyId) => {
  if (!companyId || !company_list.length) return "";
  else {
    const result = company_list.find((company) => company.id == companyId);
    return result.name;
  }
};

const group_name = (group_list, folderCd) => {
  if (!folderCd || !group_list.length) return "";
  const result = group_list.find((group) => group.code == folderCd);
  return result.name;
};

const init = async () => {
  const axios_config = {
    headers: { Authorization: `Bearer ${JwtService.getToken()}` },
  };

  try {
    const { data } = await axios.get("/bookmark/list", axios_config);

    favorite_data.value = data.slice(0, 2);
  } catch (error) {}
};

init();

const file_click = (id, name, user, team, date, cate) => {
  sessionStorage.setItem("id", id);

  router.push(`excel/${id}`);
};
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
svg {
  cursor: pointer;
}
.dashboard-favorites {
  margin-top: 48px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title {
      color: var(--primary-text, #222);
      font-size: 20px;
      font-weight: 600;
    }
    .more {
      cursor: pointer;
      color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595d);
      font-size: 14px;
      font-weight: 700;
    }
  }
  .content {
    border-radius: 10px;
    background: var(--default-white, #fff);
    padding: 24px;
    .table-header {
      display: flex;
      align-items: center;
      height: 68px;
      background: var(----bs-gray-100, #f9f9f9);
      ul {
        display: flex;
        li {
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          color: var(--primary-text, #222);
          text-align: center;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .table-body {
      ul {
        display: flex;
        align-items: center;
        border-top: 1px solid rgb(241, 241, 241);
        height: 54px;
        li {
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          text-align: center;
          color: var(--primary-text, #222);
          font-size: 14px;
          font-weight: 400;

          .company {
            padding: 4px 20px;
            border-radius: 21px;
            background: #fff5f8;

            color: #f1416c;
            font-size: 12px;
            font-weight: 700;
          }
          .adjust {
            cursor: pointer;
          }
          .only-read {
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 30px;
            background: var(--data-bs-theme-light-bs-text-gray-200, #f1f1f2);

            color: var(--data-bs-theme-light-bs-text-gray-400, #b5b5c3);
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
