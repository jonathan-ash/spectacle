# Getting Started with Spectacle

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

## 3. Create a deck using One Page.

One Page is a single self-contained `HTML` file that lets you build a deck using no build steps. It has references to all the dependencies you need to author the deck and launch it in a web browser. Since there is no tooling required One Page is also optimal on tablets. The One Page `Html` file can be downloaded from the `examples` directory in this repository.

- One Page uses [htm](https://github.com/developit/htm) over JSX to reduce the dependencies and load time.

# Applying a theme your deck with Spectacle

Create a theme JS file. It's a single object export where supplied properties are merged with the default base theme at `src/theme/default-theme.js`.

```js
export default {
  colors: {
    primary: 'red',
    secondary: 'green'
  },
  fonts: {
    header: '"Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  fontSizes: {
    h1: '72px',
    h2: '64px'
  }
};
```

To use a custom theme with a JSX or HTM-deck, supply the object to the `theme` prop in the `Deck` tag. `<Deck theme={customTheme}>`.

To use a custom theme with the Markdown CLI, supply the file using the `-t` parameter.

`npx spectacle -s my-slides.mdx -t custom-theme.js`
