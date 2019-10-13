import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../src/main"
import { dbs } from "../src/main"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: []
    },
    getters: {
        getItems: state => {
            return state.items
        }
    },

    mutations: {

    },

    actions: {
        setItems({ commit, getters }, payload) {
            const newEvent = {
                title: payload.eventTitle,
                level: payload.eventLevel,
                itemLevel: payload.eventItemLevel,
                additionalComments: payload.additionalComments,
                totalPlayers: payload.totalPlayers,
                numOfTanks: payload.numOfTanks,
                numOfHealers: payload.numOfHealers,
                numOfDps: payload.numOfDps,
                dateTimes: payload.dateTimes,
                date: payload.created_at,
                members: []
            }
            let eventImageUrl
            let eventKey
            db.collection('items').add(newEvent)
                .then(function (data) {
                    return data.id
                })
                .then(function (key) {
                    eventKey = key
                    const filename = payload.eventImage.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return dbs.ref().child(eventKey + ext).put(payload.eventImage)
                })
                .then(function (fileData) {
                    eventImageUrl = fileData.metadata.fullPath
                    return db.collection('items').doc(eventKey).update({ eventImageUrl: eventImageUrl })
                })
        },
        addMember({commit, getters}, payload) {
            const newMember = {
                name: payload.newName,
                newRole: payload.newRole,
                prefDate: payload.prefDate,
                newComment: payload.newComment
            }
            var chosenDateId = payload.prefDate;
            var chosenDoc = db.collection('items').doc(payload.eventId);
            console.log(newMember);
            console.log(chosenDoc);
            return true;
            // chosenDoc.update({
            //     members: firebase.firestore.FieldValue.arrayUnion(newMember),
            // })
        }
    }
})
