<template>
    <div class="wrap">
        <div class="header">
            <div class="title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <mask id="mask0_395_19562" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_395_19562)">
                <path d="M9.37516 10.6256H5.2085C5.03141 10.6256 4.88298 10.5657 4.76318 10.4459C4.64339 10.326 4.5835 10.1775 4.5835 10.0004C4.5835 9.82319 4.64339 9.67478 4.76318 9.55513C4.88298 9.43548 5.03141 9.37565 5.2085 9.37565H9.37516V5.20898C9.37516 5.0319 9.43508 4.88346 9.55491 4.76367C9.67476 4.64388 9.82326 4.58398 10.0004 4.58398C10.1776 4.58398 10.326 4.64388 10.4456 4.76367C10.5653 4.88346 10.6251 5.0319 10.6251 5.20898V9.37565H14.7918C14.9689 9.37565 15.1173 9.43557 15.2371 9.5554C15.3569 9.67525 15.4168 9.82375 15.4168 10.0009C15.4168 10.1781 15.3569 10.3265 15.2371 10.4461C15.1173 10.5658 14.9689 10.6256 14.7918 10.6256H10.6251V14.7923C10.6251 14.9694 10.5652 15.1178 10.4454 15.2376C10.3255 15.3574 10.177 15.4173 9.99987 15.4173C9.8227 15.4173 9.67429 15.3574 9.55464 15.2376C9.43499 15.1178 9.37516 14.9694 9.37516 14.7923V10.6256Z" fill="#1C1B1F"/>
                </g>
                </svg>
                관리파일 그룹추가</div>
            <div class="btn-wrap">
                <div class="manage-file-btn order-save" @click="save">순서저장</div>
                <div class="manage-file-btn group-create" @click="create">그룹생성</div>
            </div>
        </div>
        <div class="section">
            <div class="group">
                <div class="no-group" v-if="!group.length">
                    <div class="no-group-img"><img src="@/assets/img/no-group-img.png" alt=""></div>
                    <div class="no-group-txt">등록된 관리파일 그룹이 없습니다.</div>
                </div>
                <draggable class="group-list" v-if="group.length" :list="group" @change="move"> 
                    <li v-for="group in group" :key="group">
                        <div v-if="group.state" @click="group.state = !group.state">{{group.name}}<span>{{group.count}}</span></div>
                        <svg v-if="group.state" @click="change_popup_state('delete', true, group)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <mask id="mask0_1006_6108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                        <rect width="18" height="18" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1006_6108)">
                        <path d="M8.99998 9.79035L11.3048 12.0952C11.4086 12.199 11.5392 12.2521 11.6964 12.2545C11.8536 12.2569 11.9865 12.2038 12.0952 12.0952C12.2038 11.9865 12.2582 11.8548 12.2582 11.7C12.2582 11.5452 12.2038 11.4135 12.0952 11.3048L9.79035 8.99998L12.0952 6.69516C12.199 6.59132 12.2521 6.46079 12.2545 6.30358C12.2569 6.14638 12.2038 6.01346 12.0952 5.90481C11.9865 5.79614 11.8548 5.74181 11.7 5.74181C11.5452 5.74181 11.4135 5.79614 11.3048 5.90481L8.99998 8.20961L6.69516 5.90481C6.59132 5.80096 6.46079 5.74783 6.30358 5.74543C6.14638 5.74302 6.01346 5.79614 5.90481 5.90481C5.79614 6.01346 5.74181 6.14518 5.74181 6.29998C5.74181 6.45478 5.79614 6.58651 5.90481 6.69516L8.20961 8.99998L5.90481 11.3048C5.80096 11.4086 5.74783 11.5392 5.74543 11.6964C5.74302 11.8536 5.79614 11.9865 5.90481 12.0952C6.01346 12.2038 6.14518 12.2582 6.29998 12.2582C6.45478 12.2582 6.58651 12.2038 6.69516 12.0952L8.99998 9.79035ZM9.00124 16.125C8.01579 16.125 7.08951 15.938 6.22241 15.564C5.3553 15.19 4.60104 14.6824 3.95963 14.0413C3.3182 13.4001 2.81041 12.6462 2.43624 11.7795C2.06208 10.9128 1.875 9.98669 1.875 9.00124C1.875 8.01579 2.062 7.08951 2.436 6.22241C2.81 5.3553 3.31756 4.60104 3.95869 3.95963C4.59983 3.3182 5.35376 2.81041 6.22048 2.43624C7.08719 2.06208 8.01328 1.875 8.99873 1.875C9.98418 1.875 10.9105 2.062 11.7776 2.436C12.6447 2.81 13.3989 3.31756 14.0403 3.95869C14.6818 4.59983 15.1896 5.35376 15.5637 6.22048C15.9379 7.08719 16.125 8.01328 16.125 8.99873C16.125 9.98418 15.938 10.9104 15.564 11.7776C15.19 12.6447 14.6824 13.3989 14.0413 14.0403C13.4001 14.6818 12.6462 15.1896 11.7795 15.5637C10.9128 15.9379 9.98669 16.125 9.00124 16.125ZM8.99998 15C10.675 15 12.0937 14.4187 13.2562 13.2562C14.4187 12.0937 15 10.675 15 8.99998C15 7.32498 14.4187 5.90623 13.2562 4.74373C12.0937 3.58123 10.675 2.99998 8.99998 2.99998C7.32498 2.99998 5.90623 3.58123 4.74373 4.74373C3.58123 5.90623 2.99998 7.32498 2.99998 8.99998C2.99998 10.675 3.58123 12.0937 4.74373 13.2562C5.90623 14.4187 7.32498 15 8.99998 15Z" fill="#B5B5C3"/>
                        </g>
                        </svg>

                        <input @change="change_rename" v-if="!group.state" type="text" :value="group.name">
                        <svg v-if="!group.state" @click="change_popup_state('rename', true, group)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM12.0303 4.96967C12.3196 5.25897 12.3232 5.72582 12.041 6.01947L8.04876 11.0097C8.043 11.0169 8.03685 11.0238 8.03032 11.0303C7.73743 11.3232 7.26256 11.3232 6.96966 11.0303L4.32322 8.38388C4.03032 8.09099 4.03032 7.61612 4.32322 7.32322C4.61611 7.03033 5.09098 7.03033 5.38388 7.32322L7.4774 9.41674L10.9498 4.9921C10.9559 4.98424 10.9626 4.97674 10.9697 4.96967C11.2626 4.67678 11.7374 4.67678 12.0303 4.96967Z" fill="#000000"/>
                        </svg>
                    </li>
                    <!-- <li>
                        <div>HD방송<span>7</span></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <mask id="mask0_1006_6108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                        <rect width="18" height="18" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1006_6108)">
                        <path d="M8.99998 9.79035L11.3048 12.0952C11.4086 12.199 11.5392 12.2521 11.6964 12.2545C11.8536 12.2569 11.9865 12.2038 12.0952 12.0952C12.2038 11.9865 12.2582 11.8548 12.2582 11.7C12.2582 11.5452 12.2038 11.4135 12.0952 11.3048L9.79035 8.99998L12.0952 6.69516C12.199 6.59132 12.2521 6.46079 12.2545 6.30358C12.2569 6.14638 12.2038 6.01346 12.0952 5.90481C11.9865 5.79614 11.8548 5.74181 11.7 5.74181C11.5452 5.74181 11.4135 5.79614 11.3048 5.90481L8.99998 8.20961L6.69516 5.90481C6.59132 5.80096 6.46079 5.74783 6.30358 5.74543C6.14638 5.74302 6.01346 5.79614 5.90481 5.90481C5.79614 6.01346 5.74181 6.14518 5.74181 6.29998C5.74181 6.45478 5.79614 6.58651 5.90481 6.69516L8.20961 8.99998L5.90481 11.3048C5.80096 11.4086 5.74783 11.5392 5.74543 11.6964C5.74302 11.8536 5.79614 11.9865 5.90481 12.0952C6.01346 12.2038 6.14518 12.2582 6.29998 12.2582C6.45478 12.2582 6.58651 12.2038 6.69516 12.0952L8.99998 9.79035ZM9.00124 16.125C8.01579 16.125 7.08951 15.938 6.22241 15.564C5.3553 15.19 4.60104 14.6824 3.95963 14.0413C3.3182 13.4001 2.81041 12.6462 2.43624 11.7795C2.06208 10.9128 1.875 9.98669 1.875 9.00124C1.875 8.01579 2.062 7.08951 2.436 6.22241C2.81 5.3553 3.31756 4.60104 3.95869 3.95963C4.59983 3.3182 5.35376 2.81041 6.22048 2.43624C7.08719 2.06208 8.01328 1.875 8.99873 1.875C9.98418 1.875 10.9105 2.062 11.7776 2.436C12.6447 2.81 13.3989 3.31756 14.0403 3.95869C14.6818 4.59983 15.1896 5.35376 15.5637 6.22048C15.9379 7.08719 16.125 8.01328 16.125 8.99873C16.125 9.98418 15.938 10.9104 15.564 11.7776C15.19 12.6447 14.6824 13.3989 14.0413 14.0403C13.4001 14.6818 12.6462 15.1896 11.7795 15.5637C10.9128 15.9379 9.98669 16.125 9.00124 16.125ZM8.99998 15C10.675 15 12.0937 14.4187 13.2562 13.2562C14.4187 12.0937 15 10.675 15 8.99998C15 7.32498 14.4187 5.90623 13.2562 4.74373C12.0937 3.58123 10.675 2.99998 8.99998 2.99998C7.32498 2.99998 5.90623 3.58123 4.74373 4.74373C3.58123 5.90623 2.99998 7.32498 2.99998 8.99998C2.99998 10.675 3.58123 12.0937 4.74373 13.2562C5.90623 14.4187 7.32498 15 8.99998 15Z" fill="#B5B5C3"/>
                        </g>
                        </svg>
                    </li> -->
                </draggable>
                <!-- <draggable class="dragArea list-group w-full" :list="list" @change="log">
                    <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="element in list"
                    :key="element.name"
                    >
                    {{ element.name }}
                    </div>
                </draggable> -->
            </div>
            <div class="group-adjust">
                <div class="group-name">관리파일 그룹 명</div>
                <div class="group-name-change">
                    <input type="text" ref="input_add_group">
                </div>
            </div>
        </div>
    </div>
    <Popup v-if="popup_state['rename']" @accept="rename_group" @exit="change_popup_state('rename', false, null)" :content="[`해당 그룹 이름을 변경하시겠습니까?`]"/>
    <Popup v-if="popup_state['delete']" @accept="delete_group" @exit="change_popup_state('delete', false, null)" :content="[`${group_data.name} 그룹을 삭제하시겠습니까?`]"/>
    <Popup v-if="popup_state['noname']" @exit="change_popup_state('noname', false, null)" :content="[`관리파일 그룹명을 입력하세요.`]" :btnCount="1"/>
    <!-- <Popup v-if="accept_popup_state" @accept="accept_member" @exit="change_popup_state('accept', false)" :content="`${member_checked_list.length}명의 회원을 승인처리 하시겠습니까?`" /> -->
