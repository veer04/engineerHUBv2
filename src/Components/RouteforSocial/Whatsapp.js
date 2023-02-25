import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
function DiscordRedirect() {
  useEffect(() => {
    
      window.location.href = 'https://chat.whatsapp.com/HFoB03RXiWxJ0uNI6oH5gG';
    

  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
  );
}
export default DiscordRedirect;