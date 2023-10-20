<template>
  <div class="warp">
    <div class="download-wrap">
      <div class="option-wrap">
        정렬
        <div class="nav-group nav-group-fluid">
          <label>
            <input type="radio" class="btn-check" name="type" value="has" checked>
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary"> 기본 </span>
          </label>
          <label>
            <input type="radio" class="btn-check" name="type" value="users">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"> 123 </span>
          </label>
          <label>
            <input type="radio" class="btn-check" name="type" value="orders">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"> ABC </span>
          </label>
          <label>
            <input type="radio" class="btn-check" name="type" value="projects">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"> 가나다 </span>
          </label>
        </div>
        <div class="select-wrap">
          검색구분
          <input type="radio" id="radio-search-perfectly" value="perfectly" v-model="search_option">
          <label for="radio-search-perfectly">일치항목 검색</label>
          <input type="radio" id="radio-search-similarly" value="similarly" v-model="search_option">
          <label for="radio-search-similarly">가중치 검색</label>
        </div>
      </div>
      <!-- <div class="sort-btn">
        <button @click="sort_search_result($event,'default')" class="btn btn-primary">기본</button>
        <button @click="sort_search_result($event,'num')" class="btn btn-primary btn-secondary">123</button>
        <button @click="sort_search_result($event,'en')" class="btn btn-primary btn-secondary">ABC</button>
        <button @click="sort_search_result($event,'ko')" class="btn btn-primary btn-secondary">가나다</button>
      </div> -->
      <button class="download-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M0.5 9.90002C0.776142 9.90002 1 10.1239 1 10.4V12.9C1 13.4523 1.44772 13.9 2 13.9H14C14.5523 13.9 15 13.4523 15 12.9V10.4C15 10.1239 15.2239 9.90002 15.5 9.90002C15.7761 9.90002 16 10.1239 16 10.4V12.9C16 14.0046 15.1046 14.9 14 14.9H2C0.895431 14.9 0 14.0046 0 12.9V10.4C0 10.1239 0.223858 9.90002 0.5 9.90002Z" fill="white"/>
        <path d="M7.64645 11.8536C7.84171 12.0488 8.15829 12.0488 8.35355 11.8536L11.3536 8.85355C11.5488 8.65829 11.5488 8.34171 11.3536 8.14645C11.1583 7.95118 10.8417 7.95118 10.6464 8.14645L8.5 10.2929V1.5C8.5 1.22386 8.27614 1 8 1C7.72386 1 7.5 1.22386 7.5 1.5V10.2929L5.35355 8.14645C5.15829 7.95118 4.84171 7.95118 4.64645 8.14645C4.45118 8.34171 4.45118 8.65829 4.64645 8.85355L7.64645 11.8536Z" fill="white"/>
        </svg>
        통합검색결과 내려받기</button>
    </div>
    <ul>
      <li v-for="folder in search_result_list" :key="folder">
        <div class="title">
          <div class="text">
            {{folder.name}}
          </div>
        </div>
        <div v-for="file in folder.files" :key="file" class="content">
          <div class="sub-title">{{file.name}}</div>
          <div class="info">
            <div class="time">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7.45059 0.891593C7.30101 0.88056 7.15072 0.875 7 0.875V0C7.17224 0 7.344 0.00635424 7.51495 0.0189631L7.45059 0.891593ZM9.20436 1.28542C8.92372 1.17717 8.63548 1.08973 8.342 1.02382L8.53372 0.170084C8.86912 0.245405 9.19854 0.345332 9.51927 0.469048L9.20436 1.28542ZM10.4029 1.90725C10.2776 1.82352 10.1495 1.74464 10.019 1.67071L10.4503 0.909389C10.5994 0.993881 10.7458 1.08402 10.889 1.17971C11.0322 1.2754 11.1715 1.37611 11.3066 1.48157L10.7683 2.17138C10.6501 2.0791 10.5282 1.99098 10.4029 1.90725ZM12.0077 3.47318C11.8345 3.22725 11.6434 2.99441 11.436 2.77656L12.0697 2.17322C12.3068 2.42219 12.5252 2.68829 12.7231 2.96934L12.0077 3.47318ZM12.6588 4.65606C12.6011 4.51682 12.5384 4.3801 12.471 4.24613L13.2526 3.85272C13.3296 4.00584 13.4012 4.16209 13.4672 4.32122C13.5331 4.48034 13.5929 4.64146 13.6467 4.80422L12.8159 5.0787C12.7688 4.93629 12.7164 4.79531 12.6588 4.65606ZM13.1232 6.84969C13.1158 6.54899 13.0863 6.24922 13.0348 5.95286L13.8969 5.80327C13.9557 6.14197 13.9895 6.48455 13.9979 6.82821L13.1232 6.84969ZM13.0073 8.19493C13.0367 8.04711 13.0606 7.89862 13.0789 7.74976L13.9474 7.85688C13.9264 8.027 13.8991 8.1967 13.8655 8.36563C13.8319 8.53456 13.7922 8.70178 13.7464 8.86699L12.9031 8.63362C12.9431 8.48907 12.9779 8.34275 13.0073 8.19493ZM12.1747 10.2769C12.3357 10.0227 12.4776 9.75709 12.5995 9.4821L13.3995 9.83669C13.2602 10.151 13.0979 10.4546 12.914 10.745L12.1747 10.2769ZM11.331 11.331C11.4376 11.2245 11.5399 11.1143 11.6379 11.0007L12.3005 11.5722C12.1885 11.702 12.0715 11.828 11.9497 11.9497L11.331 11.331Z" fill="black"/>
              <path d="M7 0.875C5.99274 0.875 5.00102 1.12341 4.1127 1.59823C3.22437 2.07305 2.46686 2.75962 1.90725 3.59713C1.34765 4.43464 1.00322 5.39723 0.904495 6.39964C0.805766 7.40206 0.955777 8.41335 1.34124 9.34394C1.7267 10.2745 2.33572 11.0957 3.11434 11.7347C3.89297 12.3737 4.81716 12.8108 5.80507 13.0073C6.79298 13.2038 7.81411 13.1537 8.77799 12.8613C9.74188 12.5689 10.6188 12.0433 11.331 11.331L11.9497 11.9497C11.1358 12.7637 10.1336 13.3644 9.03199 13.6986C7.93041 14.0327 6.76341 14.0901 5.63437 13.8655C4.50533 13.6409 3.4491 13.1414 2.55925 12.4111C1.66939 11.6808 0.973374 10.7423 0.532845 9.67878C0.0923164 8.61525 -0.0791244 7.45949 0.0337087 6.31388C0.146542 5.16827 0.540166 4.06816 1.17971 3.11101C1.81926 2.15386 2.68499 1.3692 3.70022 0.826551C4.71545 0.2839 5.84885 0 7 0V0.875Z" fill="black"/>
              <path d="M6.5625 2.625C6.80413 2.625 7 2.82088 7 3.0625V7.62111L9.84206 9.24514C10.0519 9.36502 10.1247 9.63227 10.0049 9.84206C9.88498 10.0519 9.61773 10.1247 9.40794 10.0049L6.34544 8.25486C6.20913 8.17696 6.125 8.032 6.125 7.875V3.0625C6.125 2.82088 6.32088 2.625 6.5625 2.625Z" fill="black"/>
              </svg>
              마지막 수정일자:
              <span>{{new Date(file.updatedAt).toISOString().slice(0,19).replace(/T/g, ' ')}}</span>
            </div>
            <div class="type">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <mask id="mask0_623_14087" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
              <rect width="20" height="20" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_623_14087)">
              <path d="M9.58301 9.32031C8.78094 9.32031 8.09431 9.02721 7.52313 8.44101C6.95194 7.85479 6.66635 7.15009 6.66635 6.32691C6.66635 5.50372 6.95194 4.79902 7.52313 4.21282C8.09431 3.6266 8.78094 3.3335 9.58301 3.3335C10.3851 3.3335 11.0717 3.6266 11.6429 4.21282C12.2141 4.79902 12.4997 5.50372 12.4997 6.32691C12.4997 7.15009 12.2141 7.85479 11.6429 8.44101C11.0717 9.02721 10.3851 9.32031 9.58301 9.32031ZM14.567 15.8335H4.59901C4.24752 15.8335 3.94866 15.7071 3.7024 15.4544C3.45614 15.2016 3.33301 14.8949 3.33301 14.5342V13.9322C3.33301 13.5133 3.44386 13.1255 3.66555 12.7686C3.88723 12.4117 4.18343 12.1373 4.55416 11.9454C5.37788 11.5309 6.20882 11.22 7.04696 11.0128C7.8851 10.8056 8.73045 10.702 9.58301 10.702C10.4356 10.702 11.2809 10.8056 12.1191 11.0128C12.9572 11.22 13.7881 11.5309 14.6119 11.9454C14.9826 12.1373 15.2788 12.4117 15.5005 12.7686C15.7222 13.1255 15.833 13.5133 15.833 13.9322V14.5342C15.833 14.8949 15.7099 15.2016 15.4636 15.4544C15.2174 15.7071 14.9185 15.8335 14.567 15.8335ZM4.58299 14.5506H14.583V13.9322C14.583 13.7589 14.5341 13.5986 14.4364 13.4511C14.3386 13.3036 14.2059 13.1833 14.0381 13.0901C13.3202 12.7271 12.5881 12.4522 11.8419 12.2652C11.0957 12.0783 10.3428 11.9848 9.58301 11.9848C8.82325 11.9848 8.07028 12.0783 7.32408 12.2652C6.57789 12.4522 5.84581 12.7271 5.12787 13.0901C4.96013 13.1833 4.82739 13.3036 4.72964 13.4511C4.63187 13.5986 4.58299 13.7589 4.58299 13.9322V14.5506ZM9.58301 8.03745C10.0413 8.03745 10.4337 7.86996 10.7601 7.53498C11.0865 7.2 11.2497 6.79731 11.2497 6.32691C11.2497 5.85652 11.0865 5.45383 10.7601 5.11885C10.4337 4.78387 10.0413 4.61638 9.58301 4.61638C9.12467 4.61638 8.73231 4.78387 8.40592 5.11885C8.07953 5.45383 7.91634 5.85652 7.91634 6.32691C7.91634 6.79731 8.07953 7.2 8.40592 7.53498C8.73231 7.86996 9.12467 8.03745 9.58301 8.03745Z" fill="#1C1B1F"/>
              </g>
              </svg>
              공유 SKB
              <span>(CATV 운용팀)</span>
            </div>
          </div>
          <div class="grid" :id="`grid${file.id}`"></div>
          <!-- <div v-for="sheet in file.sheets" :key="sheet" class="grid" :id="`grid${sheet.index}`"></div> -->
        </div>
      </li>
    </ul>
    <div class="save-wrap">
      <button class="save-btn" @click="save">저장하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import axios from 'axios';
