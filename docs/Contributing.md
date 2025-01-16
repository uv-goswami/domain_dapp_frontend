# Contributing to RealmDomains

## Introduction

Welcome to the RealmDomains project! We're excited to have you join our community and contribute to our decentralized domain marketplace. Whether you're a developer, designer, or enthusiast, there are many ways to get involved and make a meaningful impact. This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Introduction](#introduction)
- [How to Contribute](#how-to-contribute)
  - [Reporting Issues](#reporting-issues)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Workflow](#development-workflow)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning the Repository](#cloning-the-repository)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Code of Conduct](#code-of-conduct)
- [Communication Channels](#communication-channels)
- [License](#license)

## How to Contribute

### Reporting Issues

If you encounter any bugs, issues, or have feature requests, please report them using the GitHub Issues system. When reporting an issue, please include the following information:

- A clear and descriptive title.
- A detailed description of the problem or feature request.
- Steps to reproduce the issue (if applicable).
- Any relevant screenshots or logs.

### Submitting Pull Requests

We welcome contributions in the form of pull requests (PRs). To submit a PR:

1. **Fork the Repository**: Click the "Fork" button at the top right corner of the repository page to create a copy of the repository under your GitHub account.

2. **Clone the Repository**: Clone the forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/RealmDomains.git
   cd RealmDomains
   ```

3. **Create a Branch**: Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**: Make your changes, and ensure your code adheres to the project's coding standards and guidelines.

5. **Commit Changes**: Commit your changes with a descriptive commit message:
   ```bash
   git add .
   git commit -m "Add feature: description of your feature"
   ```

6. **Push Changes**: Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**: Go to the original repository and click the "New pull request" button. Select your branch and submit the pull request with a clear description of your changes.

## Development Workflow

### Forking the Repository

Fork the RealmDomains repository by clicking the "Fork" button at the top right corner of the repository page. This creates a copy of the repository under your GitHub account, allowing you to make changes without affecting the original repository.

### Cloning the Repository

Clone the forked repository to your local machine:

```bash
git clone https://github.com/your-username/RealmDomains.git
cd RealmDomains
```

### Setting Up the Development Environment

1. **Install Dependencies**: Install the necessary dependencies for the project:

   ```bash
   npm install
   ```

2. **Configure Environment Variables**: Create a `.env` file in the root directory and add the necessary environment variables. Refer to the [Dotenv documentation](docs/Dotenv.md) for details.

3. **Run the Backend Server**: Start the backend server:

   ```bash
   node backend/server.js
   ```

4. **Run the Frontend Application**: Start the frontend application:

   ```bash
   cd frontend
   npm start
   ```

## Code of Conduct

We are committed to fostering a welcoming and inclusive community. By participating in this project, you agree to abide by our Code of Conduct. Please read and familiarize yourself with our [Code of Conduct](docs/CodeOfConduct.md).

## Communication Channels

Join our community and stay connected through the following channels:

- **GitHub Discussions**: Engage with other contributors, ask questions, and share ideas on our [GitHub Discussions](link-to-discussions).
- **Discord**: Join our Discord server to chat with the community and get real-time support. [Discord Invite Link](link-to-discord).
- **Twitter**: Follow us on Twitter for updates and announcements. [Twitter Handle](link-to-twitter).

## License

By contributing to RealmDomains, you agree that your contributions will be licensed under the [MIT License](../LICENSE).
