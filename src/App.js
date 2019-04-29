import  React from 'react';

import Header from './components/header';
import Main from './components/main';

import toaster from './components/toaster';
import 'react-toastify/dist/ReactToastify.css';

toaster.configure({
  
});

class App extends React.Component {
  
  render() {

    return (
      <div>
        <Main />
      </div>
    );
    
  }

}

export default App;
