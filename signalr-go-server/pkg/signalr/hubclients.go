package signalr

// HubClients gives the hub access to various client groups
// All() gets a ClientProxy that can be used to invoke methods on all clients connected to the hub
// Client() gets a ClientProxy that can be used to invoke methods on the specified client connection
// Group() gets a ClientProxy that can be used to invoke methods on all connections in the specified group
type HubClients interface {
	All() ClientProxy
	Client(connectionID string) ClientProxy
	Group(groupName string) ClientProxy
}

type defaultHubClients struct {
	lifetimeManager HubLifetimeManager
	allCache        allClientProxy
}

func (c *defaultHubClients) All() ClientProxy {
	return &c.allCache
}

func (c *defaultHubClients) Client(connectionID string) ClientProxy {
	return &singleClientProxy{connectionID: connectionID, lifetimeManager: c.lifetimeManager}
}

func (c *defaultHubClients) Group(groupName string) ClientProxy {
	return &groupClientProxy{groupName: groupName, lifetimeManager: c.lifetimeManager}
}
