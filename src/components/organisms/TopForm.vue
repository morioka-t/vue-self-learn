<script setup>
  import actions from '@/store/modules/actions'
  import { useRouter } from 'vue-router'
  import '@/assets/style/TopStyle.css'
  
  const router = useRouter()

  const refister = () => {
    router.push('/register')
  }
  const management = () => {
    router.push('/management')
  }
  const logout = async () => {
    await actions.logout()
    router.push('/login')
    return
  }
</script>
<template>
  <div class="top-form">
    <!-- タイトル -->
    <h1>Top page</h1>
    <!-- ボタン -->
    <v-btn class="top-register-button" @click="refister">ユーザ登録</v-btn>
    <v-btn class="top-management-button" @click="management">ユーザ管理</v-btn>
    <v-btn class="top-logout-button" @click="logout">ログアウト</v-btn>
  </div>
</template>