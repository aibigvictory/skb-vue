import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export interface DataInfo {
  data: {
    company: Array<any>;
    folder_manage: Array<any>;
    folder_etc: Array<any>;
    folder_all: Array<any>;
    connect_user: Array<any>
  };
}

@Module
export default class DataModule extends VuexModule implements DataInfo {
  data = {
    company: [],
    folder_manage: [],
    folder_etc: [],
    folder_all: [],
    connect_user: [],
  };

  /**
   * Get current page title
   * @returns string
   */
  get getData() {
    return (name) => {
      if (typeof name !== "undefined") {
        return this.data[name];
      }
      return this.data;
    };
  }

  @Mutation
  [Mutations.SET_DATA](payload) {
    const { name, data } = payload;
    
    this.data[name] = data
  }

  // @Action
  // [Actions.ADD_CLASSNAME](payload) {
  //   this.context.commit(Mutations.SET_CLASSNAME_BY_POSITION, payload);
  // }

  @Action
  [Actions.GET_DATA_TO_SERVER](payload) {
    const { name, url, pay } = payload

    ApiService.setHeader();
    ApiService.get(url, pay)
      .then(({ data }) => {
        console.log(data);
        
        if (name) this.context.commit(Mutations.SET_DATA, {name, data});
      })
      .catch(({ response }) => {
        console.log(response);
      });

  }

  @Action
  [Actions.POST_DATA_TO_SERVER](payload) {
    const { name, url, pay } = payload

    ApiService.setHeader();
    ApiService.post(url, pay)
      .then(({ data }) => {
        console.log(data);
        
        if (name) this.context.commit(Mutations.SET_DATA, {name, data});
      })
      .catch(({ response }) => {
        console.log(response);
      });

  }
}
