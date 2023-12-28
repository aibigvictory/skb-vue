<template>
    <div class="wrap">
        <div v-if="!addMode && !adjustMode">
            <div class="header">
                <div class="title">큐톤 관리 항목</div>
                <div class="btn-wrap">
                    <div class="btn btn-danger" @click="delete_quetone">관리 항목 삭제</div>
                    <div class="btn btn-primary" @click="addMode = true">관리 항목 추가</div>
                </div>
            </div>
            <div class="section">
                <div class="quetoneList">
                    <ul class="info">
                        <li>
                            <input @change="check_all_quetone" type="checkbox">
                            <div>nToneId</div>
                            <div>nCTPortId</div>
                            <div>ChName</div>
                            <div>PsipSrcNo</div>
                            <div>ChNumber</div>
                            <div>Chlink</div>
                        </li>
                    </ul>
                    <ul class="quetone">
                        <li v-for="item in quetoneList" :key="item" @click="adjustMode = true; selectQuetoneModel = item;">
                            <input v-model="quetone_checked_list" :value="item.id" type="checkbox">
                            <div>{{item.nToneId}}</div>
                            <div>{{item.nCTPortId}}</div>
                            <div>{{item.chName}}</div>
                            <div>{{item.psipSrcNo}}</div>
                            <div>{{item.chNumber}}</div>
                            <div>{{item.chLink}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <form class="user-add" v-if="addMode" @submit="createQuetone">
            <div class="title">관리 항목 추가</div>
            <div class="section">
                <!-- nToneId, ChName, PsipSrcNo, ChNumber, Chlink -->
                <div class="line">
                    <div class="item">
                        <label for="">nToneId</label>
                        <input v-model="quetoneModel.nToneId" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">nCTPortId</label>
                        <input v-model="quetoneModel.nCTPortId" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">ChName</label>
                        <input v-model="quetoneModel.chName" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">PsipSrcNo</label>
                        <input v-model="quetoneModel.psipSrcNo" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">ChNumber</label>
                        <input v-model="quetoneModel.chNumber" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">Chlink</label>
                        <input v-model="quetoneModel.chLink" type="text" placeholder="">
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <input type="submit" class="btn btn-primary" value="추가">
                <div class="btn btn-secondary" @click="addMode = false">목록</div>
            </div>
        </form>

        <form class="user-add" v-if="adjustMode" @submit="updateQuetone">
            <div class="title">관리 항목 수정</div>
            <div class="section">
                <!-- nToneId, ChName, PsipSrcNo, ChNumber, Chlink -->
                <div class="line">
                    <div class="item">
                        <label for="">nToneId</label>
                        <input v-model="selectQuetoneModel.nToneId" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">nCTPortId</label>
                        <input v-model="selectQuetoneModel.nCTPortId" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">ChName</label>
                        <input v-model="selectQuetoneModel.chName" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">PsipSrcNo</label>
                        <input v-model="selectQuetoneModel.psipSrcNo" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">ChNumber</label>
                        <input v-model="selectQuetoneModel.chNumber" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">Chlink</label>
                        <input v-model="selectQuetoneModel.chLink" type="text" placeholder="">
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <input type="submit" class="btn btn-primary" value="수정">
                <div class="btn btn-secondary" @click="adjustMode = false">목록</div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import Popup from '@/components/Popup.vue'
import JwtService from '@/core/services/JwtService'
import store from '@/store'
import axios from 'axios'

import { computed, Ref, ref, watch } from 'vue'
type Quetone = {
    id: Number;
    chLink: string;
    chName: string;
    chNumber: string;
    nToneId: string;
    nCTPortId: string;
    psipSrcNo: string;
}

const state = store.state

const addMode = ref(false)
const adjustMode = ref(false)
let quetoneModel: Ref<Quetone> = ref({
    id: 0,
    chLink: '',
    chName: '',
    chNumber: '',
    nToneId: '',
    nCTPortId: '',
    psipSrcNo: '',
});
let selectQuetoneModel: Ref<Quetone> = ref({
    id: 0,
    chLink: '',
    chName: '',
    chNumber: '',
    nToneId: '',
    nCTPortId: '',
    psipSrcNo: '',
});
const quetoneList: Ref<Quetone[]> = ref([]);

const getQuetoneList = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data } = await axios.get('/quetone/list', axios_config);
    quetoneList.value = data;
}

const createQuetone = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data, status } = await axios.post('/quetone/create', quetoneModel.value, axios_config);

    if (status === 201) {
        state.popup.content = ['큐톤 관리 항목 등록이 완료되었습니다.']
        state.popup.btnCount = 1
        state.popup.toggle = true
    } else {
        state.popup.content = ['내부 오류가 발생했습니다. 관리자에게 문의해주세요.']
        state.popup.btnCount = 1
        state.popup.toggle = true
    }

    

    addMode.value = false;

    await getQuetoneList();
}

const updateQuetone = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data, status } = await axios.post('/quetone/update', selectQuetoneModel.value, axios_config);

    if (status === 201) {
        state.popup.content = ['큐톤 관리 항목 수정이 완료되었습니다.']
        state.popup.btnCount = 1
        state.popup.toggle = true
    } else {
        state.popup.content = ['내부 오류가 발생했습니다. 관리자에게 문의해주세요.']
        state.popup.btnCount = 1
        state.popup.toggle = true
    }

    

    adjustMode.value = false;

    await getQuetoneList();
}

