import {
    GetOrg,
    SaveOrg,
    DeleteOrg,
    GetEmp,
    GetOldOrg,
    UpdateOrgParent,
} from "./iam";

import { GetContact, SentChatTabular, GetChatHistory } from './tabular-chat-petani'
import { SentChatDocProcess } from './document-processing'
import { GetAuthme, CheckAuth, Logout } from './auth'
import { VerifyOTP } from './mfa'

export default GetOrg
export {
    GetOrg,
    SaveOrg,
    DeleteOrg,
    GetEmp,
    GetOldOrg,
    UpdateOrgParent,
    GetContact,
    SentChatTabular,
    GetChatHistory,
    SentChatDocProcess,
    GetAuthme, 
    Logout,
    CheckAuth,
    VerifyOTP,
}
