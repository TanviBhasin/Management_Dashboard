import axios from "axios";
export const BASE_URL="http://localhost:7000/"
class ApiServices{
    addJob(data){
        return axios.post(BASE_URL+"api/job/add",data)
    }

    getJob(data){
        return axios.post(BASE_URL+"api/job/getall",data)
    }
 
    singleJob(data){
        return axios.post(BASE_URL+"api/job/getsingle",data)
    }

    updateJob(data){
        return axios.post(BASE_URL+"api/job/update",data)
    }

    deleteJob(data){
        return axios.post(BASE_URL+"api/job/delete",data)
    }
    
}
export default new ApiServices;