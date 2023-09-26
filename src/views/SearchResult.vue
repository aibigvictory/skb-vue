<template>
  <div class="warp">
    <div class="search-result-header d-flex justify-content-between">
      <div class="title">검색결과 <span>"{{search_keyword}}"</span></div>
      <button class="load-btn" @click="load_search_result">불러오기</button>
    </div>
    <div class="search-result-section d-flex">
      <div class="category">
        <div class="category-title"><div class="text">전체</div></div>
        <ul class="category-list nav">
          <li v-for="(folder, idx) in folder_list" :key="folder" @click="click_category" :class="{ active: !idx }" data-bs-toggle="tab" :href="`#kt_tab_pane_${idx + 1}${idx + 1}${idx + 1}`">{{folder.name}} ({{folder.files? folder.files.length :1}})</li>
        </ul>
      </div>
      <div class="search-result-item">
        <div class="tab-content" id="myTabContent">
          <div v-for="(folder, idx) in folder_list" :key="folder" class="tab-pane fade" :class="{ show: !idx, active: !idx }" :id="`kt_tab_pane_${idx + 1}${idx + 1}${idx + 1}`" role="tabpanel">
            <div class="search-result-item-button">
              <div class="btn-wrap d-flex">
                <button @click="check_file_all('check', $event, folder)">전체선택</button>
                <button @click="check_file_all('delete', $event, folder)">전체해제</button>
              </div>
            </div>
            <!-- {{item}} -->
            <ul class="search-result-item-list d-flex align-items-center">
              <li v-for="item in folder.files" :key="item" class="d-flex align-items-center"><input @change="check_file($event, folder, item)" type="checkbox" class="form-check-input" :id="`checkbox${item.id}`"><label :for="`checkbox${item.id}`">{{item.name}}</label></li>
            </ul>
          </div>
          <!-- <div class="tab-pane fade show active" id="kt_tab_pane_111" role="tabpanel">
            <ul class="search-result-item-list d-flex align-items-center">
              <li v-for="item in [1,2,3,4]" :key="item" class="d-flex align-items-center"><input type="checkbox" class="form-check-input" :id="`checkbox${item}`"><label :for="`checkbox${item}`">CATV관리문서_MUX_SCR_230428</label></li>
            </ul>
          </div>
          <div class="tab-pane fade" id="kt_tab_pane_222" role="tabpanel">
            <ul class="search-result-item-list d-flex align-items-center">
              <li v-for="item in [1,2,3,4]" :key="item" class="d-flex align-items-center"><input type="checkbox" class="form-check-input" :id="`checkbox${item}`"><label :for="`checkbox${item}`">CATV관리문서_MUX_SCR_230428</label></li>
            </ul>
          </div> -->
        </div>
        
      </div> 
      <div class="option">
        <select @change="change_file_sort" class="form-select" aria-label="Select example">
          <option value="recent">최신순</option>
          <option value="old">오래된순</option>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
    </div>
    <div class="search-result-section2">
      <div class="title">관리파일 리스트 <span>{{checked_file_sum}}건</span></div>
      <ul class="search-result-section2-wrap">
        <li v-if="!Object.keys(checked_file_list).length">선택한 관리파일이 없습니다.</li>
        <li v-for="item1 in checked_file_list" :key="item1" class="search-result-section2-folder">
          <div class="folder d-flex align-items-center">
            <div class="img d-flex justify-content-center align-items-center">
              <img src="media/icons/duotune/art/art005.svg" alt="">
            </div>
            <span>{{item1.name}}</span>
          </div>
          <ul class="files d-flex">
            <li v-for="item2 in item1.files" :key="item2" class="d-flex align-items-center">
              <img src="@/assets/img/group32.svg" alt="">
              <span>{{item2.name}}</span>
              <span @click="delete_checked_file(item1.name, item2.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <mask id="mask0_604_56632" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                <rect width="14" height="14" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_604_56632)">
                <path d="M7.00015 7.61488L8.79279 9.40751C8.87355 9.48828 8.97507 9.5296 9.09735 9.53147C9.21962 9.53334 9.323 9.49202 9.40751 9.40751C9.49202 9.323 9.53428 9.22055 9.53428 9.10015C9.53428 8.97975 9.49202 8.8773 9.40751 8.79279L7.61488 7.00015L9.40751 5.20751C9.48828 5.12674 9.5296 5.02523 9.53147 4.90295C9.53334 4.78068 9.49202 4.6773 9.40751 4.59279C9.323 4.50828 9.22055 4.46602 9.10015 4.46602C8.97975 4.46602 8.8773 4.50828 8.79279 4.59279L7.00015 6.38542L5.20751 4.59279C5.12674 4.51202 5.02522 4.4707 4.90295 4.46883C4.78068 4.46696 4.6773 4.50828 4.59279 4.59279C4.50827 4.6773 4.46602 4.77975 4.46602 4.90015C4.46602 5.02055 4.50827 5.123 4.59279 5.20751L6.38542 7.00015L4.59279 8.79279C4.51202 8.87355 4.4707 8.97507 4.46883 9.09735C4.46696 9.21962 4.50827 9.323 4.59279 9.40751C4.6773 9.49202 4.77975 9.53428 4.90015 9.53428C5.02055 9.53428 5.123 9.49202 5.20751 9.40751L7.00015 7.61488ZM7.00112 12.5418C6.23466 12.5418 5.51423 12.3964 4.83982 12.1055C4.1654 11.8146 3.57875 11.4198 3.07987 10.9212C2.58099 10.4225 2.18603 9.8361 1.89502 9.16198C1.604 8.48787 1.4585 7.76759 1.4585 7.00113C1.4585 6.23466 1.60394 5.51423 1.89483 4.83982C2.18572 4.1654 2.58049 3.57875 3.07914 3.07987C3.5778 2.58099 4.1642 2.18603 4.83832 1.89502C5.51242 1.604 6.23271 1.4585 6.99917 1.4585C7.76563 1.4585 8.48607 1.60394 9.16048 1.89483C9.8349 2.18572 10.4215 2.58049 10.9204 3.07914C11.4193 3.5778 11.8143 4.1642 12.1053 4.83832C12.3963 5.51243 12.5418 6.23271 12.5418 6.99917C12.5418 7.76563 12.3964 8.48607 12.1055 9.16048C11.8146 9.8349 11.4198 10.4215 10.9212 10.9204C10.4225 11.4193 9.8361 11.8143 9.16198 12.1053C8.48787 12.3963 7.76759 12.5418 7.00112 12.5418ZM7.00015 11.6668C8.30293 11.6668 9.4064 11.2147 10.3106 10.3106C11.2147 9.4064 11.6668 8.30293 11.6668 7.00015C11.6668 5.69737 11.2147 4.5939 10.3106 3.68973C9.4064 2.78557 8.30293 2.33348 7.00015 2.33348C5.69737 2.33348 4.5939 2.78557 3.68973 3.68973C2.78556 4.5939 2.33348 5.69737 2.33348 7.00015C2.33348 8.30293 2.78556 9.4064 3.68973 10.3106C4.5939 11.2147 5.69737 11.6668 7.00015 11.6668Z" fill="#009EF7"/>
                </g>
                </svg>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import store from '@/store';
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';

