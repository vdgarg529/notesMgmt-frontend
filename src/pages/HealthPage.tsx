// src/pages/HealthPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkHealth } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const HealthPage: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await checkHealth();
        setStatus(response.status);
      } catch (err) {
        setError('API is unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">System Health</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                status === 'healthy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {status === 'healthy' ? (
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {status ? `Status: ${status}` : 'Unknown status'}
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  Recheck Status
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HealthPage;




// // src/pages/HealthPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { checkHealth } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import Navigation from '../components/Navigation';

// const HealthPage: React.FC = () => {
//   const [status, setStatus] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     const fetchHealth = async () => {
//       try {
//         const response = await checkHealth();
//         setStatus(response.status);
//       } catch (err) {
//         setError('API is unavailable');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHealth();
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-bold mb-6">System Health</h2>
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="p-4 bg-red-50 text-red-700 rounded-lg">
//               {error}
//             </div>
//           ) : (
//             <div className="text-center">
//               <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
//                 status === 'healthy' 
//                   ? 'bg-green-100 text-green-800' 
//                   : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {status === 'healthy' ? (
//                   <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 ) : (
//                   <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 )}
//                 {status ? `Status: ${status}` : 'Unknown status'}
//               </div>
              
//               <div className="mt-6">
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
//                 >
//                   Recheck Status
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HealthPage;