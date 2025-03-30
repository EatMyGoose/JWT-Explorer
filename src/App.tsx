import { useJWT } from './Hooks/useJWT'
import { jwt_encryption_algorithms } from './Constants/algorithms'
import { DEFAULT_ALGORITHM, DEFAULT_BODY, DEFAULT_HEADER, DEFAULT_SECRET} from './Constants/initialSettings'
import { JsonEditor } from './Components/JsonEditor';
import { AppHeader } from './Components/Header';

function App() {
  const jwt = useJWT({
    header: DEFAULT_HEADER,
    body: DEFAULT_BODY,
    secret: DEFAULT_SECRET,
    algorithm: DEFAULT_ALGORITHM  
  })  

  return (
    <>
      <AppHeader/>

      <div className="container box columns">
          <h1></h1>
          <div className="column">
            <div className='field'>
              <label className='label'>JWT Token</label>
              <textarea 
                className={`block textarea has-fixed-size ${!jwt.validEncodedJwt? "is-warning" : ""}`}
                rows={30}
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
              <JsonEditor
                height='15em'
                warning={!jwt.jwtHeaderValid}
                value={jwt.jwtHeader}
                onChange={jwt.onChangeHeaders}
              />
            </div>

            <div className='field'>
              <label className='label'>Body</label>

              <JsonEditor
                height='25em'
                warning={!jwt.jwtBodyValid}
                value={jwt.jwtBody}
                onChange={jwt.onChangeBody}
              />
            </div>
           
            
            <div className='field'>
              <label className='label'>Secret</label>
              <textarea 
                className={`textarea has-fixed-size`}
                rows={2} 
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
