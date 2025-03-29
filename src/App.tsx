import { useJWT } from './Hooks/useJWT'
import { jwt_encryption_algorithms } from './Constants/algorithms'

function App() {
  const jwt = useJWT({
    header: "",
    body: "",
    secret: "meowing",
    algorithm: "HS256"
  })  

  return (
    <>
      <div className="o-container o-container--xlarge">
        <h1 className='u-text--highlight'>JWT Editor</h1>
      </div>

      <div className="o-container o-container--xlarge">
        <div className="o-grid">
          <div className="o-grid__cell c-card">
            <h3>Token:</h3>
            <textarea 
              rows={30}
              onChange={(e) => jwt.onChangeJwtToken(e.target.value)}
              value={jwt.encodedJwt}
              style={jwt.validEncodedJwt? {} : {backgroundColor: "red"}}
            >

            </textarea>
            <div>
              <span>Signature Verified?</span>
              <input type="checkbox" checked={jwt.signatureVerified}></input>
            </div>
          </div>
          <div className="o-grid__cell c-card">
            <h3>Decoded:</h3>
            <h4>Header:</h4>
            <textarea 
              rows={5} 
              value={jwt.jwtHeader}
              onChange={(e) => jwt.onChangeHeaders(e.target.value)}
              style={jwt.jwtHeaderValid? {} : {backgroundColor: "red"}}
            />

            <h4>Body:</h4>
            <textarea 
              rows={20} 
              value={jwt.jwtBody}
              onChange={(e) => jwt.onChangeBody(e.target.value)}
              style={jwt.jwtBodyValid? {} : {backgroundColor: "red"}}
            >  
            </textarea>
            
            <h4>Secret:</h4>
            <textarea 
              rows={5} 
              value={jwt.jwtSecret}
              onChange={(e) => jwt.onChangeSecret(e.target.value)}
            >
              
            </textarea>

            <h5>Algorithm</h5>
            <select value={jwt.algorithm} onChange={e => jwt.onChangeAlgorithm(e.target.value)}>
              {
                jwt_encryption_algorithms.map(algo => {return <option value={algo}>{algo}</option>})
              }
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
