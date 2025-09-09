# CSRF Attack & Defense Demo

A comprehensive demonstration project showcasing Cross-Site Request Forgery (CSRF) attacks and various defense mechanisms. This educational project helps developers understand CSRF vulnerabilities and learn how to implement effective countermeasures.

## 🎯 Purpose

This project demonstrates:
- How CSRF attacks work in practice
- Multiple defense strategies against CSRF attacks
- Real-world implementation of security measures
- Best practices for web application security

## 📁 Project Structure

The repository contains the following main components:

```
csrf-attack-defense-demo/
├── csrf-attack/           # CSRF attack demonstration
├── defense-csrfToken/     # CSRF token-based defense
├── defense-customHeader/  # Custom header defense mechanism
├── defense-sameSite/      # SameSite cookie attribute defense
├── resources/             # Shared resources and documentation
├── index.html            # Main project landing page
├── csrf-attack.html      # Attack demonstration page
└── README.md             # This documentation
```

### Component Details

- **`csrf-attack/`**: Contains the vulnerable application and attack scripts that demonstrate how CSRF attacks can be executed
- **`defense-csrfToken/`**: Implements CSRF protection using anti-CSRF tokens (synchronizer tokens)
- **`defense-customHeader/`**: Shows how custom headers can prevent CSRF attacks
- **`defense-sameSite/`**: Demonstrates protection using SameSite cookie attributes
- **`resources/`**: Contains additional documentation, images, and shared utilities

## 🛠️ Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 14.0 or higher)
- **npm** (Node Package Manager)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of web security concepts

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HimasagarU/csrf-attack-defense-demo.git
   cd csrf-attack-defense-demo
   ```

2. **Install dependencies for each component:**
   ```bash
   # Install dependencies for the vulnerable app
   cd csrf-attack
   npm install
   cd ..
   
   # Install dependencies for CSRF token defense
   cd defense-csrfToken
   npm install
   cd ..
   
   # Install dependencies for custom header defense
   cd defense-customHeader
   npm install
   cd ..
   
   # Install dependencies for SameSite defense
   cd defense-sameSite
   npm install
   cd ..
   ```

## 🚀 Getting Started

### Running the Demonstrations

Each component runs on a different port to simulate real-world scenarios where attacks come from different domains.

#### 1. CSRF Attack Demo

**Start the vulnerable server:**
```bash
cd csrf-attack
npm start
```
The vulnerable application will be available at: `http://localhost:3000`

**Launch the attack:**
- Open `csrf-attack.html` in your browser
- Follow the instructions to see how CSRF attacks work

#### 2. CSRF Token Defense

**Start the protected server:**
```bash
cd defense-csrfToken
npm start
```
Access the protected application at: `http://localhost:3001`

**Test the protection:**
- Try the same attacks that worked on the vulnerable app
- Observe how CSRF tokens prevent unauthorized actions

#### 3. Custom Header Defense

**Start the server:**
```bash
cd defense-customHeader
npm start
```
Access at: `http://localhost:3002`

**Test the mechanism:**
- See how custom headers block cross-origin requests
- Understand the Same-Origin Policy implications

#### 4. SameSite Cookie Defense

**Start the server:**
```bash
cd defense-sameSite
npm start
```
Access at: `http://localhost:3003`

**Explore SameSite attributes:**
- Learn about Strict, Lax, and None values
- Understand browser behavior with different settings

## 🎮 Usage Scenarios

### Scenario 1: Understanding the Attack

1. Start the vulnerable server (`csrf-attack`)
2. Create a user account and log in
3. Open the attack page in a new tab
4. Execute the CSRF attack and observe the unauthorized action

### Scenario 2: Testing Token Protection

1. Start the CSRF token protected server (`defense-csrfToken`)
2. Log in and notice the hidden token in forms
3. Attempt the same attack from Scenario 1
4. Observe how the token validation prevents the attack

### Scenario 3: Custom Header Verification

1. Launch the custom header protected server (`defense-customHeader`)
2. Use browser developer tools to inspect requests
3. See how the server rejects requests without proper headers
4. Try to bypass the protection (spoiler: you can't from a browser)

### Scenario 4: SameSite Cookie Behavior

1. Start the SameSite protected server (`defense-sameSite`)
2. Test different cookie settings
3. Observe browser behavior with cross-site requests
4. Compare Strict vs Lax vs None attributes

## 🔒 Security Concepts Demonstrated

### CSRF Attack Vectors
- Form-based attacks
- JSON-based attacks
- Image-based attacks
- Link-based attacks

### Defense Mechanisms
- **Synchronizer Tokens**: Generate and validate unique tokens
- **Double Submit Cookies**: Cookie and parameter token matching
- **Custom Request Headers**: Leverage Same-Origin Policy
- **SameSite Cookies**: Browser-level protection
- **Referrer Validation**: Check request origin

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Kill processes on specific ports
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
# (repeat for ports 3002, 3003)
```

**Dependencies not installing:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Browser cache issues:**
- Clear browser cache and cookies
- Try incognito/private browsing mode
- Disable browser extensions that might interfere

## 🎓 Learning Objectives

After completing these demonstrations, you should understand:

- How CSRF attacks exploit user trust
- Why traditional authentication isn't enough
- Multiple approaches to CSRF prevention
- Trade-offs between different defense mechanisms
- Browser security features and limitations

## ⚠️ Important Notes

- **Educational Purpose Only**: This project is for learning and demonstration
- **Local Use Only**: Do not deploy the vulnerable components to production
- **Updated Dependencies**: Keep all packages updated for security
- **Browser Compatibility**: Some features require modern browser versions

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📚 Additional Resources

- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [SameSite Cookie Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**HimasagarU**
- GitHub: [@HimasagarU](https://github.com/HimasagarU)

---

**⚡ Quick Start:**
```bash
git clone https://github.com/HimasagarU/csrf-attack-defense-demo.git
cd csrf-attack-defense-demo
# Install dependencies in each folder, then:
cd csrf-attack && npm start  # Port 3000
```

Happy learning! 🛡️