import Grid from 'tui-grid';
import 'tui-grid/dist/tui-grid.css';
import { onMounted, ref } from 'vue';

// let search_result_list2: any = {}
let sheet_list:any = []
let files:any = []
const search_result_list = ref({})
const folder_name = {
  '001/001' : 'HD방송',
  '001/002' : 'CATV_SO',
  '001/003' : 'TITAN',
}

const init = async () => {
  if (!store.state.search_keyword) return 

  let file_id_list:string[] = []

  for (let key in store.state.search_result) {
    for (let key2 in store.state.search_result[key].files)
      file_id_list.push(key2)
  }

  // console.log(store.state.search_keyword);
  // console.log(file_id_list);
  
  const { data } = await axios.post('http://dev.peerline.net:9494/search/detail', {
    "q": store.state.search_keyword,
    "id": file_id_list
  })

  // console.log(data);
  // console.log(data.files);
  files = data.files
  
  data.files.forEach((item, index) => {
    let { name, sheets, updatedAt } = item
    let { columns, complexColumns, data } = sheets

    sheet_list.push(sheets)

    // for (let item in data) {
    //   data[item] = data[item].replace(/\n/g, '<br>');
    // }
    
    if (!search_result_list.value[item.folderCd]) {
      search_result_list.value[item.folderCd] = {}
      search_result_list.value[item.folderCd]['name'] = folder_name[item.folderCd]
    }
    if (!search_result_list.value[item.folderCd]['files']) search_result_list.value[item.folderCd]['files'] = []

    // console.log(search_result_list.value[item.folderCd].files);
    
    search_result_list.value[item.folderCd].files.push(item)

    
    // console.log(search_result_list.value);


    // search_result_list.value[item.folderCd]['files'].push({
    //   index, name, updatedAt, list: {
    //     columns, complexColumns, data
    //   }
    // })
    // search_result_list2[index] = {
    //   columns, complexColumns, data, 
    // }
    
  })
  // console.log(search_result_list.value);
  // console.log(search_result_list2);
}

