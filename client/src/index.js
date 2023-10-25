import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// COMPONENTS //
import App from './components/App';
import Home from './components/Home';
import PlayList from './components/PlayList';
import Authenticate from './components/Authenticate';
import Login from './User/Login';
import Signup from './User/Signup';
import Songs from './components/Songs';



// LOADER 
import { getPlayListLoader, getOnePlaylistLoader } from './loaders'

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
      {
        path:"/login",
        element: <Login/>,
      },
      {
        path:"/signup",
        element: <Signup/>,
      },
      {
        path:"/authenticate",
        element: <Authenticate/>,
      },
      {
        path:"/songs",
        element: <Songs/>,
      },
      
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>
);