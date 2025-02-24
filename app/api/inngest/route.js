import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

// إنشاء API يقدم وظائف Inngest لمعالجة المستخدمين
export const { GET, POST, PUT, OPTIONS } = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserDeletion,
        syncUserUpdation
    ],
});
