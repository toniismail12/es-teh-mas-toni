import { svc_sso } from "@/api";

async function VerifyOTP(code, redirect) {

    const data = {
        kode: code,
        redirect_to: redirect,
    }

    try {
        await svc_sso.post("/protect/verify-otp", data, {
            withCredentials: true, // Include credentials (cookies, etc.) in the request
        });

        const decoded = atob(redirect);
        // console.log('Response:', res);
        window.location.href = decoded

    } catch (error) {
        console.error('Error:', error);
        alert("verify failed")
        return "error"
    }

}

async function SendOTP() {

    try {

        const res = await svc_sso.get("/protect/resend-otp", {
            withCredentials: true,
        });
        // console.log('Response:', res);
       
        return res

    } catch (error) {
        console.error('Error:', error);
    }

}


export default VerifyOTP
export { VerifyOTP, SendOTP }
