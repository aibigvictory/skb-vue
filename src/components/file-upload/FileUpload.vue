
<template>
    <div id="dropzone" class="dropzone dropzone-multiple" ref="dropzone">
        <button class="btn btn btn-lg btn-dark fw-bold w-200px">파일선택</button>
        <p class="fs-4">파일을 업로드 하려면 드래그 하거나 파일을 선택해 주세요.</p>
        <p class="text-danger">xlsx, xls 파일만 업로드 가능</p>
        <!-- <div @click="fileUpload">asdasdasd</div> -->
    </div>
    <div id="dropzone-list" class="scroll-y vh-40 mt-10" ref="dropzoneList"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

const dropzone = ref()
const dropzoneList = ref()

let fileUpload = () => {
    console.log('12312313');
}      

onMounted(() => {
    const myDropzone = new Dropzone(dropzone.value, {
        url: 'http://localhost:3000/file',
        // autoProcessQueue: false,
        clickable: true,
        addRemoveLinks: true,
        dictRemoveFile: '✘',
        previewsContainer: dropzoneList.value,
        previewTemplate: 
        `<div class="dz-preview dz-file-preview">
            <div class="dz-content">
                <div class="dz-thumbnail"><img src="${require('@/assets/img/excel.png')}" /></div>
                <div class="dz-details">
                    <div class="dz-filename"><span data-dz-name></span></div>
                    <div class="dz-size" data-dz-size></div>
                    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                </div>
            </div>
        </div>`
    });

    fileUpload = () => {
        myDropzone.processQueue()
    }
})
</script>

<style lang="scss">
#dropzone{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: #fff !important;
    height: 200px;
    width: 100%;
    padding: 20px 0;
    margin-bottom: 10px;

    button, p{
        pointer-events: none;
    }
    p{
        margin-bottom: 0;
    }
    
    &.dz-drag-hover{background: #eee;}

    .dz-message .dz-button{display: none; opacity: 0;}

}
#dropzone-list{
    .dz-preview.dz-file-preview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #eee;
        width: 75%;
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
                    margin-top: 10px;
                    .dz-upload{
                        display: block;
                        height: 5px;
                        width: 0;
                        background: #297e5a;
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
</style>