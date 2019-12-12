# Changelog

## 2019-12-12

### Added

- Some checks to prevent crashes (line 42 and 276 of `signalr.js`)

## 2019-12-11

### Added

- `.prettierrc` file, `CHANGELOG.md`

### Changed

> Changes to match [the .NET core example](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio-code)

- Removed "toLowerCase()" on the action.target (line 393 in `signalr.js`)
- Changes to the "send" incoming action and "send" outgoing action. Those are renamed to "SendMessage" and "ReceiveMessage"