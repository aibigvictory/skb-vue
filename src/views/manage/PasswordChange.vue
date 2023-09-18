<template>
    <div class="wrap">
        <div class="password-change">
            <div class="title">비밀번호 변경</div>
            <div class="lock-img">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="60" viewBox="0 0 49 60" fill="none">
                <path d="M36.5 18C36.5 11.3726 36.1274 1 24.5 1C12.8726 1 12.5 11.3726 12.5 18" stroke="black" stroke-width="2"/>
                <rect x="1.5" y="19" width="46" height="40" rx="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="25" cy="35.5" r="4.5" fill="white" stroke="#BC4B5C" stroke-width="2"/>
                <path d="M25 41V47" stroke="#BC4B5C" stroke-width="2"/>
                </svg>
            </div>
            <div class="info">비밀번호를 변경 해주세요.</div>
            <div class="input-wrap">
                <input type="password" placeholder="새로운 비밀번호">
                <input type="password" placeholder="새로운 비밀번호 확인">
            </div>
            <button class="btn-password-change">비밀번호 변경</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 48px;
    .password-change{
        padding: 40px;
        background: #fff;
        border-radius: 10px;
        .title{
            padding-bottom: 20px;
            width: 400px;
            border-radius: 8px 8px 0px 0px;
            border-bottom: 1px solid var(----kt-border-color, #EFF2F5);
            background: var(--default-white, #FFF);

            color: var(--primary-text, #222);
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .lock-img{
            margin: 36px 0;
            display: flex;
            justify-content: center;
        }
        .info{
            color: var(--primary-text, #222);
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .input-wrap{
            input{
                width: 100%;
                margin-bottom: 24px;
                border-radius: 10px;
                background: var(----kt-input-solid-bg, #F5F8FA);
                height: 44px;
                padding: 10px 16px;
                border: none;
            }
        }
        .btn-password-change{
            width: 100%;
            padding: 12px 26px;
            border-radius: 6px;
            background: var(----el-color-info-light-8, #E9E9EB);
            border: none;

            color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
    }
}
</style>