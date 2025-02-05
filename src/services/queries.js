import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FirebaseContants } from '../utils/Global';

export const getCurrentUserFromDB = async ()=>{
    try{
        const userId = auth().currentUser.uid;
        if(!userId){
            throw Error("Can't get user id from the auth");
        }
        const documentRef =  await firestore().collection(FirebaseContants.users).doc(userId).get();
        if(!documentRef){
            throw Error('No document found for user');
        }
        const userData = documentRef.data();
        return userData;
    }catch(error){
        console.log('Error getting current user ', error)
        throw Error
    }
}

export const getFriendsDocForUser = async ()=>{
    try{
        const userId = auth().currentUser.uid;
        if(!userId){
            throw Error("Can't get user id from the auth");
        }
        const documentRef =  await firestore().collection(FirebaseContants.users).doc(userId).get();
        if(!documentRef){
            throw Error('No document found for user');
        }
        const userData = documentRef.data();
        const friendIds = userData.friends || [];
        const friendDocs = [];
        for (friendID of friendIds){
            const friendDocRef = await firestore().collection(FirebaseContants.users).doc(friendID).get();
            friendDocs.push(friendDocRef.data());
        }
        return friendDocs;
    }catch(error){
        console.log('Error getting current user ', error)
        throw Error
    }
}