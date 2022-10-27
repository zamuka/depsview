## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API usage

# Generate a TOKEN in gitlab
1. Got to gitlab
2. click on your profile icon at the top right
3. Edit profile
4. In the left sidebar click Access Token
5. create an access token with read read_api and read_repository

Set a TOKEN env variable

You can get a project id by finding the project by name:
```http://localhost:3000/api/getPackage?name=feature/canvas```

When you get an ID from package you can access anything in that project, like branch names or files
e.g. canvas package.json from master:
http://localhost:3000/api/getFile?project=1048&name=package.json&branch=master

