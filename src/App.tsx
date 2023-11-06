import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CircleCanvas from '@/components/layout/CircleCanvas';
import { DataTable } from './table/data-table';
import { DataTableProvider } from './context/DataTableContext';
import { Details } from './components/layout/Details';
import { DiagramProvider } from './context/DiagramContext';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/*<Hero />*/}
      <DataTableProvider>
        <DiagramProvider>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4'>
              <Details />
              <DataTable />
            </div>
            <CircleCanvas />
          </div>
        </DiagramProvider>
      </DataTableProvider>
    </ThemeProvider>
  );
}

export default App;