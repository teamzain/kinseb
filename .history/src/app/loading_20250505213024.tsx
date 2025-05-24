import Navbar from './components/navbar';

export default function Loading() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    </>
  );
}
