import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = require("../../auth-test-app-d9ffc-firebase-adminsdk-6ejyk-5ade077fb2.json");
export const firebaseAdmin =
    getApps()[0] ??
    initializeApp({
        credential: cert(serviceAccount),
    });

export const auth = getAuth();