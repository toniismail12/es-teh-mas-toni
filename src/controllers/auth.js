import { svc_sso } from "@/api";

async function GetAuthme() {

    try {

        const cookieString = document?.cookie
        
        const cleanToken = cookieString.split(';').find(cookie => cookie.trim().startsWith('access_token=')).split('=')[1];

        const res = await svc_sso.get("/protect/authme", {
            headers: {
                Authorization: `Bearer ${cleanToken}`,
            },
        });
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function Logout(refresh_token) {

    const config = {
        params: { 
            refresh_token: refresh_token,
        },
    }

    try {
        const res = await svc_sso.get("/api/logout", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

export default GetAuthme
export { GetAuthme, Logout }
