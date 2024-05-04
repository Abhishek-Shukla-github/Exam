import React from 'react'
import db from '../dbconfig';
export default function SetData() {
    const data=()=>{
        db.collection('questions').doc('CSE').set({
            Y2021: {
                S1 : {  
                    CES1CHEM1 :  {
                        long : ['s1q1', 'q2', 'q3','q4', 'q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'],
                        short : ['s1q1', 'q2', 'q3','q4', 'q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : false, 
                        published : false
                    },
                    CES1PHY1 : {
                        long : ['s1q1', 'q2'],
                        short : ['s1q1', 'q2'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : false, 
                        published : false
                    },
                    NewKey2 :  {
                        long : ['q1', 'q2'],
                        short : ['q1', 'q2'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : true, 
                        published : false
                    },
                    NewKey23ed : {
                        long : ['q1', 'q2'],
                        short : ['q1', 'q2'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : true, 
                        published : false
                    }
                },
                S2 : {  
                    CES2CHEM1 :  {
                        long : ['s2q1', 'q2'],
                        short : ['s2q1', 'q2'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : false, 
                        published : false
                    },
                    CES2MATHS1 : {
                        long : ['s2q1', 'q2'],
                        short : ['s2q1', 'q2'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : false, 
                        published : false
                    },
                    NewKey1 :  {
                        long : ['s2q1', 'q2'],
                        short : ['s2q1', 'q2'],
                        paper: {
                            long : ['s1q1', 'q2', 'q3','q4', 'q5'],
                            short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
                        },
                        prepared : true, 
                        published : false
                    }
                }
            }, 
            // Y2032: {
            //     S1 : {  
            //         CES1CHEM1 :  {
            //             long : ['s1q1', 'q2', 'q3','q4', 'q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'],
            //             short : ['s1q1', 'q2', 'q3','q4', 'q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         CES1PHY1 : {
            //             long : ['s1q1', 'q2'],
            //             short : ['s1q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         NewKey2 :  {
            //             long : ['q1', 'q2'],
            //             short : ['q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : true, 
            //             published : false
            //         },
            //         NewKey23ed : {
            //             long : ['q1', 'q2'],
            //             short : ['q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : true, 
            //             published : false
            //         }
            //     },
            //     S2 : {  
            //         CES2CHEM1 :  {
            //             long : ['s2q1', 'q2'],
            //             short : ['s2q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         CES2MATHS1 : {
            //             long : ['s2q1', 'q2'],
            //             short : ['s2q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         NewKey1 :  {
            //             long : ['s2q1', 'q2'],
            //             short : ['s2q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : true, 
            //             published : false
            //         }
            //     }
            // },
            // Y2033: {
            //     S1 : {  
            //         CES1CHEM1 :  {
            //             long : ['s1q1', 'q2', 'q3','q4', 'q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'],
            //             short : ['s1q1', 'q2', 'q3','q4', 'q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         CES1PHY1 : {
            //             long : ['s1q1', 'q2'],
            //             short : ['s1q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         NewKey2 :  {
            //             long : ['q1', 'q2'],
            //             short : ['q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : true, 
            //             published : false
            //         },
            //         NewKey23ed : {
            //             long : ['q1', 'q2'],
            //             short : ['q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : true, 
            //             published : false
            //         }
            //     },
            //     S2 : {  
            //         CES2CHEM1 :  {
            //             long : ['s2q1', 'q2'],
            //             short : ['s2q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         CES2MATHS1 : {
            //             long : ['s2q1', 'q2'],
            //             short : ['s2q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : false, 
            //             published : false
            //         },
            //         NewKey1 :  {
            //             long : ['s2q1', 'q2'],
            //             short : ['s2q1', 'q2'],
            //             paper: {
            //                 long : ['s1q1', 'q2', 'q3','q4', 'q5'],
            //                 short : ['s1q1', 'q2', 'q3','q4', 'q5','q6']
            //             },
            //             prepared : true, 
            //             published : false
            //         }
            //     }
            // },
        })
    }
    return (
        <div>
            <button onClick={data}>click</button>
        </div>
    )
}
