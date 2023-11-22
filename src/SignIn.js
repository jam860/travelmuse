//import auth functions and variables from Firebase
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

//import the component -- pick one!
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

//an object of configuration values
const firebaseUIConfig = {
    signInOptions: [ //array of sign in options supported
        //array can include just "Provider IDs", or objects with the IDs and options
        { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
        GoogleAuthProvider.PROVIDER_ID,
    ],
    signInFlow: 'popup', //don't redirect to authenticate
    credentialHelper: 'none', //don't show the email account chooser
    callbacks: { //"lifecycle" callbacks
        signInSuccessWithAuthResult: () => {
            return false; //don't redirect after authentication
        }
    }
}

//the React compnent to render
export function SignIn() {
    const auth = getAuth(); //access the "authenticator"
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    let status;
    if(loading) {
        status = "Loading... please wait."
    }

    if(error) {
        status = "Error:" + {error}
    }

    if(user) {
        status = "You're signed in! Feel free to make some itineraries."
    } else {
        status = "Please sign in to your account"
    }

    return (
        <main>
            <div className="d-flex justify-content-center">
                <div className="card my-5 py-5">
                    <div className="card-body">
                    <p className="text-center">{status}</p>
                    <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
                    </div>
                </div>
            </div>
        </main>
    );
}