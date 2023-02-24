import { useEffect } from 'react';

function DiscordRedirect() {
  useEffect(() => {
    window.location.href = 'https://www.linkedin.com/company/engineersummit/';
  }, []);

  return null;
}
export default DiscordRedirect;