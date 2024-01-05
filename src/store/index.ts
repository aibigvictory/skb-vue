import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import ThemeModeModule from "@/store/modules/ThemeModeModule";
import DataModule from "@/store/modules/DataModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ThemeModeModule,
    DataModule,
  },

  state: {
    upload: 0,
    minimize: false,
    folderList: {
      manage: [],
      etc: [],
    },
    search: {
      keyword: '',
      folderCd: '',
      reload: 0,
    },
    popup: {
      toggle: false,
      accept: null,
      content: [],
      btnCount: 1
    },
    notice: {
      toggle: true
    }
    // luckysheet: {
    //   data: null,
    //   modal: {
    //     toggle: false,
    //   }
    // }
  }
});

export default store;
