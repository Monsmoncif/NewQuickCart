import {serve} from "inngest/next";
import { inngest, Inngest, syncUserCreation , syncUserDeletion, syncUserUpdation} from "@/config/inngest";

//create an api that serves zero functions
export const{GET, POST, PUT} =serve({
    client: inngest,
    functions:[
        syncUserCreation,
        syncUserDeletion,
        syncUserUpdation
],
})