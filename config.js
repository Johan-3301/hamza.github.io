const config = {
    // Personal Information
    name: "Hamza Mikdad",
    title: "Cybersecurity Professional",
    email: "hamza999@gmail.com",
    phone: "+212 634111483",
    
    // Social Links
    social: {
        linkedin: "https://linkedin.com/in/hamza-mikdad-166b38376",
        github: "https://github.com/Johan-3301/",
        tryhackme: "https://tryhackme.com/p/yourprofile",
        twitter: "https://twitter.com/yourprofile"
    },
    
    // About Section
    about: {
        title: "Cybersecurity Student & Aspiring Penetration Tester",
        paragraphs: [
            "My journey into cybersecurity began with a fascination for how systems work and how they can be protected.",
            "Currently pursuing my degree in Cybersecurity while gaining practical experience through CTF competitions and personal projects.",
            "I believe in ethical hacking as a means to strengthen digital defenses and protect against real-world threats."
        ],
        stats: [
            { number: 3, label: "Certifications" },
            { number: 30, label: "CTF Challenges" },
            { number: 2, label: "Years Experience" }
        ]
    },
    
    // Skills
    skills: [
        { 
            category: "pentesting", 
            icon: "🔍", 
            name: "Vulnerability Assessment", 
            description: "Identifying security vulnerabilities in systems", 
            level: 90 
        },
        { 
            category: "pentesting", 
            icon: "⚔️", 
            name: "Penetration Testing", 
            description: "Ethical hacking and exploitation techniques", 
            level: 85 
        },
        { 
            category: "defense", 
            icon: "🛡️", 
            name: "Network Security", 
            description: "Securing network infrastructure", 
            level: 88 
        },
        { 
            category: "tools", 
            icon: "🔧", 
            name: "Kali Linux Tools", 
            description: "Metasploit, Nmap, Wireshark, Burp Suite", 
            level: 92 
        },
        { 
            category: "programming", 
            icon: "🐍", 
            name: "Python Security", 
            description: "Automating security tasks and scripts", 
            level: 87 
        },
        { 
            category: "defense", 
            icon: "🎯", 
            name: "SIEM & Monitoring", 
            description: "Security event management systems", 
            level: 80 
        },
        { 
            category: "defense", 
            icon: "🔐", 
            name: "Cryptography", 
            description: "Encryption and cryptographic protocols", 
            level: 82 
        },
        { 
            category: "programming", 
            icon: "💻", 
            name: "Bash Scripting", 
            description: "Automation and system administration", 
            level: 85 
        }
    ],
    
    // Certifications
    certifications: [
        {
            name: "CompTIA Security+",
            description: "Validates baseline cybersecurity skills and knowledge",
            year: "2023",
            icon: "🎯"
        },
        {
            name: "eJPT (Junior Penetration Tester)",
            description: "Practical penetration testing certification",
            year: "2024",
            icon: "⚔️"
        },
        {
            name: "Python for Cybersecurity",
            description: "Specialized in writing security tools",
            year: "2023",
            icon: "🐍"
        }
    ],
    
    // Projects - Updated with PDF downloads
    projects: [
        {
            title: "Unitrack - Student Attendance System",
            description: "A comprehensive student attendance tracking system with facial recognition, QR code scanning, and real-time reporting features.",
            icon: "📊",
            link: "documents/Unitrack.pdf", // PDF download
            isPDF: true, // Flag to indicate this is a PDF
            tags: ["Python", "OpenCV", "Flask", "MySQL"]
        },
        {
            title: "Blockchain Technology",
            description: "Développement d'un smart contract de vote décentralisé en Solidity, garantissant un vote unique par participant et la transparence des résultats, déployé sur une blockchain locale via Remix IDE.",
            icon: "⛓️",
            link: "documents/Blockchain_Project.pdf", // PDF download
            isPDF: true, // Flag to indicate this is a PDF
            tags: ["Blockchain", "Solidity", "Remix IDE", "Python"]
        }
    ],
    
    // Experience Timeline
    experience: [
        {
            date: "2024 - Present",
            title: "Junior Penetration Tester",
            description: "CyberShield Solutions - Conducting vulnerability assessments and penetration tests"
        },
        {
            date: "2023 - 2024",
            title: "Security Analyst Intern",
            description: "SecureNet Technologies - Monitored security events and assisted in incident response"
        },
        {
            date: "2022 - Present",
            title: "Cybersecurity Student",
            description: "University of Technology - Pursuing Bachelor's in Cybersecurity"
        },
        {
            date: "2021 - 2022",
            title: "IT Support Specialist",
            description: "Tech Support Plus - Developed interest in security aspects of IT infrastructure"
        }
    ],
    
    // Typing Animation Text
    typingTexts: [
        "Cybersecurity Student",
        "Junior Penetration Tester", 
        "Security Analyst",
        "Ethical Hacker",
        "Digital Defender"
    ],
    
    // Floating Words
    floatingWords: [
        "Security", "PenTest", "Cyber", "Defense", 
        "Ethical", "Hacker", "Vulnerability", "Encryption"
    ]
};

// Make config available globally
window.config = config;