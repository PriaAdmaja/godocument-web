const Loader = ({isShow}) => {
    return (
        <section className={` ${isShow ? 'block' : 'hidden'} w-full h-full bg-white/5 flex justify-center items-center absolute`}>
            <span className="loading loading-dots loading-lg"></span>
        </section>
    )
}

export default Loader