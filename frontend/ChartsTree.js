import React from 'react';
import ObjectInspector from 'react-object-inspector';
import '../node_modules/react-object-inspector/react-object-inspector.css';

export default class ChartsTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { charts: this.props.charts };
  }

  render() {
    return (
      <div style={{padding: '10px', overflow: 'auto', width: '100%'}}>
        {this.state.charts.map(c => (
          <ObjectInspector data={c} />
        ))}
      </div>
    );
  }
}
