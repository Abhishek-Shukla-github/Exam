import { useState } from 'react';
import db from '../dbconfig'
import { collection, getDocs } from "firebase/firestore";

function UseDataApi() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    async function getCourses() {
        setLoading(false)
        let c=[]
        try {
            const querySnapshot = await getDocs(collection(db, "courses"));
            querySnapshot.forEach((ele)=>{
                c.push(ele.id)
            })
            setCourses(c)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(true)
        }
    }
    return {
        getCourses,
        courses,
        loading
    }
}

export default UseDataApi;