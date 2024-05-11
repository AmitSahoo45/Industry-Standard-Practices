import { cookies } from 'next/headers';
import Link from 'next/link';

const getToken = () => {
    const token = cookies().get('token');

    return token;
};

const Dashboard = () => {
    const token = getToken();

    if (!token)
        return
    <>
        <h1>You need to create an account first!</h1>
        <Link href='/'>Create your account</Link>
    </>;

    return (
        <h1>Welcome to Dashboard</h1>
    );
};

export default Dashboard;