# Getting Started with Spectacle: A Tutorial

In this guide, we’ll show you how to get started with Spectacle and walk you through the creation and customization of a presentation deck.

## 1. Using a standard React-based web app

Use Create React App [Create React App](https://github.com/facebook/create-react-app) to easily start a new project.

- Create a new React project using `npx create-react-app spectacle-tutorial`
- Install Spectacle using `yarn add spectacle` or `npm i spectacle`.
- In the `App.js` replace the boilerplate with this Spectacle starter:

```jsx
import React from 'react';
import { Deck, Slide, Heading } from 'spectacle';

function App() {
  return (
    <Deck>
      <Slide>
        <Heading>Welcome to Spectacle</Heading>
      </Slide>
    </Deck>
  );
}

export default App;
```

## 2. Using Markdown and the Spectacle CLI

Create a new Markdown file. You can use `.md` or `.mdx`. MDX lets you mix JSX components inside Markdown.

- In your Markdown file you can use the following Spectacle Markdown starter:

```md
# Welcome to Spectacle

- This is a list item
- This is another list item

---

# Second Slide

Text can be **bold** or _italic_!

Notes: These are presenter notes, only visible in presenter mode to the speaker.
```

The triple dash `---` is used for a slide delimiter. The `Notes:` keyword is used to embed presenter notes only visible to the speaker in presenter mode.

- To view your slides you can supply your markdown to the Spectacle CLI to start web server.

  `npx spectacle -s my-slides.mdx`

- The web server started supports live refreshing and will update your deck as you make changes to the Markdown file.
