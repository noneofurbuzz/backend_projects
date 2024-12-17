import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FormProvider } from './context/formContext.tsx'
import { PaginationProvider } from './context/paginationContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FormProvider>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </FormProvider>
    </QueryClientProvider>
  </StrictMode>,
)
