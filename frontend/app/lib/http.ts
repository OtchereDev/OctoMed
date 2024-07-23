import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
})

instance.interceptors.request.use(
  function (config) {
    console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
