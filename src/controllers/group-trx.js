import { svc_iam } from "@/api";

async function GetGrpTrx(date, group_transaksi) {

    const config = {
        params: { 
            date: date,
            group_transaksi: group_transaksi,
        },
    }

    try {
        const res = await svc_iam.get("/tn/grp-trx", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveGrpTrx(group_trx, pembayaran, date) {

    const data = {
        group_trx: group_trx,
        pembayaran: pembayaran,
        date: date,
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/grp-trx", data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

export default GetGrpTrx
export { GetGrpTrx, SaveGrpTrx }
