<template>
    <div class="wrap">
        <div class="user-list" v-if="!user_add">
            <div class="header">
                <div class="title">사용자 리스트</div>
                <div class="btn-wrap">
                    <div class="btn btn-danger" @click="change_popup_state('delete', true)">삭제</div>
                    <div class="btn btn-primary" @click="user_add = true">사용자 등록</div>
                </div>
            </div>
            <div class="section">
                <div class="top">
                    <div class="search">
                        <div class="search-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="#A1A5B7"/>
                            </svg>
                            <input @keypress="enter" ref="search_input" class="search-input" type="text" placeholder="구분, 시스템/서비스, 업체/개발사 검색">
                        </div>
                        <button @click="search($event)" class="search-btn">검색</button>
                    </div>
                    <div class="search-detail" @click.capture="search_detail = !search_detail">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 0H1C0.447715 0 0 0.447715 0 1V4C0 4.55228 0.447715 5 1 5H4C4.55228 5 5 4.55228 5 4V1C5 0.447715 4.55228 0 4 0Z" fill="#3E97FF"/>
                        <path d="M13 0H10C9.44772 0 9 0.447715 9 1V4C9 4.55228 9.44772 5 10 5H13C13.5523 5 14 4.55228 14 4V1C14 0.447715 13.5523 0 13 0Z" fill="#C5E0FF"/>
                        <path d="M4 9H1C0.447715 9 0 9.44772 0 10V13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13V10C5 9.44772 4.55228 9 4 9Z" fill="#C5E0FF"/>
                        <path d="M13 9H10C9.44772 9 9 9.44772 9 10V13C9 13.5523 9.44772 14 10 14H13C13.5523 14 14 13.5523 14 13V10C14 9.44772 13.5523 9 13 9Z" fill="#009EF7"/>
                        </svg>
                        <div class="search-detail-wrap" v-if="search_detail">
                            <div class="title">상세검색</div>
                            <div class="content">
                                <!-- <label for="">구분</label>
                                <select id=""></select>
                                <label for="">시스템 / 서비스</label>
                                <select id=""></select> -->
                                <label for="">업체 / 개발사</label>
                                <select id=""></select>
                            </div>
                            <div class="btn-wrap">
                                <div class="btn btn-primary" @click="search_detail = false">검색</div>
                                <div class="btn btn-secondary">초기화</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="only-skb-view">
                        <button class="btn-only-skb-view">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M16.5 8C16.5 8 13.5 2.5 8.5 2.5C3.5 2.5 0.5 8 0.5 8C0.5 8 3.5 13.5 8.5 13.5C13.5 13.5 16.5 8 16.5 8ZM1.6727 8C1.72963 7.91321 1.79454 7.81677 1.86727 7.71242C2.20216 7.23193 2.69631 6.5929 3.33211 5.95711C4.62103 4.66818 6.38062 3.5 8.5 3.5C10.6194 3.5 12.379 4.66818 13.6679 5.95711C14.3037 6.5929 14.7978 7.23193 15.1327 7.71242C15.2055 7.81677 15.2704 7.91321 15.3273 8C15.2704 8.08679 15.2055 8.18323 15.1327 8.28758C14.7978 8.76807 14.3037 9.4071 13.6679 10.0429C12.379 11.3318 10.6194 12.5 8.5 12.5C6.38062 12.5 4.62103 11.3318 3.33211 10.0429C2.69631 9.4071 2.20216 8.76807 1.86727 8.28758C1.79454 8.18323 1.72963 8.08679 1.6727 8Z" fill="#58595D"/>
                            <path d="M8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5Z" fill="#58595D"/>
                            </svg>
                            SKB 직원만 보기
                        </button>
                    </div> -->
                </div>
                <div class="accept">
                    <ul class="info">
                        <li>
                            <input @change="check_all_member" type="checkbox">
                            <!-- <div>구분</div> -->
                            <!-- <div>시스템/서비스</div> -->
                            <div>업체/개발사</div>
                            <div>담당</div>
                            <div>성명</div>
                            <div>직위</div>
                            <div>부서</div>
                            <div>휴대전화</div>
                            <div>유선전화</div>
                            <div>이메일</div>
                            <div>비고</div>
                            <div>등록일자</div>
                        </li>
                    </ul>
                    <ul class="member">
                        <li v-for="member in view_member" :key="member">
                            <input v-model="member_checked_list" :value="member.id" type="checkbox">
                            <!-- <div>{{member.type}}</div> -->
                            <!-- <div>{{member.system}}</div> -->
                            <div>{{member.company}}</div>
                            <div>{{member.manage}}</div>
                            <div>{{member.name}}</div>
                            <div>{{member.position}}</div>
                            <div>{{member.depart}}</div>
                            <div>{{member.phone}}</div>
                            <div>{{member.landline}}</div>
                            <div>{{member.email}}</div>
                            <div>{{member.note}}</div>
                            <div>{{member.date}}</div>
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
        <div class="user-add" v-if="user_add">
            <div class="title">사용자 등록</div>
            <div class="section">
                <!-- <div class="line">
                    <div class="item">
                        <label for="">구분</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                    <div class="item">
                        <label for="">시스템/서비스</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                </div> -->
                <div class="line">
                    <div class="item">
                        <label for="">업체 개발사<span> *</span></label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                    <div class="item">
                        <label for="">담당</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">성명<span> *</span></label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                    <div class="item">
                        <label for="">직위</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">부서</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                    <div class="item">
                        <label for="">휴대전화</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                </div>
                <div class="line">
                    <div class="item">
                        <label for="">유선전화</label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                    <div class="item">
                        <label for="">이메일<span> *</span></label>
                        <input type="text" placeholder="입력해주세요.">
                    </div>
                </div>
                <label for="">비고</label>
                <textarea id="" placeholder="내용을 입력해주세요."></textarea>
            </div>
            <div class="btn-wrap">
                <div class="btn btn-primary" @click="user_add = false">등록</div>
                <div class="btn btn-secondary" @click="user_add = false">사용자리스트</div>
            </div>
        </div>
    </div>
    <Popup v-if="delete_popup_state" @accept="delete_member" @exit="change_popup_state('delete', false)" :content="[`${member_checked_list.length}명의 사용자를 삭제 하시겠습니까?`]" :danger="`삭제 후 복구가 불가능 합니다.`"/>
