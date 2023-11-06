import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Input } from '@/components/ui/input';
import CircleCanvas from '@/components/layout/CircleCanvas';
import Hero from './components/layout/Hero';
import { DataTable } from './table/data-table';
import { columns, data } from './table/columns';
import { DataTableProvider } from './context/DataTableContext';
import { Picker } from './components/ui/picker';
import { Details } from './components/layout/Details';
import { DiagramContext, DiagramProvider } from './context/DiagramContext';


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