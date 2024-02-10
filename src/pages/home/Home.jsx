import './Home.scss'
import $api from "../../api/apiConfig.js"
import {Button, Space, Table} from "antd"
import {useState} from "react"
import HomeModal from "./modals/HomeModal.jsx"
import DeleteModal from "./modals/DeleteModal.jsx";
import EditModal from "./modals/EditModal.jsx";
import {useQuery} from "react-query";


const Home = () => {

    // modals
    const [modal, setModal] = useState(false)
    const [delModal, setDelModal] = useState({})
    const [editModal, setEditModal] = useState({})

    const [effect, setEffect] = useState(false)

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 8,
        },
    })


    // Fetch data with useQuery
    const fetchData = async () => {
        const { data } = await $api.get('/users')
        return data
    }
    const { data, isLoading, refetch } = useQuery(
        ['users', effect],
        fetchData,
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false
        }
    )

    
    // for pagination
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })

        refetch();
    };


    // columns for table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '20%',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
            filters: [
                {
                    text: 'Male',
                    value: 'male',
                },
                {
                    text: 'Female',
                    value: 'female',
                },
            ],
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%'
        },
        {
            title: 'Date of birth',
            dataIndex: 'date',
            width: '20%',
            render: (date) => {
                return new Date(date).toISOString().split('T')[0]
            },
        },
        {
            title: 'Actions',
            dataIndex: '',
            width: '15%',
            render: (text, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<i className="fa-regular fa-pen-to-square"/>}
                        size={"large"}
                        onClick={() => setEditModal({ visible: true, userId: record.id })}
                    />
                    <Button
                        type="primary"
                        icon={<i className="fa-solid fa-trash-can"/>}
                        size={"large"}
                        danger
                        onClick={() => setDelModal({ visible: true, userId: record.id })}
                    />
                </Space>
            ),
        }
    ]


    return (
        <div className='home page'>
            <div className="home__titles row between align-center">
                <h1 className='title'>Home</h1>
                <Button type="primary" size={'large'} onClick={() => setModal(true)}>
                    Add user
                    <i className="fa-solid fa-plus"/>
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
            />

            <HomeModal
                modal={modal}
                setModal={setModal}
                setEffect={setEffect}
            />
            <DeleteModal
                delModal={delModal.visible}
                setDelModal={(value) => setDelModal({ ...delModal, visible: value })}
                userId={delModal.userId}
                setEffect={setEffect}
            />
            <EditModal
                modal={editModal.visible}
                setModal={(value) => setEditModal({ ...editModal, visible: value })}
                userId={editModal.userId}
                setEffect={setEffect}
            />
        </div>
    )
}

export default Home