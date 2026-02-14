import axios from 'axios'

const getHeaders = () => {
  const headers = {}
  headers['Content-type'] = 'application/json'
  headers['Authorization'] = localStorage.getItem('token')
                             ? 'Bearer ' + localStorage.getItem('token')
                             : ""
  return headers
}

const config = {
  method: null,
  url: null, // APIサーバー
  headers: null,
  data: null
}
const apiResponse = (config) => {
  config.headers = getHeaders()
  return axios.request(config)
    .then(res => res)
      .catch(error => { throw error })
}

export default {
  login: (authInfo) => {
    config.method = 'post'
    config.data = authInfo
    config.url = 'http://127.0.0.1:8000/login'

    return apiResponse(config)
  },
  register: (registerInfo) => {
    config.method = 'post'
    config.data = registerInfo
    config.url = 'http://127.0.0.1:8000/create-users'

    return apiResponse(config)
  },
  delete: (deleteInfo) => {
    config.method = 'post'
    config.data = deleteInfo
    config.url = 'http://127.0.0.1:8000/delete-users'

    return apiResponse(config)
  },
  update: (updateInfo) => {
    config.method = 'post'
    config.data = updateInfo
    config.url = 'http://127.0.0.1:8000/update-users'

    return apiResponse(config)
  },
  allSearchUsers: () => {
    config.method = 'get'
    config.url = 'http://127.0.0.1:8000/all-users'

    return apiResponse(config)
  },
  pagingSearchUsers: (pagingInfo) => {
    config.method = 'post'
    config.data = pagingInfo
    config.url = 'http://127.0.0.1:8000/paging-users'

    return apiResponse(config)
  },
  totalMembers: (totalInfo) => {
    config.method = 'post'
    config.data = totalInfo
    config.url = 'http://127.0.0.1:8000/total-members'

    return apiResponse(config)
  }
}
