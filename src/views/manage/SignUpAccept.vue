<template>
    <div class="wrap">
        <div class="header">
            <div class="title">회원가입 승인</div>
            <div class="btn-wrap">
                <div class="btn btn-danger">삭제</div>
                <div class="btn btn-primary">회원승인</div>
            </div>
        </div>
        <div class="section">
            <div class="search">

            </div>
            <div class="accept">
                <ul class="info">
                    <li><div>팀명</div><div>이름</div></li>
                </ul>
                <ul class="member">
                    <li><div>CATV운용팀</div><div>홍길동</div></li>
                </ul>
            </div>
        </div>
    </div>
</template>

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
    }
    .section{
        background: #fff;
        padding: 0 24px;
        .search{
            padding: 16px 0;
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
                    // border-top: 1px solid #eee;
                    div{
                        display: flex;
                        align-items: center;
                        width: 180px;
                        // &:nth-child(1) {
                        // }
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
                    }
                }
            }
        }
    }
}
</style>