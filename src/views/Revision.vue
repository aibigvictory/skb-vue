<template>
    <div class="wrap">
        <div class="header">
            <div class="title">최근 수정내역</div>
            <div class="more" @click="more = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 0H1C0.447715 0 0 0.447715 0 1V4C0 4.55228 0.447715 5 1 5H4C4.55228 5 5 4.55228 5 4V1C5 0.447715 4.55228 0 4 0Z" fill="#3E97FF"/>
                <path d="M13 0H10C9.44772 0 9 0.447715 9 1V4C9 4.55228 9.44772 5 10 5H13C13.5523 5 14 4.55228 14 4V1C14 0.447715 13.5523 0 13 0Z" fill="#C5E0FF"/>
                <path d="M4 9H1C0.447715 9 0 9.44772 0 10V13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13V10C5 9.44772 4.55228 9 4 9Z" fill="#C5E0FF"/>
                <path d="M13 9H10C9.44772 9 9 9.44772 9 10V13C9 13.5523 9.44772 14 10 14H13C13.5523 14 14 13.5523 14 13V10C14 9.44772 13.5523 9 13 9Z" fill="#009EF7"/>
                </svg>
            </div>
        </div>
        <div class="table-wrap">
            <div class="table-header">
                <ul>
                    <li>파일명</li>
                    <li>시트</li>
                    <li>최초등록</li>
                    <li>등록일시</li>
                    <li>수정자</li>
                    <li>수정일시</li>
                </ul>
            </div>
            <div class="table-body">
                <ul v-for="ul in data" :key="ul">
                    <!-- <li v-for="li in ul" :key="li">{{li}}</li> -->
                    <li>{{ul.filename}}</li>
                    <li><span>{{ul.sheet}}</span></li>
                    <li><span class="purson">{{ul.registor}}</span> <span class="depart" v-if="ul.registor_depart">{{ul.registor_depart}}</span></li>
                    <li><div>
                        <div>{{ul.register_date.slice(0,10)}}</div>
                        <div>{{ul.register_date.slice(10,20)}}</div>
                    </div></li>
                    <li><span class="purson">{{ul.editor ?ul.editor :'-'}}</span> <span class="depart" v-if="ul.editor_depart">{{ul.editor_depart}}</span></li>
                    <li><div>
                        <div>{{ul.edit_date.slice(0,10)}}</div>
                        <div>{{ul.edit_date.slice(10,20)}}</div>
                    </div></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="more-wrap" v-if="more" @click.stop.prevent="more = false">
        <div class="file-revision">
            <div class="title">파일 수정내역</div>
            <div class="content">
                <div class="file-name">[HD방송] 2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216 </div>
                <ul class="revision-list">
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
                        <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <circle cx="5.5" cy="5" r="5" fill="#F1416C"/>
                        </svg></div>
                        <div class="name">김건모</div>
                        <div class="company">SKB</div>
                        <div class="date">2023년 8월 22일 07:22</div>
                    </li>
                    <li>
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
import { ref } from "vue";

const more = ref(false)

const data:any = ref([])
data.value = [
    {
        filename: '2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216',
        sheet: '도봉강북_IP',
        registor: '공유',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '공유',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: '2023_SKB_CATV_SO채널라인업_230320_수원 주파수 재이동',
        sheet: '수원',
        registor: '안보현',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '유재석',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: 'SD ReENC_MUX',
        registor: '장원영',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: '2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216',
        sheet: '수원_QAM',
        registor: '이효리',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '공유',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: '2023_SKB_CATV_SO채널라인업_230320_수원 주파수 재이동',
        sheet: '수원_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '보아',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
]
</script>

<style lang="scss" scoped>
li{list-style: none;}
ul{padding: 0;margin: 0;}
p{margin: 0;padding: 0;}
.wrap{
    margin: 48px 30px 30px 0;
    background: #fff;
    position: relative;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            color: var(--primary-text, #222);
            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%; /* 20px */
            // margin-bottom: 24px;
            // padding-bottom: 24px;
            padding: 24px 30px;
        }
        .more{
            cursor: pointer;
            margin-right: 20px;
        }
    }
    .table-wrap{
        .table-header{
            display: flex;
            padding: 10px 30px;
            align-items: center;
            // border-bottom: 2px solid var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            // background: #F4F4F4;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 49px;
                li{
                    &:nth-child(1){
                        width: 560px;
                    }
                    width: 190px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;

                    color: var(--primary-text, #222);
                    font-family: Pretendard;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: bold;
                    line-height: 100%; /* 16px */
                }
            }
        }
        .table-body{
            background: #FFF;
            padding: 0 30px;
            ul{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-top: 1px solid var(--kt-border-color, #EFF2F5);
                padding: 10px 0;
                li{
                    &:nth-child(1){
                        width: 560px;
                    }
                    &:nth-child(2){
                        span{
                            width: 120px;
                        }
                    }
                    padding: 10px 0;
                    width: 190px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;

                    color: var(--primary-text, #222);
                    font-family: Pretendard;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 100%; /* 14px */

                    word-wrap: keep-all;

                    span.purson{
                        // height: 38px;
                    }

                    span.depart{
                        width: 66px;
                        height: 21px;
                        display: flex;
                        padding: 4px 20px;
                        margin-top: 8px;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;
                        border-radius: 21px;
                        background: #FFF5F8;
                    }
                }
            }
        }
    }
}
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
        background: #fff;
        padding: 20px;
        .title{
            border-radius: 8px 8px 0px 0px;
            border-bottom: 1px solid var(----kt-border-color, #EFF2F5);
            padding: 20px;
            color: var(--primary-text, #222);
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .content{
            margin-top: 20px;
            .file-name{
                width: 400px;
                padding: 20px;
                background: rgb(158, 190, 233);
                font-size: 24px;
            }
            .revision-list{
                margin-top: 20px;
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
    }
}
</style>