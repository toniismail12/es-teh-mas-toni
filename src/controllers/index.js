import { GetStok, SaveStok, DeleteStok, ChangeStok, RekapStok, GetRekapStok } from './stok'
import { GetProduk, SaveProduk, DeleteProduk } from './produk'
import { GetRelasi, SaveRelasi, DeleteRelasi } from './produk-relasi'
import { GetTrx, SaveTrx, DeleteTrx, TrxToRilis } from './trx.js'
import { GetGrpTrx, SaveGrpTrx } from './group-trx'
import { CheckLogin, Login } from './auth'
import { GetSummaryTrx } from './summary-trx'
import { GetPengeluaran, SavePengeluaran, DeletePengeluaran } from './pengeluaran'

export default GetProduk
export {
    GetStok,
    SaveStok,
    DeleteStok,
    GetProduk,
    SaveProduk,
    DeleteProduk,
    GetRelasi,
    SaveRelasi,
    DeleteRelasi,
    GetTrx,
    SaveTrx,
    DeleteTrx,
    TrxToRilis,
    GetGrpTrx,
    SaveGrpTrx,
    ChangeStok,
    CheckLogin, 
    Login,
    GetSummaryTrx,
    RekapStok, 
    GetRekapStok,
    GetPengeluaran,
    SavePengeluaran,
    DeletePengeluaran,
}
