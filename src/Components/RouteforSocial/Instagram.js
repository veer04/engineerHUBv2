import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
function DiscordRedirect() {
  useEffect(() => {
    window.location.href = 'https://www.instagram.com/engineerhub.in/';
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
  );
}
export default DiscordRedirect;