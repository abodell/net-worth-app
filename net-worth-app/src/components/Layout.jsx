import { TypeAnimation } from 'react-type-animation';

const Layout = ({ children }) => {
    // layout component that holds the main content of the app
    return (
        <div className="max-w-7xl mx-auto px-2 py-5 md:py-10 flex flex-col items-center justify-center gap-12">
            <div className="flex md:flex-col align-middle text-center gap-24 text-3xl font-semibold">
                <TypeAnimation
                sequence={[
                    'Track Your Growth',
                    1500,
                    'Keep Tabs on Your Net Worth',
                    1500,
                    'Find your path to Financial Freedom',
                    1500
                ]}
                speed={50}
                style={{ fontsize: '2em' }}
                deletionSpeed={70}
                repeat={Infinity}
                />
            </div>
            <div className="flex flex-col gap-8 justify-center items-center w-full"> {children} </div>
        </div>
    )
}

export default Layout