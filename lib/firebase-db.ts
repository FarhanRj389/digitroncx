// lib/firebase-db.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Contact form submission
export async function submitContactForm(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new',
      type: 'contact_form'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

// Demo form submission
export async function submitDemoForm(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'demo_forms'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'pending',
      type: 'demo_form',
      files: data.files || []
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting demo form:', error);
    throw error;
  }
}

// Partnership form submission
export async function submitPartnershipForm(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'partnership_applications'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'pending_review',
      type: 'partnership_form',
      files: data.files || []
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting partnership form:', error);
    throw error;
  }
}

// Get all contacts
export async function getContacts() {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt || 'N/A'
    }));
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
}

// Get all demo forms
export async function getDemoForms() {
  try {
    const q = query(collection(db, 'demo_forms'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt || 'N/A'
    }));
  } catch (error) {
    console.error('Error getting demo forms:', error);
    throw error;
  }
}

// Get all partnership applications
export async function getPartnershipApplications() {
  try {
    const q = query(collection(db, 'partnership_applications'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt || 'N/A'
    }));
  } catch (error) {
    console.error('Error getting partnership applications:', error);
    throw error;
  }
}

// Update document status
export async function updateDocumentStatus(collectionName: string, docId: string, status: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

// Delete document
export async function deleteDocument(collectionName: string, docId: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Get document by ID
export async function getDocumentById(collectionName: string, docId: string) {
  try {
    const docSnap = await getDocs(collection(db, collectionName));
    const document = docSnap.docs.find(d => d.id === docId);
    if (document) {
      return {
        id: document.id,
        ...document.data(),
        createdAt: document.data().createdAt?.toDate?.() || document.data().createdAt || 'N/A'
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}
