<template>
    <div class="dashboard-revision">
        <div class="header">
            <div class="title">최근 수정내역</div>
            <div class="more" @click="popup_state = true">
                더보기
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_584_55819" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#58595D"/>
                </mask>
                <g mask="url(#mask0_584_55819)">
                <path d="M12.9467 12.0005L8.87358 7.92737C8.73511 7.78892 8.66428 7.61489 8.66108 7.40527C8.65786 7.19568 8.72869 7.01844 8.87358 6.87357C9.01844 6.72869 9.19408 6.65625 9.40048 6.65625C9.60688 6.65625 9.78251 6.72869 9.92738 6.87357L14.4216 11.3678C14.5152 11.4614 14.5812 11.5601 14.6197 11.6639C14.6581 11.7678 14.6774 11.88 14.6774 12.0005C14.6774 12.121 14.6581 12.2332 14.6197 12.337C14.5812 12.4408 14.5152 12.5396 14.4216 12.6331L9.92738 17.1274C9.78893 17.2658 9.61489 17.3367 9.40527 17.3399C9.19568 17.3431 9.01844 17.2723 8.87358 17.1274C8.72869 16.9825 8.65625 16.8069 8.65625 16.6005C8.65625 16.3941 8.72869 16.2184 8.87358 16.0736L12.9467 12.0005Z" fill="#58595D"/>
                </g>
                </svg>
            </div>
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
        <div class="table-body">
        <!-- <ul>
          <li>HD방송</li>
          <li>2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP</li>
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
        </ul> -->
        <!-- <ul v-for="ul in revision_data" :key="ul">
            <li>{{ul.fileName}}</li>
            <li><span>{{ul.sheetName}}</span></li>
            <li><span class="purson">{{ul.file && ul.file.user ?ul.file.user.name: ''}}</span> <span class="depart" v-if="ul.file && ul.file.user && ul.file.user.department">{{ul.file.user.department}}</span></li>
            <li><div>
                <div>{{ul.createdAt ?ul.createdAt.slice(0,10) :''}}</div>
                <div>{{ul.createdAt ?ul.createdAt.slice(10,20) :''}}</div>
            </div></li>
            <li><span class="purson">{{ul.user ?ul.user.name : ''}}</span> <span class="depart" v-if="ul.user && ul.user.department">{{ul.user.department}}</span></li>
            <li><div>
                <div>{{ul.updatedAt ?ul.updatedAt.slice(0,10) :''}}</div>
                <div>{{ul.updatedAt ?ul.updatedAt.slice(10,20) :''}}</div>
            </div></li>
        </ul> -->
        <ul v-for="ul in revision_data" :key="ul">
          <li>{{group_name(group_data, ul.file.folderCd)}}</li>
          <li>{{ul.fileName}} > {{ul.sheetName}}</li>
          <li>
            <div>{{ul.file && ul.file.user ?ul.file.user.name: ''}}</div>
            <!-- <div><span class="company">{{company_data}}</span></div> -->
            <div><span class="company">{{company_name(company_data, ul.user.companyId)}}</span></div>
          </li>
          <li>{{ul.createdAt ?ul.createdAt.slice(0,10) :''}} {{ul.createdAt ?ul.createdAt.slice(11,19) :''}}</li>
          <li>
            <div>{{ul.user ?ul.user.name : ''}}</div>
            <div><span class="company">{{ul.user && ul.user.department ?ul.user.department :'SKB'}}</span></div>
          </li>
          <li>{{ul.updatedAt ?ul.updatedAt.slice(0,10) :''}} {{ul.updatedAt ?ul.updatedAt.slice(11,19) :''}}</li>
          <li>
            <span class="adjust">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path opacity="0.3" d="M13.5668 5.06844L12.1274 6.50709L8.29011 2.66975L9.72878 1.23039C9.98331 0.975908 10.3285 0.833008 10.6884 0.833008C11.0484 0.833008 11.3936 0.975908 11.6481 1.23039L13.5668 3.14909C13.8212 3.40363 13.9642 3.74879 13.9642 4.10872C13.9642 4.46865 13.8212 4.8139 13.5668 5.06844ZM1.7581 14.1211L5.89144 12.7431L2.0541 8.90576L0.676104 13.0391C0.625544 13.19 0.61813 13.3522 0.654704 13.5072C0.69127 13.6622 0.770377 13.8038 0.883104 13.9163C0.995837 14.0287 1.13772 14.1074 1.29278 14.1436C1.44783 14.1798 1.60991 14.172 1.76077 14.1211H1.7581Z" fill="#009EF7"/>
              <path d="M3.01573 13.6997L1.76107 14.1183C1.61034 14.1685 1.44863 14.1757 1.29403 14.1393C1.13943 14.1027 0.998025 14.0239 0.885665 13.9116C0.773305 13.7993 0.694412 13.658 0.657805 13.5034C0.621198 13.3488 0.628325 13.1871 0.678392 13.0364L1.09707 11.781L3.01573 13.6997ZM2.05639 8.90301L5.89373 12.7403L12.1297 6.50434L8.2924 2.66699L2.05639 8.90301Z" fill="#009EF7"/>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <DashboardRevisionPopup v-if="popup_state" @exit="change_popup_state('delete', false)"/>
</template>

<script setup lang="ts">
import DashboardRevisionPopup from "@/components/dashboard/DashboardRevisionPopup.vue"
import JwtService from "@/core/services/JwtService"
import axios from "axios"
import { ref } from "vue"

const popup_state = ref(false)

const change_popup_state = (popup_type, state) => {
    popup_state.value = state
}

const revision_data = ref([])
const company_data =ref([])
const group_data =ref([])

const company_name = (company_list, companyId) => {
  if (!companyId || !company_list.length) return 'SKB'
  else {
    const result = company_list.find(company => company.id == companyId)
    return result.name
  }
}

const group_name = (group_list, folderCd) => {
  const result = group_list.find(group => group.code == folderCd)
  return result.name
}

const init = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }
    try {
      const { data } = await axios.get('/company/list', axios_config)
  
      company_data.value = data
    }
    catch(error) {}

    try {
      const { data } = await axios.post('/folder/list', {}, axios_config)
  
      group_data.value = data
    }
    catch(error) {}

    try {
      const { data } = await axios.post('/file/history', {}, axios_config)
  
      revision_data.value = data.slice(0,2)
    }
    catch(error) {}

}

init()
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}
.dashboard-revision{
  margin-top: 48px;
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title{
        color: var(--primary-text, #222);
        font-size: 20px;
        font-weight: 600;
    }
    .more{
        cursor: pointer;
        color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
        font-size: 14px;
        font-weight: 700;
    }
  }
  .content{
    border-radius: 10px;
    background: var(--default-white, #FFF);
    padding: 24px;
    .table-header{
      display: flex;
      align-items: center;
      height: 68px;
      background: var(----bs-gray-100, #F9F9F9);
      ul{
        display: flex;
        li{
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
    .table-body{
      ul{
        display: flex;
        align-items: center;
        border-top: 1px solid rgb(241,241,241);
        height: 54px;
        li{
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          text-align: center;
          color: var(--primary-text, #222);
          font-size: 14px;
          font-weight: 400;

          .company{
            padding: 4px 20px;
            border-radius: 21px;
            background: #FFF5F8;
           
            color: #F1416C;
            font-size: 12px;
            font-weight: 700;
          }
          .adjust{
            cursor: pointer;
          }
          .only-read{
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 30px;
            background: var(--data-bs-theme-light-bs-text-gray-200, #F1F1F2);

            color: var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>