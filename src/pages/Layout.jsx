import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Layout = ({ children }) => {

    return (
        <div>
            <Header></Header>
            <main>
                {children}
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Layout