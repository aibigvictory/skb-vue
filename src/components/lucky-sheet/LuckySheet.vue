<template>
  <div id="luckysheet"></div>
  <!-- <div v-show="isMaskShow" id="tip">Downloading</div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { exportExcel } from '@/assets/utils/export.js'
import { isFunction } from '@/assets/utils/is.js'
import LuckyExcel from 'luckyexcel'
import axios from 'axios'

const props = defineProps({
  excelId: Number,
  excelName: String,
})

//엑셀 로드
const reload_excel = (url, excelName, luckysheet) => {
  LuckyExcel.transformExcelToLuckyByUrl(url, excelName, function(exportJson, luckysheetfile){                    
    if(exportJson.sheets==null || exportJson.sheets.length==0){
        // 예외처리
        return;
    }
    //초기화
    luckysheet.destroy();    
    //엑셀시트 뷰 생성
    luckysheet.create({
        container: 'luckysheet',
        showinfobar:false,
        data:exportJson.sheets,
        title:exportJson.info.name,
        userInfo:exportJson.info.name.creator,
    });
  });
}

//사이드바에서 다른 엑셀 파일 클릭시 엑셀시트 뷰 변경
watch(() => props.excelId, (value) => {
  const url = `${process.env.VUE_APP_API_URL}/file/${value}/data`

  reload_excel(url, props.excelName, window.luckysheet)
})

//엑셀 다운로드
const downloadExcel = () => {
  // const formData = new FormData();
  // formData.append('file', file);

  // axios.post('/server/upload', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // });
  console.log(luckysheet.getAllSheets());
  
  try{
    exportExcel(luckysheet.getAllSheets(), props.excelName, props.excelId)
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
  downloadExcel
})

// setInterval(() => {
//   console.log(window.luckysheet.getAllSheets());
// }, 10000)


// const selected = ref('')

// const options = ref([])

// const loadExcel = (evt) => {
//   const files = evt.target.files
//   if (files == null || files.length == 0) {
//     alert('No files wait for import')
//     return
//   }

//   let name = files[0].name
//   let suffixArr = name.split('.'),
//     suffix = suffixArr[suffixArr.length - 1]
//   if (suffix != 'xlsx') {
//     alert('Currently only supports the import of xlsx files')
//     return
//   }
//   LuckyExcel.transformExcelToLucky(files[0], function (exportJson, luckysheetfile) {
//     if (exportJson.sheets == null || exportJson.sheets.length == 0) {
//       alert('Failed to read the content of the excel file, currently does not support xls files!')
//       return
//     }
//     console.log('exportJson', exportJson)
//     jsonData.value = exportJson

//     isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

//     window.luckysheet.create({
//       container: 'luckysheet', //luckysheet is the container id
//       showinfobar: false,
//       data: exportJson.sheets,
//       title: exportJson.info.name,
//       userInfo: exportJson.info.name.creator,
//     })
//   })
// }


// !!! create luckysheet after mounted

</script>

<style scoped>
#luckysheet {
  margin: 0px;
  padding: 0px;
  position: relative;
  width: 100%;
  height: calc(100vh - 130px);
  left: 0px;
  top: 30px;
  bottom: 0px;
  overflow-x: hidden;
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
}

</style>
