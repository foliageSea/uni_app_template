<route lang="json" type="home">
{
  "style": { "navigationBarTitleText": "登录" },
  "name": "login"
}
</route>
<template>
  <view
    class="login-bg flex flex-col items-center justify-center min-h-screen py-10 px-6"
    style="background: #e6e8f5"
  >
    <view class="w-full max-w-[370px] mx-auto flex flex-col items-center">
      <view
        class="text-center text-[32px] font-bold text-[#59597c] mt-16 mb-2"
        style="letter-spacing: 0.5px"
        >OkMes</view
      >
      <view class="text-center text-lg text-[#59597c] mb-8"
        >请输入账户信息以继续</view
      >
      <input
        class="w-full h-12 rounded-xl bg-white text-[#59597c] text-base font-medium px-6 box-border mb-4"
        placeholder="账户"
        placeholder-class="text-[#bcbcd8]"
      />
      <input
        class="w-full h-12 rounded-xl bg-white text-[#59597c] text-base font-medium px-6 box-border mb-6"
        placeholder="密码"
        placeholder-class="text-[#bcbcd8]"
        password
      />
      <button
        class="w-full h-12 rounded-xl bg-[#5a5f97] text-white text-base font-bold flex items-center justify-center mb-2"
      >
        登录
      </button>
      <view class="w-full text-right text-[#bcbcd8] text-sm mb-8">
        忘记密码？
      </view>
      <view class="flex items-center my-4 w-full">
        <view class="flex-1 h-1 border-1px-shadow"></view>
        <view class="mx-4 text-[#bcbcd8] text-sm">或</view>
        <view class="flex-1 h-1 border-1px-shadow"></view>
      </view>
      <button
        class="relative w-full h-12 rounded-xl border-0 bg-[#b8b8d2] text-[#59597c] text-base font-medium mt-4 pl-6 flex items-center justify-start"
      >
        <img
          src="https://www.svgrepo.com/show/303187/wechat-logo.svg"
          alt="wechat"
          class="absolute left-6 w-6 h-6"
        />
        <span class="pl-22">使用微信登录</span>
      </button>
      <button
        class="relative w-full h-12 rounded-xl bg-[#b8b8d2] text-[#59597c] text-base font-medium mt-3 pl-6 flex items-center justify-start"
      >
        <img
          src="https://api.iconify.design/logos/apple.svg"
          alt="apple"
          class="absolute left-6 w-6 h-6"
        />
        <span class="pl-22">使用Apple登录</span>
      </button>
      <view class="text-center text-[#bcbcd8] text-base font-medium mt-8">
        没有账号？<span class="font-bold">立即注册</span>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: #e6e8f5;
}
input::-webkit-input-placeholder {
  color: #b8b8d2;
}
input::placeholder {
  color: #b8b8d2;
}
.border-1px-shadow {
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.2);
}
</style>
