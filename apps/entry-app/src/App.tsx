import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense  } from 'react';
import Entry from './pages/Entry';

const ManageCustomersApp = lazy(
  () => import('manage-customers-app/ManageCustomersApp')
);
const ViewCustomerApp = lazy(
  () => import('view-customers-app/ViewCustomersApp')
);

export default function App() {
  // const [name, setName] = useState('');
  // const navigate = useNavigate();

  // const handleLogin = () => {
  //   navigate('/manage');
  // };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Entry />
          // <div className="p-4 flex flex-col items-center">
          //   <h1 className="text-xl font-bold">Welcome</h1>
          //   <input
          //     className="border p-2 mt-4"
          //     placeholder="Enter your name"
          //     value={name}
          //     onChange={(e) => setName(e.target.value)}
          //   />
          //   <button
          //     className="bg-blue-500 text-white p-2 mt-4"
          //     onClick={handleLogin}
          //   >
          //     Continue
          //   </button>
          // </div>
        }
      />
      <Route
        path="/manage/*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ManageCustomersApp />
          </Suspense>
        }
      />
      <Route
        path="/view/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ViewCustomerApp />
          </Suspense>
        }
      />
    </Routes>
  );
}
