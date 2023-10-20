<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mt-1">
    <!--begin::Col-->
    <!-- <div class="row g-5 g-xl-10 mb-5"> -->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5" v-for="(recent_upload_file, idx) in recent_upload_files" :key="recent_upload_file">
        <!-- <h1 class="d-flex text-dark fw-bold fs-3 align-items-center container-fluid h-35px">최근 업로드 파일</h1> -->
        <Widget1
          className="h-md-90 mb-5 mt-3"
          bgColor="#FFFFFF"
          :title="`${!idx ?'최근 업로드 파일' :''}`"
          :file="recent_upload_file.name"
          :date="recent_upload_file.createdAt"
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

  <DashboardRevision/>
  <DashboardFavorites/>
  
  <!--end::Row-->

</template>

<script setup lang="ts">
import DashboardRevision from "@/components/dashboard/DashboardRevision.vue"
import DashboardFavorites from "@/components/dashboard/DashboardFavorites.vue"
import Widget1 from "@/components/dashboard-default-widgets/RecentUploadFile.vue";
import Widget2 from "@/components/dashboard-default-widgets/ConnectMember.vue";
import FileUploadVue from '@/components/file-upload/FileUpload.vue'
import { defineComponent, ref } from "vue";
import axios from "axios";

const recent_upload_files = ref([])

const call_fileList = async () => {
  const { data } = await axios.post('/file/list')

  console.log(data);
  
  recent_upload_files.value = data.slice(0,3)
}

call_fileList()

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


</style>