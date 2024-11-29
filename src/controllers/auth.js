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

async function CheckAuth() {

    try {

        const cookieString = document?.cookie || "";
        let cleanToken = "-";

        if (cookieString) {
            const accessTokenCookie = cookieString.split(';').find(cookie => cookie.trim().startsWith('access_token='));
            if (accessTokenCookie) {
                cleanToken = accessTokenCookie.split('=')[1] || "-";
            }
        }

        const res = await svc_sso.get("/protect/check-auth", {
            // headers: {
            //     // Authorization: ` ${cleanToken}`,
               
            // },
            withCredentials: true,
        });
        // console.log('Response:', res);
        return res

    } catch (error) {
        console.error('Error:', error);
        window.location.href = process.env.NEXT_PUBLIC_API_SVC_SSO+"/api/login?redirect_to="+process.env.NEXT_PUBLIC_URL
    }

}

async function VerifyOTP(code, redirect) {

    const data = {
        kode: code,
        redirect_to: redirect
    }

    try {
        await svc_sso.post("/protect/verify-otp", data);

        const decoded = atob(redirect);
        // console.log('Response:', res);
        window.location.href = decoded

    } catch (error) {
        console.error('Error:', error);
        // alert("error update data")
        return "error"
    }

}

async function Logout() {

    // const cookieString = document?.cookie
        
    // const cleanToken = cookieString.split(';').find(cookie => cookie.trim().startsWith('refresh_token=')).split('=')[1];

    // const config = {
    //     params: { 
    //         refresh_token: cleanToken,
    //     },
    // }

    try {
        const res = await svc_sso.get("/api/logout", {
            // headers: {
            //     // Authorization: ` ${cleanToken}`,
               
            // },
            withCredentials: true,
        });
        // console.log('Response:', res);
        return res

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

export default GetAuthme
export { GetAuthme, Logout, CheckAuth, VerifyOTP }
