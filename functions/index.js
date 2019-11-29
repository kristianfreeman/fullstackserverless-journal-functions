const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

exports.entries = functions.https.onRequest(async (request, response) => {
  const snapshot = await db.collection('entries').get()
  const entries = snapshot.empty
    ? []
    : snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
  response.send(entries)
})

exports.createEntry = functions.https.onRequest(async (request, response) => {
  const body = JSON.parse(request.body)
  const text = body.text
  const ref = await db.collection('entries').add({ text })
  response.send({ id: ref.id, text })
})
