import axios from "axios"

const axiosInstance = axios.create({
  //check 1 --> Preparing for deployement
  //baseURL:"http://127.0.0.1:5001/adukale-ecommerce/us-central1/api"
  baseURL:"https://api-pl2oym5rtq-uc.a.run.app/"
})

export {axiosInstance};