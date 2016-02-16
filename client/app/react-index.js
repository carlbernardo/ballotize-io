import React from 'react';
import { render } from 'react-dom';

class Hello extends React.Component {
  render(){
    return(
      <div>
        This is the only React Component on this page.
      </div>
    )
  }
};

ReactDOM.render(
  <Hello />,
  document.getElementById('react-app')
)
