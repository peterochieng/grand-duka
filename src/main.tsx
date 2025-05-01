
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error logging
const handleError = (error: Error) => {
  console.error('Caught in main error handler:', error);
  
  // Create error display element
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; background-color: #ffebee; color: #c62828; border-radius: 4px; max-width: 800px; margin: 40px auto;">
        <h2 style="margin-top: 0;">Application Error</h2>
        <p><strong>Message:</strong> ${error.message}</p>
        <p>Please check the console for more details.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Application
        </button>
      </div>
    `;
  }
};

// Attempt to render the application
try {
  console.log('Starting application render');
  const container = document.getElementById("root");
  
  if (!container) {
    throw new Error("Root element not found");
  }
  
  const root = createRoot(container);
  root.render(<App />);
  console.log('Application rendered successfully');
} catch (error) {
  console.error('Failed to render application:', error);
  handleError(error instanceof Error ? error : new Error(String(error)));
}
