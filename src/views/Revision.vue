<template>
    <div class="wrap">
        <div class="header">
            <div class="title">최근 수정내역</div>
        </div>
        <div class="table-wrap">
            <div class="table-header">
                <ul>
                    <li>파일명</li>
                    <!-- <li>시트</li> -->
                    <li>최초등록</li>
                    <li>등록일시</li>
                    <li>수정자</li>
                    <li>수정일시</li>
                </ul>
            </div>
            <div class="table-body">
                <ul v-for="ul in revision_data" :key="ul">
                    <!-- <li v-for="li in ul" :key="li">{{li}}</li> -->
                    <li>{{ul.fileName}}</li>
                    <!-- <li><span>{{ul.sheetName}}</span></li> -->
                    <li><span class="purson">{{ul.file && ul.file.user ?ul.file.user.name: ''}}</span> <span class="depart" v-if="ul.file && ul.file.user && ul.file.user.department">{{ul.file.user.department}}</span></li>
                    <li><div>
                        <div>{{ul.createdAt ?ul.createdAt.slice(0,10) :''}}</div>
                        <div>{{ul.createdAt ?ul.createdAt.slice(10,20) :''}}</div>
                    </div></li>
                    <li><span class="purson">{{ul.user ?ul.user.name : ''}}</span> <span class="depart" v-if="ul.user && ul.user.department">{{ul.user.department}}</span></li>
                    <li><div>
                        <div>{{ul.updatedAt ?ul.updatedAt.slice(0,10) :''}}</div>
                        <div>{{ul.updatedAt ?ul.updatedAt.slice(10,20) :''}}</div>
                    </div></li>
                </ul>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import JwtService from "@/core/services/JwtService";
import axios from "axios";
import { ref } from "vue";

const more = ref(false)

const revision_data:any = ref([])
revision_data.value = [
    {
        fileName: '2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216',
        sheet: '도봉강북_IP',
        registor: '공유',
        registor_depart: 'SKB',
        createAt: '2023.06.26 12:23:35',
        editor: '공유',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
]

const init = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data } = await axios.post('/file/history', {}, axios_config)

    revision_data.value = data
}

init()
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
</style>