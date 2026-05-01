import React from 'react';import { useNavigate } from 'react-router-dom';
export default function VerifySuccessPage(){const n=useNavigate();return <main className='page'><section className='card'><h1>Verification Success</h1><p>Your identity is now masked.</p><button onClick={()=>n('/feed')}>Start Whispering</button><button onClick={()=>n('/dashboard')}>Go to Dashboard</button></section></main>}
