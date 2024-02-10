import $api from "../../../api/apiConfig.js"
import toast from "react-hot-toast"
import {useEffect, useState} from "react"
import {Button, Input, Radio} from "antd"
import {useMutation, useQuery, useQueryClient} from "react-query"


const fetchUser = async (userId) => {
    const { data } = await $api.get(`/users/${userId}`)
    return data
}


const EditModal = ({ modal, setModal, userId, setEffect }) => {

    // edit user
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')


    // use mutation
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (item) => $api.put(`/users/${userId}`, item),
        {
            onSuccess: () => {
                toast.success('Successfully edited!')

                setLoading(false)
                setModal(false)
                setEffect((prev) => !prev)

                queryClient.invalidateQueries(['user', userId])
            },
            onError: (err) => {
                toast.error(err?.response?.data)
            },
        }
    )

    const editUser = (e) => {
        e.preventDefault()
        setLoading(true)

        const item = { name, gender, email, date }
        mutation.mutate(item)
    }


    // get user
    const { data: user } = useQuery(
        ['user', userId],
        () => fetchUser(userId),
        {
            enabled: !!userId,
            refetchOnWindowFocus: false
        }
    )

    useEffect(() => {
        setName(user?.name)
        setGender(user?.gender)
        setEmail(user?.email)
        setDate(user?.date)
    }, [user, userId])


    return (
        <div className={`modal edit animation ${modal ? 'active' : ''}`}>
            <form className="form">
                <span className='form__title'>Add user</span>

                <label>
                    <span className='form__txt'>Full name:</span>
                    <Input
                        className='form__inp'
                        type='text'
                        placeholder='Enter full name . . .'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span className='form__txt'>Email:</span>
                    <Input
                        className='form__inp'
                        type='email'
                        placeholder='Enter email . . .'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span className='form__txt'>Birth date:</span>
                    <Input
                        className='form__inp'
                        type='date'
                        placeholder='Enter birt date . . .'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                </label>
                <Radio.Group
                    className='d-flex'
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                >
                    <Radio value='male'>Male</Radio>
                    <Radio value='female'>Female</Radio>
                </Radio.Group>

                <Button
                    className='form__btn'
                    type="primary"
                    size={'middle'}
                    loading={loading}
                    onClick={editUser}
                >
                    Submit
                </Button>
            </form>
            <div className="bg" onClick={() => setModal(false)}/>
        </div>
    )
}

export default EditModal
