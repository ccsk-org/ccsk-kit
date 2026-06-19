# Development Rules

**IMPORTANT**: Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT**: You ALWAYS follow these principles:

- **KISS**: Keep It Simple, Stupid.
- **YAGNI**: You Aren't Gonna Need It.
- **DRY**: Don't Repeat Yourself.
- **SOLID**: Single Responsibility Principle, Open-Closed Principle, Liskov Substitution Principle, Interface Segregation Principle, Dependency Inversion Principle.

## General

- **File Naming**: Use `kebab-case` for file names with a meaningful name that describes the purpose of the file, doesn't matter if the file name is long, just make sure when LLMs read the file names while using `Grep` or other tools, they can understand the purpose of the file right away without reading the file content.
- **File Size Management**: Keep individual code files under 200 lines for optimal context management
    - Split large files into smaller, focused components/modules.
    - Use composition over inheritance for complex widgets.
    - Extract utility functions into separate modules.
    - Create dedicated service classes for business logic.
- Use `gh` bash command to interact with Github features if needed.
- For diagrams, use Mermaid v11 syntax inside markdown.
- **[IMPORTANT]** Follow the codebases structure and code standards in `./docs` during implementation.
- **[IMPORTANT]** Do NOT just simulate the implementation or mocking them, always implement the real code.

## Code Quality Guidelines

- Read and follow codebases structure and code standards in `./docs`.
- Don't be too harsh on code linting, but **make sure there are no syntax errors and code are compilable**.
- Prioritize functionality and readability over strict style enforcement and code formatting.
- Use reasonable code quality standards that enhance developer productivity.
- Use `try-catch` error handling & cover security standards. But do NOT over-using `try-catch` statement.
- Prefer using `sematic` HTML tags as much as possible instead of over-using `div` when working with HTML, JSX, TSX.
- Avoid using `px` unit, MUST convert to `rem` instead when working with HTML, JSX, TSX, TailwindCSS, CSS, SCSS, LESS, etc.

## Pre-commit/Push Rules

- Run linting before committing.
- Run tests before pushing (Do NOT ignore failed tests just to pass the build or Github actions).
- Keep commits focused on the actual code changes.
- **DO NOT** commit and push any confidential information (such as `dotenv` files, `API Keys`, `database credentials`, etc.) to Git repository!
- Create clean, professional commit messages without AI references. Use `commitlint` and conventional commit format.
- When user requests commit and push code - it means commit and push all changes including all `.md` files and remaining untracked.

## Code Implementation

- Write clean, readable, and maintainable code.
- Follow established architectural patterns.
- Implement features according to specifications.
- Handle edge cases and error scenarios.
- **DO NOT** create new enhanced files, update to the existing files directly.

## Self-Review

Before finishing implementation, make sure your changes:

- **DO NOT** impact others.
- Work without any linter errors, runtime errors, and build errors.
- Can convince a **Senior/Staff Frontend Engineer** of the code quality, cleanliness, and adherence best practices - production-grade quality.