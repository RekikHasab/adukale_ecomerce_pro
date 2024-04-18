import axios from "axios"

const axiosInstance = axios.create({
  //check 1 --> Preparing for deployement
  //baseURL:"http://127.0.0.1:5001/adukaleonlineshopping/us-central1/api"
  baseURL: "https://api-rd5lvsznbq-uc.a.run.app/",
})

export {axiosInstance};