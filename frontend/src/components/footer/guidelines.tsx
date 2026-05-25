import React, { useState, CSSProperties } from 'react';

const guidelines = () => {
  const sections = [
    {
      title: "Community Conduct",
      text: "Respect fellow creators and contributors by maintaining constructive discussions and encouraging positive feedback. Always avoid toxic behavior, personal attacks, or harassment to keep our writing space safe for everyone."
    },
    {
      title: "Content Guidelines",
      text: "Share original and meaningful content that drives story quality and creativity. Avoid spam, plagiarism, or harmful content to ensure the community remains filled with genuine, high-quality storytelling."
    },
    {
      title: "AI Story Usage",
      text: "Use AI technology responsibly and ethically. Avoid generating offensive content or using misleading and harmful prompts, ensuring that your collaborative storytelling stays positive and inspiring."
    },
    {
      title: "Community Participation",
      text: "Support your fellow writers and contributors by engaging respectfully in discussions. Help us maintain a thriving ecosystem by actively encouraging collaboration and shared creativity."
    }
  ];

  // Track hover states dynamically for each card array index
const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.mainHeading}>Community Guidelines</h1>
        <p style={styles.subHeading}>
          Follow these guidelines to ensure a positive and creative community experience.
        </p>
      </header>

      {/* Grid Layout for Guidelines Sections (2-columns on desktop) */}
      <main style={styles.gridContainer}>
        {sections.map((section, index) => {
          const isHovered = hoveredCard === index;
          
          return (
            <section 
              key={index} 
              style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card headers are now pure white */}
              <h2 style={styles.cardTitle}>{section.title}</h2>
              <p style={styles.cardParagraph}>{section.text}</p>
            </section>
          );
        })}
      </main>

      {/* Navigation Call to Action */}
      <div style={styles.footerAction}>
        <button 
          onClick={() => window.location.href = '/'} 
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e2e8f0';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

// Layout configurations
const styles: Record<string, CSSProperties> = {
  pageContainer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '4rem 1.5rem',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3.5rem',
    maxWidth: '600px',
  },
  mainHeading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    letterSpacing: '-0.025em',
    color: '#ffffff', // Pure white page title
  },
  subHeading: {
    fontSize: '1.05rem',
    color: '#9ca3af',
    lineHeight: '1.6',
  },
 gridContainer: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '1000px',
  marginBottom: '4rem',
},
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #1f2937',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardHover: {
    transform: 'translateY(-4px)',
    borderColor: '#3b82f6', // Keeps a clean blue accent border on cursor hover
    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#ffffff', // Updated from blue to pure white
    marginBottom: '1rem',
    letterSpacing: '-0.01em',
  },
  cardParagraph: {
    color: '#9ca3af', // Slightly adjusted gray for softer reading contrast against white headers
    fontSize: '0.98rem',
    lineHeight: '1.6',
    margin: 0,
  },
  footerAction: {
    textAlign: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#ffffff', // High-contrast white background
    color: '#000000', // Pure black text
    border: 'none',
    borderRadius: '9999px',
    padding: '0.85rem 2.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)',
  }
};

export default guidelines;