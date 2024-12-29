import { useState, useCallback } from "react"
import axios from "axios"

// this hook fetches the Plaid Link token from the server
export const useLinkToken = () => {
    const [linkToken, setLinkToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const fetchLinkToken = useCallback( async (accessToken = null) => {
        setIsLoading(true)
        try {
            const response = await axios.post('/api/create-link-token', {
                access_token: accessToken
            });
            setLinkToken(response.data.link_token);
        } catch (err) {
            console.error("Error fetching link token:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { linkToken, fetchLinkToken, isLoading }
}