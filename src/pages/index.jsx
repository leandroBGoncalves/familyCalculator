import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
import Head from 'next/head';

import Dashboard from '../components/DashBoard/DashBord'

export default function Home() {
  const [body, setBody] = useState([]);

  async function getData() {
    await supabase
    .from('despesasmes')
    .select('*').then((response) => {
      setBody(response.data)
    })
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    <Head>
      <title>Home | family calculator</title>
    </Head>   
    <Dashboard data={body}/>    
   </>
  )
}
