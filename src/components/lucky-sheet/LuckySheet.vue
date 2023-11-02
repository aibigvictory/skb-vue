<template>
  <!-- <div>
    <input id="uploadBtn" type="file" @change="loadExcel" />

    <span>Or Load remote xlsx file:</span>

    <select v-model="selected" @change="selectExcel">
      <option disabled value="">Choose</option>
      <option v-for="option in options" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <a href="javascript:void(0)" @click="downloadExcel">Download source xlsx file</a>
  </div> -->
  <div id="luckysheet"></div>
  <div v-show="isMaskShow" id="tip">Downloading</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { exportExcel } from '@/assets/utils/export'
// import { exportExcel } from '@/assets/utils/export.js'
import { isFunction } from '@/assets/utils/is.js'
import LuckyExcel from 'luckyexcel'
import axios from 'axios'

try{
  const url = `${process.env.VUE_APP_API_URL}/file/${localStorage.getItem('id')}/data`

  LuckyExcel.transformExcelToLuckyByUrl(url, localStorage.getItem('name'), function(exportJson, luckysheetfile){                    
      if(exportJson.sheets==null || exportJson.sheets.length==0){
          // 예외처리
          return;
      }

      console.log(exportJson);
      console.log(luckysheetfile);
       
      // console.log(exportJson, luckysheetfile);    
      window.luckysheet.destroy();    
      // 뷰어
      window.luckysheet.create({
          container: 'luckysheet',
          showinfobar:false,
          data:exportJson.sheets,
          title:exportJson.info.name,
          userInfo:exportJson.info.name.creator,
      });

      console.log(window.luckysheet);
      console.log(window.luckysheet.getSheet({name: 'Agg MUX'}));
      console.log(window.luckysheet.getSheet({name: 'AD SCR'}));
      
  });
}
catch(error) {}

let id = localStorage.getItem('id')
setInterval(() => {
  if (id == localStorage.getItem('id')) return
  id = localStorage.getItem('id')

  console.log('change');

  const url = `${process.env.VUE_APP_API_URL}/file/${localStorage.getItem('id')}/data`

  LuckyExcel.transformExcelToLuckyByUrl(url, localStorage.getItem('name'), function(exportJson, luckysheetfile){                    
      if(exportJson.sheets==null || exportJson.sheets.length==0){
          // 예외처리
          return;
      }

      console.log(exportJson);
      console.log(luckysheetfile);
       
      // console.log(exportJson, luckysheetfile);    
      window.luckysheet.destroy();    
      // 뷰어
      window.luckysheet.create({
          container: 'luckysheet',
          showinfobar:false,
          data:exportJson.sheets,
          title:exportJson.info.name,
          userInfo:exportJson.info.name.creator,
      });

      console.log(window.luckysheet);
      console.log(window.luckysheet.getSheet({name: 'Agg MUX'}));
      console.log(window.luckysheet.getSheet({name: 'AD SCR'}));
      
  });

  // LuckyExcel.transformExcelToLuckyByUrl(url, localStorage.getItem('name'), function(exportJson, luckysheetfile){                    
  //     if(exportJson.sheets==null || exportJson.sheets.length==0){
  //         // 예외처리
  //         return;
  //     }
       
  //     // console.log(exportJson, luckysheetfile);    
  //     window.luckysheet.destroy();    
  //     // 뷰어
  //     window.luckysheet.create({
  //         container: 'luckysheet',
  //         showinfobar:false,
  //         data:exportJson.sheets,
  //         title:exportJson.info.name,
  //         userInfo:exportJson.info.name.creator
  //     });
  // });
}, 100)

// setInterval(() => {
//   console.log(window.luckysheet.getAllSheets());
// }, 10000)

const isMaskShow = ref(false)
const selected = ref('')
const jsonData = ref({})
const options = ref([])

const loadExcel = (evt) => {
  const files = evt.target.files
  if (files == null || files.length == 0) {
    alert('No files wait for import')
    return
  }

  let name = files[0].name
  let suffixArr = name.split('.'),
    suffix = suffixArr[suffixArr.length - 1]
  if (suffix != 'xlsx') {
    alert('Currently only supports the import of xlsx files')
    return
  }
  LuckyExcel.transformExcelToLucky(files[0], function (exportJson, luckysheetfile) {
    if (exportJson.sheets == null || exportJson.sheets.length == 0) {
      alert('Failed to read the content of the excel file, currently does not support xls files!')
      return
    }
    console.log('exportJson', exportJson)
    jsonData.value = exportJson

    isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

    window.luckysheet.create({
      container: 'luckysheet', //luckysheet is the container id
      showinfobar: false,
      data: exportJson.sheets,
      title: exportJson.info.name,
      userInfo: exportJson.info.name.creator,
    })
  })
}
const selectExcel = (evt) => {
  const value = selected.value
  const name = evt.target.options[evt.target.selectedIndex].innerText

  if (value == '') {
    return
  }
  isMaskShow.value = true

  LuckyExcel.transformExcelToLuckyByUrl(value, name, (exportJson, luckysheetfile) => {
    if (exportJson.sheets == null || exportJson.sheets.length == 0) {
      alert('Failed to read the content of the excel file, currently does not support xls files!')
      return
    }
    console.log('exportJson', exportJson)
    jsonData.value = exportJson

    isMaskShow.value = false

    isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

    window.luckysheet.create({
      container: 'luckysheet', //luckysheet is the container id
      showinfobar: false,
      data: exportJson.sheets,
      title: exportJson.info.name,
      userInfo: exportJson.info.name.creator,
    })
  })
}
const downloadExcel = () => {
  // const value = selected.value;;
  //
  // if(value.length==0){
  //     alert("Please select a demo file");
  //     return;
  // }
  //
  // var elemIF = document.getElementById("Lucky-download-frame");
  // if(elemIF==null){
  //     elemIF = document.createElement("iframe");
  //     elemIF.style.display = "none";
  //     elemIF.id = "Lucky-download-frame";
  //     document.body.appendChild(elemIF);
  // }
  // elemIF.src = value;
  exportExcel(luckysheet.getAllSheets(), '下载')
}

// !!! create luckysheet after mounted
onMounted(() => {
  luckysheet.create({
    container: 'luckysheet',
  })
})
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
