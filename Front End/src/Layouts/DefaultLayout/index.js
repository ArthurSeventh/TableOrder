import Header from '../../Component/Header'
import Footer from '../../Component/Footer';

import { useContext } from 'react';
import { loginContext } from '../../App';

function DefaultLayout({children}) {


    const context = useContext(loginContext)
    return ( 
        <div className='Wrapper'>
            {context.is_auth && <Header />}
            <div className='content'>
                {children}
            </div>
            <Footer />
        </div>

     );
}

export default DefaultLayout