</template>

<script setup lang="ts">
import Popup from '@/components/Popup.vue'

import { ref, watch } from 'vue'

const user_add = ref(false)
const search_detail = ref(false)

//---------------------------------

let search_keyword = ref('')

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
    return arr.filter((member) => new RegExp(keyword).test(member.type) || new RegExp(keyword).test(member.system) || new RegExp(keyword).test(member.company))
}

const origin_member = [
    {
        id: 1,
        type: 'MCR',
        system: '멀티뷰어',
        company: '삼성전자',
        manage: '담당',
        name: '홍길동',
        position: '부장',
        depart: '-',
        email: 'test@test.com',
        phone: '010-1231-1231',
        landline: '02-1231-1231',
        note: '비고',
        date: '2023.07.10 14:11',
    },
    {
        id: 2,
        type: 'MCR',
        system: '멀티뷰어',
        company: '삼성전자',
        manage: '담당',
        name: '홍길동',
        position: '부장',
        depart: '-',
        email: 'test@test.com',
        phone: '010-1231-1231',
        landline: '02-1231-1231',
        note: '비고',
        date: '2023.07.10 14:11',
    },
    {
        id: 3,
        type: 'MCR',
        system: '멀티뷰어',
        company: '삼성전자',
        manage: '담당',
        name: '홍길동',
        position: '부장',
        depart: '-',
        email: 'test@test.com',
        phone: '010-1231-1231',
        landline: '02-1231-1231',
        note: '비고',
        date: '2023.07.10 14:11',
    },
    {
        id: 4,
        type: 'MCR',
        system: '멀티뷰어',
        company: '삼성전자',
        manage: '담당',
        name: '홍길동',
        position: '부장',
        depart: '-',
        email: 'test@test.com',
        phone: '010-1231-1231',
        landline: '02-1231-1231',
        note: '비고',
        date: '2023.07.10 14:11',
    },
    
]
const view_member = ref(origin_member)

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
    member_checked_list.value.forEach((member_id) => {
    console.log(member_id);
        // axios.post('/member/delete', {id: member_id})
    })
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
                .only-skb-view{
                    .btn-only-skb-view{
                        display: flex;
                        align-items: center;
    
                        width: 140px;
                        padding: 8px 13px;
                        border-radius: 38px;
                        border: 1px solid var(----el-color-info-light-8, #E9E9EB);
                        background: #FFF;
    
                        color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
                        font-size: 12px;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                        svg{
                            margin-right: 6px;
                        }
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