let quetone_checked_list:Ref<Number[]> = ref([])
const check_all_quetone = (e) => {
    if(e.target.checked) {
        quetoneList.value.forEach((quetone) => {
            console.log(quetone.id);
            
            quetone_checked_list.value.push(quetone.id)
        })
    }
    else{
        quetone_checked_list.value = []
    }
}

const delete_quetone = async () => {
    await axios.post('/quetone/delete', {id: quetone_checked_list.value})

    state.popup.content = ['큐톤 삭제가 완료되었습니다.']
    state.popup.btnCount = 1
    state.popup.toggle = true

    await getQuetoneList();
    // quetone_checked_list.value.forEach(async (quetone_id, idx) => {

    //     if (idx == quetone_checked_list.value.length - 1) {


    //         quetone_checked_list.value = []
    //     }
    // })
    // // axios.post('/auth/deleteUser', {id: member_checked_list.value})
}


// start
getQuetoneList();
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}

.wrap{
    margin: 48px 30px;
    > div{
        .header{
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            .title{
                color: var(--primary-text, #222);
                font-size: 20px;
                font-weight: 600;
                line-height: 100%; /* 20px */
            }
            .btn-wrap{
                .btn{
                    margin-left: 8px;
                    width: 120px;
                    height: 38px;
                    padding-top: 0.7rem !important;
                    padding-bottom: 0.7rem !important;
                }
            }
        }
        .section{
            background: #fff;
            padding: 0 24px;

            .quetoneList{
                padding-top: 20px;
                padding-bottom: 24px;
                .info{
                    color: var(--primary-text, #222);
                    font-size: 14px;
                    font-weight: 700;
                    background: var(----bs-gray-100, #F9F9F9);
                    li{
                        height: 68px;
                        display: flex;
                        align-items: center;
                        // border-top: 1px solid #eee;
                        // border: 1px solid #000;
                        div{
                            display: flex;
                            align-items: center;
                            width: 180px;
                            // &:nth-child(1) {
                            // }
                        }
                        input{
                            margin-right: 16px;
                            margin-left: 4px;
                        }
                    }
                }
                .quetone{
                    color: var(--primary-text, #222);
                    font-size: 14px;
                    font-weight: 400;
                    li{
                        height: 54px;
                        display: flex;
                        border-top: 1px solid #eee;
                        div{
                            display: flex;
                            align-items: center;
                            width: 180px;
                            // &:nth-child(1) {
                            // }
                            .accept-type{
                                display: flex;
                                padding: 4px 16px;
                                justify-content: center;
                                align-items: center;
                                gap: 8px;
                                border-radius: 21px;
                                background: var(--data-bs-theme-light-bs-info-light, #F8F5FF);
    
                                color: var(--data-bs-theme-light-bs-info, #7239EA);
                                text-align: center;
                                font-size: 13px;
                                font-style: normal;
                                font-weight: 700;
                                line-height: 100%; /* 13px */
                            }
                        }
                        input{
                            margin-right: 16px;
                            margin-left: 4px;
                        }
                    }
                }
            }
        }
    }

    .user-add{
        // input{
        //     display: block;
        //     height: 40px;
        //     padding: 0 12px;
        //     width: 100%;
        //     margin-bottom: 16px;
        //     border-radius: 10px;
        //     border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
        //     background: #FFF;
        // }
        // textarea{
        //     padding: 12px;
        //     width: 100%;
        //     height: 100px;
        //     margin-bottom: 16px;
        //     border-radius: 10px;
        //     border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
        //     background: #FFF;
        // }

        // .text{
        //     color: var(--primary-text, #222);
        //     font-size: 14px;
        //     font-weight: 500;
        // }
        width: 800px;
        padding: 32px;
        background: #fff;
        .title{
            color: var(--primary-text, #222);
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        .section{
            margin: 24px 0;
            .line{
                display: flex;
                justify-content: space-between;
                .item{
                    width: calc(50% - 6px);
                    label{
                        display: block;
                        color: var(--primary-text, #222);
                        font-size: 14px;
                        font-weight: 500;
                        margin-bottom: 10px;
                        span{
                            color: var(--data-bs-theme-light-bs-red, #DC3545);
                            font-size: 10px;
                            font-weight: 400;
                        }
                    }
                    select, input{
                        display: block;
                        height: 40px;
                        padding: 0 12px;
                        width: 100%;
                        margin-bottom: 16px;
                        border-radius: 10px;
                        border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
                        background: #FFF;
                    }
                }
                .item2{
                    margin-bottom: 16px;
                    label{
                        display: block;
                        color: var(--primary-text, #222);
                        font-size: 14px;
                        font-weight: 500;
                        user-select: none;
                    }
                    > label{
                        margin-bottom: 10px;
                    }
                    > div{
                        display: flex;
                        align-items: center;

                        > div{
                            margin: 0 10px;
                        }
                    
                        input{
                            height: 40px;
                            padding: 0 12px;
                            border-radius: 10px;
                            border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
                            background: #FFF;
                            &[type="checkbox"]{
                                margin-left: 15px;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
            textarea{
                padding: 12px;
                width: 100%;
                height: 100px;
                margin-bottom: 16px;
                border-radius: 10px;
                border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
                background: #FFF;
            }
        }
        .btn-wrap{
            display: flex;
            justify-content: center;
            .btn{
                &:nth-child(1) {
                    margin-right: 4px;
                }
                &:nth-child(2) {
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>