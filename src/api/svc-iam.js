import axios from 'axios';

const url = "https://gwkong.pusri.co.id/service-iam-dev";

export default axios.create({

    baseURL: url,
    headers: {
        'Authorization': "18952168-9a5b-47d7-a67b-1572d2fc7b80",
    },
});  