</template> 

<script setup lang="ts">
import Popup from '@/components/Popup.vue'
import {VueDraggableNext as draggable} from "vue-draggable-next"

import { guardReactiveProps, ref } from "vue";
import axios from 'axios';
import store from '@/store';

const group:any = ref([])

const init = async () => {
    try{
        const { data } = await axios.post('/folder/list')

        group.value = data
    }
    catch(error) {console.log(error);}

    try{
        const { data } = await axios.post('/file/list')

        group.value.forEach(category =>{
            category.state = true

            category.count = 0
            
            data.forEach(file => {
                if (category.code == file.folderCd) category.count++
            })
        })
    }
    catch(error) {console.log(error);}
}

init()

const move = async (e) => {
    console.log(group.value);
}

const save = async () => {
    await group.value.forEach(async (each_group, idx) => {
        each_group.order = idx + 1

        console.log(each_group);
        

        await axios.post('/folder/update', {
            id: each_group.id,
            order: each_group.order,
        })
    })
    console.log(group.value);

    alert('순서저장이 완료되었습니다.')

    // await axios.post('/folder/update', group.value)
}

const input_add_group = ref()

let popup_state = ref({
    rename: false,
    delete: false,
    noname: false,
})

let group_data: any = null
let rename_data: any = null

const create = async () => {
    if (!input_add_group.value.value) return popup_state.value['noname'] = true
    
    await axios.post('/folder/create', {
        name: input_add_group.value.value
    })
    
    init()
    store.state.upload++
}

