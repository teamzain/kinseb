export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      width: '1600px',
      height: '700px',
      margin: '0 auto',
         background: `linear-gradient(180deg, #04091D 0%, #0D98BA 100%)`,
    }}>
      {/* Main Container */}
      <div style={{
        position: 'absolute',
        width: '1302px',
        height: '520px',
        left: '69px',
        top: '90px',
        background: `linear-gradient(270deg, rgba(4, 9, 29, 0) -264.67%, rgba(4, 9, 29, 0.7) 100%), url('/images/detail.jpg')`,
        backgroundBlendMode: 'normal, normal',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1px solid #7D818D',
        borderRadius: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        
        {/* Frame 26 - Inner container */}
        <div style={{
          position: 'absolute',
          width: '1302px',
          height: '518px',
          left: '0px',
          top: '0px',
          borderRadius: '10px',
          overflow: 'hidden'
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
            margin: '0',
            zIndex: 3
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
            margin: '0',
            zIndex: 3
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
            top: '371px',
            zIndex: 3
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
            width: '    300px',
            height: '620px',
            right: '200px',
            top: '60px',
            background: `url('/images/89.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'drop-shadow(10px 4px 10px rgba(0, 0, 0, 0.25))',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 1
          }} />

          {/* Website Mockup 2 - Foreground */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '350px',
            right: '80px',
            top: '100px',
            background: `url('/images/90.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 2,
            filter: 'drop-shadow(5px 2px 8px rgba(0, 0, 0, 0.2))'
          }} />

        </div>
      </div>
    </div>
  );
}