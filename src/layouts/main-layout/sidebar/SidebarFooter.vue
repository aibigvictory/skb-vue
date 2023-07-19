<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
    id="kt_app_sidebar_footer"
  >
    <!-- <a
      href="https://preview.keenthemes.com/metronic8/vue/docs/#/doc-overview"
      class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
      data-bs-toggle="tooltip"
      data-bs-trigger="hover"
      data-bs-dismiss-="click"
      title="200+ in-house components and 3rd-party plugins"
    >
      <span class="btn-label">Docs &amp; Components</span>
      <span class="svg-icon btn-icon svg-icon-2 m-0">
        <inline-svg src="media/icons/duotune/general/gen005.svg" />
      </span>
    </a> -->
    <div class="d-flex flex-center w-100">
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        :data-bs-target="`#kt_modal_file_upload`"
      >
        Excel Upload
      </button>
    </div>
  </div>
  <!--end::Footer-->

</template>

<script setup>

</script>
