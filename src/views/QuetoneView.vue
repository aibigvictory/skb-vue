<template>
    <div class="wrap">
        <div v-if="!addMode">
            <div class="header">
                <div class="title">큐톤 모니터링</div>
                <div class="btn-wrap">
                    <div class="btn btn-danger">관리 항목 삭제</div>
                    <div class="btn btn-primary" @click="addMode = true">관리 항목 추가</div>
                </div>
            </div>
            <div class="section">
                <div class="quetoneList">
                    <ul class="info">
                        <li>
                            <!-- <input @change="check_all_member" type="checkbox"> -->
                            <div>nToneId</div>
                            <div>ChName</div>
                            <div>PsipSrcNo</div>
                            <div>ChNumber</div>
                            <div>Chlink</div>
                        </li>
                    </ul>
                    <ul class="quetone">
                        <li v-for="item in quetoneList" :key="item">
                            <!-- <input v-model="member_checked_list" :value="member.id" type="checkbox"> -->
                            <div>{{item.nToneId}}</div>
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
            <div class="title">사용자 등록</div>
            <div class="section">
                <!-- nToneId, ChName, PsipSrcNo, ChNumber, Chlink -->
                <div class="line">
                    <div class="item">
                        <label for="">nToneId</label>
                        <input v-model="quetoneModel.nToneId" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item2">
                        <label for="">ChName</label>
                        <input v-model="quetoneModel.chName" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item3">
                        <label for="">PsipSrcNo</label>
                        <input v-model="quetoneModel.psipSrcNo" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item4">
                        <label for="">ChNumber</label>
                        <input v-model="quetoneModel.chNumber" type="text" placeholder="" required>
                    </div>
                </div>
                <div class="line">
                    <div class="item5">
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
    </div>
</template>

<script setup lang="ts">
import Popup from '@/components/Popup.vue'
import JwtService from '@/core/services/JwtService'
import store from '@/store'
import axios from 'axios'

import { computed, Ref, ref, watch } from 'vue'
type Quetone = {
    chLink: string;
    chName: string;
    chNumber: string;
    nToneId: string;
    psipSrcNo: string;
}

const state = store.state

const addMode = ref(false)
let quetoneModel: Ref<Quetone> = ref({
    chLink: '',
    chName: '',
    chNumber: '',
    nToneId: '',
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


// start
getQuetoneList();
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}

input{
    display: block;
    height: 40px;
    padding: 0 12px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
    background: #FFF;
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

.text{
    color: var(--primary-text, #222);
    font-size: 14px;
    font-weight: 500;
}

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
        }
    }
}
</style>