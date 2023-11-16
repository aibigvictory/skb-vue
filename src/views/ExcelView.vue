<template>
    <div class="wrap">
        <div class="header">
            <div class="left">
                <div class="title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.51542 19.3034C4.03237 19.5517 3.48541 19.1178 3.58266 18.5634L4.61982 12.6516L0.216907 8.45578C-0.194569 8.06366 0.0184315 7.34671 0.569668 7.2684L6.69276 6.39856L9.42291 0.990381C9.66885 0.503206 10.3351 0.503206 10.581 0.990381L13.3111 6.39856L19.4342 7.2684C19.9855 7.34671 20.1985 8.06366 19.787 8.45578L15.3841 12.6516L16.4212 18.5634C16.5185 19.1178 15.9715 19.5517 15.4885 19.3034L10.002 16.4835L4.51542 19.3034Z" fill="#FFC700"/>
                    </svg>
                    <span>{{categoryName}}</span>
                    {{excelTitle}}
                </div>
                <div class="info">
            
                    <div class="date">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8.51496 1.01896C8.34401 1.00635 8.17225 1 8 1V0C8.19685 0 8.39314 0.00726199 8.58852 0.0216722L8.51496 1.01896ZM10.5193 1.46905C10.1985 1.34533 9.86912 1.2454 9.53371 1.17008L9.75282 0.194382C10.1361 0.280463 10.5126 0.394665 10.8792 0.536055L10.5193 1.46905ZM11.889 2.17971C11.7458 2.08402 11.5994 1.99388 11.4503 1.90939L11.9432 1.0393C12.1136 1.13586 12.2809 1.23888 12.4446 1.34824C12.6082 1.4576 12.7674 1.5727 12.9219 1.69322L12.3066 2.48158C12.1715 2.37612 12.0322 2.27541 11.889 2.17971ZM13.7231 3.96934C13.5252 3.68829 13.3068 3.42218 13.0697 3.17321L13.794 2.48368C14.0649 2.76821 14.3145 3.07233 14.5407 3.39353L13.7231 3.96934ZM14.4672 5.32122C14.4012 5.16208 14.3296 5.00583 14.2526 4.85271L15.1458 4.40311C15.2339 4.5781 15.3157 4.75667 15.391 4.93853C15.4664 5.12039 15.5348 5.30453 15.5962 5.49054L14.6467 5.80423C14.5929 5.64147 14.5331 5.48035 14.4672 5.32122ZM14.9979 7.82822C14.9895 7.48455 14.9557 7.14197 14.8969 6.80326L15.8822 6.63231C15.9494 7.01939 15.988 7.41092 15.9976 7.80367L14.9979 7.82822ZM14.8655 9.36563C14.8991 9.1967 14.9264 9.02699 14.9474 8.85687L15.9398 8.97929C15.9159 9.17372 15.8847 9.36766 15.8463 9.56072C15.8079 9.75378 15.7625 9.94489 15.7102 10.1337L14.7464 9.867C14.7922 9.70179 14.8319 9.53457 14.8655 9.36563ZM13.914 11.745C14.0979 11.4546 14.2602 11.151 14.3995 10.8367L15.3137 11.2419C15.1545 11.6011 14.969 11.9481 14.7588 12.28L13.914 11.745ZM12.9497 12.9497C13.0715 12.828 13.1885 12.702 13.3005 12.5722L14.0577 13.2254C13.9297 13.3737 13.796 13.5177 13.6569 13.6569L12.9497 12.9497Z" fill="white"/>
                        <path d="M8 1C6.84885 1 5.71545 1.2839 4.70022 1.82655C3.68499 2.3692 2.81926 3.15386 2.17971 4.11101C1.54017 5.06816 1.14654 6.16827 1.03371 7.31388C0.920876 8.45949 1.09232 9.61525 1.53285 10.6788C1.97337 11.7423 2.66939 12.6808 3.55925 13.4111C4.44911 14.1414 5.50533 14.6409 6.63437 14.8655C7.76341 15.0901 8.93041 15.0327 10.032 14.6986C11.1336 14.3644 12.1358 13.7637 12.9497 12.9497L13.6569 13.6569C12.7266 14.5871 11.5812 15.2736 10.3223 15.6555C9.06332 16.0374 7.72961 16.1029 6.43928 15.8463C5.14895 15.5896 3.94183 15.0187 2.92486 14.1841C1.90788 13.3495 1.11243 12.2769 0.608966 11.0615C0.105504 9.846 -0.0904279 8.52514 0.0385242 7.21586C0.167476 5.90659 0.617333 4.64933 1.34825 3.55544C2.07916 2.46155 3.06857 1.5648 4.22883 0.94463C5.38909 0.324457 6.68439 0 8 0V1Z" fill="white"/>
                        <path d="M7.5 3C7.77614 3 8 3.22386 8 3.5V8.70984L11.2481 10.5659C11.4878 10.7029 11.5711 11.0083 11.4341 11.2481C11.2971 11.4878 10.9917 11.5711 10.7519 11.4341L7.25193 9.43412C7.09615 9.3451 7 9.17943 7 9V3.5C7 3.22386 7.22386 3 7.5 3Z" fill="white"/>
                        </svg>
                        마지막 수정일자:
                        <span>{{excelUpdateddAt.replace(/T/, ' ').replace(/\..+/, '').replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, '$1년 $2월 $3일 $4:$5')}}</span>
                    </div>
                    <div class="user">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <mask id="mask0_1060_5221" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1060_5221)">
                            <path d="M9.5835 9.32006C8.78142 9.32006 8.0948 9.02696 7.52361 8.44076C6.95243 7.85455 6.66684 7.14985 6.66684 6.32667C6.66684 5.50347 6.95243 4.79878 7.52361 4.21257C8.0948 3.62636 8.78142 3.33325 9.5835 3.33325C10.3856 3.33325 11.0722 3.62636 11.6434 4.21257C12.2146 4.79878 12.5002 5.50347 12.5002 6.32667C12.5002 7.14985 12.2146 7.85455 11.6434 8.44076C11.0722 9.02696 10.3856 9.32006 9.5835 9.32006ZM14.5675 15.8333H4.5995C4.24801 15.8333 3.94914 15.7069 3.70289 15.4541C3.45663 15.2014 3.3335 14.8947 3.3335 14.5339V13.9319C3.3335 13.5131 3.44434 13.1252 3.66604 12.7683C3.88772 12.4114 4.18392 12.137 4.55465 11.9451C5.37837 11.5306 6.2093 11.2198 7.04745 11.0126C7.88559 10.8053 8.73094 10.7017 9.5835 10.7017C10.4361 10.7017 11.2814 10.8053 12.1195 11.0126C12.9577 11.2198 13.7886 11.5306 14.6123 11.9451C14.9831 12.137 15.2793 12.4114 15.501 12.7683C15.7226 13.1252 15.8335 13.5131 15.8335 13.9319V14.5339C15.8335 14.8947 15.7104 15.2014 15.4641 15.4541C15.2178 15.7069 14.919 15.8333 14.5675 15.8333ZM4.58348 14.5504H14.5835V13.9319C14.5835 13.7587 14.5346 13.5983 14.4369 13.4509C14.3391 13.3034 14.2064 13.183 14.0386 13.0898C13.3207 12.7269 12.5886 12.4519 11.8424 12.265C11.0962 12.078 10.3432 11.9846 9.5835 11.9846C8.82374 11.9846 8.07077 12.078 7.32457 12.265C6.57837 12.4519 5.8463 12.7269 5.12836 13.0898C4.96062 13.183 4.82788 13.3034 4.73013 13.4509C4.63236 13.5983 4.58348 13.7587 4.58348 13.9319V14.5504ZM9.5835 8.03721C10.0418 8.03721 10.4342 7.86972 10.7606 7.53474C11.087 7.19976 11.2502 6.79707 11.2502 6.32667C11.2502 5.85627 11.087 5.45358 10.7606 5.1186C10.4342 4.78362 10.0418 4.61613 9.5835 4.61613C9.12516 4.61613 8.7328 4.78362 8.40641 5.1186C8.08002 5.45358 7.91682 5.85627 7.91682 6.32667C7.91682 6.79707 8.08002 7.19976 8.40641 7.53474C8.7328 7.86972 9.12516 8.03721 9.5835 8.03721Z" fill="#F1FAFF"/>
                        </g>
                        </svg>
                        <span>{{excelUploader}}({{excelUploaderTeam}})</span>
                    </div>
                </div>
                
            </div>
            <div class="right">
                <div class="btn btn-save" @click="save_excel">저장하기</div>
                <div class="btn btn-download" @click="download_excel">다운로드</div>
            </div>
            <!-- <div class="title">{{localStorage.getItem('user')}}</div> -->
        </div>
        <LuckySheet ref="child" :excelName="excelTitle" :excelId="excelId"/>    
    </div>
