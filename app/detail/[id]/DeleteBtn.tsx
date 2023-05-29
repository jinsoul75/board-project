'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function DetailLink({result}:any) {
    const router = useRouter();
    return(
        <button onClick={()=>{
             axios.post('/api/post/delete',{
                _id: result._id
            })
            .then((res) => {
                if (res.status === 200) {
                    router.push('/')
                } else {
                  console.log('삭제안됨');
                }})
        }
        }>삭제버튼</button>
    )
}