<template>
  <!--begin::Authentication Layout -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <!--begin::Body-->
    <div
      class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
    >
      <!--begin::Form-->
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <!--begin::Wrapper-->
        <div class="<?php echo $params['wrapperClass']?> p-10">
          <router-view></router-view>
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Form-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "bg-body");
    });

    onUnmounted(() => {
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "bg-body");
    });
  },
});
</script>
