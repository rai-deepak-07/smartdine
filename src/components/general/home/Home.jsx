import bgImg from '../../../assets/image/general/pizza-8968566.png'

const Home = () => {
    return (
    <div className='smartdine-banner' style={{backgroundImage: `url(${bgImg})`}} id='home_main'>
      <div className="smartdine-overlay"></div>
      <div className="smartdine-content">
        <h1 className='title' data-aos="zoom-in" data-aos-duration="1000">SmartDine</h1>
        <p className='sub-title' data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500">
          <span>Book ahead,</span>
          <span> skip the queue, and dine <br /> like a</span> 
          <span> VIP !!!</span>
        </p>
      </div>
    </div>
  )
}

export default Home
