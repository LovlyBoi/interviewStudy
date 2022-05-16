self.onmessage = (e) => {
    console.log("e", e, e.clients);
    e.currentTarget.clients.matchAll().then(clients => {
        console.log("clients", clients);
        clients.forEach((client) => {
            client.postMessage(e.data);
        })
    })
}