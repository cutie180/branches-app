import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function run() {
  // Check businesses in firestore
  const bizSnap = await getDocs(collection(db, 'businesses'));
  console.log('Businesses count in firestore:', bizSnap.size);

  const bizList = [];
  bizSnap.forEach(d => {
    bizList.push({ id: d.id, ...d.data() });
  });

  // Check all collections if any other collections exist or what data is there
  console.log('\n--- Checking status of all businesses in Firestore ---');
  bizList.forEach((b, i) => {
    console.log(`${i+1}. id: ${b.id}, name: ${b.name || b.businessName}, status: ${b.status}, paymentStatus: ${b.paymentStatus}, approvedAt: ${b.approvedAt}, submittedAt: ${b.submittedAt}, email: ${b.email}`);
  });

  process.exit(0);
}

run().catch(console.error);
