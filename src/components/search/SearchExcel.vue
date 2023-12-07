<template>
    <div class="popup" @click="emits('exit')">
        <div class="popup-wrap" @click="(e) => e.stopPropagation()">
            <div class="popup-header">
                <div><span>"{{state.search.keyword}}"</span>로 검색된 파일 내역 (총 {{count}}건)</div>
                <svg @click="emits('exit')" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_584_41385" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_584_41385)">
                <path d="M12.0005 13.0538L6.92737 18.1269C6.78892 18.2654 6.61489 18.3362 6.40527 18.3394C6.19567 18.3426 6.01844 18.2718 5.87357 18.1269C5.72869 17.982 5.65625 17.8064 5.65625 17.6C5.65625 17.3936 5.72869 17.218 5.87357 17.0731L10.9466 12L5.87357 6.92689C5.73511 6.78844 5.66427 6.6144 5.66107 6.40479C5.65786 6.19519 5.72869 6.01795 5.87357 5.87309C6.01844 5.7282 6.19407 5.65576 6.40047 5.65576C6.60687 5.65576 6.78251 5.7282 6.92737 5.87309L12.0005 10.9462L17.0736 5.87309C17.212 5.73462 17.3861 5.66379 17.5957 5.66059C17.8053 5.65737 17.9825 5.7282 18.1274 5.87309C18.2723 6.01795 18.3447 6.19359 18.3447 6.39999C18.3447 6.60639 18.2723 6.78202 18.1274 6.92689L13.0543 12L18.1274 17.0731C18.2658 17.2115 18.3367 17.3856 18.3399 17.5952C18.3431 17.8048 18.2723 17.982 18.1274 18.1269C17.9825 18.2718 17.8069 18.3442 17.6005 18.3442C17.3941 18.3442 17.2184 18.2718 17.0736 18.1269L12.0005 13.0538Z" fill="#222222"/>
                </g>
                </svg>
            </div>
            <div class="popup-section">
                <div class="content" v-for="folder in folder_list" :key="folder">
                    <div class="category">{{folder.name}}</div>
                    <div class="file" v-for="file in folder.files" :key="file" @click="file_click(file.id)">
                        <div class="img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                            <rect x="4.02051" y="2.88965" width="16.8485" height="17.8544" rx="1" fill="white"/>
                            <rect x="11.375" y="6" width="6.66667" height="1.33333" rx="0.666667" fill="#13A650"/>
                            <rect x="11.375" y="16" width="6.66667" height="1.33333" rx="0.666667" fill="#13A650"/>
                            <rect x="11.375" y="9.3335" width="6.66667" height="1.33333" rx="0.666667" fill="#13A650"/>
                            <rect x="11.375" y="12.6665" width="6.66667" height="1.33333" rx="0.666667" fill="#13A650"/>
                            <path d="M0.5 3.3286C0.5 2.83006 0.867198 2.40768 1.36089 2.33832L14.1976 0.535022C14.7994 0.450495 15.3368 0.917688 15.3368 1.5253V22.36C15.3368 22.9676 14.7994 23.4348 14.1976 23.3503L1.36089 21.547C0.867198 21.4776 0.5 21.0552 0.5 20.5567V3.3286Z" fill="#13A650"/>
                            <mask id="mask0_1043_15054" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="8" width="7" height="8">
                            <path d="M4.05469 9.83581C4.05469 9.30237 4.47339 8.86285 5.0062 8.83698L9.00856 8.64269C9.57921 8.61499 10.057 9.07019 10.057 9.64152V14.2437C10.057 14.8151 9.57921 15.2703 9.00856 15.2426L5.0062 15.0483C4.47339 15.0224 4.05469 14.5829 4.05469 14.0494V9.83581Z" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_1043_15054)">
                            <path d="M5.64041 8.67334L7.01039 10.922H7.05667L8.4359 8.67334H10.0095L7.96381 11.9425L10.0558 15.2116H8.44516L7.05667 12.9629H7.01039L5.6219 15.2116H4.02051L6.12175 11.9425L4.05753 8.67334H5.64041Z" fill="white"/>
                            </g>
                            </svg>
                        </div>
                        <div class="file-info">
                            <div class="file-name">{{file.name}}</div>
                            <div class="file-detail">
                                <div class="time">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                    <path d="M6.91841 1.32791C6.77951 1.31766 6.63995 1.3125 6.5 1.3125V0.5C6.65994 0.5 6.81943 0.5059 6.97817 0.517609L6.91841 1.32791ZM8.54691 1.6936C8.28631 1.59308 8.01866 1.51189 7.74614 1.45069L7.92416 0.657935C8.23561 0.727876 8.5415 0.820666 8.83932 0.935544L8.54691 1.6936ZM9.65981 2.27102C9.54344 2.19326 9.42454 2.12002 9.30336 2.05138L9.70384 1.34443C9.84234 1.42289 9.97823 1.50659 10.1112 1.59545C10.2442 1.6843 10.3735 1.77782 10.499 1.87574L9.99914 2.51628C9.88934 2.4306 9.77617 2.34877 9.65981 2.27102ZM11.15 3.72509C10.9892 3.49674 10.8118 3.28052 10.6192 3.07824L11.2076 2.51799C11.4277 2.74917 11.6305 2.99627 11.8143 3.25724L11.15 3.72509ZM11.7546 4.82349C11.701 4.69419 11.6428 4.56723 11.5802 4.44283L12.306 4.07753C12.3775 4.2197 12.444 4.3648 12.5052 4.51256C12.5664 4.66032 12.622 4.80993 12.6719 4.96107L11.9004 5.21594C11.8568 5.0837 11.8081 4.95279 11.7546 4.82349ZM12.1858 6.86042C12.1789 6.5812 12.1515 6.30285 12.1038 6.02765L12.9043 5.88875C12.9589 6.20326 12.9902 6.52137 12.998 6.84048L12.1858 6.86042ZM12.0782 8.10958C12.1055 7.97231 12.1277 7.83443 12.1447 7.69621L12.9511 7.79567C12.9316 7.95365 12.9063 8.11123 12.8751 8.26809C12.8439 8.42495 12.807 8.58022 12.7645 8.73363L11.9815 8.51693C12.0186 8.38271 12.0509 8.24684 12.0782 8.10958ZM11.3051 10.0428C11.4545 9.80683 11.5864 9.56015 11.6996 9.30481L12.4424 9.63407C12.313 9.92589 12.1623 10.2078 11.9916 10.4775L11.3051 10.0428ZM10.5217 11.0217C10.6206 10.9227 10.7157 10.8204 10.8066 10.7149L11.4219 11.2456C11.3179 11.3662 11.2093 11.4831 11.0962 11.5962L10.5217 11.0217Z" fill="#222222"/>
                                    <path d="M6.5 1.3125C5.56469 1.3125 4.64381 1.54317 3.81893 1.98407C2.99406 2.42498 2.29065 3.06251 1.77102 3.84019C1.25138 4.61788 0.931565 5.51172 0.839889 6.44253C0.748212 7.37334 0.887507 8.31239 1.24544 9.17651C1.60337 10.0406 2.16888 10.8031 2.89189 11.3965C3.6149 11.9899 4.47308 12.3957 5.39043 12.5782C6.30777 12.7607 7.25595 12.7141 8.151 12.4426C9.04604 12.1711 9.8603 11.683 10.5217 11.0217L11.0962 11.5962C10.3403 12.352 9.40975 12.9098 8.38685 13.2201C7.36395 13.5304 6.28031 13.5836 5.23191 13.3751C4.18352 13.1666 3.20274 12.7027 2.37645 12.0246C1.55015 11.3464 0.903847 10.475 0.494785 9.48744C0.0857224 8.49988 -0.0734727 7.42667 0.0313009 6.36289C0.136075 5.2991 0.501583 4.27758 1.09545 3.38879C1.68932 2.50001 2.49321 1.7714 3.43592 1.26751C4.37864 0.763621 5.43107 0.5 6.5 0.5V1.3125Z" fill="#222222"/>
                                    <path d="M6.09375 2.9375C6.31812 2.9375 6.5 3.11938 6.5 3.34375V7.57674L9.13906 9.08478C9.33386 9.19609 9.40154 9.44425 9.29023 9.63906C9.17891 9.83386 8.93075 9.90154 8.73594 9.79022L5.8922 8.16522C5.76562 8.09289 5.6875 7.95829 5.6875 7.8125V3.34375C5.6875 3.11938 5.86939 2.9375 6.09375 2.9375Z" fill="#222222"/>
                                    </svg>
                                    {{file.updatedAt}}
                                </div>
                                <div class="person">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <mask id="mask0_1043_15080" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                        <rect width="18" height="18" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_1043_15080)">
                                        <path d="M8.625 8.38813C7.90313 8.38813 7.28517 8.12434 6.77111 7.59676C6.25704 7.06917 6.00001 6.43494 6.00001 5.69408C6.00001 4.9532 6.25704 4.31897 6.77111 3.79139C7.28517 3.2638 7.90313 3 8.625 3C9.34686 3 9.96483 3.2638 10.4789 3.79139C10.993 4.31897 11.25 4.9532 11.25 5.69408C11.25 6.43494 10.993 7.06917 10.4789 7.59676C9.96483 8.12434 9.34686 8.38813 8.625 8.38813ZM13.1106 14.25H4.1394C3.82306 14.25 3.55408 14.1363 3.33246 13.9088C3.11082 13.6813 3 13.4053 3 13.0806V12.5388C3 12.1619 3.09976 11.8128 3.29929 11.4916C3.4988 11.1703 3.76538 10.9234 4.09903 10.7507C4.84039 10.3776 5.58823 10.0979 6.34255 9.91137C7.09688 9.72486 7.8577 9.63161 8.625 9.63161C9.3923 9.63161 10.1531 9.72486 10.9074 9.91137C11.6618 10.0979 12.4096 10.3776 13.151 10.7507C13.4846 10.9234 13.7512 11.1703 13.9507 11.4916C14.1502 11.8128 14.25 12.1619 14.25 12.5388V13.0806C14.25 13.4053 14.1392 13.6813 13.9175 13.9088C13.6959 14.1363 13.4269 14.25 13.1106 14.25ZM4.12498 13.0954H13.125V12.5388C13.125 12.3829 13.081 12.2386 12.993 12.1058C12.9051 11.9731 12.7856 11.8648 12.6346 11.7809C11.9885 11.4543 11.3296 11.2068 10.658 11.0386C9.98645 10.8703 9.30878 10.7862 8.625 10.7862C7.94122 10.7862 7.26355 10.8703 6.59197 11.0386C5.92039 11.2068 5.26153 11.4543 4.61537 11.7809C4.46441 11.8648 4.34494 11.9731 4.25697 12.1058C4.16898 12.2386 4.12498 12.3829 4.12498 12.5388V13.0954ZM8.625 7.23356C9.0375 7.23356 9.39063 7.08282 9.68438 6.78133C9.97813 6.47985 10.125 6.11743 10.125 5.69408C10.125 5.27072 9.97813 4.9083 9.68438 4.60682C9.39063 4.30533 9.0375 4.15459 8.625 4.15459C8.2125 4.15459 7.85937 4.30533 7.56562 4.60682C7.27187 4.9083 7.12499 5.27072 7.12499 5.69408C7.12499 6.11743 7.27187 6.47985 7.56562 6.78133C7.85937 7.08282 8.2125 7.23356 8.625 7.23356Z" fill="#222222"/>
                                    </g>
                                    </svg>
                                    {{file.history[0] ?file.history[0].user.name :'홍길동'}} {{file.history[0] ?file.history[0].user.teamName :'SKB(CATV 운용팀)'}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="popup-footer" v-if="btn == 1">
                <button class="popup-btn accept">확인</button>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
import store from "@/store";
import axios from "axios";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const state = store.state

const props = defineProps({
    // keyword: String,
    // code: String,
})

const emits = defineEmits([
    'exit',
])

// let search_keyword = ref()
let folder_list = ref([])
let file_push: any = []

let count = computed(() => {
    let result = 0
    try{
        folder_list.value.forEach((folder) => {
            const { files } = folder

            result = result + files.length
        })
    }
    catch(error) {console.log(error);}
    

    return result
})

const init = async () => {
  const { data } = await axios.get(`/search?q=${state.search.keyword}&folderCd=${state.search.folderCd}`)
  const { files, folders } = data

  folder_list.value = category_in_file(folders, files, 'code', 'folderCd')

  console.log(folder_list.value);
}

const category_in_file = (category_arr, file_arr, category_key, file_key) => {
  let result: any = []

  for (let i = 0; i < category_arr.length; i++) {
    const category = category_arr[i]

    result.push(category)

    category.files = []

    for (let j = 0; j < file_arr.length; j++) {
      const file: any = file_arr[j]

      if (!file_push.includes(file.id)) {
        if (category[category_key] == file[file_key]) {
          category.files.push(file)
          file_push.push(file.id)
        }
      }
    }
  }

  console.log(result);

  return result
}

// watch(() => props.keyword, async (value) => {
//     console.log(value);
    
// //   folder_list.value = []
// //   file_push = []

// //   await init()
// })

const file_click = (id, name, user, team, date, cate) => {
    // console.log(id, name);
    localStorage.setItem('id', id)
    // localStorage.setItem('name', name)
    // localStorage.setItem('user', user)
    // localStorage.setItem('team', team)
    // localStorage.setItem('date', date)
    // localStorage.setItem('cate', cate)


    emits('exit')
    router.push({ name: "excel" });
}

init()

onMounted(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = "hidden"//classList.add('scrollLock');
})