const sort_search_result = (e, type) => {
  // 카테고리 클릭시 모든 html 요소에 active 클래스 제거하고 클릭한 요소에 active 클래스 추가
  // e.target.parentNode.childNodes.forEach(element => {
  //     if (element.classList && !element.classList.contains('btn-secondary')) element.classList.add('btn-secondary')  
  // })
  // e.target.classList.remove('btn-secondary')

  
}

// let adjust = null

class CustomTextEditor {
  constructor(props) {
    const el = document.createElement('textarea');
    const { maxLength } = props.columnInfo.editor.options;

    // console.log(props);
    

    // el.type = 'text';
    // el.maxLength = maxLength;
    // el.value = String(props.value);
    el.value = String(props.value.value).replace(/<br>/g, '\n');
    el.setAttribute('r', '6')
    el.setAttribute('c', '6')
    // el.value =  ' ' + String(props.value) + ' ';
    console.dir(el);
    

    this.el = el;
  }

  getElement() {
    console.log('getElement');
    // adjust = this.el

    return this.el;
  }

  getValue() {
    console.log('getValue')
    console.log(this.el.getAttribute('r'));
    
    
    // return this.el.value;
    return {
      value: this.el.value,
      r: Number(this.el.getAttribute('r')),
      c: Number(this.el.getAttribute('c')),
      adjust: true
    }//.value.replace(/\n/g, '<br>');
    // return ' ' +  this.el.value + ' ';
  }

