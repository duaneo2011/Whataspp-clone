const io = require('socket.io')(5000)
//we are going to use this model to create a real time server between the server and the client
io.on('connection', socket =>{
  //way for us to have a constant id that doesnt change
  const id = socket.handshake.query.idea
  socket.join(id)
//whenever we send a message through the client we are going to send a message through this function
  socket.on('send-message', ({recipients, text}) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(recipient => recipient !== recipient)
        newRecipients.push(id)
        socket.boardcast.to(recipient).emit('recieved-message',{
          recipients:newRecipients, sender: id, text
        })
    })
  })
})
//
//   !== MEANS: STRICTLY NOT EQUAL
