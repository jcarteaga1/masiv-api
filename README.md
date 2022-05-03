# API Rest :: Masiv

## Prerequisites

- [Node](https://nodejs.org/)
- NPM, built into Node.
- [Redis](https://redis.io/docs/getting-started/)
- [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) or any client api rest.

## Clone the repo

```sh
> git clone https://github.com/jcarteaga1/masiv-api
```

## create docker image

```sh
> npm run buildImage
```

## run docker image

```sh
> npm run runImage
```

## run development mode

```sh
> npm run dev
```

# Create .env file

env:

## This is parameters required.

PORT=
JWT_KET=

## Authenticacion

´´´
headers:
{
authorization: ""
}
´´´

## API

<table>
  <tr>
   <td>
   </td>
   <td colspan="4" ><strong>Methods</strong>
   </td>
  </tr>
  <tr>
   <td><strong>URL</strong>
   </td>
   <td><strong>GET</strong>
   </td>
   <td><strong>POST</strong>
  </tr>
  <tr>
   <td>/users/singup
   </td>
   <td>-</td>
   <td>
   <p>
   body:
   <p>
   <code>{</code>
   <p>
   <code>username,</code>
   <p>
   <code>password,</code>
   <p>
   <code>credits,</code>
   <p>
   <code>}</code>
   <p>
   </td>
  </tr>

  <tr>
   <td>/users/login
   </td>
   <td>-</td>
   <td>
   <p>
   body:
   <p>
   <code>{</code>
   <p>
   <code>username,</code>
   <p>
   <code>password,</code>
   <p>
   <code>}</code>
   <p>
   </td>
  </tr>
</table>
```
