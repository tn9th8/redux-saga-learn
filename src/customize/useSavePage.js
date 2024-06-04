import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function useSavePage({apiObject, id}) {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(apiObject.getById.baseURL.replace(':id', id))
                setData({...res.data})
            } catch (error) {
                message.error(`Failed to fetch by id the id-${id}`)
            }
        };

        fetchData();
    }, [apiObject.getById.baseURL, id]);
    
    const updateData = async (data) => {
        try {
            await axios.put(apiObject.update.baseURL.replace(':id', data.id), data)
            navigate('/users/list');
            message.success(`Successfully updated the id-${data.id}`)
        } catch (error) {
            message.error(`Failed to update the id-${data.id}`)
        }
    };
 
    return [data, setData, updateData];
}

export default useSavePage;
