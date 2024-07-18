import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://staging-api.altisend.com/v1',
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
