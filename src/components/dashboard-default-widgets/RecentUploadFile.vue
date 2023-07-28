<template>
  <h1 class="text-dark fw-bold fs-3 container-fluid h-25px">{{title}}</h1>
  <div
    class="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end"
    :class="className"
    :style="{ backgroundColor: bgColor, backgroundImage: `url('${bgImage}')` }"
  >
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <div>
        <div class="circle">
          <div class="img">
            <img src="@/assets/img/excel.png" alt="">
          </div>
        </div>
      </div>

      <div>
        <div class="one d-flex align-items-center">
          신해철 
          <span class="badge bg-primary ms-3">SKB</span>
        </div>
        <div class="two">2023년 6월 23일 17:25</div>
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body d-flex align-items-end pt-0">
      <div class="content">
        <div class="title">asdasdasdasdasdasd</div>
        <div class="tag"><span class="badge bg-primary">SKB</span></div>
      </div>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "default-dashboard-widget-1",
  components: {},
  props: {
    className: { type: String, required: false },
    bgColor: { type: String, required: false, default: "#080655" },
    bgImage: { type: String, required: false },
    description: { type: String, required: true },
    title: { type: String, required: false },
  },
});
</script>

<style lang="scss" scoped>
.h-md-90{
  height: 90% !important;
}
</style>

<style lang="scss" scoped>
.circle{
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  background: #EEE;
  border-radius: 50%;
}
</style>