let search_keyword = ref('')
let folder_list = ref([])
let file_push = []

search_keyword.value = store.state.search_keyword

const folder_code = {
  '001/001': 'HD방송',
  '001/002': 'CATV_SO',
  '001/003': 'TITAN',
}

const init = async () => {
  const { data } = await axios.get(`http://dev.peerline.net:9494/search?q=${search_keyword.value}`)
  const { files, folders } = data

  folder_list.value = folders

  files.forEach((item) => {
    if (file_push.includes(item.id)) return

    try{
      for (let i = 0; i < folder_list.value.length; i++) {
        if (!folder_list.value[i].files) folder_list.value[i].files = []
        if (folder_list.value[i].name == folder_code[item.folderCd]) {
          folder_list.value[i].files.push(item)
          file_push.push(item.id)
        }
      }
    }
    catch(error) {console.log(error)};
    
  })

  console.log(folder_list.value);
  
}

watch(() => store.state.search_keyword, async (value) => {
  folder_list.value = []
  file_push = []

  search_keyword.value = store.state.search_keyword
  await init()
})

init()

let checked_file_id_list = []
const checked_file_list = ref({})
const checked_file_sum = computed(() => {
  let count = 0

  for(let key in checked_file_list.value) {
    count = count + Object.keys(checked_file_list.value[key].files).length
  }

  return count
})

