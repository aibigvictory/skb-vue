 <template>
    <div class="wrap">
        <div class="title">즐겨찾기</div>
        <div class="table-wrap">
            <div class="table-header">
                <ul>
                    <li>파일명</li>
                    <li>시트</li>
                    <li>최초등록</li>
                    <li>등록일시</li>
                    <li>수정자</li>
                    <li>수정일시</li>
                </ul>
            </div>
            <div class="table-body">
                <ul v-for="ul in data" :key="ul">
                    <!-- <li v-for="li in ul" :key="li">{{li}}</li> -->
                    <li>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M3.61224 15.9427C3.2258 16.1413 2.78823 15.7942 2.86603 15.3508L3.69576 10.6213L0.173428 7.26462C-0.155753 6.95092 0.0146475 6.37737 0.455637 6.31472L5.35411 5.61885L7.53823 1.2923C7.73498 0.902565 8.26795 0.902565 8.4647 1.2923L10.6488 5.61885L15.5473 6.31472C15.9883 6.37737 16.1587 6.95092 15.8295 7.26462L12.3072 10.6213L13.1369 15.3508C13.2147 15.7942 12.7771 16.1413 12.3907 15.9427L8.00146 13.6868L3.61224 15.9427Z" fill="#FFC700"/>
                            </svg>
                        </span>
                        {{ul.filename}}
                    </li>
                    <li><span>{{ul.sheet}}</span></li>
                    <li><span class="purson">{{ul.registor}}</span> <span class="depart" v-if="ul.registor_depart">{{ul.registor_depart}}</span></li>
                    <li><div>
                        <div>{{ul.register_date.slice(0,10)}}</div>
                        <div>{{ul.register_date.slice(10,20)}}</div>
                    </div></li>
                    <li><span class="purson">{{ul.editor ?ul.editor :'-'}}</span> <span class="depart" v-if="ul.editor_depart">{{ul.editor_depart}}</span></li>
                    <li><div>
                        <div>{{ul.edit_date.slice(0,10)}}</div>
                        <div>{{ul.edit_date.slice(10,20)}}</div>
                    </div></li>
                </ul>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { ref } from "vue";

const data:any = ref([])
data.value = [
    {
        filename: '2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216',
        sheet: '도봉강북_IP',
        registor: '공유',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '공유',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: '2023_SKB_CATV_SO채널라인업_230320_수원 주파수 재이동',
        sheet: '수원',
        registor: '안보현',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '유재석',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: 'SD ReENC_MUX',
        registor: '장원영',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: '2022_다이렉트 HD방송_IPto8VSB_채널라인업_20230216',
        sheet: '수원_QAM',
        registor: '이효리',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '공유',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: '2023_SKB_CATV_SO채널라인업_230320_수원 주파수 재이동',
        sheet: '수원_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '보아',
        editor_depart: 'SKB',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
    {
        filename: 'CATV관리문서_MUX_SCR_230428',
        sheet: '낙동,동남, 북부산_QAM',
        registor: '화사',
        registor_depart: 'SKB',
        register_date: '2023.06.26 12:23:35',
        editor: '',
        editor_depart: '',
        edit_date: '2023.06.26 12:23:35'
    },
]
</script>

<style lang="scss" scoped>
li{list-style: none;}
ul{padding: 0;margin: 0;}
p{margin: 0;padding: 0;}
.wrap{
    margin: 48px 30px 30px 0;
    background: #fff;
    .title{
        color: var(--primary-text, #222);
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%; /* 20px */
        // margin-bottom: 24px;
        // padding-bottom: 24px;
        padding: 24px 30px;
    }
    .table-wrap{
        .table-header{
            display: flex;
            padding: 10px 30px;
            align-items: center;
            // border-bottom: 2px solid var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            // background: #F4F4F4;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 49px;
                li{
                    &:nth-child(1){
                        width: 560px;
                    }
                    width: 190px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;

                    color: var(--primary-text, #222);
                    font-family: Pretendard;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: bold;
                    line-height: 100%; /* 16px */
                }
            }
        }
        .table-body{
            background: #FFF;
            padding: 0 30px;
            ul{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-top: 1px solid var(--kt-border-color, #EFF2F5);
                padding: 10px 0;
                li{
                    &:nth-child(1){
                        width: 560px;
                        flex-direction: row;
                        justify-content: start;
                        align-items: center;
                        span{
                            margin-right: 8px;
                        }
                    }
                    &:nth-child(2){
                        span{
                            width: 120px;
                        }
                    }
                    padding: 10px 0;
                    width: 190px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;

                    color: var(--primary-text, #222);
                    font-family: Pretendard;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 100%; /* 14px */

                    word-wrap: keep-all;

                    span.purson{
                        // height: 38px;
                    }

                    span.depart{
                        width: 66px;
                        height: 21px;
                        display: flex;
                        padding: 4px 20px;
                        margin-top: 8px;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;
                        border-radius: 21px;
                        background: #FFF5F8;
                    }
                }
            }
        }
    }
}
</style>