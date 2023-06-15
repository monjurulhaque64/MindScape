import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loggedUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loggedOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name , photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    const singInGoogle = (provider) => {
        return signInWithPopup(auth, provider);
        setLoading(false);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          // set token
          if (currentUser) {
            axios.post('http://localhost:5000/jwt', { email: currentUser.email })
              .then(response => {
                // console.log(response.data);
                localStorage.setItem('access-token', response.data) 
                setLoading(false);
              })
              .catch(error => {
                setLoading(false);
                console.log('Error while fetching token:', error);
              });
          } else {
            localStorage.removeItem('access-token')
            setLoading(false);
          }
        });
        return () => {
          return unsubscribe();
        };
      }, []);
      

    const authInfo = {
        user,
        loading,
        createUser,
        loggedUser,
        loggedOut,
        updateUserProfile,
        singInGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;