import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <nav>
        <div className="nav-container">
          <div className="logo">BRENDON JAZE.</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero animate-fade-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', minHeight: '80vh' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ color: 'var(--primary-light)', fontSize: '1.2rem', marginBottom: '10px' }}>Hi, I am</h2>
              <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '20px' }}>
                Brendon Jaze <br /> <span style={{ color: 'var(--primary)' }}>M. Lambago</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '500px', marginBottom: '30px' }}>
                A Creative Developer crafting exceptional digital experiences with modern technologies.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
                overflow: 'hidden',
                border: '5px solid var(--primary)',
                boxShadow: '0 0 50px rgba(157, 78, 221, 0.4)',
                background: 'var(--primary-dark)'
              }}>
                <Image
                  src="/profile.jpg"
                  alt="Brendon Jaze M. Lambago"
                  fill
                  style={{ objectFit: 'cover', filter: 'contrast(1.05) brightness(1.02)' }}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="animate-fade-up" style={{ padding: '80px 20px' }}>
          <div className="glass" style={{ padding: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', textAlign: 'center' }}>About Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                I am a passionate developer with a strong focus on building responsive and interactive web applications.
                My journey in tech is driven by curiosity and a desire to solve complex problems through clean, efficient code.
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                With a background in modern web frameworks and a keen eye for design, I bridge the gap between aesthetics
                and functionality, ensuring every project I work on provides a seamless user experience.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" style={{ padding: '80px 20px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center' }}>Technical Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            {['Responsive Web Design', 'User Research', 'React.js', 'Next.js', 'HTML/CSS', 'JavaScript', 'Express.js', 'Node.js', 'Python', 'FastAPI', 'Supabase', 'Arduino', 'YOLOV8 + easyOCR', 'Tailwind CSS'].map((skill) => (
              <div key={skill} className="glass" style={{ padding: '15px 30px', fontWeight: '600', color: 'var(--primary-light)' }}>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{ padding: '80px 20px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center' }}>Featured Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            <div className="glass" style={{ overflow: 'hidden', transition: '0.3s' }}>
              <div style={{ height: '200px', background: 'linear-gradient(45deg, var(--primary-dark), var(--primary))', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '800' }}>LMS PROJECT</div>
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ marginBottom: '10px' }}>Library Management System</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>A comprehensive system for tracking books, members, and borrowings with a smooth UI.</p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>Next.js</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>Tailwind CSS</span>
                </div>
                <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Open Project</a>
              </div>
            </div>

            <div className="glass" style={{ overflow: 'hidden', transition: '0.3s' }}>
              <div style={{ height: '200px', background: 'linear-gradient(45deg, var(--primary-dark), var(--primary))', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '800', textAlign: 'center' }}>ATTENDANCE SYSTEM</div>
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ marginBottom: '10px' }}>Attendance Tracking System</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>An IoT-based attendance tracking system using Arduino and ESP32 for seamless check-ins.</p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>Arduino</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>ESP32</span>
                </div>
                <a href="https://brendon-front-gy4dqwn1k-brendon-jazes-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Open Project</a>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Let's Build Something Together</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '40px' }}>
              I am currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a href="mailto:brendon.lambago@example.com" className="btn btn-primary" style={{ fontSize: '1.1rem' }}>Say Hello</a>

            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '1.1rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/brendonjaze" target="_blank" rel="noopener noreferrer" className="glass" style={{ padding: '15px 30px', fontWeight: '600', color: 'var(--primary-light)', display: 'inline-block' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/brendon-jaze-a34466322/" target="_blank" rel="noopener noreferrer" className="glass" style={{ padding: '15px 30px', fontWeight: '600', color: 'var(--primary-light)', display: 'inline-block' }}>LinkedIn</a>
              <a href="https://www.facebook.com/brendonjaze1006" target="_blank" rel="noopener noreferrer" className="glass" style={{ padding: '15px 30px', fontWeight: '600', color: 'var(--primary-light)', display: 'inline-block' }}>Facebook Messenger</a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', color: 'var(--text-dim)' }}>
        <p>© {new Date().getFullYear()} Brendon Jaze M. Lambago. Built with love.</p>
      </footer>
    </div>
  );
}
