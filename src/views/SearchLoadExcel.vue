<template>
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
              <span>{{new Date(file.history[0].updatedAt).toISOString().slice(0,19).replace(/T/g, ' ')}}</span>
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
              {{file.history && file.history.length && file.history[file.history.length - 1] && file.history[file.history.length - 1].user? file.history[file.history.length - 1].user.name : "공유"}}
              <span>({{file.history && file.history.length && file.history[file.history.length - 1] && file.history[file.history.length - 1].user? file.history[file.history.length - 1].user.teamName : "CATV 운용팀"}})</span>
            </div>
          </div>
          <div class="grid" :id="`grid${file.id}`"></div>
        </div>
      </li>
    <!-- <div v-for="sheet in file.sheets" :key="sheet" class="grid" :id="`grid${sheet.index}`"></div> -->
    </ul>
    <div class="save-wrap">
      <button class="save-btn" @click="save">저장하기</button>
    </div>
</template>

<script setup lang="ts">
import JwtService from '@/core/services/JwtService';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import Grid from 'tui-grid';
import 'tui-grid/dist/tui-grid.css';
import store from '@/store';

const props = defineProps({
    keyword: String,
    sort: String,
    searchType: String,
    fileList: Object,
})

console.log(props);

watch(() => props.searchType, async (value) => {
    await init()

    create_toasrUiGrid(file_list)
})

watch(() => props.sort, (value) => {
    // for (let key in toastArr) {
    //     const toast = toastArr[key]
    //     toast.destroy()
    // }

    sort_search_result(search_result_list.value, value)

    // let target = [
    //     {name: '테스트'},
    //     {name: 'test2'},
    //     {name: 'TITAN Live TC_230428_주요채널분산'},
    //     {name: '2023_SKB_CATV_SO채널라인업_수원 주파수 재이동'},
    //     {name: '2022_다이렉트 HD방송_IPto8VSB_채널라인업'},
    // ]

    
    // sort_search_result(target, value)
    // console.log(target);

    // create_toasrUiGrid(file_list)
})

let sheet_list:any = []
let file_list: any = []
const search_result_list = ref({})

