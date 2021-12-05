import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
import Head from 'next/head';

import Dashboard from '../components/DashBoard/DashBord'

export default function Home() {

  async function getData() {
    await supabase
    .from('despesasmes')
    .select('*').then((response) => {
      console.log(response.data)
    })
  }

  useEffect(() => {
    getData()
  })

  return (
    <>
    <Head>
      <title>Home | family calculator</title>
    </Head>   
    <Dashboard />    
   </>
  )
}
