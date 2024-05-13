// import React, { useState } from 'react';


// const Payment = () => {
//     const [courseName, setCourseName] = useState('');
//     const [courseId, setCourseId] = useState('');
//     const [studentId, setStudentId] = useState('');
//     const [courseFee, setCourseFee] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const res = await fetch("http://localhost:3004/api/payments/checkout", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     items: [{
//                         courseName: courseName,
//                         courseId: courseId,
//                         studentId: studentId,
//                         courseFee: parseFloat(courseFee)
//                     }]
//                 }),
//             });
//             const data = await res.json();
//             if (data.url) {
//                 window.location = data.url;
//             } else {
//                 console.error('Error: No URL received from the server');
//                 // Handle error
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="courseName">Course Name:</label>
//                 <input
//                     type="text"
//                     id="courseName"
//                     value={courseName}
//                     onChange={(e) => setCourseName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="courseId">Course ID:</label>
//                 <input
//                     type="text"
//                     id="courseId"
//                     value={courseId}
//                     onChange={(e) => setCourseId(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="studentId">Student ID:</label>
//                 <input
//                     type="text"
//                     id="studentId"
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="courseFee">Course Fee:</label>
//                 <input
//                     type="number"
//                     id="courseFee"
//                     value={courseFee}
//                     onChange={(e) => setCourseFee(e.target.value)}
//                     required
//                 />
//             </div>
//             <button type="submit">Checkout</button>
//         </form>
//     );
// };

// export default Payment;

// Payment.jsx
import React, { useState } from 'react';
import { initiateCheckout } from '../services/Paymentservice';

const Payment = () => {
    const [courseName, setCourseName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [courseFee, setCourseFee] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = await initiateCheckout([{
                courseName: courseName,
                courseId: courseId,
                studentId: studentId,
                courseFee: parseFloat(courseFee)
            }]);
            window.location = url; // Redirect to payment URL
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="courseName">Course Name:</label>
                <input
                    type="text"
                    id="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="courseId">Course ID:</label>
                <input
                    type="text"
                    id="courseId"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="studentId">Student ID:</label>
                <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="courseFee">Course Fee:</label>
                <input
                    type="number"
                    id="courseFee"
                    value={courseFee}
                    onChange={(e) => setCourseFee(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Checkout</button>
        </form>
    );
};

export default Payment;
