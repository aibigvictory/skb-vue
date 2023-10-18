<template>
    <!-- <div class="more-wrap" @click.stop.prevent="more = false"> -->
    <div class="more-wrap">
        <div class="file-revision">
            <div class="close">
                <svg @click="emits('exit')" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <mask id="mask0_407_23058" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                <rect x="0.5" y="0.5" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_407_23058)">
                <path d="M12.5005 13.5543L7.42737 18.6274C7.28892 18.7658 7.11489 18.8367 6.90527 18.8399C6.69567 18.8431 6.51844 18.7723 6.37357 18.6274C6.22869 18.4825 6.15625 18.3069 6.15625 18.1005C6.15625 17.8941 6.22869 17.7184 6.37357 17.5736L11.4466 12.5005L6.37357 7.42737C6.23511 7.28892 6.16427 7.11489 6.16107 6.90527C6.15786 6.69568 6.22869 6.51844 6.37357 6.37357C6.51844 6.22869 6.69407 6.15625 6.90047 6.15625C7.10687 6.15625 7.28251 6.22869 7.42737 6.37357L12.5005 11.4466L17.5736 6.37357C17.712 6.23511 17.8861 6.16427 18.0957 6.16107C18.3053 6.15786 18.4825 6.22869 18.6274 6.37357C18.7723 6.51844 18.8447 6.69407 18.8447 6.90047C18.8447 7.10687 18.7723 7.28251 18.6274 7.42737L13.5543 12.5005L18.6274 17.5736C18.7658 17.712 18.8367 17.8861 18.8399 18.0957C18.8431 18.3053 18.7723 18.4825 18.6274 18.6274C18.4825 18.7723 18.3069 18.8447 18.1005 18.8447C17.8941 18.8447 17.7184 18.7723 17.5736 18.6274L12.5005 13.5543Z" fill="black"/>
                </g>
                </svg>
            </div>
            <div class="title">즐겨찾기</div>
            <div class="content">
                <div class="file-name">[HD방송] 2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 </div>
                <ul class="revision-list">
                    <li v-for="tmp in 100" :key="tmp">
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits([
    'exit',
])

</script>

<style lang="scss" scoped>
.more-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: rgba(0,0,0,0.3);

    display: flex;
    align-items: center;
    justify-content: center;
    .file-revision{
        width: 439px;
        background: #fff;
        padding: 24px;
        .close{
            cursor: pointer;
            text-align: right;
        }
        .title{
            display: flex;
            justify-content: center;
            color: #000;
            font-size: 18px;
            font-weight: 500;
            // padding-bottom: 16px;
            // border-bottom: 1px solid var(----kt-border-color, #EFF2F5);
        }
        .content{
            margin-top: 20px;
            .file-name{
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                text-align: center;
                padding: 10px 40px;
                margin: 16px 0;
                color: #000;
                font-size: 16px;
                font-weight: 500;
                background: var(----kt-app-bg-color, #F5F8FA);
            }
            .revision-list{
                padding: 0 16px;
                margin-top: 8px;
                max-height: 300px;
                overflow-y: scroll;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 12px 10px;
                    margin-right: 20px;
                    .circle{
                        display: flex;
                        align-items: center;
                        margin-right: 6px;
                    }
                    .name{
                        color: #121212;
                        font-size: 16px;
                        font-weight: 500;
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
    }
}
</style>