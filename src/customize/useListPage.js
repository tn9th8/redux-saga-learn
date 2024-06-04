import { useState, useEffect } from 'react';
import axios from "axios";

function useListPage({apiObject, page}) {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({limit: 5, offset: 0, total: 0});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(apiObject.getList.baseURL, {
                    params: {
                        offset: (page - 1) * pagination.limit,
                        limit: pagination.limit
                    }
                });
                const { data, limit, offset, total } = response.data
                setData(data); 
                setPagination({ 
                    limit: +limit, 
                    offset: +offset, 
                    total 
                })
                setLoading(false);
            } catch (error) {
                // to do
                console.log('error')
            }
        };

        fetchData();
    }, [apiObject.getList.baseURL, page]);

    return { data, pagination, loading };
}

export default useListPage;
