
<template>
    <div class="upload-wrap">
        <div class="category d-flex" v-if="props.type == 'manage'">
            <div class="btn_category" v-for="category in store.getters.getData('folder_manage')" :key="category" @click="change_category($event, category.code)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M0.471955 3.38646L0.437344 2.625C0.437344 1.6585 1.22085 0.875 2.18734 0.875H5.39997C5.8641 0.875 6.30922 1.05937 6.63741 1.38756L7.36228 2.11244C7.69047 2.44063 8.13559 2.625 8.59972 2.625H12.0835C13.1126 2.625 13.9195 3.50861 13.8264 4.53344L13.2695 10.6584C13.1876 11.5598 12.4318 12.25 11.5267 12.25H2.47298C1.56787 12.25 0.812107 11.5598 0.730163 10.6584L0.173345 4.53344C0.134797 4.10941 0.250341 3.70955 0.471955 3.38646ZM1.91616 3.5C1.40163 3.5 0.998168 3.9418 1.04475 4.45422L1.60157 10.5792C1.64254 11.0299 2.02042 11.375 2.47298 11.375H11.5267C11.9793 11.375 12.3572 11.0299 12.3981 10.5792L12.9549 4.45422C13.0015 3.9418 12.5981 3.5 12.0835 3.5H1.91616ZM6.01869 2.00628C5.85459 1.84219 5.63203 1.75 5.39997 1.75H2.18734C1.70961 1.75 1.3213 2.13286 1.3125 2.60848L1.31801 2.72969C1.50421 2.66202 1.70553 2.625 1.91616 2.625H6.63741L6.01869 2.00628Z" fill="#B5B5C3"/>
                </svg>
                {{category.name}}
            </div>
        </div>
        <div id="dropzone" class="dropzone dropzone-multiple" ref="dropzone">
            <div class="svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 114 114" fill="none">
                <circle cx="57.1764" cy="56.8793" r="56.4713" fill="#F5F8FA"/>
                <path d="M35.1331 28.6439C35.1331 27.3963 36.1444 26.385 37.392 26.385H58.2962H68.964C69.55 26.385 70.1132 26.6128 70.5344 27.0203L75.52 31.8427L80.6859 36.3524C81.1772 36.7813 81.4592 37.4018 81.4592 38.0541V47.67V79.7945C81.4592 81.042 80.4479 82.0534 79.2004 82.0534H37.392C36.1444 82.0534 35.1331 81.042 35.1331 79.7945V28.6439Z" fill="#DEE9EC"/>
                <rect x="31.7643" y="36.797" width="22.7176" height="17.0382" rx="1.12943" fill="#13A650"/>
                <path d="M40.4925 38.6903L43.0708 43.2479H43.1579L45.7537 38.6903H48.7154L44.8652 45.3163L48.8025 51.9422H45.7712L43.1579 47.3846H43.0708L40.4576 51.9422H37.4437L41.3984 45.3163L37.5134 38.6903H40.4925Z" fill="white"/>
                <rect x="41.072" y="58.5852" width="16.036" height="3.27461" fill="#8C9095"/>
                <rect x="41.072" y="64.0426" width="16.036" height="3.27461" fill="#8C9095"/>
                <rect x="41.072" y="69.5006" width="16.036" height="3.27461" fill="#8C9095"/>
                <rect x="59.484" y="58.5852" width="16.036" height="3.27461" fill="#8C9095"/>
                <rect x="59.484" y="64.0426" width="16.036" height="3.27461" fill="#8C9095"/>
                <rect x="59.484" y="69.5006" width="16.036" height="3.27461" fill="#8C9095"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M75.5781 73.8127C76.609 73.8127 77.101 72.5448 76.3398 71.8495L69.1539 65.2847C68.7225 64.8906 68.0618 64.8906 67.6304 65.2847L60.4445 71.8495C59.6833 72.5448 60.1753 73.8127 61.2062 73.8127H63.0831C63.7069 73.8127 64.2125 74.3184 64.2125 74.9422V85.8358C64.2125 86.4596 64.7182 86.9652 65.342 86.9652H71.8823C72.5061 86.9652 73.0117 86.4596 73.0117 85.8358V74.9422C73.0117 74.3184 73.5174 73.8127 74.1411 73.8127H75.5781Z" fill="#DA1E28"/>
                </svg>
            </div>
            <button class="select btn btn btn-lg btn-dark fw-bold w-200px">파일선택</button>
            <p class="fs-4">파일을 업로드 하려면 드래그 하거나 파일을 선택해 주세요.</p>
            <p class="text-danger">xlsx 파일만 업로드 가능합니다.</p>
            <!-- <div @click="fileUpload">asdasdasd</div> -->
        </div>
        <div id="dropzone-list" class="scroll-y mt-10" ref="dropzoneList"></div>
    </div>
