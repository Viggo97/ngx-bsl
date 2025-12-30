# NgxBsl Library

A modern, simple and signal-based Angular components library with comprehensive documentation and usage examples.
For more details check the [documentation](https://viggo97.github.io/test/ "NgxBsl Docs"). 
## Project Structure

The project consists of two main applications:

**Component Library** - contains a set of reusable Angular components ready to use in your projects. Components are built with modularity, performance, and ease of integration in mind.

**Documentation Application** - interactive documentation showcasing all available components with code examples, properties, and best practices.

## Local development

To run this project locally, follow these steps:
1. Clone the repository:
```bash
  git clone https://github.com/Viggo97/ngx-bsl.git
```
2. If you are using Docker:
```bash
  docker compose up --watch
```
3. Or if you are using local Angular CLI:
```bash
  npm install
  ng s
```
The above steps launch the documentation application. Docs application imports the library directly,
so you can freely make changes to the library components and see the results live in the documentation application.
