import React,{useState,useEffect} from 'react'
import { getAllPayments } from '../services/PaymentService'
import '../utils/styles/Payment.css';

const PaymentPage = () => {
    const [payments,setPayments] = useState([]);
    const [searchItem, setSearchItem] = useState('')

    useEffect(()=>{
        fetchPayments();
    })

    const fetchPayments = async() => {

        try{
            const paymentsData =await getAllPayments();
            setPayments(paymentsData);
            
        }catch(error){
            console.log("error fetching payments",error);
        }

    }

    const filteredPayments = payments.filter(payment=> 
        payment.courseId.toLowerCase().includes(searchItem.toLowerCase()) ||
        payment.studentId.toLowerCase().includes(searchItem.toLowerCase())
    )

    const handleChange = (e)=>{
        setSearchItem(e.target.value)
    }

  return (
    <div>
      <h1>Payment Details</h1>
      <input
                type="text"
                placeholder="Search by Course ID or Student ID"
                value={searchItem}
                onChange={handleChange}
            />
      <table>
        <thead>
            <tr>
                <th>Course Name</th>
                <th>Course ID</th>
                <th>Student ID</th>
                <th>Course Fee</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
                {filteredPayments.map(payment => (
                    <tr key={payment._id}>
                        <td>{payment.courseName}</td>
                        <td>{payment.courseId}</td>
                        <td>{payment.studentId}</td>
                        <td>{payment.courseFee}</td>
                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
      </table>
    </div>
  )
}

export default PaymentPage
