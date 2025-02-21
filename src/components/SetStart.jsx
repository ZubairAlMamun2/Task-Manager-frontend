import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import app from '../firebase/firebase.config';

const SetStart = () => {
    const provider = new GoogleAuthProvider();
    const [error, setError] = useState("");
    const auth = getAuth(app);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const SignInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                setUser(res.user);
                setError("");
                navigate("/"); // Redirect to the task manager dashboard
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to Task Manager</h1>
                    <p className="py-6">
                        Organize your tasks efficiently, track progress, and stay productive.
                        Sign in with Google to get started.
                    </p>
                    {error && <p className="text-red-500">{error}</p>}
                    <button onClick={SignInWithGoogle} className="btn btn-primary">
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetStart;
