export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      width: '1444px',
      height: '700px',
      margin: '0 auto'
    }}>
      {/* Main Container */}
      <div style={{
        position: 'absolute',
        width: '1302px',
        height: '520px',
        left: '69px',
        top: '90px',
        background: `linear-gradient(270deg, rgba(4, 9, 29, 0) -264.67%, rgba(4, 9, 29, 0.7) 100%), url('/api/placeholder/1302/520') center/cover, rgba(172, 255, 36, 0.2)`,
        backgroundBlendMode: 'normal, normal, color',
        border: '1px solid #7D818D',
        borderRadius: '10px',
        boxSizing: 'border-box'
      }}>
        
        {/* Frame 26 - Inner container */}
        <div style={{
          position: 'absolute',
          width: '1302px',
          height: '518px',
          left: '0px',
          top: '2px',
          borderRadius: '10px'
        }}>
          
          {/* Heading */}
          <h1 style={{
            position: 'absolute',
            width: '1136px',
            height: '128px',
            left: '70px',
            top: '100px',
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '56px',
            lineHeight: '64px',
            color: '#FFFFFF',
            margin: '0'
          }}>
            Ready To <span style={{ color: '#0D98BA' }}>Elevate</span><br />
            Your Online Presence?
          </h1>

          {/* Paragraph */}
          <p style={{
            position: 'absolute',
            width: '533px',
            height: '81px',
            left: '70px',
            top: '258px',
            fontFamily: 'Lato, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '150%',
            letterSpacing: '-0.006em',
            color: '#E6E6E6',
            margin: '0'
          }}>
            We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.
          </p>

          {/* Button Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '13px',
            position: 'absolute',
            width: '157px',
            height: '45px',
            left: '70px',
            top: '371px'
          }}>
            {/* Button */}
            <button style={{
              width: '157px',
              height: '45px',
              background: '#0D98BA',
              border: '2px solid #0D98BA',
              borderRadius: '6px',
              flex: 'none',
              order: '0',
              flexGrow: '0',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                width: '121px',
                height: '24px',
                left: '18px',
                top: '12px',
                fontFamily: 'Lato, sans-serif',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '150%',
                color: '#04091D'
              }}>
                Request A Quote
              </span>
            </button>
          </div>

          {/* Website Mockup 1 - Background */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '2278px',
            left: '798px',
            top: '50px',
            backgroundImage: `url('/api/placeholder/300/2278')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            filter: 'drop-shadow(10px 4px 10px rgba(0, 0, 0, 0.25))',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Simulated website content */}
            <div style={{
              width: '100%',
              height: '60px',
              background: '#1a1a1a',
              borderRadius: '10px 10px 0 0',
              display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
              gap: '8px'
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
            </div>
            <div style={{
              background: 'linear-gradient(45deg, #0D98BA, #1e40af)',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              Website Preview
            </div>
          </div>

          {/* Website Mockup 2 - Foreground */}
          <div style={{
            position: 'absolute',
            width: '284px',
            height: '1740px',
            left: '1060px',
            top: '100px',
            backgroundImage: `url('/api/placeholder/284/1740')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            {/* Simulated website content */}
            <div style={{
              width: '100%',
              height: '50px',
              background: '#2d2d2d',
              borderRadius: '10px 10px 0 0',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: '6px'
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27ca3f' }}></div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Portfolio Site
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}