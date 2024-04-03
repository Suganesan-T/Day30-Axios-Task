import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("https://660ab523ccda4cbc75db9742.mockapi.io/testapi")
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }, [])

    const handleDelete = (id)=>{
        const confirm = window.confirm("Would you want to delete")
        if(confirm){
            axios.delete("https://660ab523ccda4cbc75db9742.mockapi.io/testapi/"+id)
            .then(res => {
                location.reload();
            }).catch(err => console.log(err))
        }
        }


    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List Of Users</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-outline-success'>Add +</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, i) => {
                                return <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>
                                        <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                        <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger me-2'>Delete</button>

                                    </td>


                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )



}

export default Home