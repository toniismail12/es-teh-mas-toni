import { svc_iam } from "@/api";

async function GetReportMonthly(month, year) {

    const config = {
        params: { 
            month: month,
            year: year,
        },
    }

    try {
        const res = await svc_iam.get("/tn/dashboard-report-monthly", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function GetSaldo(month, year) {

    const config = {
        params: { 
            month: month,
            year: year,
        },
    }

    try {
        const res = await svc_iam.get("/tn/dashboard-saldo", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

export default GetReportMonthly
export { GetReportMonthly, GetSaldo }
