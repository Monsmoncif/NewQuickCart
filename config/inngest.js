import Inngest from 'inngest';

import connectDB from "./db";
import User from "@/models/User";

// إنشاء عميل Inngest
export const inngest = new Inngest({ id: "quickcart-next" });

// وظيفة لحفظ المستخدم في قاعدة البيانات
export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-form-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            image_Url: image_url
        };

        await connectDB();
        await User.create(userData);
    }
);

// وظيفة لتحديث المستخدم
export const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            image_Url: image_url
        };

        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
);

// وظيفة لحذف المستخدم من قاعدة البيانات
export const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;

        await connectDB();
        await User.findByIdAndDelete(id);
    }
);
