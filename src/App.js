import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import  Routes  from './components';

import { store } from './store'
// import 'antd/dist/antd.css'



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes  />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
