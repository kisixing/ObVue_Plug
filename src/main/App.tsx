import React from 'react';
import './App.css';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

function App() {
  console.log(process.env)
  
  return (
    <div >
      <header>

        <Nav
          onLinkClick={(ev, item) => {

          }}
          selectedKey="key3"
          ariaLabel="Nav basic example"
          styles={{
            root: {
              width: 208,
              height: 350,
              boxSizing: 'border-box',
              border: '1px solid #eee',
              overflowY: 'auto'
            }
          }}
          groups={[
            {
              links:  JSON.parse((process.env.REACT_APP_ENTRY || '[]')).map((_: any) => (
                {
                  name: _,
                  expandAriaLabel: 'Expand Home section',
                  collapseAriaLabel: 'Collapse Home section',
                  url:`/${_}/index.html`
                }
              ))
            }
          ]}
        />
      </header>
    </div>
  );
}

export default App;





