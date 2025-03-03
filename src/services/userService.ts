import { User } from "@/types";
import { apiClient } from "./apiClient";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const firebaseLogin = async (
  email: string,
  password: string
): Promise<User> => {
  console.log("🔄 Attempting Firebase login for:", email);

  if (!auth) {
    console.error("❌ Firebase Auth is NOT initialized!");
    throw new Error("Firebase Auth not initialized");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ Firebase Auth Success:", userCredential.user);

    const firebaseUser = userCredential.user;
    if (!firebaseUser.email) {
      throw new Error("❌ Firebase user has no email");
    }

    const token = await firebaseUser.getIdToken();

    const response = await apiClient.post(
      "/users/login",
      {
        _id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || "No Name",
        role: "user",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Backend Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("🔥 Firebase Login Error:", error);
    throw error;
  }
};

export const firebaseLogout = async (): Promise<void> => {
  await signOut(auth);
};

export const firebaseSignup = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  console.log("🔄 Attempting Firebase signup for:", email);

  if (!auth) {
    console.error("❌ Firebase Auth is NOT initialized!");
    throw new Error("Firebase Auth not initialized");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ Firebase Signup Success:", userCredential.user);

    const firebaseUser = userCredential.user;
    if (!firebaseUser.email) {
      throw new Error("❌ Firebase user has no email");
    }

    const token = await firebaseUser.getIdToken();

    const response = await apiClient.post(
      "/users/signup",
      {
        _id: firebaseUser.uid,
        email: firebaseUser.email,
        name: name || "No Name",
        role: "user",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Backend Signup Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("🔥 Firebase Signup Error:", error);
    throw error;
  }
};
