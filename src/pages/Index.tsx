
import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Download, Moon, Sun, ExternalLink, Code } from 'lucide-react';
import '../styles/portfolio.css';

const Index = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or default to system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const roles = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Web Designer"
  ];

  useEffect(() => {
    // This is the key change - apply class directly to body element
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleTypewriter = () => {
      const currentRole = roles[currentTextIndex];
      const typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
        return;
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % roles.length);
        return;
      }

      setDisplayText(currentRole.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
    };

    typingRef.current = setTimeout(handleTypewriter, isDeleting ? 50 : 150);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentTextIndex, displayText, isDeleting]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    });

    document.querySelectorAll('.slide-up').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.slide-up').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <nav className="navbar  left-0 sticky">
        <div className="logo slide-up">
          <span>Siddharth</span>
        </div>
        <ul className="nav-links">
          <li className="slide-up"><a href="#home">Home</a></li>
          <li className="slide-up"><a href="#projects">Projects</a></li>
          <li className="slide-up"><a href="#training">Training</a></li>
          <li className="slide-up"><a href="#certifications">Certifications</a></li>
          <li className="slide-up"><a href="#achievements">Achievements</a></li>
          <li className="slide-up"><a href="#education">Education</a></li>
          <li className="slide-up"><a href="#skills">Skills</a></li>
          <li className="slide-up"><a href="#contact">Contact</a></li>
        </ul>
        <div className="dark-mode-toggle slide-up" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </div>
      </nav>
      <div className="portfolio-container">
        {/* <nav className="navbar w-screen left-0 fixed">
        <div className="logo slide-up">
          <span>Siddharth</span>
        </div>
        <ul className="nav-links">
          <li className="slide-up"><a href="#home">Home</a></li>
          <li className="slide-up"><a href="#projects">Projects</a></li>
          <li className="slide-up"><a href="#training">Training</a></li>
          <li className="slide-up"><a href="#certifications">Certifications</a></li>
          <li className="slide-up"><a href="#achievements">Achievements</a></li>
          <li className="slide-up"><a href="#education">Education</a></li>
          <li className="slide-up"><a href="#skills">Skills</a></li>
          <li className="slide-up"><a href="#contact">Contact</a></li>
        </ul>
        <div className="dark-mode-toggle slide-up" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </div>
      </nav> */}

        <section id="home" className="hero-section dark-mode">
          <div className="hero-image slide-up">
            <img src="image.png" alt="Siddharth Suman" className='profile' />
          </div>
          <div className="hero-content">
            <h3 className="greeting slide-up">Hi, I am</h3>
            <h1 className="name slide-up">SIDDHARTH SUMAN</h1>
            <div className="typewriter-container slide-up">
              <span className="typewriter-text">I am a <span className="typewriter-role">{displayText}</span><span className="cursor">|</span></span>
            </div>
            <p className="about-text slide-up">
              Passionate software developer with expertise in full-stack web development.
              Skilled in creating responsive and user-friendly applications using modern technologies.
              Committed to writing clean, efficient code and delivering high-quality software solutions.
            </p>
            <div className="social-icons">
              <a href="https://github.com/siddharth-gh" target="_blank" rel="noopener noreferrer" className="social-icon slide-up">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/siddharth037" target="_blank" rel="noopener noreferrer" className="social-icon slide-up">
                <Linkedin size={24} />
              </a>
              <a href="mailto:937.siddharth@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon slide-up">
                <Mail size={24} />
              </a>
              <a href="tel:+919709457320" className="social-icon slide-up">
                <Phone size={24} />
              </a>
            </div>
            <a href="/resume.pdf" download className="download-btn slide-up">
              <Download size={18} /> Download Resume
            </a>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <h2 className="section-title slide-up">My Projects</h2>
          <div className="projects-grid">
            <div className="project-card slide-up">
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80" alt="Notes.Me Project" />
              </div>
              <h3>Notes.Me</h3>
              <p className="project-duration">May, 2024 - Jun, 2024</p>
              <p>Existing note-taking apps lacked personalization features like bookmarking and dark mode.</p>
              <p>Enhanced a full-stack MERN note-taking app with authentication, CRUD operations, and user-friendly UI.</p>
              <p>Tech: HTML, CSS, Javascript, Bootstrap, MongoDB</p>
              <div className="project-buttons">
                <a href="https://notes-me.vercel.app" target="_blank" rel="noopener noreferrer" className="project-button">
                  <ExternalLink size={20} /> View Live
                </a>
                <a href="https://github.com/siddharth-gh/notes-me" target="_blank" rel="noopener noreferrer" className="project-button">
                  <Github size={20} /> Github
                </a>
              </div>
            </div>
            <div className="project-card slide-up">
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" alt="Quiz App Project" />
              </div>
              <h3>Quiz App</h3>
              <p className="project-duration">Aug, 2024 - Nov, 2024</p>
              <p>Many online quiz platforms lacked an easy-to-use interface for both students and teachers.</p>
              <p>Created a PHP & MySQL-based quiz app for students to take quizzes and teachers to manage questions.</p>
              <p>Tech: PHP, MySQL, HTML, CSS, JS, Bootstrap</p>
              <div className="project-buttons">
                <a href="https://quiz-app.vercel.app" target="_blank" rel="noopener noreferrer" className="project-button">
                  <ExternalLink size={20} /> View Live
                </a>
                <a href="https://github.com/siddharth-gh/quiz-app" target="_blank" rel="noopener noreferrer" className="project-button">
                  <Github size={20} /> Github
                </a>
              </div>
            </div>
            <div className="project-card slide-up">
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80" alt="Ecommerce Website Project" />
              </div>
              <h3>Ecommerce Website</h3>
              <p className="project-duration">Jan, 2024 - May, 2024</p>
              <p>Designed and developed a React.js-based eCommerce platform tailored for small businesses.</p>
              <p>Implemented a secure and scalable backend using Node.js and MongoDB, integrating JWT authentication.</p>
              <p>Tech: ReactJS, NodeJS, MongoDB, ExpressJS, SASS</p>
              <div className="project-buttons">
                <a href="https://ecommerce.vercel.app" target="_blank" rel="noopener noreferrer" className="project-button">
                  <ExternalLink size={20} /> View Live
                </a>
                <a href="https://github.com/siddharth-gh/ecommerce" target="_blank" rel="noopener noreferrer" className="project-button">
                  <Github size={20} /> Github
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="training" className="training-section">
          <h2 className="section-title slide-up">Training</h2>
          <div className="timeline">
            <div className="timeline-item slide-up">
              <div className="timeline-dot">2024</div>
              <div className="timeline-content">
                <h3>MERN Stack Trainee</h3>
                <p className="institution">CipherSchools</p>
                <p className="grade">June, 2024 - July, 2024</p>
                <p>Collaborated to develop a notes app during training period.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="certifications-section">
          <h2 className="section-title slide-up">Certifications</h2>
          <div className="certifications-grid">
            <div className="certification-card slide-up">
              <h3>Mastering Data Structures And Algorithms using C and C++</h3>
              <p>Udemy - November 2023</p>
            </div>
            <div className="certification-card slide-up">
              <h3>Full-Stack Development using MERN stack</h3>
              <p>CipherSchools - October 2024</p>
            </div>
            <div className="certification-card slide-up">
              <h3>Cloud Computing</h3>
              <p>NPTEL - October 2024</p>
            </div>
          </div>
        </section>

        <section id="achievements" className="achievements-section">
          <h2 className="section-title slide-up">Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card slide-up">
              <h3>3-Star Cpp Coder Badge</h3>
              <p>Earned a 3-star code Silver badge in hacker-rank Cpp programming</p>
            </div>
            <div className="achievement-card slide-up">
              <h3>Problem Solving</h3>
              <p>Solved 100+ problems on LeetCode, improving proficiency in Data Structures & Algorithms</p>
            </div>
          </div>
        </section>

        <section id="education" className="education-section">
          <h2 className="section-title slide-up">Education Journey</h2>
          <div className="timeline">
            <div className="timeline-item slide-up">
              <div className="timeline-dot">2022</div>
              <div className="timeline-content">
                <h3>Bachelor of Technology in Computer Science and Engineering</h3>
                <p className="institution">Lovely Professional University, Punjab, India</p>
                <p className="grade">CGPA: 7.63/10</p>
                <p>Since August 2022</p>
              </div>
            </div>
            <div className="timeline-item slide-up">
              <div className="timeline-dot">2021</div>
              <div className="timeline-content">
                <h3>Intermediate</h3>
                <p className="institution">Himalayan Public School, Bihar, India</p>
                <p className="grade">Percentage: 70.5%</p>
                <p>April 2019 - March 2021</p>
              </div>
            </div>
            <div className="timeline-item slide-up">
              <div className="timeline-dot">2018</div>
              <div className="timeline-content">
                <h3>Matriculation</h3>
                <p className="institution">D.A.V. Public School, Bihar, India</p>
                <p className="grade">Percentage: 93%</p>
                <p>April 2008 - March 2018</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section">
          <h2 className="section-title slide-up">My Skills</h2>
          <div className="skills-container">
            <div className="skill-category slide-up">
              <h3>Languages</h3>
              <ul>
                <li><Code size={16} /> C++</li>
                <li><Code size={16} /> JavaScript</li>
                <li><Code size={16} /> C</li>
                <li><Code size={16} /> PHP</li>
              </ul>
            </div>
            <div className="skill-category slide-up">
              <h3>Frameworks</h3>
              <ul>
                <li><Code size={16} /> HTML and CSS</li>
                <li><Code size={16} /> Bootstrap</li>
                <li><Code size={16} /> NodeJS</li>
                <li><Code size={16} /> React</li>
              </ul>
            </div>
            <div className="skill-category slide-up">
              <h3>Tools/Platforms</h3>
              <ul>
                <li><Code size={16} /> MySQL</li>
                <li><Code size={16} /> MongoDB</li>
                <li><Code size={16} /> Git</li>
                <li><Code size={16} /> Problem-Solving Skills</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="section-title slide-up">Contact Me</h2>
          <div className="contact-container">
            <div className="contact-left slide-up">
              <h3>Let's Collaborate</h3>
              <p>I'm always open for new opportunities and interesting projects.</p>
              <div className="contact-info">
                <p><Mail size={16} /> 937.siddharth@gmail.com</p>
                <p><Phone size={16} /> +91-9709457320</p>
              </div>
              <div className="social-icons">
                <a href="https://github.com/siddharth-gh" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/siddharth037" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:937.siddharth@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Mail size={24} />
                </a>
                <a href="tel:+919709457320" className="social-icon">
                  <Phone size={24} />
                </a>
              </div>
            </div>
            <div className="contact-right slide-up">
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>Designed and developed with ❤️ by Siddharth Suman</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