</template>

<script setup lang="ts">
import Popup from '@/components/Popup.vue'

import { onMounted, ref } from "vue";
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import axios from "axios";
import { ca } from "element-plus/es/locale";
import store from "@/store";
import JwtService from "@/core/services/JwtService";
import { change_popup_state } from '@/assets/utils/popup.js'

const state = store.state
const props = defineProps({
    type: String
})

console.log('props: ', props);

// 카테고리 시작---------------------------------------------

// 관리파일 카테고리 목록

const init = async () => {
}

init()

// 카테고리 클릭시 이벤트
const change_category = (e, code) => {
    // 카테고리 클릭시 모든 html 요소에 active 클래스 제거하고 클릭한 요소에 active 클래스 추가
    e.target.parentNode.childNodes.forEach(element => {
        if (element.classList && element.classList.contains('active')) element.classList.remove('active')  
    })
    e.target.classList.add('active')
    
    // 카테고리 클릭시 myDropzone option params 카테고리 변경
    myDropzone.options.params.folderCd = code
}

// 카테고리 종료---------------------------------------------

const dropzone = ref()
const dropzoneList = ref()

let myDropzone: any = 'DropZone Object'

const fileUpload = async () => {
    
    
    // console.log(myDropzone.files);
    // console.log(category);
    
    console.log(myDropzone.options.params);
    
    
    if (!myDropzone.files.length) {
        state.popup.content = ['파일이 없습니다.']
        state.popup.toggle = true
        return
    }
    if (!myDropzone.options.params.folderCd) {
        state.popup.content = ['카테고리를 선택해주세요.']
        state.popup.toggle = true
        return
    }

    await myDropzone.processQueue()
    setTimeout(() => {
        store.state.upload++
    }, 1000)
}   

onMounted(() => {
    try{
        myDropzone = new Dropzone(dropzone.value, {
            url: `${process.env.VUE_APP_API_URL}/file/upload`,
            autoProcessQueue: false, 
            headers: { 'Authorization': 'Bearer ' + JwtService.getToken() },
            params: {
                type: props.type == 'etc' ?'etc' :'manage',
                folderCd: props.type == 'etc' ?'002' :'',
            },
            paramName: "files",
            acceptedFiles: null,
            maxFiles: 100,
            parallelUploads: 100,
            clickable: true,
            addRemoveLinks: true,
            dictRemoveFile: '✘',
            uploadMultiple: true,
            previewsContainer: dropzoneList.value,
            previewTemplate: 
            `<div class="dz-preview dz-file-preview">
                <div class="dz-content">
                    <div class="dz-thumbnail"><img src="${require('@/assets/img/upload-icon.svg')}" /></div>
                    <div class="dz-details">
                        <div class="dz-filename"><span data-dz-name></span></div>
                        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                        <div class="dz-size" data-dz-size></div>
                    </div>
                </div>
            </div>`
        });
    
        myDropzone.on("addedfile", function(file) {
            // if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { // xlsx 파일이 아닌 경우
            if (!file.name.endsWith('.xlsx')) {
                state.popup.content = [`XLSX 형식의 파일만 지원 가능합니다.`]
                state.popup.toggle = true
                
                myDropzone.removeFile(file); // 파일 제거
            }
            else{
                document.querySelector('.dashboard-btn-upload')?.classList.add('active')
            }
        });

        myDropzone.on("removedfile", function(file, data) {
            console.log(file);
            console.log(data);
            
            console.log(myDropzone.files.length);
            if (!myDropzone.files.length) {
                document.querySelector('.dashboard-btn-upload')?.classList.remove('active')
            }
            
        });

        // myDropzone.on("complete", function(file) {
        //     alert('업로드가 완료되었습니다.')
        // });

        myDropzone.on("successmultiple", function(file) {
            console.log(file);
            
            state.popup.content = ['업로드가 완료되었습니다.']
            state.popup.toggle = true
        });

        // myDropzone.on("success", function(file) {
        //     console.log(file);
            
        //     alert('업로드가 완료되었습니다.')
        // });

        myDropzone.on("errormultiple", function(fileList, data) {
            let fileNameList: any = []
            
            fileList.forEach((file) => {
                fileNameList.push(file.name)
            })

            if (data.message == 'Conflict') state.popup.content = ['아래 파일은 파일명이 중복되었습니다.', ...fileNameList]
            else                            state.popup.content = ['아래 파일에 대해 업로드가 실패하였습니다.', ...fileNameList]
            state.popup.toggle = true
        });

        // myDropzone.on("error", function(file) {
        //     alert('업로드가 실패하였습니다.')
        // });
    }
    catch(error) {
        console.log(error);
    }
    
})

