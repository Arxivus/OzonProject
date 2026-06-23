import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {

    return (
        <div>
            <Header></Header>
            <main>
                {children}
            </main>
            <Footer></Footer>
            <Toaster
                containerStyle={{ zIndex: 9999 }}
                toastOptions={{ style: { zIndex: 9999, boxShadow: 'var(--shadow)' } }} />
        </div>
    )
}

export default Layout