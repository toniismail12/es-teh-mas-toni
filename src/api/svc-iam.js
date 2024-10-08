import axios from 'axios';

// const url = "https://gwkong.pusri.co.id/service-iam-dev";
// const url_prod = "https://gwkong.pusri.co.id/service-iam-prod";
const url = "http://localhost:9001"

export default axios.create({

    baseURL: process.env.NEXT_PUBLIC_MODE === 'dev' ? url : url_prod,
    headers: {
        'Authorization': process.env.NEXT_PUBLIC_KEY_SVC_IAM,
    },
});  
