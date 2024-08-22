import { svc_iam } from "@/api";

async function GetOrg(pages, limits, text) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            text: text,
        },
    }

    try {
        const res = await svc_iam.get("/api/organization", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveOrg(uid, orgName, code, orgCode, parent, status) {

    const data = {
        uid: uid,
        text: orgName,
        code: code,
        org_code: orgCode,
        org_code_parent: parent,
        status: status,
    }

    console.log(data)

    try {
        const res = await svc_iam.post("/admin/organization", data);
        // console.log('Response:', res);
        return res

    } catch (error) {
        console.error('Error:', error);
        alert("error")
        return "error"
    }

}

async function DeleteOrg(uid) {

    try {

        const res = await svc_iam.delete(`/admin/organization?uuid=${uid}`);
    
        // console.log('Response:', response.data);
        alert("success delete")

        return res

    } catch (error) {
        console.error('Error:', error)
        alert(error.response.data.message)
        return "error"
    }

}

export default GetOrg
export { GetOrg, SaveOrg, DeleteOrg }
