<template>
    <div class="wrap">
        <div class="header">
            <div class="title">회원가입 승인</div>
            <div class="btn-wrap">
                <div @click="change_popup_state('delete', true)" class="btn btn-danger">삭제</div>
                <div @click="change_popup_state('accept', true)" class="btn btn-primary">회원승인</div>
            </div>
        </div>
        <div class="section">
            <div class="search">
                <div class="search-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="#A1A5B7"/>
                    </svg>
                    <input @keypress="enter" ref="search_input" class="search-input" type="text" placeholder="이름/이메일 검색">
                </div>
                <button @click="search($event)" class="search-btn">검색</button>
                <div class="type">
                    <input @change="change_type($event, '전체')" type="checkbox" checked name="" id="search-check-all">
                    <label for="search-check-all">전체</label>
                    <input @change="change_type($event, '승인')" type="checkbox" name="" id="search-check-accepted">
                    <label for="search-check-accepted">승인</label>
                    <input @change="change_type($event, '승인요청')" type="checkbox" name="" id="search-check-wait-accept">
                    <label for="search-check-wait-accept">승인요청</label>
                </div>
                <!-- <div class="search-input"></div> -->
            </div>
            <div class="accept">
                <ul class="info">
                    <li>
                        <input @change="check_all_member" type="checkbox">
                        <div>팀명</div>
                        <div>이름</div>
                        <div>이메일</div>
                        <div>승인구분</div>
                        <div>승인</div>
                        <div>등록일자</div>
                    </li>
                </ul>
                <ul class="member">
                    <!-- <li>
                        <input type="checkbox">
                        <div>CATV운용팀</div>
                         <div>홍길동</div>
                         <div>test@test.com</div>
                         <div><span class="accept-type">승인요청</span></div>
                         <div>신성우</div>
                         <div>2023.07.10 14:11</div>
                    </li> -->
                    <li v-for="member in view_member" :key="member">
                        <input v-model="member_checked_list" :value="member.id" type="checkbox">
                        <div>{{member.teamName}}</div>
                        <div>{{member.name}}</div>
                        <div>{{member.email}}</div>
                        <div><span class="accept-type">{{member.accepted ?"승인" :"승인요청"}}</span></div>
                        <div>{{member.system}}</div>
                        <div>{{member.createdAt.replace(/-/g, '.').replace(/T/, ' ').slice(0,16)}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <Popup v-if="delete_popup_state" @accept="delete_member" @exit="change_popup_state('delete', false)" :content="[`${member_checked_list.length}명의 회원을 삭제 하시겠습니까?`]" :danger="`삭제 후 복구가 불가능 합니다.`"/>
    <Popup v-if="accept_popup_state" @accept="accept_member" @exit="change_popup_state('accept', false)" :content="[`${member_checked_list.length}명의 회원을 승인처리 하시겠습니까?`]" />
</template>

<script setup lang="ts">
import Popup from '@/components/Popup.vue'
import JwtService from '@/core/services/JwtService'

import axios from 'axios'
import { ref, watch } from 'vue'

let accept_type = ref('전체')
let search_keyword = ref('')

watch(accept_type, (type) => {
    view_member.value = search_member(search_keyword.value, origin_member)
    view_member.value = filter_member(accept_type.value, view_member.value)
})
watch(search_keyword, (keyword) => {
    view_member.value = search_member(search_keyword.value, origin_member)
    view_member.value = filter_member(accept_type.value, view_member.value)
})

const change_type = (e, type) => {
    e.target.parentNode.childNodes.forEach(element => {
        if (!(element.checked == undefined)) element.checked = false
    })
    e.target.checked = true

    accept_type.value = type
}
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

const filter_member = (type, arr) => {
    if (type == '전체') return arr
    if (type == '승인') return arr.filter((member) => member.accepted == true)
    if (type == '승인요청') return arr.filter((member) => member.accepted == false)
}
const search_member = (keyword, arr) => {
    if (!keyword) return arr
    // return arr.filter((member) => member.name == keyword || member.email == keyword)
    return arr.filter((member) => new RegExp(keyword).test(member.name) || new RegExp(keyword).test(member.email))
}

let origin_member = []
let view_member = ref(origin_member)

const call_member = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data } = await axios.post('/auth/getUserList', {}, axios_config)

    console.log(data);
    

    origin_member = data.users
    view_member.value = data.users
}

call_member()

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

const accept_member = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    await member_checked_list.value.forEach(async (member_id) => {
        console.log(member_id);
        await axios.post('/auth/acceptUser', {id: member_id}, axios_config)
    })
    
    alert('승인처리가 완료되었습니다.')
    member_checked_list.value = []
    call_member()

}
const delete_member = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    await member_checked_list.value.forEach(async (member_id) => {
        console.log(member_id);
        await axios.post('/auth/deleteUser', {id: member_id}, axios_config)
    })
    
    alert('삭제가 완료되었습니다.')
    member_checked_list.value = []
    call_member()
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
        .accept{
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
</style>