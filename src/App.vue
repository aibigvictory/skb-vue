<template>
  <router-view />
  <!--  -->
  <FileUploadVue/>
  <!--  -->
  <Popup v-if="state.popup.toggle" @accept="state.popup.accept" @exit="state.popup.toggle = false" :content="state.popup.content" :btnCount="state.popup.btnCount"/>
</template>

<script setup lang="ts">
import FileUploadVue from "@/components/modals/general/FileUploadModal.vue";
import Popup from '@/components/Popup.vue'

import { defineComponent, nextTick, onMounted } from "vue";
import { useStore } from "vuex";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import { config, layout, themeMode } from "@/core/helpers/config";
import { initializeComponents } from "@/core/plugins/keenthemes";

import axios from "axios";
import JwtService from "./core/services/JwtService";
import router from "./router";

const store = useStore();
const state = store.state

const checkTokenExp = () => {
  const decode = JwtService.decode(JwtService.getToken())
  const now = new Date()
  const exp = new Date(Number(decode.exp + '000'))

  console.log('decode');
  console.log(decode);
  

  if (!decode && now > exp) {
    router.push({name: "sign-in"})
    JwtService.destroyToken()
  }
  else{
    console.log('clear');
  }
}

setInterval(() => checkTokenExp, 5000)
checkTokenExp()

const init = async () => {
  const { data } = await axios.post('/folder/list', {
    type: 'manage'
  })

  // folderList.value = data

  // console.log(folderList.value);

  store.state.folderList.manage = data
}

init()

onMounted(() => {
  config.value.sidebar.default.menu.iconType = "svg"

  store.commit(Mutations.SET_LAYOUT_CONFIG_PROPERTY, {
    property: "general.mode",
    value: 'light',
  });
  store.dispatch(Actions.SET_THEME_MODE_ACTION, 'light');

  // save new config to localStorage
  localStorage.setItem("config", JSON.stringify(config.value));

  // console.log(localStorage.getItem("config"));

  /**
   * Overrides the layout config using saved data from localStorage
   * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
   */
  store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);

  /**
   *  Sets a mode from configuration
   */
  store.dispatch(Actions.SET_THEME_MODE_ACTION, themeMode.value);

  nextTick(() => {
    initializeComponents();

    store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
  });
});
</script>

<style lang="scss">
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "~apexcharts/dist/apexcharts.css";
@import "~quill/dist/quill.snow.css";
@import "~animate.css";
@import "~sweetalert2/dist/sweetalert2.css";
@import "~nouislider/distribute/nouislider.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~socicon/css/socicon.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "~dropzone/dist/dropzone.css";
@import "~@vueform/multiselect/themes/default.css";
@import "~prism-themes/themes/prism-shades-of-purple.css";
@import "~element-plus/dist/index.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";

//RTL version styles
//@import "assets/css/style.rtl.css";

* {
  font-family: Pretendard !important;
}

#app {
  display: contents;
}
.text-left{
  text-align: left !important;
}
img{
  width: 100%;
  height: 100%;
}
.vh-40{
  height: 40vh;
}
.fz-20px{
  font-size: 20px !important;
}
.fz-14px{
  font-size: 14px !important;
}
.fw-500{
  font-weight: 500 !important;
}
.fw-700{
  font-weight: 700 !important;
}
.fw-800{
  font-weight: 800 !important;
}
.fw-900{
  font-weight: 900 !important;
}
.h-md-80{
  height: 80% !important;
}
.h-md-90{
  height: 90% !important;
}
.overflow-y-scroll{
  overflow-y: scroll;
}

.luckysheet-sheet-area{
  // position: fixed;
}
.luckysheet_info_detail{
  display: none !important;
}

// table{
//   table-layout: fixed !important;
// }
// th, td {
//   width: auto !important;
// }
// .tui-grid-body-area{
//   height: auto !important;
// }
.tui-grid-cell-content{
  text-align: center;
}
// .tui-grid-cell-header{
//   word-break: keep-all;
// }
.tui-grid-header-area{
  height: auto !important;

  .tui-grid-cell{
    background: #FAFAFA;
    border: 1px solid #EEE;

  }
}

.tui-grid-cell{
    white-space: normal !important;
    border: 1px solid #EEE !important;
    .tui-grid-cell-content {
      word-break: normal;
      padding: 0 !important;
    }
    min-width: 70px !important;
}

// .tui-grid-body-container{
//   height: auto !important;
//   .tui-grid-table-container{
//     position: relative !important;
//   }
// }

// .tui-grid-table-container{
//   .tui-grid-table{
//     width: 100%;
//     colgroup{
//       display: none;
//       width: 100%;
//       col{
//         width: 100px !important;
//       }
//     }
//   }

// }
// // .tui-grid-body-container{
// //   height: auto !important;
  
//   .tui-grid-table-container{
//     position: relative !important;

//     .tui-grid-cell{
//       white-space: normal;
//     }
//   }
// }
// .tui-grid-body-area{
//   height: auto !important;

//   .tui-grid-body-container{
//     height: 100% !important;

//     .tui-grid-table-container{
//       position: relative;
//       // height: 100%;
//     }

//     .tui-grid-layer-focus{
//       height: 100%;

//       .tui-grid-layer-focus-border{
//         &:nth-child(1) {
//           height: 100% !important;
//         }
//         &:nth-child(3) {
//           height: 100% !important;
//         }
//         &:nth-child(4) {
//           top: auto !important;
//           bottom: 0 !important;
//         }
//       }
//     }
    .tui-grid-layer-editing{
      // height: 100% !important;
      // line-height: normal !important;

      textarea{
        // line-height: normal;
        text-align: center;
        padding: 0;
      }
    //   height: calc(100% - 4px) !;
      // line-height: normal
    }
//     .tui-grid-layer-selection{
//       height: 100% !important;
//     }
//   }
// }

#tip {
  position: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  img{
    margin-bottom: 30px;
    height: 30px !important;
    width: auto;
  }

  span{
    margin-top: 20px;
    position: relative;
    font-size: 12px;
    color: #5E6278;
    transition: none !important;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }

  #loading {
    // display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  }

  @keyframes spinner {
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
  }

  #loading .spinner {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: #f19022;
    border-bottom-color: #f19022;
    animation: spinner .8s ease infinite;
  }
}


</style>
