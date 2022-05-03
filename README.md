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

## This is parameters required.

```yaml
env:
PORT=
JWT_KET=

```

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

  <tr>
   <td>/roulettes/
   </td>
   <td> List all roulettes </td>
   <td>-</td>
  </tr>

  <tr>
   <td>/roulettes/open/:id
   </td>
   <td> open roulette </td>
   <td>-</td>
  </tr>

  <tr>
   <td>/roulettes/new
   </td>
   <td>-</td>
   <td>
   new roulette, created with automatic body
   </td>
  </tr>

  <tr>
   <td>/roulettes/close/:id
   </td>
   <td> close roulette </td>
   <td>-</td>
  </tr>

  <tr>
   <td>/bets/new
   </td>
   <td>-</td>
   <td>
   <p>
   body:
   <p>
   <code>{</code>
   <p>
   <code>number,</code>
   <p>
   <code>color,</code>
   <p>
   <p>
   <code>credits,</code>
   <p>
   <p>
   <code>rouletteId,</code>
   <p>
   <code>}</code>
   <p>
   </td>
  </tr>
</table>

## Conventions

```
1. color number 1 is black, 0 is red
2. status roulette 1 is close, 0 is open
```
