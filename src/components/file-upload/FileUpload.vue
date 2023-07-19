
<template>
    <div id="dropzone" class="dropzone dropzone-multiple" ref="dropzone">
        <div class="text">
            <button class="btn">파일선택</button>
            <p>파일을 업로드 하려면 드래그 하거나 파일을 선택해 주세요.</p>
            <p>xlsx, xls 파일만 업로드 가능</p>
        </div>
    </div>
    <div id="dropzone-list" class="scroll-y vh-40 mt-10" ref="dropzoneList"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

const dropzone = ref()
const dropzoneList = ref()

const files = ref([]);

const handleDrop = (e) => {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    for (let i = 0; i < fileList.length; i++) {
    //@ts-ignore
    files.value.push(fileList[i]);
    }
};

onMounted(() => {
    const myDropzone = new Dropzone(dropzone.value, {
        url: '/file/post',
        autoProcessQueue: false,
        clickable: false,
        addRemoveLinks: true,
        dictRemoveFile: '삭제',
        previewsContainer: dropzoneList.value,
    });
})
</script>

<style lang="scss">
.dropzone{
    background: #fff !important; padding: 0 !important;
    height: 200px;
    
    &.dz-drag-hover{background: #eee;}

    .text{
        width: 100%;height: 100%; margin-bottom: 10px;
    }

    .dz-message .dz-button{display: none; opacity: 0;}

    .dz-preview.dz-file-preview {
        width: 100%;
        min-height: 0;
        margin: 0;
        .dz-image{
            width: 50px;
            height: 50px;
            background: #000;
        }
    }
}
</style>