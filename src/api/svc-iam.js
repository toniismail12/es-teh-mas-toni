import axios from 'axios';

function LS(key) {
    
    const item = typeof window !== "undefined" ? localStorage.getItem(key) : null ;

    return item;
    
}

export default axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_SVC_IAM,
    headers: {
        'Authorization': LS("token"),
    },
});  
