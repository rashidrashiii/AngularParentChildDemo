# 🎓 Angular Parent-Child Communication Demo

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

An interactive, hands-on tutorial application designed to teach **Angular Component Communication** patterns. This project breaks down complex concepts into simple, real-world analogies with live demos and full code examples.

🔗 **Live Demo:** [https://angular-parent-child-demo.vercel.app/](https://angular-parent-child-demo.vercel.app/)

## 🚀 Features

This project covers the four pillars of Angular component interaction:

1.  **📬 @Input() (Parent to Child)**
    *   **Analogy:** The Mailbox.
    *   **Demos:** Passing simple strings, objects (User Profile), and using Setters for data interception (Age Validator).

2.  **🔔 @Output() (Child to Parent)**
    *   **Analogy:** The Doorbell.
    *   **Demos:** Simple events (Delete Item), Payload events (Fruit Picker), and Complex objects (Voting System).

3.  **📱 @ViewChild (Parent Controls Child)**
    *   **Analogy:** The Remote Control.
    *   **Demos:** Controlling a DOM element (Color Picker) and calling methods on a Child Component (Stopwatch).

4.  **🖼️ @ContentChild (Content Projection)**
    *   **Analogy:** The Picture Frame.
    *   **Demos:** Single-slot projection, Multi-slot selection, and Smart Content inspection (Profile Card with User Badge).

## 🛠️ Technology Stack

*   **Framework:** Angular (Standalone Components, Signals capable)
*   **Styling:** Modern CSS3 (Variables, Flexbox, Grid)
*   **Deployment:** Vercel

## 📦 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/angular-parent-child-demo.git
    cd angular-parent-child-demo
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 📚 Learning Resources

Inside the application, you'll find:
*   **Interactive Demos**: Play with the components to see how data flows.
*   **Code Viewer**: Toggle the "Show Code" tab to see the actual implementation (Parent HTML, Parent TS, Child TS) for every example.
*   **Best Practices**: Tips on when to use which pattern.

## 🤝 Contributing

Contributions are welcome! If you have ideas for better analogies or new demos, strictly follow these steps:
1. Fork the project.
2. Create feature branch (`git checkout -b feature/NewDemo`).
3. Commit changes.
4. Push to branch.
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
