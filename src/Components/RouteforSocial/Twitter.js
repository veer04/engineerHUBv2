import { useEffect } from 'react';

function DiscordRedirect() {
  useEffect(() => {
    window.location.href = 'https://twitter.com/engineerhub_in/';
  }, []);

  return null;
}
export default DiscordRedirect;