<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
    id="kt_app_sidebar_footer"
  >
    <!-- <a
      href="https://preview.keenthemes.com/metronic8/vue/docs/#/doc-overview"
      class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
      data-bs-toggle="tooltip"
      data-bs-trigger="hover"
      data-bs-dismiss-="click"
      title="200+ in-house components and 3rd-party plugins"
    >
      <span class="btn-label">Docs &amp; Components</span>
      <span class="svg-icon btn-icon svg-icon-2 m-0">
        <inline-svg src="media/icons/duotune/general/gen005.svg" />
      </span>
    </a> -->
    <div class="d-flex flex-center w-100">
        <!-- class="btn btn-primary er fs-6 px-8 py-4" -->
      <button
        type="button"
        class="btn-upload"
        data-bs-toggle="modal"
        :data-bs-target="`#kt_modal_file_upload`"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <mask id="mask0_226_931" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white"/>
        </mask>
        <g mask="url(#mask0_226_931)">
        <path d="M6.3077 19.5C5.80257 19.5 5.375 19.325 5.025 18.975C4.675 18.625 4.5 18.1974 4.5 17.6923V15.7308C4.5 15.5179 4.5718 15.3397 4.7154 15.1962C4.85898 15.0526 5.03718 14.9808 5.25 14.9808C5.46282 14.9808 5.64102 15.0526 5.7846 15.1962C5.92818 15.3397 5.99997 15.5179 5.99997 15.7308V17.6923C5.99997 17.7692 6.03202 17.8397 6.09612 17.9039C6.16024 17.968 6.23077 18 6.3077 18H17.6922C17.7692 18 17.8397 17.968 17.9038 17.9039C17.9679 17.8397 18 17.7692 18 17.6923V15.7308C18 15.5179 18.0718 15.3397 18.2154 15.1962C18.3589 15.0526 18.5371 14.9808 18.75 14.9808C18.9628 14.9808 19.141 15.0526 19.2845 15.1962C19.4281 15.3397 19.5 15.5179 19.5 15.7308V17.6923C19.5 18.1974 19.325 18.625 18.975 18.975C18.625 19.325 18.1974 19.5 17.6922 19.5H6.3077ZM11.25 7.38843L9.32692 9.3115C9.17821 9.46022 9.00161 9.53362 8.79712 9.5317C8.59264 9.52977 8.41283 9.45124 8.2577 9.29613C8.11283 9.14099 8.03784 8.96536 8.03272 8.76923C8.02759 8.57308 8.10258 8.39744 8.2577 8.2423L11.3673 5.13273C11.4609 5.03915 11.5596 4.97312 11.6634 4.93465C11.7673 4.89619 11.8795 4.87695 12 4.87695C12.1205 4.87695 12.2327 4.89619 12.3365 4.93465C12.4403 4.97312 12.5391 5.03915 12.6327 5.13273L15.7422 8.2423C15.891 8.39102 15.9644 8.56505 15.9624 8.7644C15.9605 8.96375 15.8871 9.14099 15.7422 9.29613C15.5871 9.45124 15.4089 9.53137 15.2077 9.5365C15.0064 9.54164 14.8282 9.46664 14.673 9.3115L12.7499 7.38843V15.0385C12.7499 15.2513 12.6782 15.4295 12.5346 15.5731C12.391 15.7167 12.2128 15.7885 12 15.7885C11.7872 15.7885 11.609 15.7167 11.4654 15.5731C11.3218 15.4295 11.25 15.2513 11.25 15.0385V7.38843Z" fill="white"/>
        </g>
        </svg>
        Excel Upload
      </button>
      <button
        type="button"
        class="btn-upload2"
        data-bs-toggle="modal"
        :data-bs-target="`#kt_modal_file_upload`"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="46" viewBox="0 0 44 46" fill="none">
          <g filter="url(#filter0_d_1032_16545)">
            <mask id="mask0_1032_16545" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="7" width="28" height="28">
              <rect x="8" y="7" width="28" height="28" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_1032_16545)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8574 10.3711C14.3051 10.3711 13.8574 10.8188 13.8574 11.3711V30.2012C13.8574 30.7535 14.3051 31.2012 14.8574 31.2012H21.6843C21.2758 30.3094 21.0481 29.3175 21.0481 28.2724C21.0481 24.3836 24.2005 21.2312 28.0893 21.2312C30.2719 21.2312 32.2225 22.2243 33.514 23.7832V11.3711C33.514 10.8188 33.0663 10.3711 32.514 10.3711H14.8574Z" fill="#ECEFF1"/>
              <rect x="22.4375" y="12.4453" width="8.75" height="1.55556" rx="0.777778" fill="#13A650"/>
              <rect x="22.4375" y="15.6523" width="8.75" height="1.55556" rx="0.777778" fill="#13A650"/>
              <rect x="22.4375" y="18.7148" width="8.75" height="1.55556" rx="0.777778" fill="#13A650"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6109 9.74847C10.1172 9.81783 9.75 10.2402 9.75 10.7387V31.128C9.75 31.6265 10.1172 32.0489 10.6109 32.1182L23.9883 33.9975C22.2074 32.7198 21.0472 30.6317 21.0472 28.2726C21.0472 24.7333 23.6585 21.804 27.0596 21.306V8.58807C27.0596 7.98046 26.5221 7.51327 25.9204 7.5978L10.6109 9.74847Z" fill="#13A650"/>
              <circle cx="28.3833" cy="28.5649" r="5.86765" fill="#13A650"/>
              <path d="M28.9698 31.4993C28.9698 31.8234 28.7071 32.0861 28.383 32.0861C28.059 32.0861 27.7963 31.8234 27.7963 31.4993V27.0483L26.4509 28.3937C26.2217 28.6228 25.8502 28.6228 25.6211 28.3937C25.3919 28.1645 25.3919 27.793 25.6211 27.5638L27.9681 25.2168C28.1973 24.9876 28.5688 24.9876 28.7979 25.2168L31.145 27.5638C31.3742 27.793 31.3742 28.1645 31.145 28.3937C30.9159 28.6228 30.5443 28.6228 30.3152 28.3937L28.9698 27.0483V31.4993Z" fill="white"/>
              <mask id="mask1_1032_16545" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="13" y="17" width="8" height="8">
                <path d="M13.8979 18.316C13.8979 17.7826 14.3167 17.3431 14.8495 17.3172L19.8522 17.0743C20.4229 17.0466 20.9007 17.5018 20.9007 18.0732V23.7923C20.9007 24.3636 20.4229 24.8188 19.8522 24.7911L14.8495 24.5483C14.3167 24.5224 13.8979 24.0829 13.8979 23.5495V18.316Z" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask1_1032_16545)">
                <path d="M15.7483 17.1191L17.3466 19.7426H17.4006L19.0097 17.1191H20.8456L18.4589 20.9331L20.8996 24.7471H19.0205L17.4006 22.1237H17.3466L15.7267 24.7471H13.8584L16.3099 20.9331L13.9016 17.1191H15.7483Z" fill="white"/>
              </g>
            </g>
          </g>
          <defs>
            <filter id="filter0_d_1032_16545" x="0.75" y="0.587891" width="42.501" height="44.8438" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="4.5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1032_16545"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1032_16545" result="shape"/>
            </filter>
          </defs>
        </svg>
      </button>
    </div>
  </div>
  <!--end::Footer-->

</template>

<script setup>

</script>

<style lang="scss" scoped>
.btn-upload{
  display: flex;
  padding: 5px 26.5px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none;
  border-radius: 8px;
background: var(--root-bs-green, #198754);

color: var(--default-white, #FFF);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 16px */
}
.btn-upload2{
  // display: flex;
  display: none;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background: #198754;
  border: none;
  svg{
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.12);
  }
}
</style>
