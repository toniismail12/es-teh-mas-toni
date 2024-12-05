import { svc_sso } from "@/api";

async function GetAuthme() {

    try {

        const cookieString = document?.cookie || "";
        let cleanToken = "-";

        if (cookieString) {
            const accessTokenCookie = cookieString.split(';').find(cookie => cookie.trim().startsWith('access_token='));
            if (accessTokenCookie) {
                cleanToken = accessTokenCookie.split('=')[1] || "-";
            }
        }

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

        const res = await svc_sso.get("/protect/check-auth", {
            withCredentials: true,
        });
        
        return res

    } catch (error) {
        console.error('Error:', error);
        window.location.href = process.env.NEXT_PUBLIC_API_SVC_SSO+"/api/login?redirect_to="+process.env.NEXT_PUBLIC_URL
    }

}

async function CheckMFA() {

    try {

        const res = await svc_sso.get("/protect/check-auth", {
            withCredentials: true,
        });
        // console.log('Response:', res);
       
        return res

    } catch (error) {
        console.error('Error:', error);
        window.location.href = process.env.NEXT_PUBLIC_API_SVC_SSO+"/api/login?redirect_to="+process.env.NEXT_PUBLIC_URL
    }

}

async function Logout() {

    try {
        const res = await svc_sso.get("/api/logout", {
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
export { GetAuthme, Logout, CheckAuth, CheckMFA }
