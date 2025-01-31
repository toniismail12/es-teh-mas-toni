import { svc_iam } from "@/api";

async function GetProduk(pages, limits, produk) {

    const config = {
        params: { 
            page: pages,
            limit: limits,
            produk: produk,
        },
    }

    try {
        const res = await svc_iam.get("/tn/produk", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SaveProduk(id, kode, produk, harga) {

    const data = {
        id: id,
        kode: kode,
        produk: produk,
        harga: parseInt(harga),
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/produk?id="+id, data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error update")
        return "error"
    }

}

async function DeleteProduk(id) {

    try {

        const res = await svc_iam.delete(`/tn/produk?id=${id}`);
    
        // console.log('Response:', response.data);
        alert("success delete")

        return res

    } catch (error) {
        console.error('Error:', error)
        alert(error.response.data.message)
        return "error"
    }


}

export default GetProduk
export { GetProduk, SaveProduk, DeleteProduk }
