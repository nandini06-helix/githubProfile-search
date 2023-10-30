import {  useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import search from "./assets/search.svg"
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss"
import axios from "axios"


const APIurl="https://api.github.com/users/"
const App=()=>{
    const [Username, setUsername]=useState("");
    const [url,setUrl]=useState("")
    const [Data,setData]=useState({
        avatar_url:"https://avatars.githubusercontent.com/u/121247303?v=4"
        ,bio:null
        ,followers:0
        ,following:0
        ,login:"nandini06-helix"
        ,name:"Nandini Singh"
        ,location:null
        ,public_repos:13
        ,html_url:"https://github.com/nandini06-helix"

    });
    const OnChangeHandle=(e)=>{
        setUsername(e.target.value);
    }
    const SubmitHandle=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.get(APIurl+Username);
            console.log(response.data);
            if(response){
                setData(response.data);
                setUrl(response.data.html_url);
            }

        }
        catch(error){
            if(error.response.status===404){
                toast.error('invalid username', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

            
        }
        

    }


    
    return(
        <div className={styles.container}>
            <div className={styles.head}>
            <input type="text" placeholder="search username" value={Username} onChange={OnChangeHandle}></input>
            <img src={search} alt="" className={styles.search}></img>
            <button className={styles.btn}type="submit" onClick={SubmitHandle}>Search</button>
            </div>
            <ToastContainer />
            
            <div className={styles.card}>
                <div className={styles.content}>
                <img src={Data.avatar_url} className={styles.dp}></img>
                </div>

                <div className={styles.list_items}>
               
                <li id={styles.login}>
                    <a href={url} target="_blank" rel="noreferrer">{Data.login}</a>
                </li>
                <li id={styles.Name}>{Data.name}</li>
                <li>{Data.location}</li>
                <li>Repos {Data.public_repos}</li>
                <li>Followers  {Data.followers}</li>
                <li>Following {Data.following}</li>
                <li>{Data.bio}</li>
            </div>

            </div>
        </div>
        
    )
}
export default App

