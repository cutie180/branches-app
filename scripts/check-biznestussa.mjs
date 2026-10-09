import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA1phCIqp4oq5jhOkjoaizLtNfdrHDa51w',
  authDomain: 'biznestussa.firebaseapp.com',
  projectId: 'biznestussa',
  storageBucket: 'biznestussa.firebasestorage.app',
  messagingSenderId: '787556817064',
  appId: '1:787556817064:web:e08dacdb75f3362a0b4a9d'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkBiznestussa() {
  const snap = await getDocs(collection(db, 'businesses'));
  console.log('Total businesses in biznestussa Firestore:', snap.size);
  
  const all = [];
  snap.forEach(d => {
    all.push({ id: d.id, ...d.data() });
  });

  const pending = all.filter(b => (b.status || '').toLowerCase() === 'pending' || b.paymentStatus === 'PENDING');
  console.log('Pending in biznestussa Firestore:', pending.length);

  // Let's print status distribution
  const statuses = {};
  all.forEach(b => {
    const s = `${b.status} | payment: ${b.paymentStatus}`;
    statuses[s] = (statuses[s] || 0) + 1;
  });
  console.log('Statuses in biznestussa:', statuses);

  if (pending.length > 0) {
    console.log(`\nFound ${pending.length} pending businesses!`);
  }
}

checkBiznestussa().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
