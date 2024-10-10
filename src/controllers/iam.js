import { svc_iam } from "@/api";

async function GetOrg(pages, limits, text, code, org_code, report_to, level, status, uid_parent) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            text: text,
            code: code,
            org_code: org_code,
            code_parent: report_to,
            level: level,
            status: status,
            uid_parent: uid_parent,
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

async function GetOldOrg(pages, limits, text, org_code) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            org_unit_desc: text,
            org_unit: org_code,
        },
    }

    try {
        const res = await svc_iam.get("/api/old-organization", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveOrg(uid, orgName, codes, orgCode, parent, status, level, oldCode, uid_parents) {

    const data = {
        uid: uid,
        text: orgName,
        code: codes,
        org_code: orgCode,
        org_code_parent: parent,
        code_parent: parent,
        uid_parent: uid_parents,
        status: status,
        level: parseInt(level),
    }

    // console.log(data)
    if (uid) {

        // berguna ketika update code
        const dataParent = {
            "old_code": oldCode,
            "new_code": codes,
        }

        try {
            const res = await svc_iam.post("/admin/update-parent", dataParent);
            // console.log('Response:', res);
    
        } catch (error) {
            console.error('Error:', error);
            alert("error update parent")
            return "error"
        }
    }

    try {
        const res = await svc_iam.post("/admin/organization", data);
        // console.log('Response:', res);
        return res

    } catch (error) {
        console.error('Error:', error);
        alert("error update data")
        return "error"
    }

}

async function UpdateOrgParent(uid, code) {

    const data = {
        uid_parent: uid,
        code_parent: code,
    }

    try {
        const res = await svc_iam.post("/api/update-uid-parent", data);
        // console.log('Response:', res);
        return res

    } catch (error) {
        console.error('Error:', error);
        // alert("error update data")
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
export { GetOrg, SaveOrg, DeleteOrg, GetEmp, GetOldOrg, UpdateOrgParent }