const change_file_sort = (e) => {
  const type = e.target.value
  console.log(e.target.value);

  if (type == 'recent') {
    folder_list.value.forEach((folder: any) => {
      console.log(folder.files);
  
      folder.files = folder.files.sort((a, b) => {
        if(a.createdAt < b.createdAt) return 1;
        if(a.createdAt > b.createdAt) return -1;
        return 0;
      })
    })
  }

  if (type == 'old') {
    folder_list.value.forEach((folder: any) => {
      console.log(folder.files);
  
      folder.files = folder.files.sort((a, b) => {
        if(a.createdAt > b.createdAt) return 1;
        if(a.createdAt < b.createdAt) return -1;
        return 0;
      })
    })
  }

  if (type == 'asc') {
    folder_list.value.forEach((folder: any) => {
      console.log(folder.files);
  
      folder.files = folder.files.sort((a, b) => {
        if(a.name < b.name) return 1;
        if(a.name > b.name) return -1;
        return 0;
      })
    })
  }

  if (type == 'desc') {
    folder_list.value.forEach((folder: any) => {
      console.log(folder.files);
  
      folder.files = folder.files.sort((a, b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
      })
    })
  }

  
}

const check_file = (e, folder, file) => {
  console.log(e.target.checked);
  if (e.target.checked) {
    if (!checked_file_list.value[folder.name]) checked_file_list.value[folder.name] = {}
    if (!checked_file_list.value[folder.name]['name']) checked_file_list.value[folder.name]['name'] = folder.name
    if (!checked_file_list.value[folder.name]['files']) checked_file_list.value[folder.name]['files'] = {}
    checked_file_list.value[folder.name]['files'][file.id] = file
  }
  else{
    delete checked_file_list.value[folder.name]['files'][file.id]
    
    if (!Object.keys(checked_file_list.value[folder.name]['files']).length) delete checked_file_list.value[folder.name]
  }
}

const check_file_all = (type, e, folder) => {
  if (type == 'check') {
    if (!checked_file_list.value[folder.name]) checked_file_list.value[folder.name] = {}
    if (!checked_file_list.value[folder.name]['name']) checked_file_list.value[folder.name]['name'] = folder.name
    if (!checked_file_list.value[folder.name]['files']) checked_file_list.value[folder.name]['files'] = {}
  
    folder.files.forEach((item) => {
      console.log(item);
      if (!checked_file_list.value[folder.name]['files'][item.id]) checked_file_list.value[folder.name]['files'][item.id] = item
      // e.target.checked = true
      document.querySelector(`#checkbox${item.id}`).checked = true
    })
  }
  
  if (type == 'delete') {
    delete checked_file_list.value[folder.name]

    folder.files.forEach((item) => {
      document.querySelector(`#checkbox${item.id}`).checked = false
    })
  }
}

const delete_checked_file = (folder_name, file_id) => {
  delete checked_file_list.value[folder_name]['files'][file_id]

  if (!Object.keys(checked_file_list.value[folder_name]['files']).length) delete checked_file_list.value[folder_name]
  
  document.querySelector(`#checkbox${file_id}`).checked = false
}

// store.state.search_keyword = undefined



const click_category = (e) => {
  console.log(e.target);
  e.target.parentNode.childNodes.forEach(element => {
    if (element.classList && element.classList.contains('active')) element.classList.remove('active')  
  })
  e.target.classList.add('active')
}
// console.log(store.state.search_keyword);