const category_in_file = (category_arr, file_arr, category_key, file_key) => {
  console.log('category in file');
  console.log(category_arr);
  console.log(file_arr);
  let result: any = []

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

const init = async () => {
  if (!props.keyword) return 

  let file_id_list:string[] = []

  // for (let key in props.fileList) {
  //   for (let key2 in props.fileList[key].files)
  //     file_id_list.push(key2)
  // }
  props.fileList.forEach((file) => {
    file_id_list.push(file.id)
  })

  console.log(file_id_list);
  
  
  const { data } = await axios.post('/search/detail', {
    "q": props.keyword,
    "id": file_id_list,
    "match": props.searchType
  })
  const { folders, files } = data

  search_result_list.value = category_in_file(folders, files, 'code', 'folderCd')

  file_list = files
}

const sort_search_result = (target, option) => {
  // console.log('backup');
  
  // console.log(search_result_list_backup);
  // console.log(search_result_list.value);
  
  
//   if (option == "default") return init()
  // console.log(search_result_list.value);
    if (option == "en") {
        target.sort((a, b) => {
            function getFirstCharType(str): any {
                const firstChar = str.charAt(0);
                if (firstChar >= '0' && firstChar <= '9') {
                    return 2;
                } else if ((firstChar >= 'a' && firstChar <= 'z') || (firstChar >= 'A' && firstChar <= 'Z')) {
                    return 1;
                } else if (firstChar >= '가' && firstChar <= '힣') {
                    return 3;
                }
            }

            const aFirstChar = a.name[0];
            const bFirstChar = b.name[0];

            const aFirstCharType = getFirstCharType(aFirstChar)
            const bFirstCharType = getFirstCharType(bFirstChar)

            if (aFirstCharType > bFirstCharType) return 1
            if (aFirstCharType < bFirstCharType) return -1
            if (aFirstCharType == bFirstCharType) {
                if (aFirstChar > bFirstChar) return 1
                if (aFirstChar < bFirstChar) return -1
                if (aFirstChar == bFirstChar) return 0
            }
        });
    }
  
    if (option == "num") {

        target.sort((a, b) => {
            function getFirstCharType(str): any {
                const firstChar = str.charAt(0);
                if (firstChar >= '0' && firstChar <= '9') {
                    return 1;
                } else if ((firstChar >= 'a' && firstChar <= 'z') || (firstChar >= 'A' && firstChar <= 'Z')) {
                    return 2;
                } else if (firstChar >= '가' && firstChar <= '힣') {
                    return 3;
                }
            }

            const aFirstChar = a.name[0];
            const bFirstChar = b.name[0];

            const aFirstCharType = getFirstCharType(aFirstChar)
            const bFirstCharType = getFirstCharType(bFirstChar)

            if (aFirstCharType > bFirstCharType) return 1
            if (aFirstCharType < bFirstCharType) return -1
            if (aFirstCharType == bFirstCharType) {
                if (aFirstChar > bFirstChar) return 1
                if (aFirstChar < bFirstChar) return -1
                if (aFirstChar == bFirstChar) return 0
            }
        });

    }

    if (option == "ko") {

        target.sort((a, b) => {
            function getFirstCharType(str): any {
                const firstChar = str.charAt(0);
                if (firstChar >= '0' && firstChar <= '9') {
                    return 2;
                } else if ((firstChar >= 'a' && firstChar <= 'z') || (firstChar >= 'A' && firstChar <= 'Z')) {
                    return 3;
                } else if (firstChar >= '가' && firstChar <= '힣') {
                    return 1;
                }
            }

            const aFirstChar = a.name[0];
            const bFirstChar = b.name[0];

            const aFirstCharType = getFirstCharType(aFirstChar)
            const bFirstCharType = getFirstCharType(bFirstChar)

            if (aFirstCharType > bFirstCharType) return 1
            if (aFirstCharType < bFirstCharType) return -1
            if (aFirstCharType == bFirstCharType) {
                if (aFirstChar > bFirstChar) return 1
                if (aFirstChar < bFirstChar) return -1
                if (aFirstChar == bFirstChar) return 0
            }
        });

    }

//   target.sort((a, b) => {
//     if (a.name < b.name) {
//       return -1;
//     }
//     if (a.name > b.name) {
//       return 1;
//     }
//     return 0;
//   });

  
  // 카테고리 클릭시 모든 html 요소에 active 클래스 제거하고 클릭한 요소에 active 클래스 추가
  // e.target.parentNode.childNodes.forEach(element => {
  //     if (element.classList && !element.classList.contains('btn-secondary')) element.classList.add('btn-secondary')  
  // })
  // e.target.classList.remove('btn-secondary')

  
}

// let adjust = null

// const cancel_deleteKey = () => {
//   alert('1')
// }

let edit_list: any = new Map()

class CustomTextEditor {
  constructor(props) {
    const el = document.createElement('textarea');
    const { maxLength } = props.columnInfo.editor.options;

    // console.log('props.value: ', props.value);
    // console.log('getData: ', props.getData());
    console.log('props: ',props);
    console.log('props.value: ',props.value);
    

    // el.type = 'text';
    // el.maxLength = maxLength;
    // el.value = String(props.value);
    el.value = String(props.value.value).replace(/<br>/g, '\n');
    el.setAttribute('r', props.value.r)
    el.setAttribute('c', props.value.c)
    el.setAttribute('sheetName', props.value.sheetName)
    el.setAttribute('fileId', props.value.fileId)
    // el.setAttribute('c', props.value.c)
    // el.setAttribute('c', props.value.c)
    // el.value =  ' ' + String(props.value) + ' ';
    // console.dir(el);

    for (let key in toastArr) {
      const toast = toastArr[key];

      // 현재 그리드 이외 모든 그리드들 편집 종료
      if (props.grid.gridEl.dataset.gridId !== toast.gridEl.dataset.gridId) {
        toast.finishEditing();
      }
    }
    

    this.el = el;
  }

  getElement() {
    // console.log('getElement');
    // adjust = this.el
    

    return this.el;
  }

  getValue() {
    // console.log('getValue')
    // console.log(this.el.getAttribute('r'));
    if (this.el.value && Number(this.el.getAttribute('r')) && Number(this.el.getAttribute('c')) && this.el.getAttribute('sheetName') && this.el.getAttribute('sheetName') != "undefined" && Number(this.el.getAttribute('fileId')) && Number(this.el.getAttribute('fileId')) != NaN) {
      edit_list.set(`${this.el.getAttribute('fileId')}_${this.el.getAttribute('sheetName')}_r${this.el.getAttribute('r')}c${this.el.getAttribute('c')}`, {
        value: this.el.value,
        r: Number(this.el.getAttribute('r')),
        c: Number(this.el.getAttribute('c')),
        sheetName: (this.el.getAttribute('sheetName')),
        fileId: Number(this.el.getAttribute('fileId')),
      })
    }

    // if ()

    console.log('getValue(): ',this.el.value);

    
    // if (!this.el.value) {
    //   return {
    //     value: "",
    //     r: Number(this.el.getAttribute('r')),
    //     c: Number(this.el.getAttribute('c')),
    //     sheetName: (this.el.getAttribute('sheetName')),
    //     fileId: Number(this.el.getAttribute('fileId')),
    //   }
    // }
    // {
    //     value: this.el.value,
    //   r: Number(this.el.getAttribute('r')),
    //   c: Number(this.el.getAttribute('c')),
    //   adjust: true
    // }) //.value.replace(/\n/g, '<br>');
    // return ' ' +  this.el.value + ' ';
    // console.log('getvalue: ', [...edit_list.values()]);

    return {
      value: this.el.value,
      r: Number(this.el.getAttribute('r')),
      c: Number(this.el.getAttribute('c')),
      sheetName: (this.el.getAttribute('sheetName')),
      fileId: Number(this.el.getAttribute('fileId')),
    }
    
  }

  mounted() {
    this.el.select();
  }
}

const create_toasrUiGrid = (file_list) => {
  file_list.forEach((file) => {
    file.sheets.forEach((sheet, index) => {
      const { columns, complexColumns, data } = sheet
  
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

      columns.unshift({
        "name": "R1C0",
        "header": "시트",
        "width": 'auto',
        "formatter": (value) => {
          if (value && value.value && value.value.value) return value.value.value;
          if (value && value.value) return value.value;
          if (value) return value;
        }
      })
      data.forEach((item) => {
        console.log(item);
        const sheetName = item["R1C0"].value;

        for (let key in item) {
            item[key].sheetName = sheetName
            item[key].fileId = file.id
        }
        
        // item.forEach(cell => {
        //     cell.sheetNmae = name
        //     cell.fileId = file.id
        // })
      })

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
        contextMenu: null,
        editingEvent: 'dblclick'
      });

      console.log('toast: ', toast);

      toast.on('keydown', () => {
        console.log(2321321123);
        
      });
      toast.on('click', (ev) => {
        console.log(ev);
        
      });

      // console.log(toast.getFocusedCell());
      
      // setInterval(() => {
        
      // }, 2000)
      // toast.startEditing()

      // editor.on('keydown', function(event) {
      //   console.log('Key downed:', event.data.keyCode);
      // });
      // setTimeout(() => {
      //   console.log(1231231231);
      //   toast.setWidth('auto')
      //   toast.refreshLayout()
        
      // }, 5000)
      // toast
      toastArr[`${file.id}_${index}`] = toast;
    })
  })
}

