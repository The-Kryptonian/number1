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

const Login = () => {

const router = useRouter()  

 return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white'}}>
        <div style={{paddingLeft: 20, paddingRight: 20, backgroundColor: 'white', minHeight: '100vh'}}>
        <div style={{position:'relative', top: 40}}>   

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30}}>
            <div style={{width:90, height: 90, borderRadius: 45, backgroundColor: 'rgb(201, 201, 201)'}}></div>
            <div style={{fontSize:35, fontWeight: 550, marginTop: 15, marginBottom: 0}} className={berlinSans.className}>Welcome Back!</div>
            <div className={arialNarrow.className} style={{fontSize: 15, marginBottom: 40}}>Sign In to track orders, view order history and more just for you</div>
        </div>  

        <div style={{display:'flex', flexDirection: 'column', width: '350px'}}>
            <div>Email:</div>
            <input placeholder='email' type='text' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
            <div>Password:</div>
            <input placeholder='password' type='password' style={{padding: 10, borderRadius: 10, fontSize: 18, marginBottom: 15, backgroundColor: 'rgb(250, 250, 250)'}}/>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10, width: '350px'}}>
            <input type='checkbox' style={{}}/>
            <div>Remember Me</div>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', gap: 40, width: '350px', justifyContent: 'center'}}>
            <button onClick={()=>{router.push('/')}} style={{backgroundColor: 'rgb(0, 172, 240)', padding: 5, width: '98%', borderRadius: 5, fontSize: 18, fontWeight: 650, color: 'rgb(255, 248, 248)'}}> Sign In </button>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 15, marginTop: 10}}>
            <div>Don't have an account yet? </div>
            <button style={{color:'rgb(0, 172, 240)'}} onClick={()=>{router.push('/signup')}}>Sign Up</button>
        </div>

        </div>   
        
        {
        // <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 15, marginTop: 20, marginBottom: 20}}>
        //    OR</div>
            }

        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style = {{display: 'flex', flexDirection: 'row', gap: 40, position: 'absolute', bottom: 20}}>
            <img src='/number1/logos/googleIcon.png' alt="Google Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
            <img src='/number1/logos/facebookLogo.png' alt="Facebook Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
            <img src='/number1/logos/InstagramIcon.png' alt="Instagram Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
            <img src='/number1/logos/tiktokIcon.png' alt="TikTok Icon" style={{width: 40, height: 40, borderRadius: 28}}/>
        </div>
        </div> 

        </div>
     </div>   
 )
}

export default Login