onUnmounted(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = "scroll"//classList.add('scrollLock');
})
</script>


<style lang="scss" scoped>
.popup{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    .popup-wrap{
        padding: 24px;
        background: #fff;
        border-radius: 8px;
        .popup-header{
            padding: 22px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            svg{
                cursor: pointer;
            }
            div{
                color: var(--primary-text, #222);
                font-size: 16px;
                font-weight: 400;
                span{
                    color: var(--data-bs-theme-light-bs-red, #DC3545);
                    font-weight: 700;
                }
            }
        }
        .popup-section{
            overflow-y: scroll;
            max-height: 440px;
            // padding: 24px 0;
            margin-top: 24px;
            padding-bottom: 24px;
            .content{
                .category{
                    padding: 8px 0;
                    color: var(--primary-text, #222);
                    font-size: 14px;
                    font-weight: 700;
                    margin-bottom: 0;
                }
                .file{
                    cursor: pointer;
                    display: flex;
                    padding: 8px 10px;
                    background: var(----bs-light, #F9F9F9);
                    .img{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        background: #F1F1F2;
                        border-radius: 50%;
                        margin-right: 9px;
                    }
                    .file-info{
                        .file-name{
                            color: var(--primary-text, #222);
                            font-size: 14px;
                            font-weight: 500;
                            margin-bottom: 6px;
                        }
                        .file-detail{
                            display: flex;
                            color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
                            font-size: 12px;
                            font-weight: 400;
                            .time{
                                margin-right: 6px;
                                svg{
                                    margin-right: 4px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>