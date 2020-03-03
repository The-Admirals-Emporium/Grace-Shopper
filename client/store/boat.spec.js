/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { getAllBoats } from './boat';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = { user: {} };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetch boats', () => {
    it('eventually dispatches the GET_BOATS action', async () => {
      const fakeBoats = [
        {
          name: 'Forever Young',
          imageUrl: '',
          description: '',
          cost: 236098,
        },
        {
          name: 'Pearl',
          imageUrl: '',
          description: '',
          cost: 142252,
        },
        {
          name: 'More Cowbell',
          imageUrl: '',
          description: '',
          cost: 887359,
        },
        {
          name: 'Why Not',
          imageUrl: '',
          description: '',
          cost: 140193,
        },
        {
          name: 'High Maintenance',
          imageUrl: '',
          description: '',
          cost: 134655,
        },
        {
          name: 'Aquaholic',
          imageUrl: '',
          description: '',
          cost: 272486,
        },
        {
          name: 'Second Chance',
          imageUrl: '',
          description: '',
          cost: 921397,
        },
        {
          name: 'Pegasus',
          imageUrl: '',
          description: '',
          cost: 812800,
        },
        {
          name: "Feelin' Nauti",
          imageUrl: '',
          description: '',
          cost: 730817,
        },
        {
          name: 'Squid Pro Quo',
          imageUrl: '',
          description: '',
          cost: 840726,
        },
      ];
      mockAxios.onGet('/api/boats').replyOnce(200, fakeBoats);
      await store.dispatch(getAllBoats());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_BOATS');
      expect(actions[0].boats).to.be.deep.equal(fakeBoats);
    });
  });
});
