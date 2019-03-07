# Auto Loopback Exempt

Automatically exempt loopback for all and newly added applications.

For more information about network loopback, please checkout [Using network loopback in side-loaded Windows Store apps](https://msdn.microsoft.com/en-us/library/windows/apps/dn640582.aspx).

## Usage

Open CMD or PowerShell with **administrative privileges**:

```sh
yarn global add auto-loopback-exempt
# or
npm install --global auto-loopback-exempt
```

## How it works

This tool registers itself as a Windows Service. When it starts, it lists all folders under `%LOCALAPPDATA%\Packages` and executes `CheckNetIsolation.exe LoopbackExempt -a -n=[folder-name]` for every of them. Meanwhile, it setups a watcher for the `Packages` directory and receives changes of the newly added packages, so that it can apply the exemption to them as well.

## License

MIT License.
