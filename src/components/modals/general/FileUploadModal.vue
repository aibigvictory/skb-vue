<template>
  <!--begin::Modal - Upgrade plan-->
  <div
    class="modal fade"
    id="kt_modal_file_upload"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
        <!--begin::Modal header-->
        <div class="modal-header justify-content-end border-0 pb-0">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body pt-0 pb-15 px-5 px-xl-20">

          <!--begin::Plans-->
          <div class="d-flex flex-column">
            <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
              <li class="nav-item">
                  <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">관리파일</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">기타파일</a>
              </li>
          </ul>

          <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
                  <FileUploadVue/>
              </div>
              <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
                  <FileUploadVue/>
              </div>
          </div>
          </div>
          <!--end::Plans-->

          <!--begin::Actions-->
          <div class="d-flex flex-center flex-row-fluid pt-12">
            <button
              type="reset"
              class="btn btn-light me-3"
              data-bs-dismiss="modal"
            >
              취소
            </button>

            <button type="submit" class="btn btn-primary">파일 업로드</button>
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Upgrade plan-->
</template>

<script setup lang="ts">
import FileUploadVue from '@/components/file-upload/FileUpload.vue'
import { defineComponent, onMounted, ref } from "vue";

    const current = ref<"month" | "annual">("month");

    const selected = ref("Startup");

    const plans = [
      {
        title: "Startup",
        subTitle: "Best for startups",
        description: "Optimal for 10+ team size and new startup",
        priceMonth: "39",
        priceAnnual: "399",
        default: true,
        custom: false,
        features: [
          {
            title: "Up to 10 Active Users",
            supported: true,
          },
          {
            title: "Up to 30 Project Integrations",
            supported: true,
          },
          {
            title: "Analytics Module",
            supported: true,
          },
          {
            title: "Finance Module",
            supported: false,
          },
          {
            title: "Accounting Module",
            supported: false,
          },
          {
            title: "Network Platform",
            supported: false,
          },
          {
            title: "Unlimited Cloud Space",
            supported: false,
          },
        ],
      },

      {
        title: "Advanced",
        subTitle: "Best for 100+ team size",
        description: "Optimal for 100+ team size and grown company",
        priceMonth: "339",
        priceAnnual: "3399",
        default: false,
        custom: false,
        features: [
          {
            title: "Up to 10 Active Users",
            supported: true,
          },
          {
            title: "Up to 30 Project Integrations",
            supported: true,
          },
          {
            title: "Analytics Module",
            supported: true,
          },
          {
            title: "Finance Module",
            supported: true,
          },
          {
            title: "Accounting Module",
            supported: true,
          },
          {
            title: "Network Platform",
            supported: false,
          },
          {
            title: "Unlimited Cloud Space",
            supported: false,
          },
        ],
      },

      {
        title: "Enterprise",
        subTitle: "Best value for 1000+ team",
        description: "Optimal for 1000+ team and enterpise",
        priceMonth: "999",
        priceAnnual: "9999",
        label: "Most popular",
        default: false,
        custom: false,
        features: [
          {
            title: "Up to 10 Active Users",
            supported: true,
          },
          {
            title: "Up to 30 Project Integrations",
            supported: true,
          },
          {
            title: "Analytics Module",
            supported: true,
          },
          {
            title: "Finance Module",
            supported: true,
          },
          {
            title: "Accounting Module",
            supported: true,
          },
          {
            title: "Network Platform",
            supported: true,
          },
          {
            title: "Unlimited Cloud Space",
            supported: true,
          },
        ],
      },

      {
        title: "Custom",
        subTitle: "Requet a custom license",
        default: false,
        custom: true,
      },
      {
        title: "Custom",
        subTitle: "Requet a custom license",
        default: false,
        custom: true,
      },
      {
        title: "Custom",
        subTitle: "Requet a custom license",
        default: false,
        custom: true,
      },
    ];

    

</script>

<style lang="scss" scoped>
.dropzone{
  height: 150px;
}
</style>