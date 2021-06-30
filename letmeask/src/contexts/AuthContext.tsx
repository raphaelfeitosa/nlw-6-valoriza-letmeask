import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { auth, firebase } from "../services/firebase";
import toast from 'react-hot-toast';

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    loading: boolean;
    signOut: () => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}
const AuthContext = createContext({} as AuthContextType);

function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user;

                if (!displayName || !photoURL) {
                    throw new Error('Sua conta goole não possui um nome público ou uma imagem de perfil!');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email
                });

            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }

    }, []);


    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid, email } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Sua conta goole não possui um nome público ou uma imagem de perfil!');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                email
            });

            toast.success(`Bem vindo, ${displayName}!`);
        }
    }

    async function signOut() {
        await firebase.auth().signOut();

        setUser(undefined);

        toast.success(`Até logo!`);

        signInWithGoogle();
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            loading,
            signOut
        }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { useAuth, AuthContextProvider };