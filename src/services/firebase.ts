
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'; // SI NO FUNCIONA ES PORQUE BORRE EL /lite del final
import { Post } from "../flux/Store";

const firebaseConfig = {

  apiKey: "AIzaSyCFpjVuBh0SlZSwU2l3f2uqeZOy7phzVjU",
  authDomain: "holguinparcial3.firebaseapp.com",
  projectId: "holguinparcial3",
  storageBucket: "holguinparcial3.firebasestorage.app",
  messagingSenderId: "1050403488686",
  appId: "1:1050403488686:web:6ba346140e691053d7fe3f",
  measurementId: "G-53VFKEB56P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getPostsDb() {
    const postsCol = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCol);
    
    return postsSnapshot;
}

export async function addColorPostDb(post: any) {
    const postsCol = collection(db, 'posts');
    const docRef = await addDoc(postsCol, post);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
}

export async function deleteColorPostDb(postId: string) {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);
}

export async function registerUserDb(username: string, letter: string) {
    const userCol = collection(db, 'users');
    const docRef = await addDoc(userCol, {
        username: username,
        letter: letter
    });
    console.log("documento escrito con id ", docRef.id);
    return docRef.id;
}

export async function getUsersDb() {
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);

    return usersSnapshot;
}