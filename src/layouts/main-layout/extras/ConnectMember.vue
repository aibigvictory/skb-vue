<template>
  <!--begin::Chat drawer-->
  <div
    id="kt_drawer_chat"
    class="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-name="chat"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_drawer_chat_toggle"
    data-kt-drawer-close="#kt_drawer_chat_close"
  >
    <!--begin::Messenger-->
    <div class="card w-100" id="kt_drawer_chat_messenger">
      <!--begin::Card header-->
      <div class="card-header pe-5" id="kt_drawer_chat_messenger_header">
        <!--begin::Title-->
        <div class="card-title">
          <!--begin::User-->
          <div class="d-flex justify-content-center flex-column me-3">
            <a
              href="#"
              class="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1"
              >Today 접속회원</a
            >
          </div>
          <!--end::User-->
        </div>
        <!--end::Title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-icon-primary"
            id="kt_drawer_chat_close"
          >
            <span class="svg-icon svg-icon-2x">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body" id="kt_drawer_chat_messenger_body">
        <!--begin::Messages-->
        <div
          class="scroll-y me-n5 pe-5"
          data-kt-element="messages"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body"
          data-kt-scroll-offset="0px"
        >
          <template v-for="(item, index) in messages" :key="index">
            <Member
              :status="item.status"
              :name="item.name"
              :company="item.companyId ?store.getters.getData('company').find(con => con.id == item.companyId).name :''"
              :time="item.timestamp? item.timestamp.replace(/T/, ' ').replace(/\..+/, '').replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, '$1년 $2월 $3일 $4:$5') :''"
            ></Member>
          </template>
        </div>
        <!--end::Messages-->
      </div>
      <!--end::Card body-->

    </div>
    <!--end::Messenger-->
  </div>
  <!--end::Chat drawer-->
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Member from "@/components/connect-member/EachConnectMember.vue";
import { io } from "socket.io-client";
import axios from "axios";
import store from "@/store";


// interface KTMessage {
//   name?: string;
//   company: string;
//   time: string;
//   status: string;
// }

const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// const socket = io('/api');

// socket.on("connect", () => {
//   state.connected = true;
// });

// socket.on("disconnect", () => {
//   state.connected = false;
// });

// socket.on("foo", (...args) => {
//   state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });


const messages = ref([
  {
    name: "홍애리",
    company: "SKB",
    time: '',
    status: "being",
  },
]);

const load_connect = async () => {
  try{
    const { data } = await axios.get('/online')
  
    // console.log(data);
    if (typeof data === 'object') {
      messages.value = data;
    }
  }
  catch(error) {
    console.log(error);
  }
}

load_connect()
setInterval(() => load_connect(), 5000)

// setTimeout(() => {
  
//   messages.value = [
//     {
//       name: "아이유",
//       company: "SKB",
//       time: randomTime(),
//       status: "being",
//     },
//     {
//       name: "아이유",
//       company: "NS 쇼핑",
//       time: randomTime(),
//       status: "being",
//     },
//     {
//       name: "아이유",
//       company: "SKB",
//       time: randomTime(),
//       status: "being",
//     },
//     {
//       name: "아이유",
//       company: "NS 쇼핑",
//       time: randomTime(),
//       status: "out",
//     },
//     {
//       name: "아이유",
//       company: "SKB",
//       time: randomTime(),
//       status: "being",
//     },
//     {
//       name: "아이유",
//       company: "NS 쇼핑",
//       time: randomTime(),
//       status: "out",
//     },
//     {
//       name: "아이유",
//       company: "SKB",
//       time: randomTime(),
//       status: "being",
//     },
//   ]
// }, 5000)

</script>

<style lang="scss" scoped>
#kt_drawer_chat{
  z-index: 1500;
}
</style>