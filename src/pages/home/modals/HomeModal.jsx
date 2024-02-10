import {Button, Input, Radio} from "antd";
import {useState} from "react";
import $api from "../../../api/apiConfig.js";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";

const HomeModal = ({ modal, setModal, setEffect }) => {

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [gender, setGender] = useState('male')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')


    // use mutation
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (item) => $api.post('/users', item),
        {
            onSuccess: () => {
                toast.success('Successfully added!')

                setModal(false)
                setLoading(false)
                setEffect(prev => !prev)

                queryClient.invalidateQueries('users')
            },
            onError: (err) => {
                toast.error(err?.response?.data)
            }
        }
    )

    const createUser = (e) => {
        e.preventDefault()
        setLoading(true)

        const item = { name, gender, email, date }
        mutation.mutate(item)
    }


    return (
        <div className={`modal animation ${modal ? 'active' : ''}`}>
            <form className='form'>
                <span className='form__title'>Add user</span>

                <label>
                    <span className='form__txt'>Full name:</span>
                    <Input
                        className='form__inp'
                        type='text'
                        placeholder='Enter full name . . .'
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span className='form__txt'>Email:</span>
                    <Input
                        className='form__inp'
                        type='email'
                        placeholder='Enter email . . .'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span className='form__txt'>Birth date:</span>
                    <Input
                        className='form__inp'
                        type='date'
                        placeholder='Enter birt date . . .'
                        onChange={(e) => setDate(e.target.value)}
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
                    onClick={createUser}
                >
                    Submit
                </Button>
            </form>
            <div className="bg" onClick={() => setModal(false)}/>
        </div>
    )
}

export default HomeModal
