import { useJWT } from './Hooks/useJWT'
import { jwt_encryption_algorithms } from './Constants/algorithms'

function App() {
  const jwt = useJWT({
    header: "",
    body: "",
    secret: "super-secret",
    algorithm: "HS256"
  })  

  return (
    <>
      <div className='has-background-primary-dark block'>
        <div className='container pt-3 pb-3'>
          <h1 className="title is-2">JWT Editor</h1>
        </div>
      </div>

      <div className="container box columns">
          <h1></h1>
          <div className="column">
            <div className='field'>
              <label className='label'>JWT Token</label>
              <textarea 
                className={`block textarea has-fixed-size ${!jwt.validEncodedJwt? "is-warning" : ""}`}
                rows={25}
                onChange={(e) => jwt.onChangeJwtToken(e.target.value)}
                value={jwt.encodedJwt}
              >
              </textarea>
            </div>

            <article className={`message ${jwt.signatureVerified? "is-success": "is-warning"}`}>
              <div className="message-body">
                {jwt.signatureVerified? "Signature Verified" : "Invalid Signature"}
              </div>
            </article>
          </div>

          <div className="column">
            <div className='field'>
              <label className='label'>Header</label>
              <textarea 
                className={`textarea has-fixed-size ${!jwt.jwtHeaderValid? "is-warning" : ""}`}
                rows={7} 
                value={jwt.jwtHeader}
                onChange={(e) => jwt.onChangeHeaders(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Body</label>
              <textarea 
                className={`textarea has-fixed-size ${!jwt.jwtBodyValid? "is-warning" : ""}`}
                rows={15} 
                value={jwt.jwtBody}
                onChange={(e) => jwt.onChangeBody(e.target.value)}
              >  
              </textarea>
            </div>
            
            <div className='field'>
              <label className='label'>Secret</label>
              <textarea 
                className={`textarea has-fixed-size`}
                rows={3} 
                value={jwt.jwtSecret}
                onChange={(e) => jwt.onChangeSecret(e.target.value)}
              >
              </textarea>
            </div>

            <div className='field'>
              <label className='label'>Algorithm</label>
              <div className="select is-fullwidth"> 
                <select value={jwt.algorithm} onChange={e => jwt.onChangeAlgorithm(e.target.value)}>
                  {
                    jwt_encryption_algorithms.map(algo => {return <option value={algo}>{algo}</option>})
                  }
                </select>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
