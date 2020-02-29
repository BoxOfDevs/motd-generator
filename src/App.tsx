import React from 'react';

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
  f: '#FFFFFF', // white
  g: '#DAD707' // yellowier yellow (thanks HBIDamian)
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
  r: 'color: initial; font-weight: initial; text-decoration: initial; font-style: initial; display: inline-block;'
}


class App extends React.Component {
  state = {
    htmlMotd: '',
    rawMotd: '',
    colorButtons: null,
    formattingButtons: null
  }

  textareaRef = React.createRef<HTMLTextAreaElement>();

  componentDidMount = () => {
    const colorButtons = Object.entries(colorCodes).map(([ key, val ]) => (
      <>
        <button style={{paddingRight: 10.5, paddingLeft: 10.5, backgroundColor: val, color: key === '0' ? 'white': 'black'}} onClick={() => this.insertCode(key)}>{`${SELECTION_SIGN}${key}`}</button>
      </>
    ));

    const formattingButtons = Object.entries(formattingCodes).map(([ key, val ]) => {
      const formattingButtonNames = {
        l: 'Bold',
        m: 'Strikethrough',
        n: 'Underline',
        o: 'Italic'
      };

      const formattingStyle = () => {
        switch (key) {
          case 'l':
            return { fontWeight: 'bold' };
          case 'm':
            return { textDecoration: 'line-through' }
          case 'n':
            return { textDecoration: 'underline' }
          case 'o':
            return { fontStyle: 'italic' }
        }
      };

      return (
        // @ts-ignore
        <button style={{marginTop: 8, ...formattingStyle()}} onClick={() => this.insertCode(key)}>{formattingButtonNames[key]}</button>
      )
    });
    this.setState({
      colorButtons,
      formattingButtons
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
    const node = this.textareaRef.current;
    if (node) {
      node.focus()
    }
  }

  render = () => (
    <div>
      {this.state.colorButtons}<br />
      {this.state.formattingButtons}
      <button style={{marginTop: 8}} onClick={() => this.insertCode('r')}>Reset</button>
      <textarea ref={this.textareaRef} autoFocus style={{marginTop: 8, resize: 'none'}} placeholder={`${SELECTION_SIGN}cMy awesome MOTD`} value={this.state.rawMotd} onChange={this.handleChange} />
      <p className="preview" dangerouslySetInnerHTML={{ __html: this.state.htmlMotd }}></p>
    </div>
  );
}

export default App;
