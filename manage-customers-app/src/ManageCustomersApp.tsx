import { Link } from 'react-router-dom';

export default function ManageCustomersApp() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Customer Management</h2>
      <ul>
        <li>
          John Doe - <Link to="/view/1">View</Link>
        </li>
        <li>
          Jane Smith - <Link to="/view/2">View</Link>
        </li>
      </ul>
    </div>
  );
}