package signalr

import "io"

type Connection interface {
	io.Reader
	io.Writer
	ConnectionID() string
}
