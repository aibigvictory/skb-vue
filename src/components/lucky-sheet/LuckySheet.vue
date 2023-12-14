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

const state = store.state

const props = defineProps({
  excelId: Number,
  excelName: String,
})

const isMaskShow = ref(true)
const updateMap = new Map();

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
        // loading: false,
        hook: {
          updated: (operate,data) => {
            console.log('operate: ',operate);
            console.log('data: ', data);
            
            document.querySelector('.btn-save')?.classList.add('active')
          },
          cellUpdateBefore: function (r, c, value) {
            console.log('! cellUpdateBefore', {r, c, value});
            return true;
          },
          cellUpdated: function (r, c, oldValue, newValue) {
            const { name: sheetName, index: sheetIndex } = luckysheet.getSheet();
            console.log('! cellUpdated', {sheetName, r, c, oldValue, newValue});
            const key = `${props.excelId}_${sheetIndex}_${r}_${c}`;
            updateMap.set(key, {
              fileId: props.excelId,
              r: r + 1,
              c: c + 1,
              value: String(newValue?.v) ?? '',
              sheetName
            });

            luckysheet.setCellFormat(r, c, 'bg', '#fff000')
          }
        }
    })
    // luckysheet.setSheetColor("#ff0000")

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

//엑셀 저장
const saveExcel = async () => {
  try{
    const revision = localStorage.getItem('revision') ?? '[]';
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
      return;
    }
  }
  catch(error: any) {
    if (error?.response?.status === 409) {
      state.popup.content = ['버전이 충돌하여 수정에 실패하였습니다.']
      state.popup.btnCount = 1
      state.popup.toggle = true
      return;
    }
    state.popup.content = ['수정에 실패하였습니다.']
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
