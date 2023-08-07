<template>
    <div class="wrap">
        <div class="title">즐겨찾기</div>
        <div class="table-wrap">
            <div class="table-header">
                <ul>
                    <li>파일명</li>
                    <li>시트</li>
                    <li>asdasd</li>
                    <li>asdasd</li>
                    <li>asdasd</li>
                </ul>
            </div>
            <div class="table-body">
                <ul>
                    <li><p>asdasda</p><p>asdasda</p></li>
                    <li>asdasd</li>
                    <li>asdasd</li>
                    <li>asdasd</li>
                    <li>asdasd</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
li{list-style: none;}
ul{padding: 0;margin: 0;}
p{margin: 0;padding: 0;}
.wrap{
    margin: 48px 30px 30px 0;
    .title{
        color: var(--primary-text, #222);
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%; /* 20px */
        margin-bottom: 24px;
        padding-bottom: 24px;
    }
    .table-wrap{
        .table-header{
            display: flex;
            padding: 10px 16px;
            align-items: center;
            background: #000;
            height: 70px;
            border-bottom: 2px solid var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            background: #F4F4F4;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-between;
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
                    font-weight: 500;
                    line-height: 100%; /* 16px */
                }
            }
        }
        .table-body{
            display: flex;
            height: 80px;
            padding: 10px 16px;
            align-items: center;
            border-bottom: 1px solid var(--data-bs-theme-light-bs-text-gray-400, #B5B5C3);
            background: #FFF;

            ul{
                width: 100%;
                display: flex;
                justify-content: space-between;
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
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 100%; /* 14px */
                }
            }
        }
    }
}
</style>