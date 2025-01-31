import { svc_iam } from "@/api";

async function GetStok(pages, limits, name) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            name: name,
        },
    }

    try {
        const res = await svc_iam.get("/tn/stok", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveStok(id, kode, name, stok) {

    const data = {
        id: id,
        kode: kode,
        name: name,
        stok: parseInt(stok),
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/stok?id="+id, data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

async function ChangeStok(kode_produk, jumlah_beli, action) {

    const data = {
        kode_produk: kode_produk,
        jumlah: parseInt(jumlah_beli),
        action: action,
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/change-stok", data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

async function DeleteStok(id) {

    try {

        const res = await svc_iam.delete(`/tn/stok?id=${id}`);
    
        // console.log('Response:', response.data);
        alert("success delete")

        return res

    } catch (error) {
        console.error('Error:', error)
        alert(error.response.data.message)
        return "error"
    }


}

export default GetStok
export { GetStok, SaveStok, DeleteStok, ChangeStok }
