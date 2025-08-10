// lib/firebase-db.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { db, auth } from './firebase';

// Authentication functions
export async function signInAdmin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw new Error('Authentication failed: Unknown error');
  }
}

export async function signOutAdmin() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

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
    console.log('Attempting to fetch contacts from Firebase...');
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt || 'N/A'
    }));
    console.log(`Successfully fetched ${contacts.length} contacts`);
    return contacts;
  } catch (error) {
    console.error('Error getting contacts:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }
    throw new Error('Failed to fetch contacts: Unknown error');
  }
}

// Get all demo forms
export async function getDemoForms() {
  try {
    console.log('Attempting to fetch demo forms from Firebase...');
    const q = query(collection(db, 'demo_forms'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const demoForms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt || 'N/A'
    }));
    console.log(`Successfully fetched ${demoForms.length} demo forms`);
    return demoForms;
  } catch (error) {
    console.error('Error getting demo forms:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch demo forms: ${error.message}`);
    }
    throw new Error('Failed to fetch demo forms: Unknown error');
  }
}

// Get all partnership applications
export async function getPartnershipApplications() {
  try {
    console.log('Attempting to fetch partnership applications from Firebase...');
    const q = query(collection(db, 'partnership_applications'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const partnershipApps = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt || 'N/A'
    }));
    console.log(`Successfully fetched ${partnershipApps.length} partnership applications`);
    return partnershipApps;
  } catch (error) {
    console.error('Error getting partnership applications:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch partnership applications: ${error.message}`);
    }
    throw new Error('Failed to fetch partnership applications: Unknown error');
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