const change_rename = (e) => {
    rename_data = e.target.value
}

const rename_group = async () => {
    const group = group_data

    if (rename_data == '' || rename_data.replace(/ /g, '') == '') return popup_state.value['noname'] = true

    await axios.post('/folder/update', {
        id: group.id,
        name: rename_data,
    })

    group.state = !group.state
    group_data = null
    rename_data = null

    init()
    store.state.upload++
}

const delete_group = async () => {
    const group = group_data
    
    if (group.count > 0) return alert('하나 이상의 파일이 존재합니다.')

    await axios.post('/folder/delete', {
        id: group.id
    })

    group_data = null

    init()
    store.state.upload++
}

const change_popup_state = (popup_type, state, group) => {
    popup_state.value[popup_type] = state
    // if (popup_type == 'rename') rename_popup_state.value = state
    // if (popup_type == 'delete') delete_popup_state.value = state
    // if (popup_type == 'notName') notGroupName_state.value = state
    if (popup_type == 'rename' && state == false) {
        group_data.state = !group_data.state
    }

    group_data = group
}
</script>

<style lang="scss" scoped>
li{list-style: none;}
ul{padding: 0;margin: 0;}
p{margin: 0;padding: 0;}
.wrap{
    margin: 48px 0 0 0;
    background: #fff;
    padding: 0 30px;
    height: 100%;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0;
        border-bottom: 1px solid var(----el-border, #DCDFE6);
        .title{
            display: flex;
            align-items: center;
            color: var(--primary-text, #222);
            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%; /* 20px */
            // margin-bottom: 24px;
            // padding-bottom: 24px;
        }
        .btn-wrap{
            display: flex;
            align-items: center;
            .manage-file-btn{
                cursor: pointer;
                margin-left: 8px;
                width: 140px;
                height: 38px;
                text-align: center;
                padding: 9px 24px;
                border-radius: 6px;
                background: var(--default-red, #DA1E28);

                color: #FFF;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 0.5px;
                &.order-save{
                    background: var(--root-data-theme-light-kt-primary, #009EF7);
                }
            }
        }
    }
    .section{
        display: flex;
        .group{
            width: 280px;
            .no-group{
                display: flex;
                flex-direction: column;
                align-items: center;
                height: calc(100vh - 70px - 48px - 190px);
                margin: 20px 0;
                padding-top: 200px;
                border-radius: 10px;
                background: var(--root-data-theme-light-kt-light, #F5F8FA);
                .no-group-img{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: #fff;
                    img{
                        width: 48px;
                        height: 48px;
                    }
                }
                .no-group-txt{
                    margin-top: 16px;
                    color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
                    font-size: 14px;
                    font-weight: 500;
                }
            }
            .group-list{
                padding: 24px 10px 0 10px;
                border-right: 1px solid var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
                height: calc(100vh - 70px - 48px - 150px);
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 7px 8px;
                    color: var(--primary-text, #222);
                    font-size: 14px;
                    font-weight: 500;
                    span{
                        margin-left: 3px;
                        padding: 1px 8px;
                        border-radius: 16px;
                        background: var(--data-bs-theme-light-bs-danger, #F1416C);

                        color: var(--default-white, #FFF);
                        font-size: 10px;
                        font-weight: 700;
                    }
                }
            }
        }
        .group-adjust{
            padding: 24px;
            .group-name{
                color: var(--coolgray-cool-gray-100, #14171B);
                font-size: 14px;
                font-weight: 500;
                padding-bottom: 8px;
            }
            .group-name-change{
                input{
                    padding: 13px 16px; 
                    width: 320px;
                    height: 46px;
                    border-radius: 10px;
                    border: 1px solid var(----kt-form-check-input-bg-solid, #EFF2F5);
                    background: var(--default-white, #FFF);
                }
            }
        }
    }
}
</style>