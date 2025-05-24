// ServiceSection.tsx
import React from 'react';
import { CSSProperties } from 'react';

export default function ServiceSection() {
  return (
    <div style={styles.frame}>
      <div style={styles.leftColumn}>
        <div style={styles.leftHeader}>
          <div style={styles.blueText}>DESIGN</div>
          <div style={styles.whiteTextWithBorder1}>DESIGN</div>
          <div style={styles.whiteTextWithBorder2}>DESIGN</div>
          <div style={styles.whiteTextWithBorder3}>DESIGN</div>
          <div style={styles.whiteTextWithBorder4}>DESIGN</div>
          <div style={styles.whiteTextWithBorder5}>DESIGN</div>
        </div>
        <button style={styles.button}>
          <span style={styles.buttonText}>Explore Web Design Services</span>
        </button>
      </div>

      <div style={styles.rightColumn}>
        <h2 style={styles.mainHeading}>
          Designing experiences for conversion and expansion
        </h2>
        <div style={styles.divider}></div>

        <div style={styles.cardsContainer}>
          <div style={styles.row}>
            {/* First row of cards */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Reliable Support</h3>
              <p style={styles.cardText}>
                Ongoing help whenever you need updates or fixes.
              </p>
            </div>
            
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Reliable Support</h3>
              <p style={styles.cardText}>
                Ongoing help whenever you need updates or fixes.
              </p>
            </div>
            
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Reliable Support</h3>
              <p style={styles.cardText}>
                Ongoing help whenever you need updates or fixes.
              </p>
            </div>
          </div>

          <div style={styles.row}>
            {/* Second row of cards */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Reliable Support</h3>
              <p style={styles.cardText}>
                Ongoing help whenever you need updates or fixes.
              </p>
            </div>
            
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Reliable Support</h3>
              <p style={styles.cardText}>
                Ongoing help whenever you need updates or fixes.
              </p>
            </div>
            
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Reliable Support</h3>
              <p style={styles.cardText}>
                Ongoing help whenever you need updates or fixes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles object with TypeScript CSSProperties type
const styles: Record<string, CSSProperties> = {
  frame: {
    position: 'relative',
    width: '100%',
    maxWidth: '1440px',
    height: '750px',
    margin: '0 auto',
    background: 'linear-gradient(180deg, #04091D 6.93%, #0D98BA 402.13%)',
    display: 'flex',
    color: '#FFFFFF',
    padding: '74px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '275px',
    marginRight: '28px'
  },
  leftHeader: {
    position: 'relative',
    height: '250px',
  },
  blueText: {
    position: 'absolute',
    top: '74px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    color: '#0D98BA',
  },
  whiteTextWithBorder1: {
    position: 'absolute',
    top: '104px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    border: '1px solid #FFFFFF',
    padding: '0 5px',
  },
  whiteTextWithBorder2: {
    position: 'absolute',
    top: '134px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    padding: '0 5px',
  },
  whiteTextWithBorder3: {
    position: 'absolute',
    top: '164px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0 5px',
  },
  whiteTextWithBorder4: {
    position: 'absolute',
    top: '196px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0 5px',
  },
  whiteTextWithBorder5: {
    position: 'absolute',
    top: '226px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '0 5px',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainHeading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '56px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginTop: '12px',
    maxWidth: '983px',
  },
  divider: {
    width: '100%',
    maxWidth: '983px',
    height: '4px',
    background: '#0D98BA',
    borderRadius: '10px',
    margin: '40px 0',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  row: {
    display: 'flex',
    gap: '15px',
  },
  card: {
    width: '315px',
    height: '200px',
    background: 'rgba(13, 152, 186, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: 0,
  },
  cardText: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#FFFFFF',
    marginTop: 0,
  },
  button: {
    width: '238px',
    height: '45px',
    background: '#0D98BA',
    border: '2px solid #0D98BA',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#04091D',
  }
};