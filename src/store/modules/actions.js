import auth from '@/api/auth'

export default {
  login(data) {
    return auth.login(data.user)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken)
      })
      .catch(error => { throw error })
  },
  logout() {
    localStorage.removeItem('token')
  },
  register(data) {
    return auth.register(data.user)
  },
  delete(data) {
    return auth.delete(data.user)
  },
  update(data) {
    return auth.update(data.user)
  },
  allSearchUsers() {
    return auth.allSearchUsers()
  },
  pagingSearchUsers(data) {
    return auth.pagingSearchUsers(data.paging)
  },
  totalMembers(data) {
    return auth.totalMembers(data)
  }
}