  mounted() {
    this.el.select();
  }
}

// class CustomTextEditor {
//   constructor(props) {
//     const el = document.createElement('textarea');

//     el.value = String(props.value).replace(/<br>/g, '\n');

//     this.el = el;
//   }

//   getValue() {
//     return this.el.value.replace(/\n/g, '<br>');
//   }
//   //...
// }\

let toastArr: any = {}

onMounted(async() => {
  await init()

  // console.log(sheet_list);
  // console.log(sheet_list);

  console.log(files);
  files.forEach((file) => {
    console.log(file);

    

    file.sheets.forEach((sheet) => {
      const { index, name, columns, complexColumns, data } = sheet
      // console.log(index, columns, complexColumns, data);
      // console.log(index, columns, complexColumns, data);
  
      columns.unshift({
        "name": "R1C0",
        "header": "시트"
      })
      data.forEach((item) => {
        item["R1C0"] = {
          value: name,
          sheetName: name
        }
      })
  
      columns.forEach((item) => {
        item.width = 'auto'
        item.editor = {
          type: CustomTextEditor,
          options: {
            maxLength: 100
          }
        }
        item.formatter = (value) => {
          if (value && value.value && value.value.value) return value.value.value;
        }
      })

      // for (let i = 0; i < data.length; i++) {
      //     const row = data[i];
      //     for (const key in row) {
      //         if (Object.hasOwnProperty.call(row, key)) {
      //             const element = row[key];
      //             if (typeof element === 'object' && element !== null) {
      //                 row[key] = element.value;
      //             }
      //         }
      //     }
      // }

      // const result = data.map((row) => {
      //   const newRow = {};
      //   Object.keys(row).forEach((key) => {
      //       newRow[key] = row[key].value;
      //   });
      //   return newRow;
      // });

      // console.log(result);
      

      console.log(data);
      // console.log(columns);
      // console.log(complexColumns);
      
  
      const toast = new Grid({
        el: document.getElementById(`grid${file.id}`),
        scrollX: true,
        scrollY: false,
        rowHeight: 'auto',
        // rowHeaders: ['rowNum'],
        header: {
          complexColumns,
        },
        columns,
        data,
        contextMenu: null
      });

      toastArr[name] = toast
    })


    // Grid.applyTheme('striped', {
    //   cell: {
    //     normal: {
    //       // background: '#000',
    //       text: '#333',
    //       border: '#000'
    //     }
    //   }
    // });
  })
})

