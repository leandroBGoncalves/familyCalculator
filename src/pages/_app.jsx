import { AuthProvider } from '../Contexts/AuthContext'
import '../style/global.scss'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
