package signalr

// HubContext is a context abstraction for a hub
// Clients() gets a HubClients that can be used to invoke methods on clients connected to the hub
// Groups() gets a GroupManager that can be used to add and remove connections to named groups
type HubContext interface {
	Clients() HubClients
	Groups() GroupManager
}

type defaultHubContext struct {
	clients HubClients
	groups  GroupManager
}

func (d *defaultHubContext) Clients() HubClients {
	return d.clients
}

func (d *defaultHubContext) Groups() GroupManager {
	return d.groups
}
