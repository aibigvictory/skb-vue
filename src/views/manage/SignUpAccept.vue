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
                <input class="search-input" type="text" placeholder="이름/이메일 검색">
                <button class="search-btn">검색</button>
                <div class="type">
                    <input type="checkbox" name="" id="search-check-all">
                    <label for="search-check-all">전체</label>
                    <input type="checkbox" name="" id="search-check-accepted">
                    <label for="search-check-accepted">승인</label>
                    <input type="checkbox" name="" id="search-check-wait-accept">
                    <label for="search-check-wait-accept">승인요청</label>
                </div>
                <!-- <div class="search-input"></div> -->
            </div>
            <div class="accept">
                <ul class="info">
                    <li>
                        <input type="checkbox">
                        <div>팀명</div>
                        <div>이름</div>
                        <div>이메일</div>
                        <div>승인구분</div>
                        <div>승인</div>
                        <div>등록일자</div>
                    </li>
                </ul>
                <ul class="member">
                    <li>
                        <input type="checkbox">
                        <div>CATV운용팀</div>
                         <div>홍길동</div>
                         <div>test@test.com</div>
                         <div><span class="accept-type">승인요청</span></div>
                         <div>신성우</div>
                         <div>2023.07.10 14:11</div>
                    </li>
                    <li>
                        <input type="checkbox">
                        <div>CATV운용팀</div>
                         <div>홍길동</div>
                         <div>test@test.com</div>
                         <div><span class="accept-type">승인요청</span></div>
                         <div>신성우</div>
                         <div>2023.07.10 14:11</div>
                    </li>
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
        .btn-wrap{
            .btn{
                margin-left: 8px;
                width: 120px;
                height: 38px;
                padding-top: 0.7rem;
                padding-bottom: 0.7rem;
            }
        }
    }
    .section{
        background: #fff;
        padding: 0 24px;
        .search{
            display: flex;
            padding: 16px 0;
            .search-input{
                display: flex;
                width: 310px;
                height: 38px;
                padding: 12px 8px 12px 16px;
                align-items: center;
                border: none;
                border-radius: 4px;
                background: var(----kt-input-solid-bg, #F5F8FA);
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
</style>