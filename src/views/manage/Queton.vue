<template>
    <div class="wrap">
        <div>
            <div class="header">
                <div class="title">큐톤</div>
                <div class="btn-wrap">
                    <div class="btn btn-danger">버튼</div>
                    <div class="btn btn-primary">버튼</div>
                </div>
            </div>
            <div class="section">
                <div class="text">텍스트</div>
                <input type="text">
                <textarea></textarea>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0;}
li{list-style: none;}

input{
    display: block;
    height: 40px;
    padding: 0 12px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
    background: #FFF;
}
textarea{
    padding: 12px;
    width: 100%;
    height: 100px;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px solid var(--data-bs-theme-light-bs-gray-300, #E4E6EF);
    background: #FFF;
}

.text{
    color: var(--primary-text, #222);
    font-size: 14px;
    font-weight: 500;
}

.wrap{
    margin: 48px 30px;
    > div{
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
                    padding-top: 0.7rem !important;
                    padding-bottom: 0.7rem !important;
                }
            }
        }
        .section{
            background: #fff;
            padding: 0 24px;
        }
    }
}
</style>