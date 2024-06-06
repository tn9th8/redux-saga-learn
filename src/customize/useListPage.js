import { Button, Flex, Popconfirm, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const onCancel = () => {
  message.error("No user was deleted");
};

const onDelete = (id) => {
  // to do
  message.success(`The id-${id} user was deleted`);
};

function useListPage({ apiObject, page }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(apiObject.getList.baseURL, {
          params: {
            offset: (page - 1) * pagination.limit,
            limit: pagination.limit,
            ...filter,
          },
        });
        const { data, limit, offset, total } = response.data;
        setData(data);
        setPagination({
          limit: +limit,
          offset: +offset,
          total,
        });
        setLoading(false);
      } catch (error) {
        message.error(
          "An error occurred while attempting to call api fetching user"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [apiObject.getList.baseURL, page, pagination.limit, filter]);

  const renderAction = (_, { id }) => (
    <Flex wrap gap="small">
      <Button
        type="primary"
        onClick={() => navigate(`${apiObject.getList.baseURL}/form/${id}`)}
        style={{ background: "Orange", borderColor: "Orange" }}
      >
        Update
      </Button>
      <Popconfirm
        title="Sure to delete?"
        description="Are you sure to delete this user?"
        onConfirm={() => onDelete(id)}
        onCancel={onCancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger>
          Delete
        </Button>
      </Popconfirm>
    </Flex>
  );

  const handleFilter = {
    user: (user) => {
      setFilter({
        // fistName: user?.fistName && user.fistName !== "" : user.firstName,
        firstName:
          user?.firstName && user.firstName !== "" ? user.firstName : null,
        lastName: user?.lastName && user.lastName !== "" ? user.lastName : null,
        gender: user?.gender,
      });
    },
  };

  return { data, pagination, loading, renderAction, handleFilter };
}

export default useListPage;
