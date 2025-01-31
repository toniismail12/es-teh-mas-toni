import { svc_iam } from "@/api";

async function GetRelasi(pages, limits, kode_produk, kode_stok) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            kode_produk: kode_produk,
            kode_stok: kode_stok,
        },
    }

    try {
        const res = await svc_iam.get("/tn/relasi", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveRelasi(id, kode_produk, kode_stok) {

    const data = {
        id: id,
        kode_produk: kode_produk,
        kode_stok: kode_stok,
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/relasi?id="+id, data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

async function DeleteRelasi(id) {

    try {

        const res = await svc_iam.delete(`/tn/relasi?id=${id}`);
    
        // console.log('Response:', response.data);
        alert("success delete")

        return res

    } catch (error) {
        console.error('Error:', error)
        alert(error.response.data.message)
        return "error"
    }


}

export default GetRelasi
export { GetRelasi, SaveRelasi, DeleteRelasi }
