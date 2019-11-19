
const admin = require("firebase-admin");

const serviceAccount = require("./exchange-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://exchange-231906.firebaseio.com"
});

let db = admin.firestore();


function getConnections(){
    db.collection("Connections").get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            const coach = doc.data().coach;
            const user = doc.data().user;
            const status = doc.data().status;
            const userProfile = db.collection("Profiles").doc(user).get().then((userProfile)=>{

                const coachProfile = db.collection("Profiles").doc(coach).get().then((coachProfile)=>{

                    console.log(userProfile.data().displayName+", "+coachProfile.data().displayName+": "+status);

                });
            });


        })
    }).catch((error)=>console.log(error));

    return true;
}




function main(){
    getConnections();
    return true;
}

main();