<script setup>
  import { watch, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import actions from '@/store/modules/actions' // actionsからAPIを呼び出す
  import UpdateModalComponent from '@/components/organisms/UpdateModal.vue'
  import DeleteModalComponent from '@/components/organisms/DeleteModal.vue'
  import '@/assets/style/ManagementStyle.css'

  const router = useRouter()

  // ヘッダー定義
  const headers = ref([
    { title: 'ID', value: 'id', sortable: true },
    { title: '名前', value: 'username', sortable: true },
    { title: 'メールアドレス', value: 'email', sortable: true },
    { title: '操作', value: 'action', sortable: false }
  ])
  // ユーザ一覧データ
  const users = ref([])
  // 削除モーダルのref定義
  const modalDelete = ref(null)
  // 更新モーダルのref定義
  const modalUpdate = ref(null)
  // ユーザ名
  const username = ref('')
  // 検索の入力データ
  const search = ref('')
  // 現在のページ番号
  const page = ref(1)
  // 1ページあたりの件数
  const itemsPerPage = ref(10)
  const skip = ref(0)
  const limit = ref(10)
  // ユーザ総数
  const members = ref(0)

  // 初期表示にユーザ情報と総数を取得
  onMounted( async () => {
    await totalItems()
    await getUsers(skip.value, limit.value)
  })

  // ページングされたタイミングでユーザを取得
  watch([page, itemsPerPage, search], ([newPage, newItemsPerPage, newSearch]) => {
    skip.value = (newSearch && page.value > 1) ? 0 : (newPage - 1) * newItemsPerPage
    console.log(page.value)
    limit.value = newItemsPerPage
    search.value = newSearch
    totalItems()
    getUsers()
  })

  // ユーザの総件数を取得
  const totalItems = async () => {
    const res = await actions.totalMembers(
      {
        search: search.value
      }
    )
    members.value = Math.ceil(res.data.total/itemsPerPage.value)
  }

  // 子コンポーネントからユーザ更新が行われた時にユーザ情報を再取得
  const handleUserUpdated = () => {
    getUsers()
  }

  // ページごとのユーザ情報を取得
  const getUsers = async () => {
    try {
      const res = await actions.pagingSearchUsers(
        {
          paging:{
            skip: skip.value,
            limit: limit.value,
            search: search.value
          }
        }
      )
      users.value = res.data
    } catch (err) {
      alert('ユーザ情報の取得に失敗しました')
    }
  }

  // 編集のモーダル表示処理
  const openUpdateDialog = (name) => {
    modalUpdate.value.openUpdateModal(name, skip, limit)
    username.value = name
  }
  // 削除のモーダル表示処理
  const openDeleteDialog = (name) => {
    modalDelete.value.openDeleteModal(name, skip, limit)
    username.value = name
  }
  // 戻るボタン押下時
  const backpage = () => {
      router.back()
  }
</script>

<template>
  <v-container>
    <div class="toolbar">
      <v-btn class="manage-back-button" @click="backpage">戻る</v-btn>
      <v-text-field
        class="search-field"
        v-model="search"
        label="検索"
        sigle-line
        hide-details
      />
    </div>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :search="search"
          :items="users"
          :disable-pagination="true"
          :hide-default-footer="true"
          item-value="id"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-xs-center">{{ item.id }}</td>
              <td class="text-xs-center">{{ item.username }}</td>
              <td class="text-xs-center">{{ item.email }}</td>
              <td class="text-xs-center">
                <v-btn icon class="update-button" @click="openUpdateDialog(item.username)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon class="delete-button" @click="openDeleteDialog(item.username)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <!-- 編集モーダルの表示 -->
        <UpdateModalComponent ref="modalUpdate" @updated="handleUserUpdated" />
        <!-- 削除モーダルの表示 -->
        <DeleteModalComponent ref="modalDelete" @deleted="handleUserUpdated" />
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="members"
      :total-visible="5"
      color="primary"
    />
  </v-container>
</template>