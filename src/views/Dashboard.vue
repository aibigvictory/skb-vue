<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mt-1">
    <!--begin::Col-->
    <!-- <div class="row g-5 g-xl-10 mb-5"> -->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5">
        <!-- <h1 class="d-flex text-dark fw-bold fs-3 align-items-center container-fluid h-35px">최근 업로드 파일</h1> -->
        <Widget1
          className="h-md-90 mb-5 mt-3"
          description="Active Projects"
          bgColor="#FFFFFF"
          title="최근 업로드 파일"
          file="다이렉트 HD방송_IPto8VSB_채널라인업"
          date="2023년 8월 08일 15:47"
        />

      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5">
        <!-- <h1 class="d-flex text-dark fw-bold fs-3 align-items-center container-fluid h-35px"></h1> -->
        <Widget1
          className="h-md-90 mb-5 mt-3"
          description="Active Projects"
          bgColor="#FFFFFF"
          title=""
          file="다이렉트 HD방송_QAMto8VSB_채널라인업"
          date="2023년 7월 14일 18:12"
        />
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5">
        <!-- <h1 class="d-flex text-dark fw-bold fs-3 align-items-center container-fluid h-35px"></h1> -->
        <Widget1
          className="h-md-90 mb-5 mt-3"
          description="Active Projects"
          bgColor="#FFFFFF"
          title=""
          file="TITAN Live TC_230428_주요채널분산"
          date="2023년 6월 23일 17:25"
        />
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5">
        <!-- <h1 class="d-flex text-dark fw-bold fs-3 align-items-center container-fluid h-35px">접속회원</h1> -->
        <Widget2
          className="h-md-90 mb-5 mt-3"
          description="Active Projects"
          bgColor="#FFFFFF"
          title="접속회원"
        />
      </div>
      <!--end::Col-->
    <!-- </div> -->
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div class="mt-10">
    <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
      <div class="d-flex flex-stack container-fluid">
        <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
          <h1 class="fz-20px page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">관리파일</h1>
          <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li class="breadcrumb-item text-muted">기타파일은 좌측 하단의 Excel Upload에서 업로드 가능 합니다.</li>
          </ul>
        </div>
        <div class="d-flex align-items-center gap-2 gap-lg-3">
          <button class="btn-upload btn btn-primary" @click="fileUpload">
            업로드
          </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <FileUploadVue ref="FileUploadChildVue"/>
  </div>

  <div class="dashboard-revision">
    <div class="title">최근 수정내역</div>
    <div class="content">
      <div class="table-header">
        <ul>
          <li>그룹</li>
          <li>파일명</li>
          <li>최초등록</li>
          <li>등록일시</li>
          <li>수정자</li>
          <li>수정일시</li>
          <li>파일수정</li>
        </ul>
      </div>
      <div class="table-body">
        <ul>
          <li>HD방송</li>
          <li>2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP</li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <span class="adjust">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path opacity="0.3" d="M13.5668 5.06844L12.1274 6.50709L8.29011 2.66975L9.72878 1.23039C9.98331 0.975908 10.3285 0.833008 10.6884 0.833008C11.0484 0.833008 11.3936 0.975908 11.6481 1.23039L13.5668 3.14909C13.8212 3.40363 13.9642 3.74879 13.9642 4.10872C13.9642 4.46865 13.8212 4.8139 13.5668 5.06844ZM1.7581 14.1211L5.89144 12.7431L2.0541 8.90576L0.676104 13.0391C0.625544 13.19 0.61813 13.3522 0.654704 13.5072C0.69127 13.6622 0.770377 13.8038 0.883104 13.9163C0.995837 14.0287 1.13772 14.1074 1.29278 14.1436C1.44783 14.1798 1.60991 14.172 1.76077 14.1211H1.7581Z" fill="#009EF7"/>
              <path d="M3.01573 13.6997L1.76107 14.1183C1.61034 14.1685 1.44863 14.1757 1.29403 14.1393C1.13943 14.1027 0.998025 14.0239 0.885665 13.9116C0.773305 13.7993 0.694412 13.658 0.657805 13.5034C0.621198 13.3488 0.628325 13.1871 0.678392 13.0364L1.09707 11.781L3.01573 13.6997ZM2.05639 8.90301L5.89373 12.7403L12.1297 6.50434L8.2924 2.66699L2.05639 8.90301Z" fill="#009EF7"/>
              </svg>
            </span>
          </li>
        </ul>
        <ul>
          <li>HD방송</li>
          <li>2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP</li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <span class="adjust">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path opacity="0.3" d="M13.5668 5.06844L12.1274 6.50709L8.29011 2.66975L9.72878 1.23039C9.98331 0.975908 10.3285 0.833008 10.6884 0.833008C11.0484 0.833008 11.3936 0.975908 11.6481 1.23039L13.5668 3.14909C13.8212 3.40363 13.9642 3.74879 13.9642 4.10872C13.9642 4.46865 13.8212 4.8139 13.5668 5.06844ZM1.7581 14.1211L5.89144 12.7431L2.0541 8.90576L0.676104 13.0391C0.625544 13.19 0.61813 13.3522 0.654704 13.5072C0.69127 13.6622 0.770377 13.8038 0.883104 13.9163C0.995837 14.0287 1.13772 14.1074 1.29278 14.1436C1.44783 14.1798 1.60991 14.172 1.76077 14.1211H1.7581Z" fill="#009EF7"/>
              <path d="M3.01573 13.6997L1.76107 14.1183C1.61034 14.1685 1.44863 14.1757 1.29403 14.1393C1.13943 14.1027 0.998025 14.0239 0.885665 13.9116C0.773305 13.7993 0.694412 13.658 0.657805 13.5034C0.621198 13.3488 0.628325 13.1871 0.678392 13.0364L1.09707 11.781L3.01573 13.6997ZM2.05639 8.90301L5.89373 12.7403L12.1297 6.50434L8.2924 2.66699L2.05639 8.90301Z" fill="#009EF7"/>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="dashboard-favorites">
    <div class="title">즐겨찾기</div>
    <div class="content">
      <div class="table-header">
        <ul>
          <li>그룹</li>
          <li>파일명</li>
          <li>최초등록</li>
          <li>등록일시</li>
          <li>수정자</li>
          <li>수정일시</li>
          <li>파일수정</li>
        </ul>
      </div>
      <div class="table-body">
        <ul>
          <li>HD방송</li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path d="M3.61224 15.4427C3.2258 15.6413 2.78823 15.2942 2.86603 14.8508L3.69576 10.1213L0.173428 6.76462C-0.155753 6.45092 0.0146475 5.87737 0.455637 5.81472L5.35411 5.11885L7.53823 0.792305C7.73498 0.402565 8.26795 0.402565 8.4647 0.792305L10.6488 5.11885L15.5473 5.81472C15.9883 5.87737 16.1587 6.45092 15.8295 6.76462L12.3072 10.1213L13.1369 14.8508C13.2147 15.2942 12.7771 15.6413 12.3907 15.4427L8.00146 13.1868L3.61224 15.4427Z" fill="#FFC700"/>
            </svg>
            2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP
          </li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <span class="adjust">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path opacity="0.3" d="M13.5668 5.06844L12.1274 6.50709L8.29011 2.66975L9.72878 1.23039C9.98331 0.975908 10.3285 0.833008 10.6884 0.833008C11.0484 0.833008 11.3936 0.975908 11.6481 1.23039L13.5668 3.14909C13.8212 3.40363 13.9642 3.74879 13.9642 4.10872C13.9642 4.46865 13.8212 4.8139 13.5668 5.06844ZM1.7581 14.1211L5.89144 12.7431L2.0541 8.90576L0.676104 13.0391C0.625544 13.19 0.61813 13.3522 0.654704 13.5072C0.69127 13.6622 0.770377 13.8038 0.883104 13.9163C0.995837 14.0287 1.13772 14.1074 1.29278 14.1436C1.44783 14.1798 1.60991 14.172 1.76077 14.1211H1.7581Z" fill="#009EF7"/>
              <path d="M3.01573 13.6997L1.76107 14.1183C1.61034 14.1685 1.44863 14.1757 1.29403 14.1393C1.13943 14.1027 0.998025 14.0239 0.885665 13.9116C0.773305 13.7993 0.694412 13.658 0.657805 13.5034C0.621198 13.3488 0.628325 13.1871 0.678392 13.0364L1.09707 11.781L3.01573 13.6997ZM2.05639 8.90301L5.89373 12.7403L12.1297 6.50434L8.2924 2.66699L2.05639 8.90301Z" fill="#009EF7"/>
              </svg>
            </span>
          </li>
        </ul>
        <ul>
          <li>HD방송</li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path d="M3.61224 15.4427C3.2258 15.6413 2.78823 15.2942 2.86603 14.8508L3.69576 10.1213L0.173428 6.76462C-0.155753 6.45092 0.0146475 5.87737 0.455637 5.81472L5.35411 5.11885L7.53823 0.792305C7.73498 0.402565 8.26795 0.402565 8.4647 0.792305L10.6488 5.11885L15.5473 5.81472C15.9883 5.87737 16.1587 6.45092 15.8295 6.76462L12.3072 10.1213L13.1369 14.8508C13.2147 15.2942 12.7771 15.6413 12.3907 15.4427L8.00146 13.1868L3.61224 15.4427Z" fill="#FFC700"/>
            </svg>
            2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 > 도봉강북_IP
          </li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <div>홍길동</div>
            <div><span class="company">SKB</span></div>
          </li>
          <li>2023.06.26 12:23:35</li>
          <li>
            <span class="only-read">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path d="M16.2998 8C16.2998 8 13.2998 2.5 8.2998 2.5C3.2998 2.5 0.299805 8 0.299805 8C0.299805 8 3.2998 13.5 8.2998 13.5C13.2998 13.5 16.2998 8 16.2998 8ZM1.4725 8C1.52943 7.91321 1.59435 7.81677 1.66708 7.71242C2.00196 7.23193 2.49611 6.5929 3.13191 5.95711C4.42084 4.66818 6.18042 3.5 8.2998 3.5C10.4192 3.5 12.1788 4.66818 13.4677 5.95711C14.1035 6.5929 14.5976 7.23193 14.9325 7.71242C15.0053 7.81677 15.0702 7.91321 15.1271 8C15.0702 8.08679 15.0053 8.18323 14.9325 8.28758C14.5976 8.76807 14.1035 9.4071 13.4677 10.0429C12.1788 11.3318 10.4192 12.5 8.2998 12.5C6.18042 12.5 4.42084 11.3318 3.13191 10.0429C2.49611 9.4071 2.00196 8.76807 1.66708 8.28758C1.59435 8.18323 1.52943 8.08679 1.4725 8Z" fill="#B5B5C3"/>
              <path d="M8.2998 5.5C6.91909 5.5 5.7998 6.61929 5.7998 8C5.7998 9.38071 6.91909 10.5 8.2998 10.5C9.68052 10.5 10.7998 9.38071 10.7998 8C10.7998 6.61929 9.68052 5.5 8.2998 5.5Z" fill="#B5B5C3"/>
              </svg>
              읽기전용
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!--end::Row-->

