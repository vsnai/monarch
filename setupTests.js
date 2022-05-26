import { server } from './src/mocks/server'

// https://github.com/reduxjs/redux-toolkit/issues/1271#issuecomment-877526770
import { fetch, Headers, Request, Response } from 'cross-fetch'

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())
