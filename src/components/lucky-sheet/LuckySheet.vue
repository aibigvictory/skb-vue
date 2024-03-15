<template>
  <div id="luckysheet"></div>
  <div v-show="isMaskShow" id="tip">
    <img src="@/assets/img/default-dark.png" alt="Metronic logo" />
    <span>Loading<div id="loading"><div class="spinner"></div></div></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { exportExcel, saveExcelToServer } from '@/assets/utils/export.js'
import { isFunction } from '@/assets/utils/is.js'
import LuckyExcel from 'luckyexcel'
import axios from 'axios'
import store from '@/store';
import JwtService from '@/core/services/JwtService';
import router from '@/router'

const state = store.state

const props = defineProps({
  excelId: Number,
  excelName: String,
})

const isMaskShow = ref(true)
const isSave = ref(false)
const updateSet = new Set<number>();
const newUpdateMap = new Map();
const originalDataArr: any[] = [];

// 셀 값 가져오기
const getCellValue = (oldValue: any, cellValue: any) => {
  try {
    let returnValue = null;

    if (cellValue.ct.t === 'inlineStr') {
      returnValue = cellValue.ct.s.map((item) => item.v.replace(/\\r\\n/, '\\n')).join('\\n');
    } else {
      returnValue = cellValue.m?.toString();
    }

    return returnValue;
  } catch (e) {
    console.error(e);
    return null;
  }
};

//엑셀 로드
const reload_excel = (url, excelName, luckysheet) => {
  LuckyExcel.transformExcelToLuckyByUrl(url, excelName, function(exportJson, luckysheetfile){                    
    if(exportJson.sheets==null || exportJson.sheets.length==0){
        // 예외처리
        isMaskShow.value = false

        state.popup.content = ['엑셀 파일을 불러오지 못했습니다.']
        state.popup.btnCount = 1
        state.popup.toggle = true
        return 
    }
    //초기화
    luckysheet.destroy();    
    //엑셀시트 뷰 생성
    luckysheet.create({
        container: 'luckysheet',
        showinfobar: false,
        showtoolbar: true,
        showtoolbarConfig: {
          font: false,
          currencyFormat: false, //currency format
          percentageFormat: false, //Percentage format
          numberDecrease: false, //'Decrease the number of decimal places'
          numberIncrease: false, //'Increase the number of decimal places
          moreFormats: false, //'More Formats'
          //mergeCell: false,
          textWrapMode: false, //'Wrap mode'
          textRotateMode: false, //'Text Rotation Mode'
          image: false, // 'Insert picture'
          link: false, // 'Insert link'
          chart: false, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
          postil: false, //'comment'
          pivotTable: false, //'PivotTable'
          frozenMode: false, //'freeze mode'
          sortAndFilter: false, //'Sort and filter'
          conditionalFormat: false, //'Conditional Format'
          dataVerification: false, // 'Data Verification'
          splitColumn: false, //'Split column'
          screenshot: false, //'screenshot',
          protection: false, // 'Worksheet protection'
          print: false, // 'Print'
        },
        data:exportJson.sheets,
        title:exportJson.info.name,
        userInfo:exportJson.info.name.creator,
        accuracy: 2,
        // loading: false,
        hook: {
          updated: (operate,data) => {
            console.log('operate: ',operate);
            console.log('data: ', data);
            
            /**
             * ctrlType: "resizeC"
             * ctrlValue: "columnlen"
             */
            const { type, ctrlType, sheetIndex } = operate;

            updateSet.add(Number(sheetIndex));
            if (updateSet.size > 0) {
              document.querySelector('.btn-save')?.classList.add('active')
              isSave.value = true
            }
          },
          cellUpdateBefore: function (r, c, value) {
            console.log('! cellUpdateBefore', {r, c, value});
            return true;
          },
        }
    })
    // luckysheet.setSheetColor("#ff0000")

    const sheets = luckysheet.getAllSheets();
    sheets.forEach((sheet) => {
      const { index, celldata, config } = sheet;
      const data = JSON.parse(JSON.stringify({ celldata, config }));
      originalDataArr.push({
        index: Number(index),
        celldata: data.celldata,
        config: data.config
      });
    });

    console.log('origin', originalDataArr);
    
    isMaskShow.value = false
  });
}

//사이드바에서 다른 엑셀 파일 클릭시 엑셀시트 뷰 변경
watch(() => props.excelId, (value) => {
  const url = `${process.env.VUE_APP_API_URL}/file/${value}/data`

  document.querySelector('.btn-save')?.classList.remove('active')
  isMaskShow.value = true
  reload_excel(url, props.excelName, window.luckysheet)
})

// 사이드바 접으면 엑셀 리사이징
watch(() => store.state.minimize, (value) => {  
  setTimeout(() => {
    luckysheet.resize();
  }, 500);
})

//엑셀 다운로드
const downloadExcel = () => {
  const url = `${process.env.VUE_APP_API_URL}/file/${props.excelId}/data`;
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      // Blob 객체를 URL로 변환
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // 파일 이름 지정
      a.download = props.excelName ?? 'data.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .then(() => {
      state.popup.content = ['엑셀 다운로드가 완료되었습니다.']
      state.popup.btnCount = 1
      state.popup.toggle = true
    })
    .catch(err => console.error('Error:', err));
}

// 정보 조회
const getUserData = async () => {
  try{
    const axios_config = {
      headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }
  
    const { data } = await axios.post('/auth/info', {}, axios_config)
    return data;
  }
  catch(error) {
    console.error(error);
    state.popup.content = ['사용자 정보 조회에 실패하였습니다.']
    state.popup.btnCount = 1
    state.popup.toggle = true

    throw new Error('사용자 정보 조회에 실패하였습니다.');
  }
}

