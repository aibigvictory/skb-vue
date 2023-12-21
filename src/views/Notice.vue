<template>
    <div class="wrap">
        <div class="user-list" v-if="!user_add && !user_adjust">
            <div class="header">
                <div class="title">공지사항</div>
                <div class="btn-wrap">
                    <div class="btn btn-danger" @click="change_popup_state('delete', true)">삭제</div>
                    <div class="btn btn-primary" @click="user_add = true">공지등록</div>
                </div>
            </div>
            <div class="section">
                <div class="accept">
                    <ul class="info">
                        <li>
                            <input @change="check_all_member" type="checkbox">
                            <!-- <div>구분</div> -->
                            <div>제목</div>
                            <div>노출기간</div>
                            <div>사용여부</div>
                            <div>등록자</div>
                            <div>등록일자</div>
                        </li>
                    </ul>
                    <ul class="member">
                        <li v-for="member in view_member" :key="member">
                            <input v-model="member_checked_list" :value="member.id" type="checkbox">
                            <!-- <div>{{member.department}}</div> -->
                            <div>{{member.title}}</div>
                            <div>{{new Date(member.startDt).toISOString().slice(0,10).replace(/T/g, ' ').replace(/-/g, '.')}} ~ {{new Date(member.endDt).toISOString().slice(0,10).replace(/T/g, ' ').replace(/-/g, '.')}}</div>
                            <div>{{member.use? '사용' : '미사용'}}</div>
                            <div>{{member.user.name}}</div>
                            <div>{{new Date(member.createdAt).toISOString().slice(0,16).replace(/T/g, ' ').replace(/-/g, '.')}}</div>
                        </li>
                        <!-- <li>
                            <input type="checkbox">
                            <div>MCR</div>
                            <div>멀티뷰어</div>
                            <div>삼성전자</div>
                            <div>담당</div>
                            <div>홍길동</div>
                            <div>부장</div>
                            <div>-</div>
                            <div>010-1231-1231</div>
                            <div>02-1231-1231</div>
                            <div>m1@naver.com</div>
                            <div>비고</div>
                            <div>2023.07.10 14:11</div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <form class="user-add" v-if="user_add" @submit="create_user">
            <div class="title">사용자 등록</div>
            <div class="section">
                <div class="line">
                    <div class="item">
                        <label for="">제목</label>
                        <input v-model="input_add_user.title" type="text" placeholder="입력해주세요." required>
                    </div>
                </div>
                <div class="line">
                    <div class="item2">
                        <label for="">노출기간</label>
                        <div>
                            <input v-model="startDt" type="date" placeholder="입력해주세요.">
                            <div>~</div>
                            <input v-model="endDt" type="date" placeholder="입력해주세요.">
                            <input v-model="input_add_user.isAlways" type="checkbox" placeholder="입력해주세요." id="isAlways">
                            <label for="isAlways">항시노출</label>
                        </div>
                    </div>
                </div>
                <label for="">내용</label>
                <textarea v-model="input_add_user.contents" placeholder="공지사항 내용을 입력해주세요." required></textarea>
            </div>
            <div class="btn-wrap">
                <input type="submit" class="btn btn-primary" value="등록">
                <div class="btn btn-secondary" @click="user_add = false">사용자리스트</div>
            </div>
        </form>
    </div>
    <Popup v-if="delete_popup_state" @accept="delete_member" @exit="change_popup_state('delete', false)" :content="[`${member_checked_list.length}명의 사용자를 삭제 하시겠습니까?`]" :danger="`삭제 후 복구가 불가능 합니다.`"/>
</template>

<script setup lang="ts">
import Popup from '@/components/Popup.vue'
import JwtService from '@/core/services/JwtService'
import store from '@/store'
import axios from 'axios'

import { computed, ref, watch } from 'vue'

const state = store.state

const user_add = ref(false)
const user_adjust = ref(false)
const search_detail = ref(false)

//---------------------------------

let search_keyword = ref('')

let startDt = ref(new Date().toISOString().slice(0,10))
let endDt = ref(new Date().toISOString().slice(0,10))
let input_add_user = ref({
    title: null,
    use: true,
    isAlways: false,
    contents: null,
    startDt: computed(() => new Date(startDt.value)),
    endDt: computed(() => new Date(new Date(endDt.value).getTime() + 24 * 60 * 60 * 1000 - 1)),
})

let input_adjust_user = computed(() => {
    if (member_checked_list.value.length != 1) return {}
    if (member_checked_list.value.length == 1) {
        let result: any = origin_member.find(member => member.id == member_checked_list.value[0])
        delete result.accepted
        delete result.type

        return result
    }
})

watch(search_keyword, (keyword) => {
    view_member.value = search_member(search_keyword.value, origin_member)
})

