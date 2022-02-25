import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const onClickLogin = () => {
    loginWithRedirect({
      redirectUri: `${import.meta.env.VITE_AUTH0_REDIRECTURI}`
    });
  }

  const onClickLogout = () => {
    logout({
      returnTo: 'https://sub.localdomain.com'
    });
  }

  return (
    <div className="App">
      <h1>sub.localdomain.com</h1>
      <p>
        <button onClick={onClickLogout}>Logout</button> 
      </p>
      {isLoading 
        ? 'Loading' 
        : !isAuthenticated 
          ? <button onClick={onClickLogin}>Login</button> 
          : <div>
              <pre style={{ padding: '10px', background: '#efefef'}}>
              <code>{JSON.stringify(user)}</code></pre>
              <button onClick={onClickLogout}>Logout</button> 
            </div>}
            <hr />
        <div>
        <pre style={{ padding: '10px', background: '#efefef'}}>
            <code>{JSON.stringify(document.cookie?.length > 0 ? document?.cookie.split(';').map(i => { let o = i.trim().split('='); return { [o[0]]: o[1] }}) : '', null, ' ')}</code></pre>
        </div>
    </div>
  )
};

export default App