// 객체 값 비교
const isEqual = (a: object, b: object, excludeKey: string[] = []) => {
  // 1. 객체의 key를 정렬.
  // 2. 정렬된 key를 reduce로 순회하면서 key, value를 구성
  let sortedA = Object.keys(a)
    .sort()
    .reduce((obj, key) => {
      if (!excludeKey.includes(key)) {
        obj[key] = a[key];
      }
      return obj;
    }, {});

  let sortedB = Object.keys(b)
    .sort()
    .reduce((obj, key) => {
      if (!excludeKey.includes(key)) {
        obj[key] = b[key];
      }
      return obj;
    }, {});

  // return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  return Object.entries(sortedA).toString() === Object.entries(sortedB).toString();
}

//엑셀 저장(테스트)
const saveExcel = async () => {
  try {
    const revision = sessionStorage.getItem('revision') ?? '[]';
    const requestData: any[] = [];

    if (isSave.value) {
      isMaskShow.value = true

      try {
        // original 데이터에서 변경점 비교
        luckysheet.getAllSheets().forEach((sheet) => {
          const sheetIndex = Number(sheet.index);
          const { celldata, config, name, order, zoomRatio } = sheet;
          let pushData: {
            name: any,
            order: any,
            config: any,
            celldata: any[]
          } = {
            name,
            order,
            config: {...config, zoomRatio},
            celldata: []
          };

          const originData = originalDataArr.find((x) => x.index === sheetIndex);
          if (originData) {
            for (let i = 0; i < celldata.length; i++) {
              const cell = celldata[i];
              const originCell = originData.celldata.find(o => o.r === cell.r && o.c === cell.c);
              if (originCell) {
                // 특정 필드 제거
                // delete originCell['mc'];
                // delete cell['mc'];
                if (!isEqual(cell.v, originCell.v, ['mc'])) {
                  console.log('isNotEqual', cell, originCell);
                  pushData.celldata.push(cell);
                }
              } else {
                pushData.celldata.push(cell);
              }
            }
          }

          // 변경점 반영
          requestData.push(pushData);
        });

        console.log('requestData', requestData);

        const result = await axios.post('/file/editBulk', {
          revision: JSON.parse(revision),
          fileId: props.excelId,
          dataList: requestData,
        });
        console.log(result);
        if (result.status === 201) {
          state.popup.content = ['수정이 완료되었습니다.']
          state.popup.btnCount = 1
          state.popup.toggle = true

          router.go(0)
          // const url = `${process.env.VUE_APP_API_URL}/file/${props.excelId}/data`
          // document.querySelector('.btn-save')?.classList.remove('active')
          // isMaskShow.value = true
          // reload_excel(url, props.excelName, window.luckysheet)
        }
      }
      catch (error: any) {
        console.error(error);
        if (error?.response?.status === 409) {
          state.popup.content = ['버전이 충돌하여 수정에 실패하였습니다.']
          state.popup.btnCount = 1
          state.popup.toggle = true
          return isMaskShow.value = false;
        }
        state.popup.content = ['수정에 실패하였습니다.']
        state.popup.btnCount = 1
        state.popup.toggle = true
        return isMaskShow.value = false;
      }

    } else {
      state.popup.content = ['엑셀 수정을 해주세요.']
      state.popup.btnCount = 1
      state.popup.toggle = true
    }
  } catch (e) {
    console.error(e);
  }
};

// 엑셀 저장
// const saveExcel = async () => {
  
//   if (isSave.value) {
//     isMaskShow.value = true
    
//     try{
//       const revision = sessionStorage.getItem('revision') ?? '[]';
//       const user = await getUserData();
//       const result = await axios.post('/file/edit', {
//         userId: user.id,
//         data: [...updateMap.values()],
//         revision: JSON.parse(revision),
//       });
//       console.log(result);
//       if (result.status === 201) {
//         state.popup.content = ['수정이 완료되었습니다.']
//         state.popup.btnCount = 1
//         state.popup.toggle = true
        
//         router.go(0)
//         // const url = `${process.env.VUE_APP_API_URL}/file/${props.excelId}/data`
//         // document.querySelector('.btn-save')?.classList.remove('active')
//         // isMaskShow.value = true
//         // reload_excel(url, props.excelName, window.luckysheet)
//       }
//     }
//     catch(error: any) {
//       if (error?.response?.status === 409) {
//         state.popup.content = ['버전이 충돌하여 수정에 실패하였습니다.']
//         state.popup.btnCount = 1
//         state.popup.toggle = true
//         return isMaskShow.value = false;
//       }
//       state.popup.content = ['수정에 실패하였습니다.']
//       state.popup.btnCount = 1
//       state.popup.toggle = true
//       return isMaskShow.value = false;
//     }

//   }
//   else{
//     state.popup.content = ['엑셀 수정을 해주세요.']
//     state.popup.btnCount = 1
//     state.popup.toggle = true
//   }

// }

//엘리먼트 생성 후, 엑셀 파일 데이터 적용
onMounted(() => {
  try{
    const url = `${process.env.VUE_APP_API_URL}/file/${props.excelId}/data`;

    reload_excel(url, props.excelName, window.luckysheet)
  }
  catch(error) {}
})

//부모에게 함수 내보내기
defineExpose({
  downloadExcel,
  saveExcel
})

onUnmounted(() => {
  window.luckysheet.destroy();
})

// !!! create luckysheet after mounted

</script>

<style lang="scss">


#luckysheet {
  height: calc(100vh - 200px);
}

#uploadBtn {
  font-size: 16px;
}



#luckysheetloadingdata{
  display: none;
}

</style>
