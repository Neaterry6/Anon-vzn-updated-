import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FeedPage from './pages/FeedPage';
import NeonPulsePage from './pages/NeonPulsePage';
import MidnightChatPage from './pages/MidnightChatPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import PublicLinkPage from './pages/PublicLinkPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import AiPage from './pages/AiPage';
import { ensureSeed } from './lib/storage';

export const App = () => {useEffect(()=>ensureSeed(),[]);return <div><nav className='top'>{['/','/login','/dashboard','/feed','/neon-pulse','/midnight-chat','/settings','/support','/admin','/ai'].map(p=><Link key={p} to={p}>{p.replace('/','')||'signup'}</Link>)}</nav><Routes><Route path='/' element={<SignupPage/>}/><Route path='/login' element={<LoginPage/>}/><Route path='/dashboard' element={<DashboardPage/>}/><Route path='/feed' element={<FeedPage/>}/><Route path='/neon-pulse' element={<NeonPulsePage/>}/><Route path='/midnight-chat' element={<MidnightChatPage/>}/><Route path='/settings' element={<SettingsPage/>}/><Route path='/support' element={<SupportPage/>}/><Route path='/admin' element={<AdminPage/>}/><Route path='/verification-success' element={<VerifySuccessPage/>}/><Route path='/ai' element={<AiPage/>}/><Route path='/u/:username' element={<PublicLinkPage/>}/></Routes></div>}
