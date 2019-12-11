# Changelog

## 2019-12-11

### Added

- CORS functionality in `app.js` and in `signalr-http.js`
- Added `settings.json` file

### Changed

> Changes to match [the .NET core example](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio-code)

- Removed "toLowerCase()" on the action.target (line 393 in `signalr.js`)
- Changes to the "send" incoming action and "send" outgoing action. Those are renamed to "SendMessage" and "ReceiveMessage"