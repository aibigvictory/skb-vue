<template>
  <h1 class="fz-20px text-dark fw-bold fs-3 container-fluid h-25px">{{title}}</h1>
  <div
    class="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end"
    :class="className"
    :style="{ backgroundColor: bgColor, backgroundImage: `url('${bgImage}')` }"
  >
    <div class="wrap">
      <ul>
        <li v-for="member in members" :key="member">
        <!-- <li v-for="member in members" :class="{off: !member.state}" :key="member"> -->
          <div class="circle">
            <!-- <svg v-if="member.state" xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
              <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
            </svg>
            <svg v-if="!member.state" xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
              <circle cx="5.5" cy="5" r="5" fill="#B5B5C3"/>
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
              <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
            </svg>
          </div>
          <div class="name">{{member.name}}</div>
          <div class="company">{{member.companyId ?store.getters.getData('company').find(con => con.id == member.companyId).name :''}}</div>
          <div class="date">{{member.timestamp? member.timestamp.replace(/T/, ' ').replace(/\..+/, '').replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, '$1년 $2월 $3일 $4:$5') :'2023년 00월 00일 00:00'}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import axios from "axios";
import { defineComponent, ref } from "vue";

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
  },

  setup() {
    const members = ref([
      {
        name: "홍애리",
        company: "SKB",
        timestamp: '',
        status: "being",
      },
    ])

    const load_connect = async () => {
      try{
        const { data } = await axios.get('/online')
  
        // console.log(data);
        if (typeof data === 'object') {
          members.value = data;
        }
      }
      catch(error) {
        console.log(error);
      }
    }

    load_connect()
    setInterval(() => load_connect(), 5000)

    return {members, store}
  }

});
</script>

<style lang="scss" scoped>
.wrap{
  margin: 20px;
  height: 100%;

  ul{
    margin: 0;padding: 0;
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      margin: 12px 0;

      &.off{
        .name{
          color: var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
        }
        .company{
          background: var(--data-bs-theme-light-bs-text-gray-200, #F1F1F2);
          color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
        }
        .date{
          color: var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
        }
      }

      .circle{
        display: flex;
        align-items: center;
        margin-right: 6px;
      }
      .name{
        color: var(--primary-text, #222);
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 16px */
        width: calc(72px - 10px - 6px);
      }
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
      .date{
        color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%; /* 14px */
      }
    }
  }
}
</style>