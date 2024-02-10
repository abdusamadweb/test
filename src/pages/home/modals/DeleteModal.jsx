import {Button, Space} from "antd";
import $api from "../../../api/apiConfig.js";
import toast from "react-hot-toast";
import {useState} from "react";

const DeleteModal = ({ delModal, setDelModal, userId, setEffect }) => {

    const [loading, setLoading] = useState(false)

    const deleteUser = (e) => {
        e.preventDefault()
        setLoading(true)

        $api
            .delete(`users/${userId}`)
            .then(() => {
                toast.success('Successfully deleted!')

                setDelModal(false)
                setLoading(false)
                setEffect(prev => !prev)
            })
            .catch(err => {
                toast.error(err?.response?.data)
            })
    }


    return (
        <div className={`modal del animation ${delModal ? 'active' : ''}`}>
            <form className='form'>
                <span className='form__title'>Are you sure!</span>
                <Space>
                    <Button
                        type="primary"
                        icon={<i className="fa-solid fa-xmark"/>}
                        size={"large"}
                        onClick={() => setDelModal(false)}
                    />
                    <Button
                        type="primary"
                        icon={<i className="fa-solid fa-check"/>}
                        size={"large"}
                        loading={loading}
                        danger
                        onClick={deleteUser}
                    />
                </Space>
            </form>
            <div className="bg" onClick={() => setDelModal(false)}/>
        </div>
    )
}

export default DeleteModal
