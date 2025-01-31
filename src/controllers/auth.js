import { svc_iam } from "@/api";

async function CheckLogin() {

    try {
        const res = await svc_iam.get("/tn/check-login");
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function Login(username, password) {

    const data = {
        username: username,
        password: password,
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/login", data);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        alert("Failed Login")
        return "error"
    }

}

export default CheckLogin
export { CheckLogin, Login }
