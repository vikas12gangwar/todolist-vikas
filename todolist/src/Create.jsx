import React, {useState} from 'react';


import axios from 'axios';


function Create ({fetchdata}){
    const [task,setTask]=useState('');
    const handleAdd=()=>{
        
        if(task==''){
            alert("type something")
            return
        }

        axios.post("http://localhost:3001/add",{task:task})
        .then(result=>{
            console.log(result)
            fetchdata()
            setTask('')
        })
        .catch(err=>console.log(err));

    }
   

    return(
        <div className='create'>
        <input type="text" name="" id="" className='p-2 border-4 rounded-md border-black w-[500px] mr-1 ' placeholder='enter task' value={task} onChange={(e)=>setTask(e.target.value)} />
        <button className='bg-black text-white p-[10px] border-white rounded-md ' onClick={handleAdd}>Add</button>
        </div>

    )
}

export default Create;
