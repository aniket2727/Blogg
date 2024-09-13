import   useState  from 'react';

const url = 'http://localhost:9009/app';

const Loginapis = async ({ email, password }) => {
    const [status, setStatus] = useState("login done successfully");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState('');

    if (!email || !password) {
        setStatus("please provide all data");
        setLoading(false);
        setError(true);
        setData([]);

        return { status, loading, error, data };
    }

    try {
        const apiResponse = await fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await apiResponse.json();

        if (!apiResponse.ok) {
            throw new Error(result.message || "Failed to login");
        }

        setData(result);
        setStatus("Login successful");
    } catch (error) {
        setStatus("Failed to login");
        setError(true);
        console.log("Error:", error);
    } finally {
        setLoading(false);
    }

    return { status, loading, error, data };
};

export default Loginapis;
