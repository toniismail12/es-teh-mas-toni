import axios from 'axios';

export default axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_SVC_IAM,
    headers: {
        'Authorization': process.env.NEXT_PUBLIC_KEY_SVC_IAM,
    },
});  
