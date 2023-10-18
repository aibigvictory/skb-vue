<template>
    <div class="popup">
        <div class="popup-wrap">
            <div class="popup-header">
                <svg @click="emits('exit')" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <mask id="mask0_1032_13894" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
                <rect width="28" height="28" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1032_13894)">
                <path d="M14.0012 15.2287L8.08259 21.1473C7.92106 21.3088 7.71802 21.3915 7.47347 21.3952C7.22894 21.399 7.02217 21.3163 6.85316 21.1473C6.68412 20.9783 6.59961 20.7734 6.59961 20.5326C6.59961 20.2918 6.68412 20.0869 6.85316 19.9179L12.7717 13.9993L6.85316 8.08063C6.69161 7.91911 6.60897 7.71607 6.60524 7.47152C6.60149 7.22699 6.68412 7.02021 6.85316 6.8512C7.02217 6.68217 7.22707 6.59766 7.46787 6.59766C7.70867 6.59766 7.91358 6.68217 8.08259 6.8512L14.0012 12.7698L19.9198 6.8512C20.0813 6.68966 20.2844 6.60702 20.5289 6.60329C20.7735 6.59953 20.9802 6.68217 21.1493 6.8512C21.3183 7.02021 21.4028 7.22512 21.4028 7.46592C21.4028 7.70672 21.3183 7.91162 21.1493 8.08063L15.2307 13.9993L21.1493 19.9179C21.3108 20.0794 21.3934 20.2824 21.3972 20.527C21.4009 20.7715 21.3183 20.9783 21.1493 21.1473C20.9802 21.3163 20.7753 21.4008 20.5345 21.4008C20.2937 21.4008 20.0888 21.3163 19.9198 21.1473L14.0012 15.2287Z" fill="#222222"/>
                </g>
                </svg>
            </div>
            <div class="popup-section">
                <div class="content">
                    <p v-for="txt in content" :key="txt">{{txt}}</p>
                </div>
                <div v-if="danger" class="danger">{{danger}}</div>
            </div>
            <div class="popup-footer" v-if="btnCount == 2">
                <button class="popup-btn accept" @click="accept">확인</button>
                <button class="popup-btn" @click="emits('exit')">취소</button>
            </div>
            <div class="popup-footer" v-if="btnCount == 1">
                <button class="popup-btn accept" @click="accept">확인</button>
            </div>
            <!-- <div class="popup-footer" v-if="btn == 1">
                <button class="popup-btn accept">확인</button>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    content: Array,
    danger: String,
    btnCount: {
        type: Number,
        default: 2
    }
})
const emits = defineEmits([
    'accept',
    'exit',
])

const accept = () => {
    emits('accept')
    emits('exit')
}

</script>


<style lang="scss" scoped>
.popup{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    .popup-wrap{
        padding: 20px;
        background: #fff;
        width: 380px;
        border-radius: 8px;
        .popup-header{
            display: flex;
            justify-content: end;
            margin-bottom: 8px;
            svg{
                cursor: pointer;
            }
        }
        .popup-section{
            margin-bottom: 24px;
            .content{
                color: var(--primary-text, #222);
                text-align: center;
                font-size: 16px;
                font-weight: 400;
                margin-bottom: 8px;
            }
            .danger{
                color: var(--data-bs-theme-light-bs-red, #DC3545);
                text-align: center;
                font-size: 14px;
                font-weight: 400;
            }
        }
        .popup-footer{
            display: flex;
            justify-content: center;
            margin-bottom: 8px;
            .popup-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 125px;
                padding: 12px 26px;
                border: none;
                border-radius: 6px;
                background: var(----el-color-info-light-8, #E9E9EB);
                margin: 0 4px;
                &.accept{
                    color: #fff;
                    background: var(--root-data-theme-light-kt-primary-active, #0095E8);
                }
            }
        }
    }
}
</style>