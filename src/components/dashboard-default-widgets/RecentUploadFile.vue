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
          {{user}} 
          <span class="company ms-3">{{team}}</span>
        </div>
        <div class="two">{{date.replace(/T/, ' ').replace(/\..+/, '').replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, '$1년 $2월 $3일 $4:$5')}}</div>
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body">
      <div class="content">
        <div class="title" @click="file_click(id)">{{file}}</div>
        <!-- <div class="tag"><span class="badge bg-primary" v-if="true">Today</span></div> -->
        <div class="tag"><span class="badge bg-primary" v-if="date.slice(0,10) == new Date().toISOString().slice(0,10)">Today</span></div>
        <div class="tag"><span class="badge bg-primary opacity" v-if="date.slice(0,10) != new Date().toISOString().slice(0,10)">Today</span></div>
      </div>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "default-dashboard-widget-1",
  components: {},
  props: {
    className: { type: String, required: false },
    bgColor: { type: String, required: false, default: "#080655" },
    bgImage: { type: String, required: false },
    title: { type: String, required: false },
    user: { type: String, required: false },
    file: { type: String, required: false },
    date: { type: String, required: false },
    name: { type: String, required: false },
    team: { type: String, required: false },
    id: { type: Number, required: true },
  },
  setup() {
    const file_click = (id, name, user, team, date, cate) => {
        // console.log(id, name, user, team, date, cate);
        localStorage.setItem('id', id)
        // localStorage.setItem('name', name)
        // localStorage.setItem('user', user)
        // localStorage.setItem('team', team)
        // localStorage.setItem('date', date)
        // localStorage.setItem('cate', cate)

        router.push({ name: "excel" });
    }

    return {
      file_click
    }
  }
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
    padding: 4px 8px;
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
    display: flex;
    justify-content: space-between;
    width: 190px;
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
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  // margin-top: 30px;
  .title{
    cursor: pointer;
    // padding-top: 20px;
    width: 100%;
    // margin-top: 40px;
    // height: 100px;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // display: flex;
    // align-items: center;

    color: var(--primary-text, #222);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
  .tag{
    // padding-top: 10px;
    .badge{
      display: inline-flex;
      padding: 6.777px 9.035px;
      justify-content: center;
      align-items: center;
      gap: 9.035px;
      border-radius: 4.518px;
      background: var(--data-bs-theme-light-bs-info, #7239EA) !important;
      &.opacity{
        opacity: 0;
      }
    }
  }
}
</style>