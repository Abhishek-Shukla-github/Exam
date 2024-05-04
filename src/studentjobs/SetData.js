import React from 'react'
import db from '../dbconfig';
export default function SetData() {
    // const data=()=>{
    //     db.collection('time_table').doc('CE').set({
    //         S1:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S2:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S3:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S4:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         }
    //     })
    //     db.collection('time_table').doc('CSE').set({
    //         S1:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S2:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S3:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S4:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         }
    //     })
    //     db.collection('time_table').doc('ECE').set({
    //         S1:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S2:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S3:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S4:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         }
    //     })
    //     db.collection('time_table').doc('ChE').set({
    //         S1:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S2:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S3:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         },
    //         S4:{
    //             'Monday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Tuesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Wednesday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Thursday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //             'Friday' : ['Subject 1', 'Subject 2', 'Subject 3', 'Lab', 'Subject 4', 'Subject 5'],
    //         }
    //     })
    // }

    return (
        <div>
            {/* <button onClick={data}>click</button> */}
        </div>
    )
}
