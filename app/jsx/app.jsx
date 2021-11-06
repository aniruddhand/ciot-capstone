function App({ name }) {
  return (
<div className="container">
  <div className="row align-items-center" style={{height: '100%'}}>
    <div className="col"></div>
    <div className="col">
      <form>
        <h3>Sign in</h3>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Pin"></input>
          <label for="floatingPassword">Pin</label>
        </div>
        <button type="submit" className="btn btn-primary" style={{marginTop: '10px'}}>Sign in</button>
        <div className="form-text">Not registered? <a href="#" className="link-primary">Register here</a></div>
      </form>
    </div>
    <div className="col"></div>
  </div>
</div>
  );
}

ReactDOM.render(
  <App name="Aniruddha" />,
  document.getElementById('root')
);
