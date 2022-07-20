# ⚒ prepper ⚒

`prepper` helps you prepare your development environment 👩‍💻.

# Install
- Install `prepper` as a dev-dependency
  ```bash
  pnpm add -D stefanwin/prepper    # pnpm
  yarn add -D stefanwin/prepper    # yarn
  npm install -D stefanwin/prepper # npm
  ```
- add it your postinstall hook
  ```json
  "scripts": {
    "postinstall": "prepper",
    // ...
  }
  ```



# Features


## 🌎 Environment File Setup

`prepper` helps you keep your `.env` files up-to-date and ready.
Often, template environment files are provided via `.env.example` or `.env.template` files.
`prepper` can help identiy missing keys and and check for the existence of the actual `.env` file.

- copy your templates to '.env`
- warn you about missing keys
- monorepo support, just specify the settings for each package

# ⚙ Configuration
```json5
// file: .prepper.json
{
  "environments": {
    // these settings apply to all enviroments
    "baseConfig": {
      // default filename for all template files
      // "exampleFilename": ".env.example",
      // default filename for all environment files
      // "envFilename": ".env",
      // throw errors instead of printing warnings
      "strict": true,
      // copy the template file to the env file if it doesn't exist
      "copy": true,
      // overwrite the env file with the template file
      "overwrite": false,
    },
    // provide a package path and override global settings
    "environments": [
      {
        "basePath": "./",
        "exampleFilename": ".env.example"
      },
      {
        "basePath": "./next-project",
        "exampleFilename": ".env.local.example",
        "envFilename": ".env.local"
      }
    ]
  },
  "dependencies": {
    "baseConfig": {},
    "dependencies": []
  }
}

```
