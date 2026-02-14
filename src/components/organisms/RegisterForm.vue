<script setup>
  import { useRouter } from 'vue-router'
  import actions from '@/store/modules/actions'
  import { ref } from 'vue'
  import '@/assets/style/RegisterStyle.css'

  
  const router = useRouter()

  // データ定義
  const username = ref('')  // ユーザー名
  const password = ref('')  // パスワード
  const email = ref('')  // メールアドレス

  // ユーザ登録のバリデーションチェック(必須入力)
  const rules = {
    required: value => !!value || '入力必須です',
  }

  // API にログインリクエストを送る関数
  const register = async () => {
    try {
      if (!username.value || !password.value || !email.value) {
        alert('入力されていない項目がございます。')
        return
      }
      // actions.loginを呼び出し
      await actions.register({
        user:{
          username: username.value,
          password: password.value,
          email: email.value
        }
      })
      // トップページへ遷移
      router.push('/top')
    } catch (error) {
      alert('同じユーザ名で既に登録されたユーザがいます。\n別のユーザ名で登録してください。')
    }
    return
  }
  const backpage = () => {
    router.back()
  }
</script>

<template>
    <div class="register">
      <!-- タイトル -->
      <h2>ユーザー登録</h2>
      <div class="form-item">
        <!-- 入力フォーム -->
        <label for="username">ユーザ名</label>
        <v-text-field
          id="register-username"
          type="text"
          v-model="username"
          :rules="[rules.required]"
        >
        </v-text-field>

        <label for="password">パスワード</label>
        <v-text-field
          id="register-password"
          type="password"
          v-model="password"
          :rules="[rules.required]"
        >
        </v-text-field>

        <label for="email">メールアドレス</label>
        <v-text-field
          id="register-email"
          type="text"
          v-model="email"
          :rules="[rules.required]"
        >
        </v-text-field>
        <!-- ボタン -->
        <v-btn class="register-button" @click="register">登録する</v-btn>
        <v-btn class="back-button" @click="backpage">戻る</v-btn>
      </div>
    </div>
</template>