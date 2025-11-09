import { useState } from 'react';
import Layout from './components/Layout';
import TopBar from './components/TopBar';
import ClientList from './components/ClientList';
import ClientDetail from './components/ClientDetail';

function App() {
  const [view, setView] = useState('list');
  const [opened, setOpened] = useState(null);

  return (
    <Layout>
      <TopBar title="Design Work Tracker" onBack={view==='detail' ? () => { setView('list'); setOpened(null); } : undefined} />
      {view === 'list' && (
        <ClientList
          onOpenClient={(client, onUpdate) => {
            setOpened({ client, onUpdate });
            setView('detail');
          }}
        />
      )}
      {view === 'detail' && opened && (
        <ClientDetail
          client={opened.client}
          onUpdate={(c) => opened.onUpdate?.(c)}
          onBack={() => { setView('list'); setOpened(null); }}
        />
      )}
    </Layout>
  );
}

export default App;
