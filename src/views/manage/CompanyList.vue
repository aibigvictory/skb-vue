<template>
    <div class="wrap">
        <div class="company-list" v-if="!company_add">
            <div class="header">
                <div class="title">개발사 리스트</div>
                <div class="btn-wrap">
                    <div class="btn btn-danger" @click="delete_company">삭제</div>
                    <div class="btn btn-primary" @click="company_add = true">업체등록</div>
                </div>
            </div>
            <div class="section">
                <div class="top">
                    <div class="search">
                        <div class="search-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="#A1A5B7"/>
                            </svg>
                            <input @keypress="enter" ref="search_input" class="search-input" type="text" placeholder="이름/이메일 검색">
                        </div>
                        <button @click="search" class="search-btn">검색</button>
                    </div>
                    <div class="only-skb-view">
                        <button @click="only_skb" class="btn-only-skb-view">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M16.5 8C16.5 8 13.5 2.5 8.5 2.5C3.5 2.5 0.5 8 0.5 8C0.5 8 3.5 13.5 8.5 13.5C13.5 13.5 16.5 8 16.5 8ZM1.6727 8C1.72963 7.91321 1.79454 7.81677 1.86727 7.71242C2.20216 7.23193 2.69631 6.5929 3.33211 5.95711C4.62103 4.66818 6.38062 3.5 8.5 3.5C10.6194 3.5 12.379 4.66818 13.6679 5.95711C14.3037 6.5929 14.7978 7.23193 15.1327 7.71242C15.2055 7.81677 15.2704 7.91321 15.3273 8C15.2704 8.08679 15.2055 8.18323 15.1327 8.28758C14.7978 8.76807 14.3037 9.4071 13.6679 10.0429C12.379 11.3318 10.6194 12.5 8.5 12.5C6.38062 12.5 4.62103 11.3318 3.33211 10.0429C2.69631 9.4071 2.20216 8.76807 1.86727 8.28758C1.79454 8.18323 1.72963 8.08679 1.6727 8Z" fill="#58595D"/>
                            <path d="M8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5Z" fill="#58595D"/>
                            </svg>
                            SKB 직원만 보기
                        </button>
                    </div>
                </div>
                <div class="accept">
                    <ul class="info">
                        <li>
                            <input @change="check_all_company" type="checkbox">
                            <div>업체/개발사</div>
                            <div>유선전화</div>
                            <div>비고</div>
                            <div>등록일자</div>
                        </li>
                    </ul>
                    <ul class="company">
                        <li v-for="company in view_company" :key="company">
                            <input v-model="company_checked_list" :value="company.id" type="checkbox" :id="`check${company.id}`">
                            <label :for="`check${company.id}`">
                                <div>{{company.name}}</div>
                                <div>{{company.phone}}</div>
                                <div>{{company.memo}}</div>
                                <div>{{new Date(company.createdAt).toISOString().slice(0,16).replace(/T/g, ' ').replace(/-/g, '.')}}</div>
                            </label>
                        </li>
                        <!-- <li>
                            <input type="checkbox">
                            <div>네스테크놀리지</div>
                            <div>02-1231-1231</div>
                            <div>RP 담당</div>
                            <div>2023.07.10 14:11</div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="company-add" v-if="company_add">
            <div class="title">업체/개발사 등록</div>
            <div class="section">
                <label for="">구분<span>(필수)</span></label>
                <input v-model="input_company.name" type="text" placeholder="입력해주세요.">
                <label for="">유선전화</label>
                <input v-model="input_company.phone" type="text" placeholder="입력해주세요.">
                <label for="">비고</label>
                <textarea id="" v-model="input_company.memo" placeholder="내용을 입력해주세요."></textarea>
            </div>
            <div class="btn-wrap">
                <div class="btn btn-primary" @click="create_company">업체등록</div>
                <div class="btn btn-secondary" @click="company_add = false">리스트</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import JwtService from '@/core/services/JwtService'
import store from '@/store'
import axios from 'axios'
import { ref, watch } from 'vue'

const state = store.state

const company_add = ref(false)

let only_state = ref(false)
const only_skb = (e) => {
    if (only_state.value) {
        e.target.classList.remove('active')
        only_state.value = false
        view_company.value = search_company(search_keyword.value, origin_company)  
    }
    else{
        e.target.classList.add('active')
        only_state.value = true
        view_company.value = search_company('SKB', origin_company)
    }
}

//-------------------------------

let search_keyword = ref('')

watch(search_keyword, (keyword) => {
    view_company.value = search_company(keyword, origin_company)
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

const search_company = (keyword, arr) => {
    if (!keyword) return arr
    // return arr.filter((company) => company.name == keyword || company.email == keyword)
    return arr.filter((company) => new RegExp(keyword).test(company.name) || new RegExp(keyword).test(company.manage))
}

const deepCopy = (target) => {
  return JSON.parse(JSON.stringify(target))
}

let origin_company = [
    {
        id: 1,
        name: '네스테크놀리지',
        phone: '02-1231-1231',
        memo: '담당',
        createdAt: '2023.07.10 14:11',
    },
]
let view_company = ref(origin_company)

const load_companyList = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    const { data } = await axios.get('/company/list', axios_config)

    origin_company = data
    view_company.value = deepCopy(origin_company)
}

load_companyList()

let input_company = ref(
    {
        name: '',
        phone: '',
        memo: '',
        // createdAt: '2023.07.10 14:11',
    },
)

const create_company = async () => {
    console.log(input_company.value);
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    await axios.post('/company/create', input_company.value, axios_config)

    state.popup.content = ['업체/개발사 등록이 완료되었습니다.']
    state.popup.toggle = true

    company_add.value = false

    load_companyList()
}

let company_checked_list:any = ref([])
const check_all_company = (e) => {
    if(e.target.checked) {
        view_company.value.forEach((company) => {
            company_checked_list.value.push(company.id)
        })
    }
    else{
        company_checked_list.value = []
    }
}

const delete_company = async () => {
    const axios_config = {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` }
    }

    await axios.post('/company/delete', {idArr: company_checked_list.value}, axios_config)
    
    load_companyList()
}
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}

.wrap{
    margin: 48px 30px;
    .company-list{
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
                        &.active{
                            background: #009EF7;
                            color: #fff;
                            svg{
                                path{
                                    fill: #fff;
                                }
                            }
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
                .company{
                    color: var(--primary-text, #222);
                    font-size: 14px;
                    font-weight: 400;
                    li{
                        height: 54px;
                        display: flex;
                        border-top: 1px solid #eee;
                        
                        input{
                            margin-right: 16px;
                            margin-left: 4px;
                        }
                        label{
                            display: flex;
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
                        }
                    }
                }
            }
        }
    }
    .company-add{
        width: 400px;
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
            label{
                display: block;
                color: var(--primary-text, #222);
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 4px;
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
            justify-content: space-between;
            .btn{
                width: 100%;
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