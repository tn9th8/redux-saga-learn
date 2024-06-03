import { useState, useEffect } from 'react';
import axios from "axios";

function useListPage(apiObject) {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({limit: 0, offset: 0, total: 0 });

    // useEffect(() => {
    //     // Gọi API để lấy danh sách dữ liệu
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(apiConfig.getlist);
    //             const result = await response.json();
    //             setData(result.data); // Giả sử API trả về mảng dữ liệu
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [apiConfig.getlist]);

    useEffect(() => {
        // Gọi API để lấy danh sách dữ liệu
        const fetchData = async () => {
            try {
                const response = await axios.get(apiObject.getList.baseURL); // console.log('useListPage: response: ', response);
                const { data, limit, offset, total } = response.data
                setData(data); 
                setPagination({ limit, offset, total })
            } catch (error) {
                console.error('Error fetching data by axios:', error);
            }
        };

        fetchData();
    }, [apiObject.getList.baseURL]);

    return { data, pagination };
}

export default useListPage;
