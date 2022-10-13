import fetch, { Response } from "node-fetch";
import { getGame } from "../src";
const VERSION = require('root-require')('package.json').version;

jest.mock('node-fetch');
const mockedFetch = jest.mocked(fetch);

beforeEach(() => { mockedFetch.mockClear(); });

test('makes GET /games/:id request correctly', async () => {
	// @ts-ignore
	mockedFetch.mockResolvedValue(new Promise.resolve({ json: () => Promise.resolve({"data": { 'id":"w6jmm26j' }})} as Response));
	const id = "cuphead";
	const game = await getGame(id);

	expect(mockedFetch).toBeCalledWith(`https://www.speedrun.com/api/v1/games/${id}`, { 
		method: 'get',
		headers: {
			'Host': 'www.speedrun.com',
			'Content-Type': 'application/json',
			'User-Agent': `src-ts/${VERSION}`,
		},
		body: undefined
	});

	expect(game.id).toBe('w6jmm26j');
});