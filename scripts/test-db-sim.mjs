import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

// Let's test with branches (ListPak) first
const firebaseConfigListPak = {
  apiKey: "AIzaSyCR9gjxmjYsO_kmHOp_qX4tfoPyJU5tQmg",
  authDomain: "branches-app-7669d.firebaseapp.com",
  projectId: "branches-app-7669d",
  storageBucket: "branches-app-7669d.firebasestorage.app",
  messagingSenderId: "507847972478",
  appId: "1:507847972478:web:b9d8c79d50a85a253cea2f"
};

// Also BizNestUSA
const firebaseConfigBizNest = {
  apiKey: "AIzaSyA1phCIqp4oq5jhOkjoaizLtNfdrHDa51w",
  authDomain: "biznestussa.firebaseapp.com",
  projectId: "biznestussa",
  storageBucket: "biznestussa.firebasestorage.app",
  messagingSenderId: "787556817064",
  appId: "1:787556817064:web:e08dacdb75f3362a0b4a9d"
};

// Read data.ts from branches
const content = fs.readFileSync('d:/listpak/branches/lib/data.ts', 'utf8');
const s = content.indexOf('export const MOCK_BUSINESSES: BusinessItem[] = ');
const start = content.indexOf('[', s);
const end = content.indexOf('export const MOCK_COMPANIES', start);
const mockBiz = JSON.parse(content.slice(start, end).trim().replace(/;\s*$/, ''));

console.log('MOCK_BUSINESSES in ListPak data.ts:', mockBiz.length);

// What about usa-dollar-pr data.ts?
if (fs.existsSync('d:/usa-dollar-pr/lib/data.ts')) {
  const contentUSA = fs.readFileSync('d:/usa-dollar-pr/lib/data.ts', 'utf8');
  const sUSA = contentUSA.indexOf('export const MOCK_BUSINESSES');
  if (sUSA !== -1) {
    const startUSA = contentUSA.indexOf('[', sUSA);
    const endUSA = contentUSA.indexOf('export const MOCK_COMPANIES', startUSA);
    if (endUSA !== -1) {
      const mockBizUSA = JSON.parse(contentUSA.slice(startUSA, endUSA).trim().replace(/;\s*$/, ''));
      console.log('MOCK_BUSINESSES in BizNestUSA data.ts:', mockBizUSA.length);
    }
  }
}
