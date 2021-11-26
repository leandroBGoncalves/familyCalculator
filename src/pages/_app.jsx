import Header from '../components/Header/Header'
import '../style/global.scss'

import Dashboard from '../components/DashBoard/DashBord'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Dashboard />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
