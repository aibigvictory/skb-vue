<template>
  <!-- <div>
    <button @click="onClickPrevButton">이전</button>
    <button @click="onClickNextButton">다음</button>
    <button @click="onClickSaveButton">헤더 저장</button>
  </div> -->
  <div id="luckysheetmodal"></div>
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
import LuckySheet from './LuckySheet.vue'
import { HeaderSelector } from './headerSelector'

const state = store.state

const props = defineProps({
  excelId: Number,
  excelName: String,
})

const isMaskShow = ref(true)
const isSave = ref(false)

// 현재 줌 비율
let currentZoomRatio = 0.5;

// 헤더 선택기
const headerSelector = new HeaderSelector();

// 엑셀 이전, 다음 버튼 이벤트 리스너
const onClickPrevButton = () => {
  const currentSheet = window.luckysheet.getSheet();
  const currentSheetOrder = Number(currentSheet.order);
  console.log('onClickPrevButton', currentSheetOrder);
  if (currentSheetOrder <= 0) {
    return;
  };

  const headerRange = headerSelector.getHeaderRange(currentSheetOrder - 1);
  window.luckysheet.setSheetActive(currentSheetOrder - 1);
  window.luckysheet.setSheetZoom(currentZoomRatio);
  window.luckysheet.setRangeShow(headerRange);
};
const onClickNextButton = () => {
  const sheets = window.luckysheet.getAllSheets();
  const currentSheet = window.luckysheet.getSheet();
  const currentSheetOrder = Number(currentSheet.order);
  console.log('onClickNextButton', currentSheetOrder, (sheets.length - 1));
  if (currentSheetOrder >= sheets.length - 1) {
    return;
  };

  const headerRange = headerSelector.getHeaderRange(currentSheetOrder + 1);
  window.luckysheet.setSheetActive(currentSheetOrder + 1);
  window.luckysheet.setSheetZoom(currentZoomRatio);
  window.luckysheet.setRangeShow(headerRange);
};
const onClickSaveButton = async () => {
  console.log(isSave.value);
  
  if (isSave.value) {
    const ranges = headerSelector.getHeaderRanges();
    ranges.forEach((range) => {
      console.log(`sheetIndex: ${range.sheetIndex}, row: [${range.row}], column: [${range.column}]`)
    });

    try {
      const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
      }
    
      const { data } = await axios.post('/file/editHeaderInfo', {
        id: props.excelId,
        headerRange: ranges
      }, axios_config);

      state.popup.content = ['헤더 지정에 성공하였습니다.']
      state.popup.btnCount = 1
      state.popup.toggle = true

      router.push(`excel/${props.excelId}`);
    }
    catch (error) {
      console.error(error);
      state.popup.content = ['헤더 지정에 실패하였습니다.']
      state.popup.btnCount = 1
      state.popup.toggle = true

      throw new Error('헤더 지정에 실패하였습니다.');
    }
  }
  else{
    state.popup.content = ['헤더 수정을 해주세요.']
    state.popup.btnCount = 1
    state.popup.toggle = true
  }
}
//엑셀 로드
const reload_excel = (url, excelName, luckysheet) => {
    LuckyExcel.transformExcelToLuckyByUrl(url, excelName, function(exportJson, luckysheetfile){                    
      if(exportJson.sheets==null || exportJson.sheets.length==0){
          // 예외처리
          isMaskShow.value = true
  
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
              if (type === 'zoomChange') {
                const { zoomRatio, curZoomRatio } = operate;
                console.log('zoomChange', curZoomRatio);
                currentZoomRatio = curZoomRatio;
              }
            },
            cellUpdateBefore: function (r, c, value) {
              console.log('! cellUpdateBefore', {r, c, value});
              return true;
            },
            rangeSelect: function (sheet, range) {
              const sheets = window.luckysheet.getAllSheets();
              const currentSheetOrder = Number(sheet.order);
              console.log('rangeSelect', sheet, range, currentSheetOrder, sheets.length);

              if (currentSheetOrder == sheets.length - 1) {
                document.querySelector('.btn-next')?.classList.add('disabled');
                document.querySelector('.btn-save')?.classList.add('active');
                isSave.value = true
              } else {
                document.querySelector('.btn-next')?.classList.remove('disabled');
                document.querySelector('.btn-save')?.classList.remove('active');
                isSave.value = false
              }

              if (currentSheetOrder <= 0) {
                document.querySelector('.btn-pre')?.classList.add('disabled');
              } else {
                document.querySelector('.btn-pre')?.classList.remove('disabled');
              }

              const headerRange = {
                sheetIndex: Number(sheet.index),
                row: range[0].row,
                column: range[0].column,
              };
              headerSelector.selectRange(sheet, headerRange);
            },
            workbookCreateAfter: function (book) {
              console.log('workbookCreateAfter', book);
              luckysheet.setSheetActive(0);
              luckysheet.setSheetZoom(0.5);
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
      
      isMaskShow.value = false
    });
    // luckysheet.setSheetColor("#ff0000")

}

//엘리먼트 생성 후, 엑셀 파일 데이터 적용
onMounted(() => {
  try{
    const url = `${process.env.VUE_APP_API_URL}/file/${props.excelId}/data`;

    isMaskShow.value = true
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
  height: calc(100vh - 200px);
}

#uploadBtn {
  font-size: 16px;
}



#luckysheetloadingdata{
  display: none;
}

</style>
