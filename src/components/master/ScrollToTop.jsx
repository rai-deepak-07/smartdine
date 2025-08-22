import React, { useEffect } from 'react'

const ScrollToTop = () => {

    useEffect(() => {
        const handleScroll = () => {
          const scrollToTop = document.getElementById('ScrollToTop');
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
          // Add or remove the 'scrolled' class based on the scroll position
          if (scrollTop > 50) {
            scrollToTop.classList.add('scrolled');
          } else {
            scrollToTop.classList.remove('scrolled');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const scrollToTop = () => {
      window.scrollTo({top:"0", behavior:"smooth"})  
      // document.documentElement.scrollTop = 0; // For modern browsers
    }

    return (
        <div style={{zIndex:"20"}}>
            {/* Scroll To Top Button Start */}
            <button id="ScrollToTop" onClick={scrollToTop} className='rounded border-0'>
                <i className='bi bi-arrow-up-short fs-3 fw-bold'></i>
            </button>
            {/* Scroll To Top Button End */}
        </div>
    )
}

export default ScrollToTop
