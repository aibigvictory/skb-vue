<template>
    <div class="wrap">
        <div class="password-change-config">
            <div class="title">비밀번호 변경</div>
            <div class="info">비밀번호 변경 주기를 설정해 주세요.</div>
            <div class="info">로그인 시 자동으로 해당 주기에 따라 비밀번호 갱신을 체크합니다.</div>
            <div class="line"></div>
            <div class="radio-wrap">
                <input @change="change_password_config($event, 3)" type="radio" id="password-change-every-3month">
                <label for="password-change-every-3month">3개월 마다</label>
                <input @change="change_password_config($event, 6)" type="radio" id="password-change-every-6month">
                <label for="password-change-every-6month">6개월 마다</label>
                <input @change="change_password_config($event, 0)" type="radio" id="password-change-every-none">
                <label for="password-change-every-none">사용안함</label>
            </div>
            <button class="btn-password-change">변경 설정하기</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let config = ref(0)

const change_password_config = (e, config_value) => {
    e.target.parentNode.childNodes.forEach(element => {
        if (element.checked && element.checked == true) element.checked = false
    })
    e.target.checked = true
    
    config.value = config_value
}
</script>

<style lang="scss" scoped>
.wrap{
    width: calc(100% - 20px);
    margin: 48px 10px 0 10px;
    .password-change-config{
        padding: 40px;
        background: #fff;
        border-radius: 10px;
        .title{
            padding-bottom: 12px;
            background: var(--default-white, #FFF);
            color: var(--primary-text, #222);
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .info{
            color: var(--data-bs-theme-light-bs-secondary-text-emphasis, #58595D);
            font-size: 12px;
            font-weight: 400;
        }
        .line{
            height: 16px;
            border-bottom: 1px solid var(----el-border-color, #DCDFE6);
        }
        .radio-wrap{
            padding: 32px 0 40px 0;
            display: flex;
            align-items: center;
            input{
                width: 16px;
                height: 16px;
            }
            label{
                margin-right: 10px;
                margin-left: 2px;
                color: var(--primary-text, #222);
                font-size: 14px;
                font-weight: 400;
            }
        }
        .btn-password-change{
            width: 340px;
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