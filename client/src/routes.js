import React from 'react';

import Loadable from 'react-loadable'


function Loading() {
  
  return (
    <div><div className={"text-center"} colSpan="8"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
    <span className="sr-only">Loading...</span></div></div>
  )
};

// const Carousels = React.lazy(() => import('./views/Base/Carousels'));

const Colors = React.lazy(() => import('./views/Theme/Colors'));


const Dashboard = Loadable({
  loader :() => import('./views/Dashboard'),
  loading : Loading,
 });

 const Video = Loadable({
  loader:()=> import('./views/addVideos/videoCategory'),
  loading :Loading,
  })
  
  
  const Add_Video =  Loadable({
    loader:()=> import('./views/addVideos/add_Video'),
    loading :Loading,
  })

  const Show_Video =  Loadable({
    loader:()=> import('./views/addVideos/showVideo.js'),
    loading :Loading,
  })

  const VideoDetails =  Loadable({
    loader:()=> import('./views/addVideos/videodetails.js'),
    loading :Loading,
  })




const routes = [
  
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/video',exact: true, name: 'Add Videos', component: Video },
  { path: '/video/add',exact: true, name: 'Add Video Category', component: Add_Video },
  { path: '/showVideos', name: 'Show Video', component: Show_Video },
  { path: '/video_detail/:id', name: 'Video Details', component: VideoDetails },
  { path: '/colors', name: 'Colors', component: Colors },

  
];

export default routes;
