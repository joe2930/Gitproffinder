import React, { useState, useEffect, useRef } from 'react'
import './Github.css'

const Github = () => {

const [gitdata, setdt ]= useState(false);
const [reponm,setrepo]=useState([]);
const [searched,setsrch]=useState(false);
const [name,setname]=useState('')
const inputans=useRef()

const finder = async(inans)=>
{
    if(inans==="")
    {
      alert('Enter the username !!')
    }
    else
    {
    setsrch(true);
    setname(inans);
    const url='https://api.github.com/users/'
    const name=inans;
    const res= await fetch (url+name);
    const resdata= await res.json();
    if(!res.ok)
      {
        console.log(resdata.message);
        console.log('error')
        return;
      }
    console.log(resdata);
    setdt(
        {
            profile_image:resdata.avatar_url,
            followers:resdata.followers,
            following:resdata.following,
            repo:resdata.public_repos,
            name:resdata.name,
            company:resdata.company,
            location:resdata.location
        }
    )

    if(resdata.public_repos>0)
    {
        // console.log('madhu')
        const repos = await fetch (`https://api.github.com/users/${inans}/repos`);
        const repodt =await repos.json();
        const reponame= repodt.slice(0, resdata.public_repos).map(repodt=> repodt.name); 
        setrepo(reponame);
        for (let i = 0;  i < repodt.length; i++) {
            console.log(repodt[i].name);
          }


    }
  }
  inputans.current.value=' ';
}

const host =async(rname)=>
{
  console.log(name,rname);
  let url = `https://github.com/${name}/${rname}`;
  console.log(url);
  window.open(url, '_blank');
}

useEffect(() => {
  if (searched) {
    document.body.classList.add('black-background');
  } else {
    document.body.classList.remove('black-background');
  }
}, );

  return (
    <div className='maindiv'>
      <h1 className='heading'>Git Hub profile Finder</h1>
      <div className='srch'>
      <input placeholder='Enter the id name' ref={inputans}></input>
      <img 
      onClick={() => finder(inputans.current.value)}          src='search.png' alt='search_icon'></img>
      </div>

      {gitdata?
      <>

      <div className='info'>
       <img className='profileimg'  src={gitdata.profile_image} alt='profile_image'></img>
       <div className='foll'>
       <h1>Name :{gitdata.name}</h1>
       <h1>Repositories :{gitdata.repo}</h1>
       
       </div>
       <div className='foll'>
          <h1>Followers:{gitdata.followers}</h1>
          <h1>Following:{gitdata.following}</h1>
       </div>

       <div className='foll'>
       <h1>Company : {gitdata.company? gitdata.company:'-'}</h1>
       <h1>Location :{gitdata.location?gitdata.location:'-'}</h1>
       </div>
       </div>
       <div className='repo'>
        {reponm.map((reponew, index) => (
          <div className='repo-card' key={index}>
            <h3>{reponew}</h3>
            <button onClick={() => host(reponew)}>View Page</button>
          </div>
        ))}
      </div>

      </>
      :<></>} 
    </div>
  )
}

export default Github
