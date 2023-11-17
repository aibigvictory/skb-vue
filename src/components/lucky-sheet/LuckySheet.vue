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

const props = defineProps({
  excelId: Number,
  excelName: String,
})

const isMaskShow = ref(true)

//엑셀 로드
const reload_excel = (url, excelName, luckysheet) => {
  LuckyExcel.transformExcelToLuckyByUrl(url, excelName, function(exportJson, luckysheetfile){                    
    if(exportJson.sheets==null || exportJson.sheets.length==0){
        // 예외처리
        isMaskShow.value = false
        return alert('엑셀 파일을 불러오지 못했습니다.');
    }
    //초기화
    luckysheet.destroy();    
    //엑셀시트 뷰 생성
    luckysheet.create({
        container: 'luckysheet',
        showinfobar: false,
        data:exportJson.sheets,
        title:exportJson.info.name,
        userInfo:exportJson.info.name.creator,
        // loading: false,
        hook: {
          updated: (operate) => {
            console.log(operate);
            document.querySelector('.btn-save')?.classList.add('active')
          },
        }
    })
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

//엑셀 다운로드
const downloadExcel = () => {
  try{
    exportExcel(luckysheet.getAllSheets(), props.excelName)
    .then(() => alert('다운로드가 완료되었습니다.'))
  }
  catch(error) {
    alert('다운로드가 실패하였습니다.')
  }
}

//엑셀 저장
const saveExcel = () => {
  try{
    saveExcelToServer(luckysheet.getAllSheets(), props.excelId)
    .then(() => alert('수정이 완료되었습니다.'))
  }
  catch(error) {
    alert('수정에 실패하였습니다.')
  }
}

//엘리먼트 생성 후, 엑셀 파일 데이터 적용
onMounted(() => {
  try{
    const url = `${process.env.VUE_APP_API_URL}/file/${props.excelId}/data`

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
  height: calc(100vh - 300px);
}

#uploadBtn {
  font-size: 16px;
}

#tip {
  position: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  img{
    margin-bottom: 30px;
    height: 30px !important;
    width: auto;
  }

  span{
    margin-top: 20px;
    position: relative;
    font-size: 12px;
    color: #5E6278;
    transition: none !important;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }

  #loading {
    // display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  }

  @keyframes spinner {
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
  }

  #loading .spinner {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: #f19022;
    border-bottom-color: #f19022;
    animation: spinner .8s ease infinite;
  }
}

#luckysheetloadingdata{
  display: none;
}

</style>
