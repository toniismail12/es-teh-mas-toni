import { svc_iam } from "@/api";

async function GetSummaryTrx(date) {

    const config = {
        params: { 
            date: date,
        },
    }

    try {
        const res = await svc_iam.get("/tn/trx-summary", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

export default GetSummaryTrx
export { GetSummaryTrx }
