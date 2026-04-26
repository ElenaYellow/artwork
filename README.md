# Artwork UI

This a very simple app that shows I understand how to use React.

## UI & API calls

In real world example I would use the RTK Query (see the artworkAPI.query.ts) for data fetching and caching and nothing else for this type of requirements, but it would not show that i can understand the idea of using slices and joining same data in one slice when more data gets avaiable. It's not needed here and is not actually used, because there is no real caching implemented, but I wanted to show that I understand the concept.

I added a manual TTL for artwork items, so the list eventually gets updated with the latest data from the API.

Even if there would be API wrapper with caching, I still prefer to have caching on the client as well to minimize API calls. And costs.

## Styles

I used AI to generate all styles, obviously, I would not use plain css in real world project. Styling takes too long to do right, so I decided to compomise on it.

## Routing

I used Next.js for this project, so I have file based routing. I tried using a plain React app using the command from https://redux.js.org/introduction/getting-started#basic-example:

```
# Create React App + TypeScript

npx tiged reduxjs/redux-templates/packages/cra-template-redux-typescript my-app
```

but there were some issues even just building it, it was not working out of the box, so I switched to Next.js that I am fimiliar with. I didn't wan to spend too much time on setting up the project.

## Images

The recommended way to use cors didn't work (i did try using a cors proxy server from npm too locally, it still didn't work). I didn't want to try to hack into the API. The ui/api/image/[artworkId] was an experiment to see if it works. It doesn't.

## API

Free Cors from https://corsproxy.io/ didn't work - it required a paid subscription. I didn't find anything better in 5 min I spent looking at it, so the API is just how I would start writing the API for this case.

I added in-memory cache with TTL to API. 2 TTL settings - on for the apis and one for images. Images should be stored in some CDN, Cloudflare or S3. Also, I changed list API to only accept page number, so the caching is simple and actually works for different requests. Because we control the UI it was an easy trade-off to make.

In real application I would use something like Redis for caching the API responses.

In real real application I would just use a Cloudflare to create a tiny wrapper around these API and configure it to cache images, responses and what not. It is one of the cheapest solution and it is designed to work perfectly for this use case.

You can use AWS as Gateway to route all requests, then lambdas to get data from cache (Redis or DynamoDB) or from the API when cache expires and then return it. But it is more expensive as I rememeber.

## AI usage

I used AI to generate all styles and API model. There was also a bit of AI help to add boilerplate code for slices and API Contollers. And yes, I used AI to apply readme styling to this file without changing the text, so you can see real me, not an AI-polished version of me.
