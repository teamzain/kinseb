export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1600px',
      height: '700px',
      margin: '0 auto',
      background: `linear-gradient(180deg, #04091D 0%, #0D98BA 100%)`,
      overflow: 'hidden'
    }}>
      {/* Main Container */}
      <div style={{
        position: 'absolute',
        width: '90%',
        maxWidth: '1302px',
        height: '520px',
        left: '50%',
        top: '90px',
        transform: 'translateX(-50%)',
        background: `linear-gradient(270deg, rgba(4, 9, 29, 0) -264.67%, rgba(4, 9, 29, 0.7) 100%), url('/api/placeholder/1302/520')`,
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
          width: '100%',
          height: '518px',
          left: '0px',
          top: '0px',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          
          {/* Heading with slide-in animation */}
          <h1 style={{
            position: 'absolute',
            width: 'min(1136px, 70%)',
            height: 'auto',
            left: '70px',
            top: '100px',
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 'clamp(32px, 4vw, 56px)',
            lineHeight: '1.15',
            color: '#FFFFFF',
            margin: '0',
            zIndex: 3,
            animation: 'slideInLeft 1s ease-out forwards',
            opacity: 0,
            transform: 'translateX(-50px)'
          }}>
            Ready To <span style={{ color: '#0D98BA' }}>Elevate</span><br />
            Your Online Presence?
          </h1>

          {/* Paragraph with delayed slide-in */}
          <p style={{
            position: 'absolute',
            width: 'min(533px, 60%)',
            height: 'auto',
            left: '70px',
            top: '258px',
            fontFamily: 'Lato, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            lineHeight: '150%',
            letterSpacing: '-0.006em',
            color: '#E6E6E6',
            margin: '0',
            zIndex: 3,
            animation: 'slideInLeft 1s ease-out 0.3s forwards',
            opacity: 0,
            transform: 'translateX(-50px)'
          }}>
            We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.
          </p>

          {/* Button Container with delayed slide-in */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '13px',
            position: 'absolute',
            width: 'auto',
            height: '45px',
            left: '70px',
            top: '371px',
            zIndex: 3,
            animation: 'slideInLeft 1s ease-out 0.6s forwards',
            opacity: 0,
            transform: 'translateX(-50px)'
          }}>
            {/* Button with hover effect */}
            <button style={{
              width: '157px',
              height: '45px',
              background: '#0D98BA',
              border: '2px solid #0D98BA',
              borderRadius: '6px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              fontFamily: 'Lato, sans-serif',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '150%',
              color: '#04091D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = '#0B7A94';
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 8px 20px rgba(13, 152, 186, 0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = '#0D98BA';
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = 'none';
            }}>
              Request A Quote
            </button>
          </div>

          {/* Website Mockup 1 - Background with slide-in from right */}
          <div style={{
            position: 'absolute',
            width: 'min(300px, 25%)',
            height: 'min(620px, 70%)',
            right: 'max(200px, 15%)',
            top: '60px',
            background: `url('/api/placeholder/300/620')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'drop-shadow(10px 4px 10px rgba(0, 0, 0, 0.25))',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 1,
            animation: 'slideInRight 1.2s ease-out 0.8s forwards',
            opacity: 0,
            transform: 'translateX(100px) rotate(5deg)'
          }} />

          {/* Website Mockup 2 - Foreground with delayed slide-in from right */}
          <div style={{
            position: 'absolute',
            width: 'min(300px, 25%)',
            height: 'min(450px, 60%)',
            right: 'max(0px, 5%)',
            top: '100px',
            background: `url('/images/89.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 2,
            filter: 'drop-shadow(5px 2px 8px rgba(0, 0, 0, 0.2))',
            animation: 'slideInRightForward 1.4s ease-out 1.2s forwards',
            opacity: 0,
            transform: 'translateX(120px) rotate(-3deg)'
          }} />

        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) rotate(5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(2deg);
          }
        }

        @keyframes slideInRightForward {
          from {
            opacity: 0;
            transform: translateX(120px) rotate(-3deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-1deg);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          h1 {
            left: 40px !important;
          }
          p {
            left: 40px !important;
          }
          div[style*="left: 70px"] {
            left: 40px !important;
          }
        }

        @media (max-width: 768px) {
          h1 {
            left: 20px !important;
            width: 70% !important;
          }
          p {
            left: 20px !important;
            width: 70% !important;
          }
          div[style*="left: 70px"] {
            left: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}