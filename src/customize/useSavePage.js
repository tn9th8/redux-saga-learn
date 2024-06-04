import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function useSavePage({apiObject, id}) {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        // console.log('3.1 ', id)
        const fetchData = async () => {
            // console.log('3.2 ', id)
            try {
                const res = await axios.get(apiObject.getById.baseURL.replace(':id', id))
                setData({...res.data})
                // console.log('3.3 ', id)
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
        } catch (error) {
            message.error(`Failed to update the id-${data.id}`)
        }
    };
    
    console.log('4 data ', data)
    return [data, setData, updateData];
}

export default useSavePage;
