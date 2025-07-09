import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@repo/packages/styles/global-config.scss";
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './components/ui/notification/Notification.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </QueryClientProvider>
  </StrictMode>,
)
