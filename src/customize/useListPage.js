import { useState, useEffect } from 'react';
import axios from "axios";
import { message } from 'antd';

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
                message.error('An error occurred while attempting to call api fetching user');
            }
        };

        fetchData();
    }, [apiObject.getList.baseURL, page, pagination.limit]);

    return { data, pagination, loading };
}

export default useListPage;
