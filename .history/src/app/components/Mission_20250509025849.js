// MissionComponent.jsx
import React from 'react';

const MissionComponent = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>What <span style={styles.accent}>Drives</span> Us</h2>
        
        <div style={styles.card}>
          <div style={styles.cardContent}>
            <h1 style={styles.missionTitle}>
              <span style={styles.missionAccent}>Mission</span>
            </h1>
            
            <h3 style={styles.subheading}>
              Crafting Clean<br />
              Digital <span style={styles.solutionsText}>Solutions</span>
            </h3>
            
            <p style={styles.description}>
              We design and develop purpose-built websites that are clean, fast,
              and tailored to your brand's goals — empowering you to grow,
              connect, and lead with confidence in the digital world.
            </p>
            
            <button style={styles.button}>Start a Project</button>
          </div>
        </div>
        
        <div style={styles.pagination}>
          <span style={styles.paginationDot}></span>
          <span style={{...styles.paginationDot, ...styles.activeDot}}></span>
          <span style={styles.paginationDot}></span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #002235, #00121f)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  content: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },
  heading: {
    color: 'white',
    fontSize: '36px',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0 0 20px 0',
  },
  accent: {
    color: '#4BB4CE',
  },
  card: {
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    background: 'url("/background-image.jpg") center right / cover no-repeat',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  cardContent: {
    background: 'linear-gradient(to right, rgba(0, 30, 45, 0.9) 50%, rgba(0, 30, 45, 0.7) 80%, rgba(0, 30, 45, 0.4) 100%)',
    padding: '60px 40px',
    maxWidth: '550px',
  },
  missionTitle: {
    color: '#071e2d',
    fontSize: '90px',
    fontWeight: '700',
    margin: '0 0 20px 0',
    opacity: '0.3',
  },
  missionAccent: {
    color: '#071e2d',
  },
  subheading: {
    color: 'white',
    fontSize: '32px',
    fontWeight: '600',
    margin: '0 0 20px 0',
    lineHeight: '1.2',
  },
  solutionsText: {
    color: '#4BB4CE',
  },
  description: {
    color: 'white',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 30px 0',
    maxWidth: '450px',
  },
  button: {
    backgroundColor: '#4BB4CE',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 25px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  paginationDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
  },
  activeDot: {
    backgroundColor: '#4BB4CE',
    width: '20px',
    borderRadius: '4px',
  },
};

export default MissionComponent;