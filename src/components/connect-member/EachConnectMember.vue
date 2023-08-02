<template>
  <div class="d-flex justify-content-start mb-5">
    <!--begin::Wrapper-->
    <div class="d-flex flex-column align-items-start">
      <!--begin::User-->
      <div class="d-flex align-items-center">
        <div class="h-100 d-flex align-items-center">
          <i class="fa fa-circle" :class="status" aria-hidden="true"></i>
        </div>
        <!--begin::Details-->
        <div class="name w-60px fw-bold text-left ms-3" :class="status">
          {{ name }}
        </div>
        <!--end::Details-->
        <!--begin::Details-->
        <div class="w-100px badge rounded-pill bg-primary text-center d-inline" :class="status">
          {{ company }}
        </div>
        <!--end::Details-->
        <!--begin::Details-->
        <div class="ms-8" :class="status">
          {{ time }}
        </div>
        <!--end::Details-->
      </div>
      <!--end::User-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

const props = defineProps({
  name: String,
  company: String,
  time: String,
  status: String,
})
</script>

<style scoped>
.fa-circle.being {
  color: #44eb3e;
}
.out {
  opacity: 0.5;
}
.badge.out {
  background: #666 !important;
}
.name {
  font-size: 14px !important;
}
</style>