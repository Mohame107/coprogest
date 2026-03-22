// ═══════════════════════════════════════════
//  CoproGest — Configuration Firebase
// ═══════════════════════════════════════════

const firebaseConfig = {
  apiKey:            "AIzaSyCFdBpmIArfjZPNolOGWavApVgEWp-lLqk",
  authDomain:        "coprogest-effcb.firebaseapp.com",
  projectId:         "coprogest-effcb",
  storageBucket:     "coprogest-effcb.firebasestorage.app",
  messagingSenderId: "1021123424429",
  appId:             "1:1021123424429:web:033ce37389128fee2f9624"
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

// Services globaux utilisés par tous les fichiers
const auth = firebase.auth();
const db   = firebase.firestore();
