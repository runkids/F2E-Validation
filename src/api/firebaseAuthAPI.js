/* eslint-disable */
import firebase from 'firebase';
import config from '@/config/firebase';

firebase.initializeApp(config);
const storage = firebase.storage();

export const auth = firebase.auth();

export async function singUp(userData) {
  const data = {};
  try {
    auth.languageCode = 'zh-tw';

    await auth.createUserWithEmailAndPassword(userData.account, userData.password);

    data.message = 'success';

    await auth.currentUser.sendEmailVerification(); // 發送驗證信
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use': {
        data.message = 'Email already in use';
        break;
      }
      case 'auth/invalid-email': {
        data.message = 'Invalid email';
        break;
      }
      case 'auth/weak-password': {
        data.message = 'Weak password';
        break;
      }
      default: { data.message = error.message; }
    }
  }
  return data;
}

export async function singIn(userData) {
  let data = {};
  try {
    const res = await auth.signInWithEmailAndPassword(userData.account, userData.password);
    if (!res.user.emailVerified) { // 若帳號沒有驗證過就不可以登入
      data.message = 'Please check your email to verify your account';
      return data;
    }
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    data = {
      message: 'success',
      uid: res.uid,
      account: userData.account,
      displayName: res.displayName,
    };
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email': {
        data.message = 'Invalid Email';
        break;
      }
      case 'auth/user-disabled': {
        data.message = 'User Disabled';
        break;
      }
      case 'auth/user-not-found': {
        data.message = 'User Not Found';
        break;
      }
      case 'auth/wrong-password': {
        data.message = 'Wrong Password';
        break;
      }
      default: { data.message = error.message; }
    }
    return data;
  }
  return data;
}

export async function resetPassword(email) {
  const data = {};
  try {
    await auth.sendPasswordResetEmail(email || auth.currentUser.email);
    data.message = 'We\'ll send a reset password link to the email address, please check.';
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found': {
        data.message = 'User Not Found';
        break;
      }
      default: { data.message = error.message; }
    }
    return data;
  }
  return data;
}

// 取得登入者資訊
export function getUserInfo() {
  return auth.currentUser;
}


export async function updateUserInfo({ displayName, photoURL }) {
  try {
    let storageUrl = '';
    const storageRef = storage.ref('/demo').child(auth.currentUser.uid);
    await storageRef.putString(photoURL, 'data_url', { contentType: 'image/png' });
    await storageRef.getDownloadURL().then((url) => {
      storageUrl = url;
    });
    const res = await auth.currentUser.updateProfile({ displayName, photoURL: storageUrl });
    return res;
  } catch (e) {
    console.log(e);
  }
  return null;
}

// 登出
export function signOut() {
  try {
    auth.signOut();
  } catch (e) {
    console.log(e);
  }
}
export async function deleteUser() {
  try {
    await auth.currentUser.delete();
  } catch (e) {
    console.log(e);
  }
}
