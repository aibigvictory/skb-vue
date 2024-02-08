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
const updateMap = new Map();
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
        showtoolbar: false,
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
            const { type, ctrlType } = operate;
            if (ctrlType === 'resizeC') {
              const { config, curconfig } = operate;
              const prevColumnLengthObj = config.columnlen;
              const currentColumnLengthObj = curconfig.columnlen;
              // 변경된 부분만 추가
              for (const [key, value] of Object.entries(currentColumnLengthObj)) {
                const prevLength = prevColumnLengthObj[key];
                if (!prevLength) continue;
                if (prevLength !== value) {
                  const { name: sheetName, index: sheetIndex } = luckysheet.getSheet();
                  updateMap.set(`resizeColumn_${props.excelId}_${sheetIndex}_${key}`, {
                    action: 'resizeColumn',
                    fileId: props.excelId,
                    r: 0,
                    c: parseInt(key),
                    value: String(Math.round(value)),
                    sheetName
                  });
                }
              }
            }
            if (ctrlType === 'resizeR') {
              const { config, curconfig } = operate;
              const prevRowLengthObj = config.rowlen;
              const currentRowLengthObj = curconfig.rowlen;
              // 변경된 부분만 추가
              for (const [key, value] of Object.entries(currentRowLengthObj)) {
                const prevLength = prevRowLengthObj[key];
                if (!prevLength) continue;
                if (prevLength !== value) {
                  const { name: sheetName, index: sheetIndex } = luckysheet.getSheet();
                  updateMap.set(`resizeRow_${props.excelId}_${sheetIndex}_${key}`, {
                    action: 'resizeRow',
                    fileId: props.excelId,
                    r: parseInt(key),
                    c: 0,
                    value: String(Math.round(value)),
                    sheetName
                  });
                  console.log('resizeR', String(Math.round(value)));
                }
              }
            }
            if (type === 'zoomChange') {
              const { zoomRatio, curZoomRatio } = operate;
              const { name: sheetName, index: sheetIndex } = luckysheet.getSheet();
              updateMap.set(`zoomChange_${props.excelId}_${sheetIndex}`, {
                action: 'zoomChange',
                fileId: props.excelId,
                r: 0,
                c: 0,
                value: String(Math.round(curZoomRatio * 100)),
                sheetName
              });
            }

            if (type === 'datachange') {
              // const { sheetIndex, dataRange, curdata, curconfig } = operate;
              // const { name: sheetName } = luckysheet.getSheet();
              // const key = `batchCellUpdate${props.excelId}_${sheetIndex}`;
              // console.log('curdata', curdata);

              // updateMap.set(key, {
              //   action: 'batchCellUpdate',
              //   fileId: props.excelId,
              //   r: 0,
              //   c: 0,
              //   config: curconfig,
              //   cellList: curdata,
              //   sheetName
              // });

              // dataRange.forEach((r) => {
              //   const [row, column] = r;
              //   const [minRow, maxRow] = row;
              //   const [minCol, maxCol] = column;
              //   let newValue: any;

              //   for (let r = minRow; r < maxRow; r++) {
              //     const rowData = curdata[r];
              //     for (let c = minCol; c < maxCol; c++) {
              //       const colData = rowData[c];
              //       newValue = colData;
              //     }
              //   }

              //   console.log('dataChange', newValue);
              // });
            }
            
            if (updateMap.size > 0) {
              document.querySelector('.btn-save')?.classList.add('active')
              isSave.value = true
            }
          },
          cellUpdateBefore: function (r, c, value) {
            console.log('! cellUpdateBefore', {r, c, value});
            return true;
          },
          cellUpdated: function (r, c, oldValue, newValue) {
            const { name: sheetName, index: sheetIndex } = luckysheet.getSheet();
            console.log('! cellUpdated', {sheetName, r, c, oldValue, newValue});
            const key = `editCell_${props.excelId}_${sheetIndex}_${r}_${c}`;
            const cellValue = getCellValue(oldValue, newValue);
            if (cellValue !== null) {
              updateMap.set(key, {
                action: 'editCell',
                fileId: props.excelId,
                r: r + 1,
                c: c + 1,
                value: cellValue,
                sheetName
              });

              luckysheet.setCellFormat(r, c, 'bg', '#fff000');
            }
          }
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

//엑셀 저장(테스트)
// const saveExcel = async () => {
//   try {
//     console.log(updateMap.values()[0]);
//     // const result = await axios.post('http://localhost:5213/api/excel/test', {

//     // });
//   } catch (e) {
//     console.error(e);
//   }
// };

// 엑셀 저장
const saveExcel = async () => {
  
  if (isSave.value) {
    isMaskShow.value = true
    
    try{
      const revision = sessionStorage.getItem('revision') ?? '[]';
      const user = await getUserData();
      const result = await axios.post('/file/edit', {
        userId: user.id,
        data: [...updateMap.values()],
        revision: JSON.parse(revision),
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
    catch(error: any) {
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

  }
  else{
    state.popup.content = ['엑셀 수정을 해주세요.']
    state.popup.btnCount = 1
    state.popup.toggle = true
  }

}

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