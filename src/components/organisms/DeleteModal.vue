<script setup>
  import { ref, defineExpose, defineEmits } from 'vue'
  import actions from '@/store/modules/actions'
  import ModalComponent from '@/components/organisms/ModalForm.vue'

  const modalDelete = ref(null)
  const username = ref('')

  const emit = defineEmits(['deleted'])

  // 削除モーダルの表示処理
  const openDeleteModal = (name) => {
    modalDelete.value.openModal()
    username.value = name
  }
  // 削除するボタン押下時
  const deleteAction = async () => {
    try {
      await actions.delete({
        user:[{
          username: username.value
        }]
      })
      modalDelete.value.closeModal()
      // 親コンポーネント(ManagementFrom.vue)に通知
      emit('deleted')
    } catch (error) {
      alert('削除するユーザが存在しません。')
    }
  }
  // キャンセルボタン押下時
  const cancelAction = () => {
    modalDelete.value.closeModal()
  }

  // 他の画面から本モーダルを表示させるため
  defineExpose({ openDeleteModal })
</script>

<template>
  <ModalComponent ref="modalDelete">
    <template #default>
      <v-card>
        <v-card-title class="modal-title text-center">⚠️ 削除の確認</v-card-title>
        <v-card-text class="modal-text text-center">
          「{{username}}」ユーザを削除してもよろしいですか？
        </v-card-text>
        <v-card-actions>
          <v-col cols="5">
            <v-btn color="error" @click="deleteAction" variant="outlined">削除する</v-btn>
          </v-col>
          <v-col cols="5">
            <v-btn color="primary" @click="cancelAction" variant="flat">キャンセル</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </template>
  </ModalComponent>
</template>