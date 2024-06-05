import { useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [subject, setSubject] = useState("");
  const [hour,setHour]=useState();

  const [arr,setArr]=useState([]);

  function textfunc(e){
    let value=e.target.value;
    setSubject(value);
  }
  function numfunc(e){
    let value=e.target.value;
    setHour(value);
  }
  function addfunc(e){
    e.preventDefault();
    setArr([...arr,{subject:subject,hour:parseInt(hour)}]);
    setSubject("");
    setHour("");
  }
  function increase(idx){
    let arr1=[...arr]
    arr1[idx].hour+=1;
    setArr(arr1);
  }
  function decrease(idx){
    if(arr[idx].hour>0){
    let arr1=[...arr]
    arr1[idx].hour-=1;
    setArr(arr1);
    }
  }

  useEffect(() => {
    if(arr.length>0){
      localStorage.setItem("sub",JSON.stringify(arr))
    }
  }, [arr]);
  useEffect(() => {
    if(localStorage.getItem("sub")){
    setArr(JSON.parse(localStorage.getItem("sub")));
    }
  }, []);

  return (
    <main>
      <div className="hero">
        <h1 style={{marginBottom:"2vh",fontSize:"2xl"}}>Geekster Education Planner</h1>
        <form action="">
          <input type="text" value={subject} onChange={textfunc} placeholder='Subject' style={{marginRight:"1vw",border:"1px #e8eaed solid",fontSize:"20px",padding:"5px"}}/>
          <input type="number" value={hour} onChange={numfunc}  placeholder='Hour'style={{marginRight:"1vw",border:"1px #e8eaed solid",fontSize:"20px",padding:"5px"}}/>
          <button onClick={addfunc}>Add</button>
        </form>
        <div className="output" style={{marginTop:"3vh",fontSize:"larger"}}>
          {
            arr.map((ele,idx)=>{
              return(
                <div key={idx} style={{display:"flex"}}>
                  <p style={{marginRight:"1vw",marginBottom:"5vh"}}>{ele.subject} - {ele.hour} hours</p>
                  <button onClick={()=>increase(idx)} style={{marginRight:"1vw", padding:"1vh 0.6vw",alignSelf: 'flex-start', background:"#22c55e"}}>+</button><button onClick={()=>decrease(idx)} style={{padding:"1vh 0.6vw",alignSelf: 'flex-start',background:"#ef4444"}}>-</button>
                </div>
              )
              
            })
          }
        </div>
      </div>
    </main>
  )
}

export default App
