import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import propTypes from 'prop-types';
import theme from 'prism-react-renderer/themes/vsDark';
import { ThemeContext } from 'styled-components';

import { SlideContext } from '../hooks/use-slide';

const spaceSearch = /\S|$/;

const lineNumberStyles = {
  padding: '0 1em',
  borderRight: '1px solid hsla(0, 0%, 100%, 0.25)',
  flex: '0 1 30px',
  alignSelf: 'stretch'
};

export default function CodePane(props) {
  const canvas = React.useRef(document.createElement('canvas'));
  const context = React.useRef(canvas.current.getContext('2d'));
  const themeContext = React.useContext(ThemeContext);

  const font = React.useMemo(() => {
    if (themeContext && themeContext.fonts && themeContext.fonts.monospace) {
      return themeContext.fonts.monospace;
    }
    const { platform } = navigator;
    if (platform.toLowerCase().search('win') !== -1) {
      return 'Consolas';
    } else if (platform.toLowerCase().search('mac') !== -1) {
      return 'Menlo';
    } else {
      return 'monospace';
    }
  }, [themeContext]);

  const fontSize = React.useMemo(() => {
    if (
      themeContext &&
      themeContext.fontSizes &&
      themeContext.fontSizes.monospace
    ) {
      return themeContext.fontSizes.monospace;
    }
    return props.fontSize;
  }, [themeContext, props.fontSize]);

  const preStyles = React.useMemo(
    () => ({
      fontFamily: font,
      fontSize: fontSize,
      maxHeight: themeContext.size.maxCodePaneHeight || 200,
      overflow: 'scroll',
      margin: 0,
      padding: '0.5em 1em 0.5em 0'
    }),
    [font, fontSize, themeContext]
  );

  const measureIndentation = React.useCallback(
    indentation => {
      if (indentation === 0) {
        return 0;
      }
      const string = ' '.repeat(indentation);
      context.current.font = `${props.fontSize}px ${font}`;
      const measurement = context.current.measureText(string);
      return measurement.width;
    },
    [props.fontSize, font]
  );

  const {
    state: { currentSlideElement }
  } = React.useContext(SlideContext);
  //   const linesPerView = React.useMemo(
  //     () => themeContext.size.maxCodePaneHeight / Number(fontSize.split('px')[0]),
  //     [fontSize, themeContext.size.maxCodePaneHeight]
  //   );

  //   console.log(linesPerView);

  const lineToScrollTo = React.useMemo(() => {
    if (!!props.wantedLines && !!props.wantedLines[currentSlideElement]) {
      const median = props.wantedLines[currentSlideElement].length / 2;
      const sortedArray = props.wantedLines[currentSlideElement].sort(
        (a, b) => a - b
      );
      return props.wantedLines[currentSlideElement] % 2 !== 0
        ? sortedArray[median]
        : sortedArray[Math.floor(median)];
    }
  }, [props.wantedLines, currentSlideElement]);

  return (
    <>
      <Highlight
        {...defaultProps}
        code={props.children}
        language={props.language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${props.autoFillHeight &&
              'spectacle-auto-height-fill'}`}
            style={{ ...style, ...preStyles }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const lineIndentation = line[0].content.search(spaceSearch);
              lineProps.style = {
                ...(lineProps.style || {}),
                whiteSpace: 'pre-wrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                opacity:
                  !!props.wantedLines &&
                  !!props.wantedLines[currentSlideElement]
                    ? props.wantedLines[currentSlideElement].includes(i + 1)
                      ? 1
                      : 0.2
                    : 1
              };
              if (line[0].content && !line[0].empty) {
                line[0].content = line[0].content.trimLeft();
              }
              return (
                <div key={i} {...lineProps}>
                  <div style={lineNumberStyles}>{i + 1}</div>
                  <div
                    style={{
                      marginLeft: measureIndentation(lineIndentation),
                      flex: 1,
                      paddingLeft: '0.25em'
                    }}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </>
  );
}

CodePane.propTypes = {
  autoFillHeight: propTypes.bool,
  children: propTypes.string.isRequired,
  fontSize: propTypes.number,
  language: propTypes.string.isRequired,
  theme: propTypes.object,
  wantedLines: propTypes.arrayOf(propTypes.arrayOf.number)
};

CodePane.defaultProps = {
  language: 'javascript',
  theme: theme,
  fontSize: 15
};