// document.querySelector('#kt_app_sidebar_toggle').addEventListener('click', () => {
//     for (let key in toastArr) {
//       const toast = toastArr[key]

//       setTimeout(() => {
//         toast.setWidth('auto')
//         toast.refreshLayout()
//       }, 500)
      
//     }
//   })

watch(() => store.state.minimize, (value) => {
  console.log(value);
  
  for (let key in toastArr) {
    const toast = toastArr[key]

    setTimeout(() => {
      // toast.setWidth('auto');
      toast.refreshLayout();
    }, 500);
  }
})

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

  create_toasrUiGrid(file_list)
})

const save = async () => {
  let adjustArr:any = []

  // console.log(toastArr);

//   for (const sheetName in toastArr) {
//     const columnArr = toastArr[sheetName].getData()
//     // console.log(sheetName);
//     // console.log(columnArr);
    
//     // console.log(toastArr[sheetName].el.id.replace('grid',''));

//     for (let i = 0; i < columnArr.length; i++) {
//       const column = columnArr[i]

//       // console.log(column);
      
//       for (const row in column) {
//         const item = column[row]
//         // console.log(item);
//         // console.log(item.adjust);
        

//         if (item && item.adjust) {
//           adjustArr.push({
//             fileId: Number(toastArr[sheetName].el.id.replace('grid','')),
//             sheetName: sheetName,
//             r: item.r,
//             c: item.c,
//             value: item.value
//           })
//         }
          
//       }
//     }
    
//     // const adjust = {
//     //   "fileId": 27,
//     //   "sheetName": "도봉강북_QAM",
//     //   "r": 6,
//     //   "c": 5,
//     //   "value": "수정 테스트"
//     // }
//   }

    console.log(edit_list);

  for (let key in toastArr) {
    const toast = toastArr[key]

    toast.finishEditing();
  }
    

  if (![...edit_list.values()].length) return alert('수정 사항이 없습니다.')

  let userId = 1

  try{
    const axios_config = {
      headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }
  
    const { data } = await axios.post('/auth/info', {}, axios_config)
    userId = data.id
  }
  catch(error) {
    alert('사용자 정보 조회에 실패하였습니다.')
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

  
  // const adjustExcel = await axios.post('http://dev.peerline.net:80/folder/list')
  const adjustExcel = await axios.post('/excel/edit', {
    userId,
    data: [...edit_list.values()]
  })
  .then(() => {alert('엑셀 수정이 완료되었습니다.')})
  .catch(() => {alert('엑셀 수정에 실패하였습니다.')})
  console.log(adjustExcel);
  
}
// let sheet_list:any = []
// let file_list: any = []
// const search_result_list = ref({})
// let search_result_list_backup = null

// const category_in_file = (category_arr, file_arr, category_key, file_key) => {
//   console.log('category in file');
//   console.log(category_arr);
//   console.log(file_arr);
//   let result: any = []

//   for (let i = 0; i < category_arr.length; i++) {
//     const category = category_arr[i]

//     result.push(category)

//     category.files = []

//     for (let j = 0; j < file_arr.length; j++) {
//       const file = file_arr[j]

//       if (category[category_key] == file[file_key]) {
//         category.files.push(file)
//       }
//     }
//   }

//   console.log(result);

//   return result
// }

// const deepCopy = (target) => {
//   return JSON.parse(JSON.stringify(target))
// }

// const init = async () => {
//   if (!props.keyword) return 

//   let file_id_list:string[] = []

//   for (let key in store.state.search_result) {
//     for (let key2 in store.state.search_result[key].files)
//       file_id_list.push(key2)
//   }
  
//   const { data } = await axios.post('/search/detail', {
//     "q": props.keyword,
//     "id": file_id_list 
//   })
//   const { folders, files } = data

//   search_result_list_backup = category_in_file(folders, files, 'code', 'folderCd') 
//   search_result_list.value = deepCopy(search_result_list_backup)

//   file_list = files
// }

// class CustomTextEditor {
//   constructor(props) {
//     const el = document.createElement('textarea');
//     const { maxLength } = props.columnInfo.editor.options;

//     // el.type = 'text';
//     // el.maxLength = maxLength;
//     // el.value = String(props.value);
//     el.value = String(props.value.value).replace(/<br>/g, '\n');
//     el.setAttribute('r', '6')
//     el.setAttribute('c', '6')
//     // el.value =  ' ' + String(props.value) + ' ';
//     console.dir(el);
    

//     this.el = el;
//   }

//   getElement() {
//     console.log('getElement');
//     // adjust = this.el

//     return this.el;
//   }

//   getValue() {
//     console.log('getValue')
//     console.log(this.el.getAttribute('r'));
    
    
//     // return this.el.value;
//     return {
//       value: this.el.value,
//       r: Number(this.el.getAttribute('r')),
//       c: Number(this.el.getAttribute('c')),
//       adjust: true
//     }//.value.replace(/\n/g, '<br>');
//     // return ' ' +  this.el.value + ' ';
//   }

//   mounted() {
//     this.el.select();
//   }
// }

// let toastArr: any = {}

// const create_toasrUiGrid = (file_list) => {
//     console.log(file_list);
    
//     file_list.forEach((file) => {
//         console.log(file);
        
//         file.sheets.forEach((sheet) => {
//         console.log(sheet);
        
//         const { index, name, columns, complexColumns, data } = sheet
//         console.log(index, name, columns, complexColumns, data);

        
    
//         columns.unshift({
//             "name": "R1C0",
//             "header": "시트"
//         })
//         data.forEach((item) => {
//             item["R1C0"] = {
//             value: name,
//             sheetName: name
//             }
//         })
    
//         columns.forEach((item) => {
//             item.width = 'auto'
//             item.editor = {
//             type: CustomTextEditor,
//             options: {
//                 maxLength: 100
//             }
//             }
//             item.formatter = (value) => {
//             if (value && value.value && value.value.value) return value.value.value;
//             }
//         })

//         console.log(document.getElementById(`grid${file.id}`));
        

//         const toast = new Grid({
//             el: document.getElementById(`grid${file.id}`),
//             scrollX: true,
//             scrollY: false,
//             rowHeight: 'auto',
//             // rowHeaders: ['rowNum'],
//             header: {
//                 complexColumns,
//             },
//             columns,
//             data,
//             contextMenu: null
//         });

//         console.log(sheet);

//         toastArr[name] = toast
//         })
//     })
// }

// const save = async () => {
//   let adjustArr:any = []

//   // console.log(toastArr);

//   for (const sheetName in toastArr) {
//     const columnArr = toastArr[sheetName].getData()
//     // console.log(sheetName);
//     // console.log(columnArr);
    
//     // console.log(toastArr[sheetName].el.id.replace('grid',''));

//     for (let i = 0; i < columnArr.length; i++) {
//       const column = columnArr[i]

//       // console.log(column);
      
//       for (const row in column) {
//         const item = column[row]
//         // console.log(item);
//         // console.log(item.adjust);
        

//         if (item && item.adjust) {
//           adjustArr.push({
//             fileId: Number(toastArr[sheetName].el.id.replace('grid','')),
//             sheetName: sheetName,
//             r: item.r,
//             c: item.c,
//             value: item.value
//           })
//         }
          
//       }
//     }
    
//     // const adjust = {
//     //   "fileId": 27,
//     //   "sheetName": "도봉강북_QAM",
//     //   "r": 6,
//     //   "c": 5,
//     //   "value": "수정 테스트"
//     // }
//   }

//   if (!adjustArr.length) return alert('수정 사항이 없습니다.')

//   let userId = 1

//   try{
//     const axios_config = {
//       headers: { Authorization: `Bearer ${JwtService.getToken()}` }
//     }
  
//     const { data } = await axios.post('/auth/info', {}, axios_config)
//     userId = data.id
//   }
//   catch(error) {
//     alert('사용자 정보 조회에 실패하였습니다.')
//   }
//   // toastArr.forEach((toast) => {
//   //   console.log(toast);
    
//   //   console.log(toast.getCellClassName());
//   //   console.log(toast.getData());
    
//   // })
  

//   // const data = [
//     // {
//     //   "fileId": 27,
//     //   "sheetName": "도봉강북_QAM",
//     //   "r": 6,
//     //   "c": 5,
//     //   "value": "수정 테스트"
//     // },
//   // ]
//   console.log(adjustArr);
  
//   // const adjustExcel = await axios.post('http://dev.peerline.net:80/folder/list')
//   const adjustExcel = await axios.post('/file/edit', {
//     userId,
//     data: adjustArr
//   })
//   .then(() => {alert('엑셀 수정이 완료되었습니다.')})
//   .catch(() => {alert('엑셀 수정에 실패하였습니다.')})
//   console.log(adjustExcel);
  
// }

// // onMounted(async() => {
// //     console.log(document.getElementById(`grid${14}`));
// //     // console.log(props.file_list);
    
// //   if (props.file_list && props.file_list.length) {
// //     // console.log(props.file_list.length);
    
// //     create_toasrUiGrid(props.file_list)
// //   }
// //   if (props.file_list && !props.file_list.length) {
// //     // console.log(3123123123123);

// //     watch(() => props.search_result_list, () => {
// //         // create_toasrUiGrid(props.file_list)
// //     })
// //   }
  
// // })
// onMounted(async() => {
//   await init()

//   create_toasrUiGrid(props.file_list)
// })

</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}
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
    // margin-top: 48px;
    display: flex;
    justify-content: end;
    position: relative;
    .save-btn{
      bottom: 30px;
      right: 50px;
      position: fixed;
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
</style>