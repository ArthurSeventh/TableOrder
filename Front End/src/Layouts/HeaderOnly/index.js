import Header from '../../Component/Header'


function HeaderOnly({children}) {
    return ( 
        <div className='Wrapper'>
            <Header />
            <div className='content'>
                {children}
            </div>
        </div>

     );
}

export default HeaderOnly