defineExpose({
    fileUpload,
});


</script>

<style lang="scss">
.upload-wrap{
    background: #fff;
    border-radius: 10px;
    padding: 16px 24px;
}
#dropzone{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: #fff !important;
    width: 100%;
    padding: 30px 0 50px 0;
    margin-bottom: 10px;

    svg{
        width: 80px;
        height: 80px;
    }

    .select{
        margin-top: 27.11px;
        border-radius: 49.695px;
        background: var(--data-bs-theme-light-bs-text-gray-200, #F1F1F2) !important;
        display: flex;
        padding: 15.812px 9.035px;
        justify-content: center;
        align-items: center;
        gap: 9.035px;

        color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
        text-align: center;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%; /* 18.071px */
    }

    button, p{
        pointer-events: none;
    }
    p{
        margin-bottom: 0;
        margin-top: 22.59px;
        color: var(--primary-text, #222);
        text-align: center;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%; /* 16px */
        &:nth-child(4) {
            margin-top: 9.04px;
            color: var(--data-bs-theme-light-bs-red, #DC3545);
            text-align: center;
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 16px */
        }
    }
    
    &.dz-drag-hover{background: #eee;}

    .dz-message .dz-button{display: none; opacity: 0;}

}
#dropzone-list{
    background: #fff;
    max-height: 30vh;
    .dz-preview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        padding: 10px 20px 10px 10px;
        margin-bottom: 10px;
        .dz-content{
            display: flex;
            align-items: center;
            width: 100%;
            .dz-thumbnail{
                width: 60px;
                height: 30px;
                margin-right: 10px;
            }
            .dz-details{
                width: 100%;
                .dz-progress{
                    width: 95%;
                    margin: 6px 0;
                    height: 8px;
                    background: var(--data-bs-theme-light-bs-text-gray-200, #F1F1F2);
                    .dz-upload{
                        display: block;
                        height: 8px;
                        width: 0;
                        background: var(--root-data-theme-light-kt-primary, #009EF7);
                    }
                }
            }
        }
        // &.dz-complete{
        //     .dz-upload{
        //         background: #297e5a !important;
        //     }
        // }
    }
}
.category{
    margin-bottom: 24px;
    .btn_category{
        cursor: pointer;
        margin-right: 6px;
        padding: 10px;
        border-radius: 32px;
        border: 1px solid var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
        background: #FFF;

        color: var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%; /* 14px */
        letter-spacing: 0.5px;


        &.active{
            border: 1px solid var(--root-data-theme-light-kt-primary, #009EF7);
            background: var(--root-data-theme-light-kt-primary, #009EF7);

            color: var(--default-white, #FFF);

            path{
                fill: #fff
            }
        }
    }
    // div{
    //     margin-left: 13px;
    //     font-size: 16px;
    //     font-weight: 300;
    //     &.active{
    //         font-weight: 800;
    //     }
    // }
}
</style>