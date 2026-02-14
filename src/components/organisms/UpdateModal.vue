<script setup>
  import { ref, defineExpose, defineEmits } from 'vue'
  import actions from '@/store/modules/actions'
  import ModalComponent from '@/components/organisms/ModalForm.vue'

  const modalUpdate = ref(null)
  const username = ref('')
  const password = ref('')
  const email = ref('')

  const emit = defineEmits(['updated'])

  // 更新のバリデーションチェック(必須入力)
  const rules = {
      required: value => !!value || '入力必須です',
  }

  // フォームデータのリセット
  const resetFromData = () => {
    password.value = ""
    email.value = ""
  }

  // 編集のモーダル表示処理
  const openUpdateModal = (name) => {
    modalUpdate.value.openModal()
    username.value = name
  }
  // 更新するボタン押下時
  const updateAction = async () => {
    try {
      if (!password.value || !email.value) {
          alert('入力されていない項目がございます。')
          return
      }
      await actions.update({
        user:{
          username: username.value,
          password: password.value,
          email: email.value
        }
      })
      // フォームデータのリセット
      resetFromData()
      // 親コンポーネント(ManagementFrom.vue)に通知
      emit('updated')
    } catch (error) {
      alert('更新するユーザが存在しません。')
    }
    modalUpdate.value.closeModal()
  }
  // キャンセルボタン押下時
  const cancelAction = () => {
    modalUpdate.value.closeModal()
    // フォームデータのリセット
    resetFromData()
  }

  // 他の画面から本モーダルを表示させるため
  defineExpose({ openUpdateModal })
</script>

<template>
    <ModalComponent ref="modalUpdate">
      <template #default>
        <v-card>
          <v-card-title class="modal-title text-center">「{{ username }}」ユーザ情報編集</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="password"
              label="パスワード"
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="email"
              label="メールアドレス"
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-col cols="5">
              <v-btn color="error" @click="updateAction" variant="outlined">更新する</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn color="primary" @click="cancelAction" variant="flat">キャンセル</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </template>
    </ModalComponent>
</template>