</template>

<script setup lang="ts">
import LuckySheet from '@/components/lucky-sheet/LuckySheet.vue'
import { ref } from 'vue'

setInterval(() => {
    if (excelId.value != Number(localStorage.getItem('id'))) {
        excelId.value = Number(localStorage.getItem('id'))

        excelTitle.value = localStorage.getItem('name')
        excelUploader.value = localStorage.getItem('user')
        excelUploaderTeam.value = localStorage.getItem('team')
        excelUpdateddAt.value = localStorage.getItem('date')
        categoryName.value = localStorage.getItem('cate')
    }
}, 100)

const excelId = ref(Number(localStorage.getItem('id')))
const excelTitle = ref(localStorage.getItem('name'))
const excelUploader = ref(localStorage.getItem('user'))
const excelUploaderTeam = ref(localStorage.getItem('team'))
const excelUpdateddAt = ref(localStorage.getItem('date'))
const categoryName = ref(localStorage.getItem('cate'))

const child: any = ref(null)
const save_excel = () => {
    child.value.saveExcel();
}
const download_excel = () => {
    child.value.downloadExcel();
}


</script>

<style lang="scss" scoped>
.wrap{
    margin: 48px 0;
    padding: 0 30px;
    background: #fff;
    .header{
        padding-top: 24px;
        display: flex;
        justify-content: space-between;
        .left{
            .title{
                display: flex;
                align-items: center;
                margin-bottom: 8px;
    
                color: var(--primary-text, #222);
                font-size: 20px;
                font-weight: 700;
                span{
                    padding: 6px 10px;
                    margin: 0 8px;
                    border-radius: 25px;
                    background: var(--data-bs-theme-light-bs-info, #7239EA);
    
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--default-white, #FFF);
                }
            }
            .info{
                margin-left: 28px;
                display: flex;
                div{
                    padding: 0 6px;
                    border-radius: 4px;
                    background: var(----kt-form-select-color, #5E6278);
                    margin-right: 6px;
    
                    color: var(----kt-primary-light, #F1FAFF);
                    font-size: 14px;
                    font-weight: 400;
                    span{
                        font-weight: 500;
                    }
                    // color: rgba(241, 250, 255, 1);
                    &.date{
                        svg{
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
        .right{
            display: flex;
            .btn{
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;

                width: 140px;
                height: 38px;
                border-radius: 6px;
                margin-left: 10px;
                
                color: #fff;
                font-size: 14px;
                font-weight: 700;

                &.btn-save{
                    background: var(--default-red, #DA1E28);
                }
                &.btn-download{
                    background: var(--default-red, #0095e8);
                }
            }
        }
    }
}
.div{
    margin: 0 -30px 0 -30px;
}
</style>
