import React from 'react';
import logo from './logo.svg';

const SELECTION_SIGN = '§';

const colorCodes = {
  0: 'color: #000000', // black
  1: 'color: #0000AA', // dark_blue
  2: 'color: #00AA00', // dark_green
  3: 'color: #00AAAA', // dark_aqua
  4: 'color: #AA0000', // dark_red
  5: 'color: #AA00AA', // dark_purple
  6: 'color: #FFAA00', // gold
  7: 'color: #AAAAAA', // gray
  8: 'color: #555555', // dark_gray
  9: 'color: #5555FF', // blue
  a: 'color: #55FF55', // green
  b: 'color: #55FFFF', // aqua
  c: 'color: #FF5555', // red
  d: 'color: #FF55FF', // light_purple
  e: 'color: #FFFF55', // yellow
  f: 'color: #FFFFFF', // white
  r: 'color: initial; font-weight: initial; text-decoration: initial; font-style: initial;'
};

const formattingCodes = {
  l: 'font-weight: bold;', // Bold
  m: 'text-decoration: line-through;', // Strikethrough
  n: 'text-decoration: underline;', // Underline
  o: 'font-style: italic;' // Italic
};

const allCodes = {
  ...colorCodes,
  ...formattingCodes
}

class App extends React.Component {
  state = {
    motd: ''
  }

  handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    let motd = event.currentTarget.value;

    for (const [key, value] of Object.entries(allCodes)) {
      motd = motd.replace(`${SELECTION_SIGN}${key}`, `<span style="${value}">`);
    }

    this.setState({
      motd,
    })
  }

  render = () => (
    <div>
      <textarea placeholder={`${SELECTION_SIGN}cMy awesome MOTD`} onChange={this.handleChange} />
      <p dangerouslySetInnerHTML={{ __html: this.state.motd }}></p>
    </div>
  );
}

export default App;