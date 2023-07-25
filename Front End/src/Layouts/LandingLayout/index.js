import Header from '../../Component/Header'

function LandingLayout({children}) {
    return ( 
        <div className='Wrapper'>
            <Header />
            <div className='Content'>
                {children}
            </div>
        </div>

     );
}

export default LandingLayout