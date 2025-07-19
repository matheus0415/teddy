import { useParams } from 'react-router-dom';

export default function ViewCustomersApp() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Customer #{id}</h2>
      <p>Details about customer #{id}...</p>
    </div>
  );
}