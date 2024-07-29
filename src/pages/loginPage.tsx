import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    const { authenticate, loading } = useAuth();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <button onClick={authenticate}>Log in with GitHub</button>
            )}
        </div>
    );
};

export default LoginPage;
