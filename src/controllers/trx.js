import { svc_iam } from "@/api";

async function GetTrx(date, produk, group_transaksi, no_transaksi, status) {

    const config = {
        params: { 
            date: date,
            produk: produk,
            group_transaksi: group_transaksi,
            no_transaksi: no_transaksi,
            status: status,
        },
    }

    try {
        const res = await svc_iam.get("/tn/trx", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveTrx(date, group_trx, kode_produk, jumlah_beli) {

    const data = {
        date: date,
        group_trx: group_trx,
        kode_produk: kode_produk,
        jumlah_beli: parseInt(jumlah_beli),
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/trx", data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

async function TrxToRilis(group_trx) {

    const data = {
        group_trx: group_trx,
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/trx-update-rilis?group_transaksi="+group_trx, data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

async function DeleteTrx(id) {

    try {

        const res = await svc_iam.delete(`/tn/trx?id=${id}`);
    
        // console.log('Response:', response.data);

        return res

    } catch (error) {
        console.error('Error:', error)
        alert(error.response.data.message)
        return "error"
    }


}

export default GetTrx
export { GetTrx, SaveTrx, DeleteTrx, TrxToRilis }
