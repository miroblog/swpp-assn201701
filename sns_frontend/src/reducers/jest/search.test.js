import search from '../search';

describe('Testing search reducer', () => {
  it('SHOW_RESULT', () => {
    let state = {
      showResult: false,
      users: []
    }
    state = search( state, {
      type: "SHOW_RESULT",
      users: ['user1', 'user2'],
      showResult: true
    } )
    expect(state).toEqual( {
      showResult: true,
      users: ['user1', 'user2']
    } )
  });

  it('SEARCH_RESULT_CLOSE', () => {
    let state = {
      showResult: true,
      users: []
    }
    state = search( state, {
      type: "SEARCH_RESULT_CLOSE"
    } )
    expect(state).toEqual( {
      showResult: false,
      users: []
    } )
  })
  it('LOGOUT', () => {
    let state = {
      showResult: true,
      users: []
    }
    state = search( state, {
      type: "LOGOUT"
    } )
    expect(state).toEqual( {
      showResult: false,
      users: []
    } )
  })
})