const search_input = ref()
const search = (e) => {
    const keyword = search_input.value.value
    
    search_keyword.value = keyword
}
const enter = (e) => {
    if (e.key == 'Enter') {
        search(e)
    };
}

const search_member = (keyword, arr) => {
    if (!keyword) return arr
    // return arr.filter((member) => member.name == keyword || member.email == keyword)
    return arr.filter((member) => new RegExp(keyword).test(store.getters.getData('company').find((company => company.id == member.companyId))?.name) || new RegExp(keyword).test(member.name))
}

const load_memberList = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data } = await axios.get('/notice/list', axios_config)

    origin_member = data
    view_member.value = deepCopy(origin_member)
}

load_memberList()

const deepCopy = (target) => {
  return JSON.parse(JSON.stringify(target))
}

let origin_member = []
const view_member = ref(origin_member)

const create_user = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    await axios.post('/notice/create', input_add_user.value, axios_config)

    state.popup.content = ['공지 등록이 완료되었습니다.']
    state.popup.btnCount = 1
    state.popup.toggle = true

    user_add.value = false

    load_memberList()
}

const update_user = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    await axios.post('/notice/update', input_adjust_user.value, axios_config)

    state.popup.content = ['공지 수정이 완료되었습니다.']
    state.popup.btnCount = 1
    state.popup.toggle = true

    user_adjust.value = false

    load_memberList()
}

let member_checked_list:any = ref([])
const check_all_member = (e) => {
    if(e.target.checked) {
        view_member.value.forEach((member) => {
            member_checked_list.value.push(member.id)
        })
    }
    else{
        member_checked_list.value = []
    }
}

let accept_popup_state = ref(false)
let delete_popup_state = ref(false)

const delete_member = () => {
    member_checked_list.value.forEach(async (member_id, idx) => {
        await axios.post('/notice/delete', {id: member_id})

        if (idx == member_checked_list.value.length - 1) {
            state.popup.content = ['공지 삭제가 완료되었습니다.']
            state.popup.btnCount = 1
            state.popup.toggle = true

            load_memberList()

            member_checked_list.value = []
        }
    })
    // axios.post('/auth/deleteUser', {id: member_checked_list.value})
}

const change_popup_state = (popup_type, state) => {
    if (popup_type == 'delete') delete_popup_state.value = state
    if (popup_type == 'accept') accept_popup_state.value = state
}

</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}

.wrap{
    margin: 48px 30px;
    .user-list{
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
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .search{
                    display: flex;
                    padding: 16px 0;
                    .search-wrap{
                        position: relative;
                        svg{
                            position: absolute;
                            top: 50%;
                            left: 16px;
                            transform: translateY(-50%);
                            z-index: 999;
                        }
                        .search-input{
                            display: flex;
                            width: 310px;
                            height: 38px;
                            padding: 12px 8px 12px 44px;
                            align-items: center;
                            border: none;
                            border-radius: 4px;
                            background: var(----kt-input-solid-bg, #F5F8FA);
                        }
                    }
                    .search-btn{
                        margin-left: 8px;
                        display: flex;
                        padding: 8px 36px;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;
                        border: none;
                        border-radius: 4px;
                        background: var(----bs-teal, #20C997);
    
                        color: #FFF;
                        /* button/button S */
                        font-size: 14px;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                    }
                    .type{
                        display: flex;
                        align-items: center;
                        margin-left: 24px;
                        input{
                            margin-right: 4px;
                            width: 14px;
                            height: 14px;
                        }
                        label{
                            margin-right: 32px;
                            color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
                            font-size: 14px;
                            font-weight: 400;
                        }
                    }
                }
                .search-detail{
                    cursor: pointer;
                    margin-right: 10px;
                    position: relative;
                    .search-detail-wrap{
                        position: absolute;
                        top: 42px;
                        right: 0;
                        width: 300px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 40px 0px rgba(82, 63, 105, 0.14);
                        .title{
                            border-radius: 8px 8px 0px 0px;
                            border-bottom: 1px solid var(----kt-border-color, #EFF2F5);
                            padding: 20px;
                            color: var(--primary-text, #222);
                            font-size: 16px;
                            font-weight: 600;
                            letter-spacing: 0.5px;
                        }
                        .content{
                            padding: 20px;
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
                            select{
                                display: block;
                                height: 40px;
                                padding: 0 12px;
                                width: 100%;
                                margin-bottom: 10px;
                                border-radius: 10px;
                                background: var(----kt-input-solid-bg, #F5F8FA);
                                background: #FFF;
                            }
                        }
                        .btn-wrap{
                            padding: 20px;
                            padding-top: 0;
                            display: flex;
                            justify-content: center;
                            .btn{
                                width: 50%;
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
            }
            .accept{
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
                .member{
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