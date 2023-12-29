<template>
  <div class="warp">
    <div class="download-wrap">
      <div class="option-wrap">
        정렬
        <div class="nav-group nav-group-fluid">
          <!-- <label>
            <input type="radio" class="btn-check" name="type" value="default" v-model="sort_option">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary"> 기본 </span>
          </label> -->
          <label>
            <input type="radio" class="btn-check" name="type" value="num" v-model="sort_option">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"> 123 </span>
          </label>
          <label>
            <input type="radio" class="btn-check" name="type" value="en" v-model="sort_option">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"> ABC </span>
          </label>
          <label>
            <input type="radio" class="btn-check" name="type" value="ko" v-model="sort_option">
            <span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"> 가나다 </span>
          </label>
        </div>
        <div class="select-wrap">
          검색구분
          <input type="radio" id="radio-search-perfectly" value="true" v-model="search_option">
          <label for="radio-search-perfectly">일치항목 검색</label>
          <input type="radio" id="radio-search-similarly" value="false" v-model="search_option">
          <label for="radio-search-similarly">가중치 검색</label>
        </div>
        <div class="adjust-mode">
          <div>수정 모드 {{adjust_mode ? 'on' : 'off'}}</div>
          <input v-model="adjust_mode" type="checkbox" id="switch">
          <label for="switch" class="switch_label">
            <span class="onf_btn"></span>
          </label>
        </div>
      </div>
      <!-- <div class="sort-btn">
        <button @click="sort_search_result($event,'default')" class="btn btn-primary">기본</button>
        <button @click="sort_search_result($event,'num')" class="btn btn-primary btn-secondary">123</button>
        <button @click="sort_search_result($event,'en')" class="btn btn-primary btn-secondary">ABC</button>
        <button @click="sort_search_result($event,'ko')" class="btn btn-primary btn-secondary">가나다</button>
      </div> -->
      <button class="download-btn" @click="exportExcel">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M0.5 9.90002C0.776142 9.90002 1 10.1239 1 10.4V12.9C1 13.4523 1.44772 13.9 2 13.9H14C14.5523 13.9 15 13.4523 15 12.9V10.4C15 10.1239 15.2239 9.90002 15.5 9.90002C15.7761 9.90002 16 10.1239 16 10.4V12.9C16 14.0046 15.1046 14.9 14 14.9H2C0.895431 14.9 0 14.0046 0 12.9V10.4C0 10.1239 0.223858 9.90002 0.5 9.90002Z" fill="white"/>
        <path d="M7.64645 11.8536C7.84171 12.0488 8.15829 12.0488 8.35355 11.8536L11.3536 8.85355C11.5488 8.65829 11.5488 8.34171 11.3536 8.14645C11.1583 7.95118 10.8417 7.95118 10.6464 8.14645L8.5 10.2929V1.5C8.5 1.22386 8.27614 1 8 1C7.72386 1 7.5 1.22386 7.5 1.5V10.2929L5.35355 8.14645C5.15829 7.95118 4.84171 7.95118 4.64645 8.14645C4.45118 8.34171 4.45118 8.65829 4.64645 8.85355L7.64645 11.8536Z" fill="white"/>
        </svg>
        통합검색결과 내려받기
      </button>
    </div>
    <Excel ref="childRef" :keyword="state.search.keyword" :fileList="store.state.search_result" :sort="sort_option" :searchType="search_option" :adjust="adjust_mode"/>
  </div>
</template>

<script setup lang="ts">
import Excel from './SearchLoadExcel.vue'

import JwtService from '@/core/services/JwtService';
import store from '@/store';
import { onMounted, ref, watch } from 'vue';

const childRef = ref(null);

const exportExcel = () => {
  if (childRef.value) {
    childRef.value.exportExcel();
  }
};

const state = store.state

const sort_option = ref('default')
const search_option = ref('true')
const adjust_mode = ref(false)


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
      .adjust-mode {
        margin-left: 30px;
        display: flex;
        align-items: center;
        // width: 50px;
        // height: 50px;
        // text-align: center;
        // margin: 50px auto;
        > div{
          width:95px;
        }
        #switch {
          position: absolute;
          /* hidden */
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
        .switch_label {
          position: relative;
          cursor: pointer;
          display: inline-block;
          width: 58px;
          height: 28px;
          background: #fff;
          border: 2px solid #009EF7;;
          border-radius: 20px;
          transition: 0.2s;
        }
        .switch_label:hover {
          background: #efefef;
        }
        .onf_btn {
          position: absolute;
          top: 2px;
          left: 1px;
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background: #009EF7;;
          transition: 0.2s;
        }

        /* checking style */
        #switch:checked+.switch_label {
          background: #009EF7;;
          border: 2px solid #009EF7;;
        }

        #switch:checked+.switch_label:hover {
          background: #009EF7;;
        }

        /* move */
        #switch:checked+.switch_label .onf_btn {
          left: 34px;
          background: #fff;
          box-shadow: 1px 2px 3px #00000020;
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
  // ul{
  //   li{
  //     margin-top: 24px;
  //     padding-bottom: 24px;
  //     background: #fff;
  //     .title{
  //       padding: 16px 20px 10px 20px;
  //       .text{
  //         display: flex;
  //         align-items: center;
  //         height: 52px;
  //         padding: 8px 20px;
  //         border-radius: 10px;
  //         background: var(--bs-warning-light, #FFF8DD);

  //         color: var(--primary-text, #222);
  //         font-size: 20px;
  //         font-style: normal;
  //         font-weight: 700;
  //         line-height: 110%; /* 22px */
  //       }
  //     }
  //     .content{
  //       margin: 24px 24px;
  //       .sub-title{
  //         display: flex;
  //         align-items: center;
  //         height: 36px;
  //         color: var(--primary-text, #222);
  //         /* heading/heading6 */
  //         font-size: 18px;
  //         font-style: normal;
  //         font-weight: 700;
  //         line-height: 110%; /* 19.8px */
  //       }
  //       .info{
  //         display: flex;
  //         align-items: center;
  //         margin-bottom: 12px;
  //         .time{
  //           color: var(--primary-text, #222);
  //           font-size: 14px;
  //           font-style: normal;
  //           font-weight: 500;
  //           line-height: 100%; /* 14px */
  //           span{
  //             color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
  //             font-weight: 400;
  //           }
  //         }
  //         .type{
  //           margin-left: 12px;
  //           color: var(--primary-text, #222);
  //           font-size: 14px;
  //           font-style: normal;
  //           font-weight: 500;
  //           line-height: 100%; /* 14px */
  //           span{
  //             color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
  //             font-weight: 400;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // .save-wrap{
  //   margin-top: 48px;
  //   display: flex;
  //   justify-content: end;
  //   .save-btn{
  //     border: none;
  //     display: flex;
  //     width: 210px;
  //     height: 48px;
  //     padding: 14px 58px;
  //     justify-content: center;
  //     align-items: center;
  //     gap: 8px;
  //     border-radius: 6px;
  //     background: var(--el-color-info-light-8, #E9E9EB);
  //   }
  // }
}
.grid{
  overflow-x: scroll;
}
</style>
