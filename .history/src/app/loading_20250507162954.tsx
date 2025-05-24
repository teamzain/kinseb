import LoadingScreen from './components/LoadingScreen'; // correct path

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <main>
      {/* Your content */}
    </main>
  );
}
