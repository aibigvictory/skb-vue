<template>
  <div class="warp">
    <div class="search-result-header">
      <div class="title">검색결과 <span>"{{search_keyword}}"</span></div>
    </div>
    <div class="search-result-section d-flex">
      <div class="category">
        <div class="category-title">전체</div>
        <ul class="category-list">
          <li>MUX (7)</li>
          <li>TITAN (7)</li>
          <li>CATV_SO (7)</li>
          <li>HD방송 (19)</li>
        </ul>
      </div>
      <div class="search-result-item">
        <div class="search-result-item-button d-flex">
          <button>전체선택</button>
          <button>전체해제</button>
        </div>
        <ul class="search-result-item-list d-flex align-items-center">
          <li v-for="item in [1,2,3,4]" :key="item" class="d-flex align-items-center"><input type="checkbox" class="form-check-input" :id="`checkbox${item}`"><label :for="`checkbox${item}`">CATV관리문서_MUX_SCR_230428</label></li>
        </ul>
      </div> 
    </div>
    <div class="search-result-section2">
      <div class="title">관리파일 리스트 <span>2건</span></div>
      <ul class="search-result-section2-wrap">
        <li v-for="item1 in ['MUX', 'TITAN', 'CATV_SO', 'HD방송']" :key="item1" class="search-result-section2-folder">
          <div class="folder d-flex align-items-center">
            <div class="img d-flex justify-content-center align-items-center">
              <img src="media/icons/duotune/art/art005.svg" alt="">
            </div>
            <span>{{item1}}</span>
          </div>
          <ul class="files d-flex">
            <li v-for="item2 in [1,2,3,4]" :key="item2" class="d-flex align-items-center">
              <img src="@/assets/img/group32.svg" alt="">
              <span>CATV관리문서_MUX_SCR_230428</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

let search_keyword = ref('SRC1632')


onMounted(() => {
})

</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}
.warp{
  .search-result-header{
    margin-top: 48px;
    .title{
      color: var(--primary-text, #222);
      text-align: left;
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%; /* 20px */
      span{
        color: var(--data-bs-theme-light-bs-red, #DC3545);
      }
    }
  }
  .search-result-section {
    margin-top: 16px;
    border-radius: 10px;
    background: #FFF;
    padding: 8px 24px;
    .category{
      width: 180px;
      height: 228px;
      margin: 14px 0;
      padding-right: 16px;
      border-right: 1px solid #DCDFE6;
      .category-title{
        margin: 0;
        padding: 24px 8px 10px 16px;
        color: var(--primary-text, #222);
        font-family: Pretendard Variable;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%; /* 16px */
        letter-spacing: 0.5px;
      }
      .category-list{
        color: var(--primary-text, #222);
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 14px */
        li{
          display: flex;
          padding: 10px 24px 10px 8px;
        }
      }
    }
    .search-result-item{
      margin-left: 16px;
      .search-result-item-button{
        margin: 8px 0;
        button{
          display: flex;
          width: 72px;
          padding: 8px 13px;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border-radius: 38px;
          border: none;
          margin-right: 8px;

          color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
          text-align: center;
          font-size: 11px;
          font-style: normal;
          font-weight: 700;
          line-height: 100%; /* 11px */
          letter-spacing: 0.5px;
          &:hover, &:focus{
            background: var(--root-data-theme-light-kt-primary, #009EF7);
            color: var(--default-white, #FFF);
          }
        }
      }
      .search-result-item-list{
        li{
          margin-right: 20px;
          color: var(--kt-form-label-color, #3F4254);
          text-align: center;
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 120%; /* 14.4px */
          .form-check-input{
            margin-right: 4px;
            width: 14px;
            height: 14px;
            border-radius: 1px;
          }
        }
      }
    }
  }
  .search-result-section2{
    // padding: 24px 16px;
    margin-top: 16px;
    .title{
      padding: 16px 0;
      color: var(--primary-text, #222);
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%; /* 20px */
    }
    .search-result-section2-wrap{
      padding: 16px 24px;
      border-radius: 10px;
      background: #FFF;
      .search-result-section2-folder{
        margin-bottom: 24px;
        &:last-child{
          margin-bottom: 0;
        }
        .folder{
          .img{
            width: 32px;
            height: 32px;
            img{
              width: 14px;
              height: 14px;
            }
          }
          span{
            color: var(--primary-text, #222);
            font-size: 14px ;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 14px */
          }
        }
        .files{
          margin-top: 8px;
          border-radius: 6px;
          li{
            background: var(--root-data-theme-light-kt-light, #F5F8FA);
            display: inline;
            padding: 8px;
            margin-right: 8px;
            img{
              width: 14px;
              height: 14px;
            }
            span{
              color: var(--kt-form-label-color, #3F4254);
              font-family: Pretendard;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 130%; /* 15.6px */
            }
          }
        }
      }
    }
  }
}
</style>
