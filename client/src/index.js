import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// COMPONENTS //
import App from './components/App';
import Home from './components/Home';
import PlayList from './components/PlayList';


// LOADER 
import { getPlayListLoader } from './loaders'

const router = createBrowserRouter([

  {
    path:"/",
    element: <App/>,
    children: [
      {
        index: true, // default route
        element: <Home/>
      },
      {
        path:"/playlists",
        element: <PlayList/>,
        loader: getPlayListLoader
      },
    
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>
);