import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR9gjxmjYsO_kmHOp_qX4tfoPyJU5tQmg",
  authDomain: "branches-app-7669d.firebaseapp.com",
  projectId: "branches-app-7669d",
  storageBucket: "branches-app-7669d.firebasestorage.app",
  messagingSenderId: "507847972478",
  appId: "1:507847972478:web:b9d8c79d50a85a253cea2f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDocDetails() {
  try {
    const docRef = doc(db, "businesses", "bZkvrEzwnVfpkRA1FH8n");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      console.log(JSON.stringify(snap.data(), null, 2));
    } else {
      console.log("No document found!");
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

getDocDetails();
