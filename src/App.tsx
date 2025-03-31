import { useJWT } from './Hooks/useJWT'
import { is_symmetric_crypto_algorithm, jwt_encryption_algorithms } from './Constants/algorithms'
import { DEFAULT_ALGORITHM, DEFAULT_BODY, DEFAULT_HEADER, DEFAULT_PRIVATE_KEY, DEFAULT_PUBLIC_KEY, DEFAULT_SECRET} from './Constants/initialSettings'
import { JsonEditor } from './Components/JsonEditor/JsonEditor';
import { AppHeader } from './Components/Header/Header';
import { SecretInput } from './Components/SecretInput/SecretInput';

function App() {
  const jwt = useJWT({
    header: DEFAULT_HEADER,
    body: DEFAULT_BODY,
    symmetricSecret: DEFAULT_SECRET,
    algorithm: DEFAULT_ALGORITHM
  })  

  return (
    <>
      <AppHeader/>

      <div className="container box columns">
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
              <label className='label'>Algorithm</label>
              <div className="select is-fullwidth"> 
                <select value={jwt.algorithm} onChange={e => jwt.onChangeAlgorithm(e.target.value)}>
                  {
                    jwt_encryption_algorithms.map(algo => {return <option key={algo} value={algo}>{algo}</option>})
                  }
                </select>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Header</label>
              <JsonEditor
                height='12em'
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
           
            <SecretInput
              isSymmetricAlgorithm={is_symmetric_crypto_algorithm(jwt.algorithm)}

              symmetricSecret={jwt.jwtSymmetricSecret}
              onSymmetricSecretChanged={jwt.onChangeSymmetricSecret}

              publicKey={jwt.publicKey}
              publicKeyValid={jwt.publicKeyValid}
              onPublicKeyChanged={jwt.onChangePublicKey}

              privateKey={jwt.privateKey}
              privateKeyValid={jwt.privateKeyValid}
              onPrivateKeyChanged={jwt.onChangePrivateKey}
            />
          </div>
      </div>
    </>
  )
}

export default App