</template>

<script setup lang="ts">
import Widget1 from "@/components/dashboard-default-widgets/RecentUploadFile.vue";
import Widget2 from "@/components/dashboard-default-widgets/ConnectMember.vue";
import FileUploadVue from '@/components/file-upload/FileUpload.vue'
import { defineComponent, ref } from "vue";

// export default defineComponent({
//   name: "main-dashboard",
//   components: {
//     Widget1,
//     Widget2,
//     Widget3,
//     Widget4,
//     Widget5,
//     Widget6,
//     Widget7,
//     Widget8,
//     Widget9,
//     Widget10,
//     MixedWidget5,
//     FileUploadVue,
//   },
// });

const FileUploadChildVue = ref()

let fileUpload = () => {
  FileUploadChildVue.value.fileUpload()
  
}
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}
.btn.btn-primary.btn-upload{
  display: flex;
  width: 240.568px;
  height: 54.212px;
  padding: 14.683px 27.106px;
  justify-content: center;
  align-items: center;
  gap: 9.035px;
  flex-shrink: 0;
  border-radius: 6.777px;
  background: var(--data-bs-theme-light-bs-red, #DC3545) !important;

  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 18.071px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 18.071px */

  &:hover:not(.btn-active){
    background: var(--data-bs-theme-light-bs-red, #a01c2a) !important;
  }
}
.container-fluid{
  padding-right: 0 !important;
}
.dashboard-revision{
  margin-top: 48px;
  .title{
    color: var(--primary-text, #222);
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .content{
    border-radius: 10px;
    background: var(--default-white, #FFF);
    padding: 24px;
    .table-header{
      display: flex;
      align-items: center;
      height: 68px;
      background: var(----bs-gray-100, #F9F9F9);
      ul{
        display: flex;
        li{
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          color: var(--primary-text, #222);
          text-align: center;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .table-body{
      ul{
        display: flex;
        align-items: center;
        border-top: 1px solid rgb(241,241,241);
        height: 54px;
        li{
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          text-align: center;
          color: var(--primary-text, #222);
          font-size: 14px;
          font-weight: 400;

          .company{
            padding: 4px 20px;
            border-radius: 21px;
            background: #FFF5F8;
           
            color: #F1416C;
            font-size: 12px;
            font-weight: 700;
          }
          .adjust{
            cursor: pointer;
          }
          .only-read{
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 30px;
            background: var(--data-bs-theme-light-bs-text-gray-200, #F1F1F2);

            color: var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
.dashboard-favorites{
  margin-top: 48px;
  .title{
    color: var(--primary-text, #222);
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .content{
    border-radius: 10px;
    background: var(--default-white, #FFF);
    padding: 24px;
    .table-header{
      display: flex;
      align-items: center;
      height: 68px;
      background: var(----bs-gray-100, #F9F9F9);
      ul{
        display: flex;
        li{
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          color: var(--primary-text, #222);
          text-align: center;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .table-body{
      ul{
        display: flex;
        align-items: center;
        border-top: 1px solid rgb(241,241,241);
        height: 54px;
        li{
          width: 160px;
          &:nth-child(2) {
            width: 420px;
          }

          text-align: center;
          color: var(--primary-text, #222);
          font-size: 14px;
          font-weight: 400;

          .company{
            padding: 4px 20px;
            border-radius: 21px;
            background: #FFF5F8;
           
            color: #F1416C;
            font-size: 12px;
            font-weight: 700;
          }
          .adjust{
            cursor: pointer;
          }
          .only-read{
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 30px;
            background: var(--data-bs-theme-light-bs-text-gray-200, #F1F1F2);

            color: var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>