import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios'
import { Icon } from '@iconify/react';

function Home(){  
   const [Todos,setTodos]=useState([]);

   

   const fetchData=async ()=>{
            try {
                const res=await axios.get("http://localhost:3001/all")
                console.log("data",res?.data)
                setTodos(res?.data?.todosAll);
            } catch (error) {
                console.error(error)
            }
   }
   const handleDelete=async( id)=>{
    try {
         
        await axios.delete("http://localhost:3001/delete/"+id)
        fetchData()
        
    } catch (error) {
        console.log(error)
        
    }
   }
   const handleupdate=async(id)=>{
    try {
         
       const res= await axios.put("http://localhost:3001/put/"+id)
       setTodos(res?.data?.todosAll);

    

    } catch (error) {
        console.log(error)
      
    }
   }

   useEffect(()=>{
      fetchData()
   },[])



 return(
    <div className=' flex flex-col justify-center items-center gap-2'>
        <h1 className='text-[38px] font-bold' >Todo List</h1>
        <Create fetchdata={fetchData}  />
        {
            Todos.length===0
            ? 
            <div><h2>No records</h2></div>
            :
            Todos.map(todo=>(

                <div className=' flex w-[550px] justify-between bg-black text-white text-2xl border-white border-2 rounded-md p-1' key={todo._id}>
                    {!todo?.done?
                    (<Icon icon="ri:checkbox-blank-circle-line" onClick={()=>{handleupdate(todo._id)}}  className='cursor-pointer hover:"mark as done"'/>)
                    :
                    (<Icon icon="mdi:checkbox-marked-circle-outline" className='cursor-pointer' />)
                    }
                   <div className={todo?.done?("line-through"):("")}> {todo?.task}</div>
                    <button onClick={()=>{handleDelete(todo._id)}}><Icon className='cursor-pointer'  icon="material-symbols:delete-sharp" /></button>
                </div>


                
            ))
        }
    

  </div>
 )
}

export default Home;
