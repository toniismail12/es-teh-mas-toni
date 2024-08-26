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

async function SaveOrg(uid, orgName, code, orgCode, parent, status, level) {

    const data = {
        uid: uid,
        text: orgName,
        code: code,
        org_code: orgCode,
        org_code_parent: parent,
        status: status,
        level: parseInt(level),
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

async function GetEmp(pages, limits, nama, badge, komp_id, komp_title, dept_id, dept_title) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            nama: nama,
            badge: badge,
            komp_id: komp_id,
            komp_title: komp_title,
            dept_id: dept_id,
            dept_title: dept_title,
        },
    }

    try {
        const res = await svc_iam.get("/api/emp", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

export default GetOrg
export { GetOrg, SaveOrg, DeleteOrg, GetEmp }
