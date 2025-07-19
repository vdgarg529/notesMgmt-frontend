// // src/components/Navigation.tsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navigation: React.FC = () => {
//   const { logout } = useAuth();
//   const location = useLocation();
  
//   // Only show navigation on protected routes
//   // const showNav = ['/', '/history', '/health'].includes(location.pathname);
//   const showNav = ['/','/history','/health'].some(path =>
//     location.pathname.startsWith(path)
//   );
    
//   if (!showNav) return null;

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-gray-900">Voice Notes</h1>
//         <div className="flex items-center space-x-4">
//           <nav className="hidden md:flex space-x-4">
//             <Link 
//               to="/" 
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 location.pathname === '/' 
//                   ? 'bg-blue-100 text-blue-700' 
//                   : 'text-gray-700 hover:text-blue-600'
//               }`}
//             >
//               Dashboard
//             </Link>
//             <Link 
//               to="/history" 
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 location.pathname === '/history' 
//                   ? 'bg-blue-100 text-blue-700' 
//                   : 'text-gray-700 hover:text-blue-600'
//               }`}
//             >
//               History
//             </Link>
//             <Link 
//               to="/health" 
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 location.pathname === '/health' 
//                   ? 'bg-blue-100 text-blue-700' 
//                   : 'text-gray-700 hover:text-blue-600'
//               }`}
//             >
//               Health
//             </Link>
//           </nav>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navigation;


// src/components/Navigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Only hide on login/register pages
  const hideNav = ['/login', '/register'].some(path =>
    location.pathname.startsWith(path)
  );

  console.log('Navigation state:', {
    pathname: location.pathname,
    isAuthenticated,
    hideNav
  });

  if (hideNav) return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Voice Notes</h1>
        <div className="flex items-center space-x-4">
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/history" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.startsWith('/history') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              History
            </Link>
            <Link 
              to="/health" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.startsWith('/health') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Health
            </Link>
          </nav>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;