const save = async () => {
  let adjustArr:any = []

  // console.log(toastArr);

  for (const sheetName in toastArr) {
    const columnArr = toastArr[sheetName].getData()
    // console.log(sheetName);
    // console.log(toastArr[sheetName].el.id.replace('grid',''));

    for (let i = 0; i < columnArr.length; i++) {
      const column = columnArr[i]

      // console.log(column);
      
      for (const row in column) {
        const item = column[row]

        if (item.adjust) {
          adjustArr.push({
            fileId: Number(toastArr[sheetName].el.id.replace('grid','')),
            sheetName: sheetName,
            r: item.r,
            c: item.c,
            value: item.value
          })
        }
          
      }
    }
    
    // const adjust = {
    //   "fileId": 27,
    //   "sheetName": "도봉강북_QAM",
    //   "r": 6,
    //   "c": 5,
    //   "value": "수정 테스트"
    // }
  }
  // toastArr.forEach((toast) => {
  //   console.log(toast);
    
  //   console.log(toast.getCellClassName());
  //   console.log(toast.getData());
    
  // })
  

  // const data = [
    // {
    //   "fileId": 27,
    //   "sheetName": "도봉강북_QAM",
    //   "r": 6,
    //   "c": 5,
    //   "value": "수정 테스트"
    // },
  // ]
  console.log(adjustArr);
  

  const adjustExcel = await axios.post('http://dev.peerline.net:80/Excel/edit', adjustArr)
  console.log(adjustExcel);
  
}

const search_option = ref('perfectly')
// // 카테고리 클릭시 이벤트
// const change_category = (e, code) => {
//     // 카테고리 클릭시 모든 html 요소에 active 클래스 제거하고 클릭한 요소에 active 클래스 추가
//     e.target.parentNode.childNodes.forEach(element => {
//         if (element.classList && element.classList.contains('active')) element.classList.remove('active')  
//     })
//     e.target.classList.add('active')
// }


// instance.resetData(newData); // Call API of instance's public method

// Grid.applyTheme('striped'); // Call API of static method
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}
.warp{
  margin: 24px 30px 48px 30px;
  .download-wrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .option-wrap{
      display: flex;
      align-items: center;
      font-size: 16px;
      .nav-group{
        // padding: 0;
        margin-left: 20px;
        background: rgb(237,237,237);
        .btn{
          background: rgb(237,237,237);
        }
      }
      .select-wrap{
        display: flex;
        align-items: center;
        margin-left: 40px;
        input{
          margin-left: 15px;
        }
        label{
          font-size: 14px;
          opacity: 0.8;
          margin-left: 4px;
        }
      }
    }
    // .sort-btn{
    //   .btn{
    //     margin-right: 10px;
    //     padding-top: 10px !important;
    //     padding-bottom: 10px !important;
    //   }
    // }
    .download-btn{
      border: none;
      padding: 10px 12px;
      border-radius: 6px;
      background: var(--data-bs-theme-light-bs-success, #50CD89);

      color: var(--default-white, #FFF);
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%; /* 14px */
    }
  }
  ul{
    li{
      margin-top: 24px;
      padding-bottom: 24px;
      background: #fff;
      .title{
        padding: 16px 20px 10px 20px;
        .text{
          display: flex;
          align-items: center;
          height: 52px;
          padding: 8px 20px;
          border-radius: 10px;
          background: var(--bs-warning-light, #FFF8DD);

          color: var(--primary-text, #222);
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 110%; /* 22px */
        }
      }
      .content{
        margin: 24px 24px;
        .sub-title{
          display: flex;
          align-items: center;
          height: 36px;
          color: var(--primary-text, #222);
          /* heading/heading6 */
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 110%; /* 19.8px */
        }
        .info{
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          .time{
            color: var(--primary-text, #222);
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 14px */
            span{
              color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
              font-weight: 400;
            }
          }
          .type{
            margin-left: 12px;
            color: var(--primary-text, #222);
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 14px */
            span{
              color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .save-wrap{
    margin-top: 48px;
    display: flex;
    justify-content: end;
    .save-btn{
      border: none;
      display: flex;
      width: 210px;
      height: 48px;
      padding: 14px 58px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      background: var(--el-color-info-light-8, #E9E9EB);
    }
  }
}
.grid{
  overflow-x: scroll;
}
</style>
