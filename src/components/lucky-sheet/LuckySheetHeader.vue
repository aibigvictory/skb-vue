<template>
  <!-- <div>
    <button @click="onClickPrevButton">이전</button>
    <button @click="onClickNextButton">다음</button>
    <button @click="onClickSaveButton">헤더 저장</button>
  </div> -->
  <div id="luckysheetmodal"></div>
  <!-- <div v-show="isMaskShow" id="tip">
    <img src="@/assets/img/default-dark.png" alt="Metronic logo" />
    <span>Loading<div id="loading"><div class="spinner"></div></div></span>
  </div> -->
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
import LuckySheet from './LuckySheet.vue'
import { HeaderSelector } from './headerSelector'

const state = store.state

const props = defineProps({
  excelId: Number,
  excelName: String,
})

const isMaskShow = ref(true)
const updateMap = new Map();

// 헤더 선택기
const headerSelector = new HeaderSelector();

// 엑셀 이전, 다음 버튼 이벤트 리스너
const onClickPrevButton = () => {
  const currentSheet = window.luckysheet.getSheet();
  const currentSheetOrder = Number(currentSheet.order);
  console.log('onClickPrevButton', currentSheetOrder);
  if (currentSheetOrder <= 0) return;

  const headerRange = headerSelector.getHeaderRange(currentSheetOrder - 1);
  window.luckysheet.setSheetActive(currentSheetOrder - 1);
  window.luckysheet.setRangeShow(headerRange);
};
const onClickNextButton = () => {
  const sheets = window.luckysheet.getAllSheets();
  const currentSheet = window.luckysheet.getSheet();
  const currentSheetOrder = Number(currentSheet.order);
  console.log('onClickNextButton', currentSheetOrder, sheets.length);
  if (currentSheetOrder >= sheets.length - 1) return;

  const headerRange = headerSelector.getHeaderRange(currentSheetOrder + 1);
  window.luckysheet.setSheetActive(currentSheetOrder + 1);
  window.luckysheet.setRangeShow(headerRange);
};
const onClickSaveButton = () => {
  const ranges = headerSelector.getHeaderRanges();
  ranges.forEach((range) => {
    console.log(`sheetIndex: ${range.sheetIndex}, row: [${range.headerRange.row}], column: [${range.headerRange.column}]`)
  })
};

//엑셀 로드
const reload_excel = (url, excelName, luckysheet) => {
  if (state.luckysheet.data) {
    luckysheet.create({
      container: 'luckysheetmodal',
      showinfobar: false,
      showtoolbar: false,
      data:state.luckysheet.data.sheets,
      title:state.luckysheet.data.info.name,
      userInfo:state.luckysheet.data.info.name.creator,
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
          
          if (updateMap.size > 0) {
            document.querySelector('.btn-save')?.classList.add('active')
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
          updateMap.set(key, {
            action: 'editCell',
            fileId: props.excelId,
            r: r + 1,
            c: c + 1,
            value: String(newValue?.v) ?? '',
            sheetName
          });

          luckysheet.setCellFormat(r, c, 'bg', '#fff000')
        },
        rangeSelect: function (sheet, range) {
          console.log('rangeSelect', sheet, range);
          headerSelector.selectRange(sheet, range);
        },
        workbookCreateAfter: function (book) {
          console.log('workbookCreateAfter', book);
          luckysheet.setSheetActive(0);
          headerSelector.init(book.data);
        },
        // rangeMoveBefore: function () {
        //   console.log('rangeMoveBefore');
        // },
        // rangeMoveAfter: function () {
        //   console.log('rangeMoveAfter');
        // },
        // rangeEditBefore: function () {
        //   console.log('rangeEditBefore');
        // },
        // rangeEditAfter: function () {
        //   console.log('rangeEditAfter');
        // }
      }
  });
  }
  else {
    LuckyExcel.transformExcelToLuckyByUrl(url, excelName, function(exportJson, luckysheetfile){                    
      if(exportJson.sheets==null || exportJson.sheets.length==0){
          // 예외처리
          // isMaskShow.value = false
  
          state.popup.content = ['엑셀 파일을 불러오지 못했습니다.']
          state.popup.btnCount = 1
          state.popup.toggle = true
          return 
      }
      //엑셀시트 뷰 생성
      luckysheet.create({
          container: 'luckysheetmodal',
          showinfobar: false,
          showtoolbar: false,
          data:exportJson.sheets,
          title:exportJson.info.name,
          userInfo:exportJson.info.name.creator,
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
              
              if (updateMap.size > 0) {
                document.querySelector('.btn-save')?.classList.add('active')
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
              updateMap.set(key, {
                action: 'editCell',
                fileId: props.excelId,
                r: r + 1,
                c: c + 1,
                value: String(newValue?.v) ?? '',
                sheetName
              });
  
              luckysheet.setCellFormat(r, c, 'bg', '#fff000')
            },
            rangeSelect: function (sheet, range) {
              console.log('rangeSelect', sheet, range);
              headerSelector.selectRange(sheet, range);
            },
            workbookCreateAfter: function (book) {
              console.log('workbookCreateAfter', book);
              luckysheet.setSheetActive(0);
              headerSelector.init(book.data);
            },
            // rangeMoveBefore: function () {
            //   console.log('rangeMoveBefore');
            // },
            // rangeMoveAfter: function () {
            //   console.log('rangeMoveAfter');
            // },
            // rangeEditBefore: function () {
            //   console.log('rangeEditBefore');
            // },
            // rangeEditAfter: function () {
            //   console.log('rangeEditAfter');
            // }
          }
      });
    });
  }
    // luckysheet.setSheetColor("#ff0000")

    // isMaskShow.value = false
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
  onClickPrevButton,
  onClickNextButton,
  onClickSaveButton,
})
// !!! create luckysheet after mounted

</script>

<style lang="scss">


#luckysheetmodal {
  height: calc(80vh - 200px);
}

#uploadBtn {
  font-size: 16px;
}



#luckysheetloadingdata{
  display: none;
}

</style>
