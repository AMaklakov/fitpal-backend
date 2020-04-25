// ainterceptors.request.use(
//   (config: AxiosRequestConfig): AxiosRequestConfig => {
//     const { baseURL, url, method, data, headers } = config
//     app.log.info({
//       axiosRequest: true,
//       baseURL,
//       url,
//       method,
//       data,
//       headers,
//     })
//     return config
//   }
//
//   iosInstance.interceptors.response.use(
//   undefined,
//   (error): Promise<never> => {
//     const {
//       response: {
//         status,
//         statusText,
//         data: responseData,
//         config: { url, method, data, headers },
//       },
//     } = error
//
//     app.log.error({
//       axiosResponse: true,
//       status,
//       statusText,
//       responseData,
//       request: {
//         url,
//         method,
//         data,
//         headers,
//       },
//     })
//     return Promise.reject(error)
//   }
// )
// })
