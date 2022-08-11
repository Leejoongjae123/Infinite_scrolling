import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEffect, useState} from 'react'
import axios from 'axios'
function App() {
  const [iteration,setIteration]=useState(1)
  const [items,setItems]=useState([]);
  const [noMore,setNoMore]=useState(true)
  let fetchItems= async ()=>{
    let {data}= await axios.get('https://jsonplaceholder.typicode.com/posts')
    data=data.slice(0,10)
    setItems(data)
  }
  
  useEffect(()=>{
    fetchItems()
  },[])

  let fetchData=async()=>{
    let {data}=await axios.get('https://jsonplaceholder.typicode.com/posts')
    data=data.slice(10*iteration,10*(iteration+1))
    setItems([...items,...data])
    setIteration((prev)=>prev+1)
    if (iteration>=10){
      setNoMore(false)
    }
  }

  console.log("items_array:",items)
  console.log("iteration:",iteration)
  return (

  <InfiniteScroll
  dataLength={items.length} //This is important field to render the next data
  next={fetchData}
  hasMore={noMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
  >
  {items.map((elem,index)=>{
    return(
      <div key={index}className='container'>
        <h4>id:{elem.id}</h4>
        <p>title:{elem.title}</p>
      </div>
      
    )
  })}
  </InfiniteScroll>
  );
}

export default App;
