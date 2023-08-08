<template>
  <h1 class="fz-20px text-dark fw-bold fs-3 container-fluid h-25px">{{title}}</h1>
  <div
    class="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end"
    :class="className"
    :style="{ backgroundColor: bgColor, backgroundImage: `url('${bgImage}')` }"
  >
    <!--begin::Header-->
    <div class="card-header pt-5 d-flex align-items-center">
      <!--begin::Title-->
      <div>
        <div class="circle">
          <div class="img">
            <img src="@/assets/img/group32.svg" alt="">
          </div>
        </div>
      </div>

      <div class="name-date">
        <div class="one d-flex align-items-center">
          신해철 
          <span class="company ms-3">SKB</span>
        </div>
        <div class="two">{{date}}</div>
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body d-flex align-items-end pt-0">
      <div class="content">
        <div class="title">{{file}}</div>
        <div v-if="file!='다이렉트 HD방송_IPto8VSB_채널라인업'">ㅤ</div>
        <div class="tag"><span class="badge bg-primary" v-if="file=='다이렉트 HD방송_IPto8VSB_채널라인업'">Today</span></div>
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
    user: { type: String, required: false },
    file: { type: String, required: false },
    date: { type: String, required: false },
  },
});
</script>

<style lang="scss" scoped>

.circle{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  background: #EEE;
  border-radius: 50%;
}
.name-date{
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 7.906px;

  .company{
    display: flex;
    width: 78px;
    padding: 4px 0px;
    margin: 0 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 21px;
    background: var(--data-bs-theme-light-bs-danger-light, #FFF5F8);

    color: var(--data-bs-theme-light-bs-danger, #F1416C);
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 13px */
  }

  .one{
    color: var(--primary-text, #222);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 18px */
  }
  .two{
    color: #58595D;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 14px */
  }
}
.content{
  .title{
    color: var(--primary-text, #222);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 22.4px */

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tag{
    margin-top: 10px;
    .badge{
      display: inline-flex;
      padding: 6.777px 9.035px;
      justify-content: center;
      align-items: center;
      gap: 9.035px;
      border-radius: 4.518px;
      background: var(--data-bs-theme-light-bs-info, #7239EA) !important;
    }
  }
}
</style>