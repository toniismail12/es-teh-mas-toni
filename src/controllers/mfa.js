import { svc_sso } from "@/api";

async function VerifyOTP(code, redirect, token) {

    const data = {
        kode: code,
        redirect_to: redirect,
        token: token
    }

    try {
        await svc_sso.post("/protect/verify-otp", data);

        const decoded = atob(redirect);
        // console.log('Response:', res);
        window.location.href = decoded

    } catch (error) {
        console.error('Error:', error);
        alert("verify failed")
        return "error"
    }

}

export default VerifyOTP
export { VerifyOTP }
