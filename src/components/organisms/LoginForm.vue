<script setup>
  import { useRouter } from 'vue-router'
  import actions from '@/store/modules/actions'
  import { ref } from 'vue'
  import '@/assets/style/LoginStyle.css'
  
  const router = useRouter()

  // データ定義
  const username = ref('')  // ユーザー名
  const password = ref('')  // パスワード
  // ログインのバリデーションチェック(必須入力)
  const rules = {
    required: value => !!value || '入力必須です',
  }

  // API にログインリクエストを送る関数
  const login = async () => {
    try {
      if (!username.value || !password.value) {
        alert('入力されていない項目がございます。')
        return
      }
      // actions.loginを呼び出し
      await actions.login({
        user:{
          username: username.value,
          password: password.value
        }
      })
      // トップページへ遷移
      router.push('/top')
    } catch (error) {
      alert('ログインに失敗しました')
    }
    return
  }
</script>

<template>
  <div class="login">
    <!-- タイトル -->
    <h1>ログイン</h1>
    <div class="form-item">
      <!-- 入力フォーム -->
      <label for="username">ユーザ名</label>
      <v-text-field 
        id="login-username"
        type="text"
        v-model="username"
        :rules="[rules.required]"
      >
      </v-text-field>
      <label for="password">パスワード</label>
      <v-text-field
        id="login-password"
        type="password"
        v-model="password"
        :rules="[rules.required]"
      >
      </v-text-field>
      <!-- ボタン -->
      <v-btn class="login-button" @click="login">ログイン</v-btn>
      <a href="/register">ユーザ登録していない場合、こちらから登録してください</a>
    </div>
  </div>
</template>