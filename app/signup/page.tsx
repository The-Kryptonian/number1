"use client"

import {useState} from 'react'
import localFont from 'next/font/local';
import {useRouter} from "next/navigation"

const berlinSans = localFont({
    src: '../fonts/BerlinSansFB.ttf',
    display: 'swap',
  });

const arialNarrow = localFont({
    src: '../fonts/ArialNarrow.ttf',
    display: 'swap',
  });     

const Signup = () => {

const router = useRouter()  

 return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 30, backgroundColor: 'white'}}>
        <div style={{paddingLeft: 20, paddingRight: 20}}>
        <div style={{position:'relative', top: 10}}>   

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30}}>
            <div style={{width:90, height: 90, borderRadius: 45, backgroundColor: 'rgb(201, 201, 201)'}}></div>
            <div style={{fontSize:35, fontWeight: 550, marginTop: 15, marginBottom: 0}} className={berlinSans.className}>Create Your Account!</div>
            <div className={arialNarrow.className} style={{fontSize: 15, marginBottom: 40}}>Create an account to discover more features made just for you</div>
        </div>  

        <div style={{display:'flex', flexDirection: 'column', width: '350px'}}>
            <div>Name</div>
            <input placeholder='name' type='text' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
            <div>Surname</div>
            <input placeholder='surname' type='password' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
            <div>National Id</div>
            <input placeholder='National ID' type='text' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
            <div>Email</div>
            <input placeholder='email' type='text' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
            <div>Password</div>
            <input placeholder='password' type='text' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
            <div>Confirm Password</div>
            <input placeholder='confirm password' type='text' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
        </div>

            <button onClick={()=>{router.push('/login')}} style={{width: '350px', backgroundColor: 'rgb(0, 172, 240)', padding: 8, marginTop: 20, marginBottom: 10, borderRadius: 5, fontSize: 18, fontWeight: 650, color: 'rgb(255, 248, 248)'}}> Sign Up </button>

        </div>   
        </div>

    
        <div style = {{display: 'flex', flexDirection: 'row', gap: 40, marginTop: 20}}>
            <img src='/logos/googleIcon.png' alt="Google Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
            <img src='/logos/facebookLogo.png' alt="Facebook Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
            <img src='/logos/instagramIcon.png' alt="Instagram Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
            <img src='/logos/tiktokIcon.png' alt="TikTok Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
        </div>
        
     </div>   
 )
}

export default Signup