const load_search_result = () => {
  if (!Object.keys(checked_file_list.value).length) return alert('엑셀파일을 선택해 주세요.')

  store.state.search_result = checked_file_list.value

  // console.log(checked_file_list.value);
  // console.log(Object.keys(checked_file_list.value).length);
  

  router.push('/load')
}

onMounted(() => {
})

</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}
.warp{
  .search-result-header{
    margin-top: 48px;
    .title{
      color: var(--primary-text, #222);
      text-align: left;
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%; /* 20px */
      span{
        color: var(--data-bs-theme-light-bs-red, #DC3545);
      }
    }
    .load-btn{
      cursor: pointer;
      border: none;
      display: flex;
      width: 146px;
      height: 44px;
      padding: 14px 38px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      background: var(--default-red, #DA1E28);

      color: #FFF;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%; /* 14px */
      letter-spacing: 0.5px;

    }
  }
  .search-result-section {
    position: relative;
    margin-top: 16px;
    border-radius: 10px;
    background: #FFF;
    padding: 8px 24px;
    .category{
      width: 180px;
      height: 228px;
      margin: 14px 0;
      padding-right: 16px;
      border-right: 1px solid #DCDFE6;
      .category-title{
        margin: 0;
        padding: 22px 8px 9px 8px;
        .text{
          margin-left: 0;
          transform: translateY(-50%);
          color: var(--primary-text, #222);
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 100%; /* 16px */
          letter-spacing: 0.5px;
        }
      }
      .category-list{
        color: var(--primary-text, #222);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 14px */
        li{
          display: flex;
          padding: 10px 24px 5px 8px;
          cursor: pointer;
          &.active{
            background: var(--root-data-theme-light-kt-light, #F5F8FA);
            color: rgba(0,158,247,1);
          }
        }
      }
    }
    .search-result-item{
      margin-left: 16px;
      .search-result-item-button{
        margin: 14px 0 4px 0;
        padding-top: 22px;
        .btn-wrap{
          transform: translateY(-50%);
          button{
            display: flex;
            width: 72px;
            padding: 8px 13px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-radius: 38px;
            border: none;
            margin-right: 8px;
  
            color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            text-align: center;
            font-size: 11px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%; /* 11px */
            letter-spacing: 0.5px;
            &:hover, &:focus{
              background: var(--root-data-theme-light-kt-primary, #009EF7);
              color: var(--default-white, #FFF);
            }
          }
        }
        
      }
      .search-result-item-list{
        li{
          margin-right: 20px;
          color: var(--kt-form-label-color, #3F4254);
          text-align: center;
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 120%; /* 14.4px */
          .form-check-input{
            margin-right: 4px;
            width: 14px;
            height: 14px;
            border-radius: 1px;
          }
        }
      }
    }
    .option{
      position: absolute;
      top: 24px;
      right: 18px;
      .form-select{
        width: 125px;
        height: 28px;
        padding: 0 0 0 12px;
      }
    }
  }
  .search-result-section2{
    // padding: 24px 16px;
    margin-top: 16px;
    .title{
      padding: 16px 0;
      color: var(--primary-text, #222);
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%; /* 20px */
    }
    .search-result-section2-wrap{
      padding: 16px 24px;
      border-radius: 10px;
      background: #FFF;
      .search-result-section2-folder{
        margin-bottom: 24px;
        &:last-child{
          margin-bottom: 0;
        }
        .folder{
          .img{
            width: 32px;
            height: 32px;
            img{
              width: 14px;
              height: 14px;
            }
          }
          span{
            color: var(--primary-text, #222);
            font-size: 14px ;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 14px */
          }
        }
        .files{
          margin-top: 8px;
          border-radius: 6px;
          li{
            background: var(--root-data-theme-light-kt-light, #F5F8FA);
            display: inline;
            padding: 8px;
            margin-right: 8px;
            img{
              width: 14px;
              height: 14px;
            }
            span{
              margin-right: 8px;
              color: var(--kt-form-label-color, #3F4254);
              font-family: Pretendard;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 130%; /* 15.6px */
              &:last-child{
                margin-right: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
