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

const Welcome = () => {

 const router = useRouter() 
 const welcomeImage = '/logos/welcome.jpeg'   

 return (
    <div style = {{backgroundColor: 'white',  minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
        
        <div className={berlinSans.className} style={{border: '1px solid black', borderRadius: 15,width: '94%', height: 55, fontSize: 25, display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30, textShadow: '3px 3px 3px rgb(208, 208, 208)'}}>Z I C R E X</div>

        <img src={welcomeImage} alt="Welcoming Image" width='350px' style={{marginTop: 70}}/>

        <div style={{fontSize:40, fontWeight: 600, marginTop: 15, marginBottom: 15}} className={berlinSans.className}>
         Welcome !
        </div>

        <div className={arialNarrow.className} style={{fontSize: 20, marginBottom: 40}}>Refuel your wallet with zero friction, keep your portfolio moving with just a few taps.</div>

        <div style={{display: 'flex', flexDirection: 'row', gap: 40,}}>
            <button onClick={()=>{router.push('/')}} style={{padding: 5, width: 120, borderRadius: 5, fontSize: 20, fontWeight: 650, border: "2px solid rgb(226, 226, 226)", boxShadow: '3px 3px 3px rgb(220, 220, 220)'}}> HOME </button>
            <button onClick={()=>{router.push('/login')}} style={{backgroundColor: 'rgb(0, 172, 240)', padding: 5, width: 120, borderRadius: 5, fontSize: 20, fontWeight: 650, color: 'rgb(255, 248, 248)'}}> Sign In </button>
        </div>

    </div>
 )
}

export default Welcome