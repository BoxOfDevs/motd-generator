import React from 'react';
import logo from './logo.svg';

const SELECTION_SIGN = '§';

const colorCodes = {
  0: '#000000', // black
  1: '#0000AA', // dark_blue
  2: '#00AA00', // dark_green
  3: '#00AAAA', // dark_aqua
  4: '#AA0000', // dark_red
  5: '#AA00AA', // dark_purple
  6: '#FFAA00', // gold
  7: '#AAAAAA', // gray
  8: '#555555', // dark_gray
  9: '#5555FF', // blue
  a: '#55FF55', // green
  b: '#55FFFF', // aqua
  c: '#FF5555', // red
  d: '#FF55FF', // light_purple
  e: '#FFFF55', // yellow
  f: '#FFFFFF' // white
};

const formattingCodes = {
  l: 'font-weight: bold;', // Bold
  m: 'text-decoration: line-through;', // Strikethrough
  n: 'text-decoration: underline;', // Underline
  o: 'font-style: italic;' // Italic
};

const allCodes = {
  ...Object.fromEntries(Object.entries(colorCodes).map(([key, val]) => [ key, `color: ${val}`])),
  ...formattingCodes,
  r: 'color: initial; font-weight: initial; text-decoration: initial; font-style: initial;'
}


class App extends React.Component {
  state = {
    htmlMotd: '',
    rawMotd: '',
    colorButtons: null
  }

  componentDidMount = () => {
    const colorButtons = Object.entries(colorCodes).map(([ key, val ]) => (
      <span style={{backgroundColor: val, marginRight: 5, paddingLeft: '24px', paddingTop: '5px', border: '1px solid black'}} onClick={() => this.insertCode(key)} />
    ));
    this.setState({
      colorButtons,
    })
  }

  handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const rawMotd = event.currentTarget.value;
    this.renderMotd(rawMotd);
  }

  renderMotd = (rawMotd: string) => {
    let htmlMotd = rawMotd;

    for (const [key, val] of Object.entries(allCodes)) {
      htmlMotd = htmlMotd.replace(`${SELECTION_SIGN}${key}`, `<span style="${val}">`);
    }

    this.setState({
      htmlMotd: htmlMotd,
      rawMotd: rawMotd
    })
  }

  insertCode = (code: string) => {
    let oldRawMotd = this.state.rawMotd;
    oldRawMotd += `${SELECTION_SIGN}${code}`
    this.renderMotd(oldRawMotd);
  }

  render = () => (
    <div>
      {this.state.colorButtons}
      <textarea autoFocus style={{marginTop: 8}} placeholder={`${SELECTION_SIGN}cMy awesome MOTD`} value={this.state.rawMotd} onChange={this.handleChange} />
      <p className="preview" dangerouslySetInnerHTML={{ __html: this.state.htmlMotd }}></p>
    </div>
  );
}

export default App;